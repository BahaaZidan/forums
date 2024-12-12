import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		hostname: event.url.hostname
	};
};
