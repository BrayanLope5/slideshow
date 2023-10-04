<script>
	import { mainImageInAnim, bgTheme } from '$lib/utils/stores/stores.js';

	const tranSitionClasses = ['fade-in', 'scale-in', 'slide-in'];

	const bgThemes = ['dark', 'light'];
</script>

<div class="form-control w-full max-w-xs">
	<!-- <label class="label" for="main-photo-transition">
		<span class="label-text">Main photo transition.</span>
	</label>
	<select class="select select-primary" id="main-photo-transition" bind:value={$mainImageInAnim}>
		{#each tranSitionClasses as transitionClass}
			<option>{transitionClass}</option>
		{/each}
	</select> -->

	<label class="label" for="bg-color-selection">
		<span class="label-text">Background color.</span>
	</label>
	<select class="select select-primary" id="bg-color-selection" bind:value={$bgTheme}>
		{#each bgThemes as theme}
			<option>{theme}</option>
		{/each}
	</select>
</div>
