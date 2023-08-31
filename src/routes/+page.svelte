<script>
	import Controls from '$lib/components/Controls.svelte';
	import {
		imagesPreAndCurr,
		times,
		containerAnim,
		mainImageInAnim
	} from '$lib/utils/stores/stores';
</script>

<svelte:head>
	<link rel="preload" as="image" href={$imagesPreAndCurr.imageToPreload} />
</svelte:head>

<Controls />

{#key $imagesPreAndCurr.currentImage}
	<div
		class="relative top-0 left-0 overflow-clip overflow-y-clip {$containerAnim}"
		style="--inTime: {$times.inTransition}s; --outTime:{$times.outTransition}s; --delayTime: {$times.delayTransition}s; --mainImageInTime: {$times.mainImageInTrans}s"
	>
		<img
			class="z-[-500] object-cover absolute inset-0 m-auto min-w-full min-h-full blur pointer-events-none scale-110"
			alt="test2"
			src={$imagesPreAndCurr.currentImage}
		/>

		<div class="h-[100vh] w-[100vw] flex justify-center items-center">
			<img
				class="object-contain max-h-[93vh] max-w-[93vw] p-8 bg-slate-100 bg-clip-padding shadow-xl shadow-black {$mainImageInAnim}"
				alt="test2"
				src={$imagesPreAndCurr.currentImage}
			/>
		</div>
	</div>
{/key}

<style lang="postcss">
	@keyframes scaleIn {
		0% {
			transform: scale3d(0, 0, 0);
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

	@keyframes scaleIn {
		0% {
			transform: scale3d(0, 0, 0);
		}
		100% {
			transform: scale3d(1, 1, 1);
		}
	}

	.slide-in {
		animation-name: slideIn;
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

	.will-change-opacity {
		will-change: opacity;
	}

	.will-change-transform {
		will-change: transform;
	}
</style>
