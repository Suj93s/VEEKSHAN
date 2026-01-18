<script>
	import Home from '$lib/Home.svelte';
	import Listening from '$lib/Listening.svelte';
	import { mediaRecorderStore } from '$lib/stores/mediaRecorderStore';

	export let data;
	export let form;

	let currentView = 'home';

	function handleChangeView(event) {
		currentView = event.detail;
	}

	async function startRecordingAndSwitchView() {
		console.log('+page.svelte: Attempting to start recording and switch view.');
		await mediaRecorderStore.startRecording();
		console.log('+page.svelte: Recording started (or attempted). Switching view.');
		currentView = 'listening';
	}
</script>

{#if currentView === 'home'}
	<Home on:changeView={handleChangeView} startRecording={startRecordingAndSwitchView} />
{:else if currentView === 'listening'}
	<Listening on:changeView={handleChangeView} />
{/if}
