import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const publishedClient = createClient({ fetch });

	// For settings and navigation, fall back to published content if not in preview
	// This prevents errors when preview ref doesn't include these documents
	let settings, navigation;
	
	try {
		settings = await client.getSingle('settings');
	} catch (error) {
		// If preview ref doesn't have settings, use published content
		settings = await publishedClient.getSingle('settings');
	}

	try {
		navigation = await client.getSingle('navigation');
	} catch (error) {
		// If preview ref doesn't have navigation, use published content
		navigation = await publishedClient.getSingle('navigation');
	}

	return {
		settings,
		navigation
	};
};
