<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function switchToHome() {
        dispatch('changeView', 'home');
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
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                </svg>
                <img src="/assets/circle-microphone-lines.svg" alt="Microphone Icon" class="mic-icon">
                <svg on:click={switchToHome} on:keydown={() => {}} role="button" tabindex="0" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </div>
        </div>
        <p class="listening-text">LISTENING</p>
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
    }

    .listening-text {
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        margin-top: 40px; /* Consistent spacing with Home */
        margin-bottom: 20px; /* Space from bottom */
    }
</style>
