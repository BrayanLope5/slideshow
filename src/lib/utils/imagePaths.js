import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { imageURLs } from '$lib/utils/stores/stores';

let selectedDir = null;

// Open a selection dialog for directories
export const getImageURLs = async () => {
	selectedDir = await open({
		directory: true,
		multiple: false
	});

	if (selectedDir === null) {
		// user cancelled the selection
		console.log('User did not select a directory');
		return null;
	} else {
		// user selected a single directory
		return getImagePaths();
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
				// If entry is a file/image, convert it's path to url source and update image URL to array.
				imageURLs.update((URLs) => [...URLs, convertFileSrc(entry.path)]);
			}
		}
	};

	// Reads the selectedDir directory recursively.
	const entries = await readDir(selectedDir, { recursive: true });
	processEntries(entries);
};
