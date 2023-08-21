<script>
	import { mainImageInAnim } from '$lib/utils/stores/stores.js';

	const tranSitionClasses = ['fade-in', 'scale-in', 'slide-in'];
</script>

<div class="form-control w-full max-w-xs">
	<label class="label">
		<span class="label-text">Main photo transition.</span>
	</label>
	<select class="select select-primary" bind:value={$mainImageInAnim}>
		{#each tranSitionClasses as transitionClass}
			<option>{transitionClass}</option>
		{/each}
	</select>
</div>
