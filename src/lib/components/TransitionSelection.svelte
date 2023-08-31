<script>
	import { mainImageInAnim } from '$lib/utils/stores/stores.js';

	const tranSitionClasses = ['fade-in', 'scale-in', 'slide-in'];
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="main-photo-transition">
		<span class="label-text">Main photo transition.</span>
	</label>
	<select class="select select-primary" id="main-photo-transition" bind:value={$mainImageInAnim}>
		{#each tranSitionClasses as transitionClass}
			<option>{transitionClass}</option>
		{/each}
	</select>
</div>
