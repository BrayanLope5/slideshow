<script>
	import { appWindow } from '@tauri-apps/api/window';
	import { open } from '@tauri-apps/api/dialog';
	import { readDir } from '@tauri-apps/api/fs';
	import { convertFileSrc } from '@tauri-apps/api/tauri';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';

	let currentImage = null;
	let selectedDir = null;
	let imageToPreload = null;
	let stopSlideshow = false;
	let isFullScreen = false;
	let imageURLs = [];

	// All times are in seconds.
	let totDurationPerImage = 7;
	let outTransition = 1;
	let inTransition = 2;
	let delayTransition = totDurationPerImage - outTransition;

	let containerAnimation = null;

	// Open a selection dialog for directories
	const selectDir = async () => {
		selectedDir = await open({
			directory: true,
			multiple: false
		});

		if (selectedDir === null) {
			// user cancelled the selection
			console.log('User did not select a directory');
		} else {
			// user selected a single directory
			console.log(selectedDir);
			getImagePaths();
		}
	};

	// Get list of files from selected dir.
	const getImagePaths = async () => {
		// Define function before being called.
		const processEntries = (entries) => {
			for (const entry of entries) {
				if (entry.children) {
					// If entry is a directory, call this function again.
					processEntries(entry.children);
				} else {
					// If entry is a file/image, convert it's path to url source and push image URL to array.
					imageURLs.push(convertFileSrc(entry.path));
				}
			}
		};

		// Reads the selectedDir directory recursively.
		const entries = await readDir(selectedDir, { recursive: true });

		processEntries(entries);
	};

	const playSlideshow = async () => {
		if (stopSlideshow === true) {
			stopSlideshow = false;
		}

		for (const [i, image] of imageURLs.entries()) {
			if (stopSlideshow === true) {
				break;
			}
			containerAnimation = 'fade-in';
			currentImage = image;
			if (i < imageURLs.length - 1) {
				imageToPreload = imageURLs[i + 1];
			}
			await new Promise((r) => setTimeout(r, delayTransition * 1000));
			containerAnimation = 'fade-out';
			await new Promise((r) => setTimeout(r, outTransition * 1000));
		}

		breakSlideshow();
	};

	const breakSlideshow = async () => {
		stopSlideshow = true;

		currentImage = null;
		selectedDir = null;
		imageToPreload = null;
		isFullScreen = false;
		await appWindow.setFullscreen(false);
		imageURLs = [];

		containerAnimation = null;
	};

	const toggleFullScreen = async () => {
		isFullScreen = !isFullScreen;
		await appWindow.setFullscreen(isFullScreen);
	};
</script>

<svelte:head>
	<link rel="preload" as="image" href={imageToPreload} />
</svelte:head>

<div class="flex flex-col gap-1 absolute z-[500] p-2">
	<button class="btn btn-primary" on:click={selectDir}>Select Folder</button>

	<button class="btn btn-primary" on:click={playSlideshow}>Play slideshow</button>

	<button class="btn btn-primary" on:click={breakSlideshow}>Stop slideshow</button>

	<button class="btn btn-primary" on:click={toggleFullScreen}>Fullscreen</button>
</div>

{#key currentImage}
	<div
		class="relative top-0 left-0 overflow-clip overflow-y-clip {containerAnimation}"
		style="--inTime:{inTransition}s; --outTime:{outTransition}s; --delayTime: {delayTransition}s"
	>
		<img
			class="z-[-500] object-cover absolute inset-0 m-auto min-w-full min-h-full blur pointer-events-none scale-110"
			alt="test2"
			src={currentImage}
		/>

		<div class="h-[100vh] w-[100vw] flex justify-center items-center">
			<img
				class="object-contain max-h-[93vh] max-w-[93vw] p-8 bg-slate-100 bg-clip-padding shadow-xl shadow-black scale-in"
				alt="test2"
				src={currentImage}
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
		animation-duration: 4.5s;
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

	.will-change-opacity {
		will-change: opacity;
	}

	.will-change-transform {
		will-change: transform;
	}
</style>
