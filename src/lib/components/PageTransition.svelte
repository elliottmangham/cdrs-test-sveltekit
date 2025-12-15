<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';

	interface PageTransitionProps {
		pathname: string;
		children: Snippet;
		duration?: number;
		enterY?: number;
		exitY?: number;
		delay?: number;
	}

	const {
		pathname,
		children,
		duration = 300,
		enterY = 50,
		exitY = -50,
		delay = duration + 100
	}: PageTransitionProps = $props();

	// Check for reduced motion preference
	let prefersReducedMotion = false;
	if (typeof window !== 'undefined') {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// Transition options - fly transition handles opacity automatically
	const transitionIn = {
		easing: cubicOut,
		y: prefersReducedMotion ? 0 : enterY,
		duration: prefersReducedMotion ? 0 : duration,
		delay: prefersReducedMotion ? 0 : delay
	};

	const transitionOut = {
		easing: cubicIn,
		y: prefersReducedMotion ? 0 : exitY,
		duration: prefersReducedMotion ? 0 : duration
	};
</script>

{#key pathname}
	<div in:fly={transitionIn} out:fly={transitionOut}>
		{@render children()}
	</div>
{/key}
