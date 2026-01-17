<script>
	import Home from '$lib/Home.svelte';
	import Listening from '$lib/Listening.svelte';

	export let data;
	export let form;

	let currentView = 'home';

	function handleChangeView(event) {
		currentView = event.detail;
	}
</script>

{#if currentView === 'home'}
	<Home on:changeView={handleChangeView} />
{:else if currentView === 'listening'}
	<Listening on:changeView={handleChangeView} />
{/if}
