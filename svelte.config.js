import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// TODO: make it compatible with edge
			runtime: 'nodejs20.x',
			regions: ['iad1']
		})
	}
};

export default config;
