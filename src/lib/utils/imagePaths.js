import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';

let selectedDir = null;
let imageURLs = [];

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
		console.log(selectedDir);
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
				// If entry is a file/image, convert it's path to url source and push image URL to array.
				imageURLs.push(convertFileSrc(entry.path));
			}
		}
		return imageURLs;
	};

	// Reads the selectedDir directory recursively.
	const entries = await readDir(selectedDir, { recursive: true });

	return processEntries(entries);
};
