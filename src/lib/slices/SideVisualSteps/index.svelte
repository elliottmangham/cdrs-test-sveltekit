<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicImage, type SliceComponentProps } from '@prismicio/svelte';
	import PrismicRichText from '$lib/components/PrismicRichText.svelte';

	type Props = SliceComponentProps<Content.SideVisualStepsSlice>;

	const { slice }: Props = $props();
</script>

<section class="bg-white">
	<div class="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
		<!-- Left side: Visual/Image -->
		<div class="order-2 md:order-1 relative min-h-[400px] md:min-h-0">
			{#if isFilled.image(slice.primary.visual)}
				<PrismicImage
					field={slice.primary.visual}
					sizes="(max-width: 768px) 100vw, 50vw"
					class="absolute inset-0 w-full h-full object-cover"
				/>
			{/if}
		</div>

		<!-- Right side: Title and Steps -->
		<div
			class="order-1 md:order-2 flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16 xl:px-20 md:py-20 lg:py-24"
		>
			{#if isFilled.richText(slice.primary.main_title)}
				<div class="mb-12 md:mb-16 lg:mb-20">
					<div
						class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[-0.02em] leading-[0.9] text-slate-900"
					>
						<PrismicRichText field={slice.primary.main_title} />
					</div>
				</div>
			{/if}

			{#if isFilled.group(slice.primary.steps)}
				<ol class="space-y-10 md:space-y-12 lg:space-y-14">
					{#each slice.primary.steps as step, index (step.step_title || index)}
						<li class="flex gap-5 md:gap-6">
							{#if isFilled.image(step.icon)}
								<div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-start pt-0.5">
									<PrismicImage field={step.icon} class="w-full h-full object-contain" />
								</div>
							{/if}
							<div class="flex-1 space-y-2 md:space-y-3">
								{#if step.step_title}
									<h3 class="text-xl md:text-2xl font-bold leading-tight text-blue-600">
										{index + 1}. {step.step_title}
									</h3>
								{/if}
								{#if isFilled.richText(step.step_description)}
									<div class="text-base md:text-lg text-slate-600 leading-relaxed">
										<PrismicRichText field={step.step_description} />
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			{/if}
		</div>
	</div>
</section>
