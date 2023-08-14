<script>
	import { appWindow } from '@tauri-apps/api/window';
	import { getImageURLs } from '$lib/utils/imagePaths.js';
	import { imageURLs, imagesPreAndCurr, times, containerAnim } from '$lib/utils/stores/stores.js';

	let stopSlideshow = false;
	let isFullScreen = false;

	const playSlideshow = async () => {
		if (stopSlideshow === true) {
			stopSlideshow = false;
		}

		for (const [i, image] of $imageURLs.entries()) {
			if (stopSlideshow === true) {
				break;
			}
			$containerAnim = 'fade-in';
			if (i < $imageURLs.length - 1) {
				$imagesPreAndCurr = { currentImage: image, imageToPreload: $imageURLs[i + 1] };
			} else {
				$imagesPreAndCurr = { currentImage: image, imageToPreload: null };
			}
			await new Promise((r) => setTimeout(r, $times.delayTransition * 1000));
			$containerAnim = 'fade-out';
			await new Promise((r) => setTimeout(r, $times.outTransition * 1000));
		}

		breakSlideshow();
	};

	const breakSlideshow = async () => {
		stopSlideshow = true;

		$imagesPreAndCurr = { currentImage: null, imageToPreload: null };
		isFullScreen = false;
		await appWindow.setFullscreen(false);
		$imageURLs = [];

		$containerAnim = null;
	};

	const toggleFullScreen = async () => {
		isFullScreen = !isFullScreen;
		await appWindow.setFullscreen(isFullScreen);
	};
</script>

<div class="flex flex-col gap-1 absolute z-[500] p-2">
	<button
		class="btn btn-primary"
		on:click={async () => {
			await getImageURLs();
		}}>Select Folder</button
	>

	<button class="btn btn-primary" on:click={playSlideshow}>Play slideshow</button>

	<button class="btn btn-primary" on:click={breakSlideshow}>Stop slideshow</button>

	<button class="btn btn-primary" on:click={toggleFullScreen}>Fullscreen</button>
</div>
