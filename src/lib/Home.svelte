<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function switchToListening() {
        dispatch('changeView', 'listening');
    }
</script>

<main>
    <div class="content-wrapper">
        <div class="waveform-container">
            <!-- Invisible placeholder to match Listening screen layout -->
        </div>
        <div class="controls-container" on:click={switchToListening} on:keydown={() => {}} role="button" tabindex="0">
            <img src="/assets/circle-microphone-lines.svg" alt="Microphone Icon" class="mic-icon">
        </div>
    </div>
    <p class="speak-text">TAP TO SPEAK</p>
</main>

<style>
    main {
        background-color: #000000;
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
        height: 100px; /* Match height of real waveform */
        visibility: hidden;
    }

    .controls-container {
        display: flex;
        flex-direction: column; /* Stack children vertically */
        justify-content: center; /* Center vertically */
        align-items: center; /* Center horizontally */
        width: 80%;
        cursor: pointer;
    }

    .mic-icon {
        width: 80px;
        height: 80px;
        filter: brightness(0) invert(1);
    }

    .speak-text {
        text-align: center;
        font-size: 12px;
        letter-spacing: 1px;
        margin-top: 40px; /* Gap between icon and text */
        margin-bottom: 20px; /* Space from bottom */
    }
</style>
