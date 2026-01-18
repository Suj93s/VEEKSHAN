import { writable } from 'svelte/store';

const createMediaRecorderStore = () => {
    const { subscribe, set, update } = writable({
        mediaRecorder: null,
        audioChunks: [],
        isRecording: false,
        isSending: false, // Added for UI feedback
        error: null
    });

    let mediaStream = null;

    const startRecording = async () => {
        console.log('mediaRecorderStore: startRecording called.');
        if (!navigator.mediaDevices) {
            update(state => ({ ...state, error: 'MediaDevices API not supported in this browser.' }));
            console.error('mediaRecorderStore: MediaDevices API not supported.');
            return;
        }

        try {
            console.log('mediaRecorderStore: Requesting microphone access...');
            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('mediaRecorderStore: Microphone access granted. Initializing MediaRecorder.');
            const mediaRecorder = new MediaRecorder(mediaStream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                // Not handling onstop here, will be handled by components
                console.log('mediaRecorderStore: MediaRecorder onstop event triggered.');
            };

            mediaRecorder.onerror = event => {
                update(state => ({ ...state, error: `MediaRecorder error: ${event.error.name}` }));
                console.error('mediaRecorderStore: MediaRecorder error:', event.error.name);
            };

            mediaRecorder.start();
            console.log('mediaRecorderStore: MediaRecorder started.');
            set({
                mediaRecorder,
                audioChunks,
                isRecording: true,
                isSending: false,
                error: null
            });
        } catch (err) {
            update(state => ({ ...state, error: `Error accessing microphone: ${err.message}` }));
            console.error('mediaRecorderStore: Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        update(state => {
            if (state.mediaRecorder && state.isRecording) {
                console.log('mediaRecorderStore: Stopping MediaRecorder.');
                state.mediaRecorder.stop();
                // Stop all tracks in the media stream
                if (mediaStream) {
                    mediaStream.getTracks().forEach(track => track.stop());
                    mediaStream = null;
                    console.log('mediaRecorderStore: MediaStream tracks stopped.');
                }
                return { ...state, isRecording: false };
            }
            return state;
        });
    };

    const resetRecording = () => {
        update(state => {
            console.log('mediaRecorderStore: Resetting recording state.');
            // Ensure all tracks are stopped if still active
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                mediaStream = null;
                console.log('mediaRecorderStore: MediaStream tracks stopped during reset.');
            }
            return {
                mediaRecorder: null,
                audioChunks: [],
                isRecording: false,
                isSending: false, // Also reset isSending
                error: null
            };
        });
    };

    return {
        subscribe,
        set,
        update,
        startRecording,
        stopRecording,
        resetRecording
    };
};

export const mediaRecorderStore = createMediaRecorderStore();