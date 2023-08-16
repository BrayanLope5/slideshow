import { writable } from 'svelte/store';

// Urls ready to use for images.
export const imageURLs = writable([]);

// URLs to current and image to preload.
export const imagesPreAndCurr = writable({ currentImage: null, imageToPreload: null });

// Times for animations and timers. With default values.
// delayTransition: totDurationPerImage - outTransition,
export const times = writable({
	totDurationPerImage: 7,
	outTransition: 1,
	inTransition: 2,
	delayTransition: 6
});

// Current animation for main container.
export const containerAnim = writable(null);

// The ID of the active timer.
export const timerID = writable(null);
