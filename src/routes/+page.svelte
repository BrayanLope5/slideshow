<script>
	import Controls from '$lib/components/Controls.svelte';
	import {
		imageURLs,
		isPlaying,
		imagesPreAndCurr,
		times,
		containerAnim,
		mainImageInAnim,
		bgTheme
	} from '$lib/utils/stores/stores';
	import defaultImage from '$lib/assets/images/default_image.jpg';

	let bgColor = 'rgb(2 6 23)';
	$: if ($bgTheme == 'dark') {
		bgColor = 'rgb(2 6 23)';
	} else {
		bgColor = 'rgb(226 232 240)';
	}

	$: if ($imageURLs.length === 0) {
		$imagesPreAndCurr = { currentImage: defaultImage, imageToPreload: null };
	} else if ($imageURLs.length > 0 && !$isPlaying) {
		$imagesPreAndCurr = { currentImage: defaultImage, imageToPreload: $imageURLs[0] };
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={$imagesPreAndCurr.imageToPreload} />
</svelte:head>

<Controls />

{#key $imagesPreAndCurr.currentImage}
	<div class="bg absolute inset-0 z-[-501] pointer-events-none select-none" style="--bgColor: {bgColor};" />
	<div
		class="relative top-0 left-0 overflow-clip overflow-y-clip pointer-events-none select-none {$containerAnim}"
		style="--inTime: {$times.inTransition}s; --outTime:{$times.outTransition}s; --delayTime: {$times.delayTransition}s; --mainImageInTime: {$times.mainImageInTrans}s;"
	>
		<img
			class="z-[-500] object-cover absolute inset-0 m-auto min-w-full min-h-full blur pointer-events-none scale-110"
			alt="background"
			src={$imagesPreAndCurr.currentImage}
		/>

		<div class="h-[100vh] w-[100vw] flex justify-center items-center">
			<img
				class="object-contain max-h-[93vh] max-w-[93vw] p-8 bg-slate-100 bg-clip-padding shadow-xl shadow-black {$mainImageInAnim}"
				alt="main"
				src={$imagesPreAndCurr.currentImage}
			/>
		</div>
	</div>
{/key}

<style lang="postcss">
	.bg {
		background-color: var(--bgColor);
	}
	@keyframes scaleIn {
		0% {
			transform: scale3d(0.5, 0.5, 1);
		}
		100% {
			transform: scale3d(1, 1, 1);
		}
	}

	.scale-in {
		animation-name: scaleIn;
		animation-duration: var(--mainImageInTime);
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}

	@keyframes slideIn {
		0% {
			transform: translate(-100%, 0) scale3d(0, 0, 1);
		}
		100% {
			transform: translate(0, 0) scale3d(1, 1, 1);
		}
	}

	.slide-in {
		animation-name: slideIn;
		animation-duration: var(--mainImageInTime);
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.fade-in {
		animation-name: fadeIn;
		animation-duration: var(--inTime);
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.fade-out {
		animation-name: fadeOut;
		animation-duration: var(--outTime);
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
	}
</style>
