<script>
	import { appWindow } from '@tauri-apps/api/window';
	import { getImageURLs } from '$lib/utils/imagePaths.js';
	import {
		imageURLs,
		imagesPreAndCurr,
		times,
		containerAnim,
		timerIDs,
		isPlaying
	} from '$lib/utils/stores/stores.js';

	let isFullScreen = false;

	const playSlideshow = async () => {
		$isPlaying = true;

		for (const [i, image] of $imageURLs.entries()) {
			if ($isPlaying === false) {
				break;
			}
			$containerAnim = 'fade-in';
			if (i < $imageURLs.length - 1) {
				$imagesPreAndCurr = { currentImage: image, imageToPreload: $imageURLs[i + 1] };
			} else {
				$imagesPreAndCurr = { currentImage: image, imageToPreload: null };
			}

			await new Promise((resolve) => {
				$timerIDs.toOutTrans = setTimeout(resolve, $times.delayTransition * 1000);
			});
			$containerAnim = 'fade-out';
			await new Promise((resolve) => {
				$timerIDs.outTrans = setTimeout(resolve, $times.outTransition * 1000);
			});
		}

		breakSlideshow();
	};

	const breakSlideshow = async () => {
		$isPlaying = false;

		isFullScreen = false;
		await appWindow.setFullscreen(false);

		$imagesPreAndCurr = { currentImage: null, imageToPreload: null };

		$imageURLs = [];
		$containerAnim = null;
		clearTimeout($timerIDs.toOutTrans);
		clearTimeout($timerIDs.outTrans);
		$timerIDs = {
			toOutTrans: null,
			outTrans: null
		};
	};

	const toggleFullScreen = async () => {
		isFullScreen = !isFullScreen;
		await appWindow.setFullscreen(isFullScreen);
	};

	const onKeyDown = async (e) => {
		if (e.key === 'Escape') {
			toggleFullScreen();
		}
	};
</script>

<div class="absolute z-[500] m-2">
	<div class="collapse collapse-arrow bg-base-content/10">
		<input type="checkbox" />
		<div
			class="collapse-title text-xl font-extrabold inline-flex items-center justify-center bg-base-content/10 text-base-content/50"
		>
			Settings
		</div>
		<div class="collapse-content flex flex-col gap-1 bg-base-content/10">
			<button
				class="btn btn-primary"
				on:click={async () => {
					await getImageURLs();
				}}>Select Folder</button
			>

			<button
				class="btn btn-primary"
				on:click={playSlideshow}
				disabled={$isPlaying || $imageURLs.length == false}
				autocomplete="off">Play slideshow</button
			>

			<button class="btn btn-primary" on:click={breakSlideshow}>Stop slideshow</button>

			<button class="btn btn-primary" on:click={toggleFullScreen}>Fullscreen</button>
		</div>
	</div>
</div>

<svelte:window on:keydown={onKeyDown} />
