import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // Updated import path

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()], // Changed to array

	kit: {
		adapter: adapter({
            fallback: 'index.html' // Set fallback for SPA behavior
        })
	}
};

export default config;
