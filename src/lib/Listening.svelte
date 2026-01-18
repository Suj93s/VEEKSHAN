<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { mediaRecorderStore } from '$lib/stores/mediaRecorderStore';

    const dispatch = createEventDispatcher();
    let currentMediaRecorderState;
    $: recordingState = $mediaRecorderStore; // Reactive store subscription

    const WEBHOOK_URL = 'http://sreya-n8n.laddu.cc/webhook/voice_input';

    // Update currentMediaRecorderState on store changes
    mediaRecorderStore.subscribe(state => {
        currentMediaRecorderState = state;
    });

    onMount(() => {
        // Ensure MediaRecorder's onstop event is handled
        if (currentMediaRecorderState.mediaRecorder) {
            currentMediaRecorderState.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(currentMediaRecorderState.audioChunks, { type: 'audio/webm' });
                console.log('Recorded audio blob:', audioBlob);

                // Set status for UI feedback
                mediaRecorderStore.update(state => ({ ...state, isSending: true }));

                // Send audio to webhook
                try {
                    const formData = new FormData();
                    formData.append('audio', audioBlob, 'recording.webm');

                    const response = await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        console.log('Audio successfully sent to webhook!');
                        console.log('Webhook request completed successfully.'); // Added log
                        // Optionally, process response from webhook
                        // const result = await response.json();
                        // console.log('Webhook response:', result);
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to send audio to webhook:', response.status, errorText);
                        console.log('Webhook request failed.'); // Added log
                        mediaRecorderStore.update(state => ({ ...state, error: `Failed to send audio: ${response.statusText}` }));
                    }
                } catch (error) {
                    console.error('Error sending audio:', error);
                    console.log('Webhook request failed due to network error.'); // Added log
                    mediaRecorderStore.update(state => ({ ...state, error: `Error sending audio: ${error.message}` }));
                } finally {
                    mediaRecorderStore.resetRecording();
                    dispatch('changeView', 'home'); // Navigate back to home after sending (or error)
                }
            };
        }
    });

    // Handler for the "tick" icon (send audio)
    function handleSendAudio() {
        if (recordingState.isRecording) {
            currentMediaRecorderState.mediaRecorder.stop(); // This will trigger onstop logic
        } else {
            // If somehow not recording, just reset and go home
            mediaRecorderStore.resetRecording();
            dispatch('changeView', 'home');
        }
    }

    // Handler for the "cross" icon (discard audio)
    function handleDiscardAudio() {
        if (recordingState.isRecording) {
            currentMediaRecorderState.mediaRecorder.stop(); // Stop, but onstop won't send anything
        }
        mediaRecorderStore.resetRecording(); // Reset store and stop tracks
        dispatch('changeView', 'home'); // Navigate back to home
    }
</script>

<main>
    <div class="content-wrapper">
        <div class="waveform-container">
            <svg class="waveform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
                <rect x="2" y="15" width="3" height="20" rx="1.5" />
                <rect x="8" y="5" width="3" height="40" rx="1.5" />
                <rect x="14" y="18" width="3" height="14" rx="1.5" />
                <rect x="20" y="10" width="3" height="30" rx="1.5" />
                <rect x="26" y="20" width="3" height="10" rx="1.5" />
                <rect x="32" y="12" width="3" height="26" rx="1.5" />
                <rect x="38" y="8" width="3" height="34" rx="1.5" />
                <rect x="44" y="16" width="3" height="18" rx="1.5" />
                <rect x="50" y="22" width="3" height="6" rx="1.5" />
                <rect x="56" y="16" width="3" height="18" rx="1.5" />
                <rect x="62" y="8" width="3" height="34" rx="1.5" />
                <rect x="68" y="12" width="3" height="26" rx="1.5" />
                <rect x="74" y="20" width="3" height="10" rx="1.5" />
                <rect x="80" y="10" width="3" height="30" rx="1.5" />
                <rect x="86" y="18" width="3" height="14" rx="1.5" />
                <rect x="92" y="5" width="3" height="40" rx="1.5" />
                <rect x="98" y="15" width="3" height="20" rx="1.5" />
            </svg>
            </div>
            <div class="controls-container">
                <svg on:click={handleSendAudio} on:keydown={() => {}} role="button" tabindex="0" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                </svg>
                <img src="/assets/circle-microphone-lines.svg" alt="Microphone Icon" class="mic-icon">
                <svg on:click={handleDiscardAudio} on:keydown={() => {}} role="button" tabindex="0" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </div>
        </div>
        <p class="listening-text">
            {#if recordingState.error}
                ERROR: {recordingState.error}
            {:else if recordingState.isSending}
                SENDING...
            {:else if recordingState.isRecording}
                LISTENING...
            {:else}
                Processing...
            {/if}
        </p>
</main>

<style>
    main {
        background-color: #FF0000;
        color: #FFFFFF;
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    }

    .content-wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    .waveform-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
    }

    .waveform {
        width: 80%;
        height: 100px;
        fill: white;
    }

    .controls-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 80%;
    }

    .icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .mic-icon {
        width: 80px;
        height: 80px;
        filter: brightness(0) invert(1);
        animation: mic-breathe 2s infinite; /* Apply the animation */
    }

    @keyframes mic-breathe {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    .listening-text {
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        margin-top: 40px; /* Consistent spacing with Home */
        margin-bottom: 20px; /* Space from bottom */
    }
</style>
