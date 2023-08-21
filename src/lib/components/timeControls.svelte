<script>
	import { times } from '$lib/utils/stores/stores.js';

	$: $times.delayTransition = $times.totDurationPerImage - $times.inTransition;

	let timeIsValid = true;
	$: {
		let minTotTime1 = $times.inTransition + $times.outTransition;
		let minTotTime2 = $times.inTransition + $times.mainImageInTrans;

		if ($times.totDurationPerImage < minTotTime1 || $times.totDurationPerImage < minTotTime2) {
			timeIsValid = false;
		} else {
			timeIsValid = true;
		}
	}
</script>

{#if !timeIsValid}
	<div class="alert alert-error animate-pulse font-bold">
		<span>Duration per image is too short.</span>
	</div>
{/if}

<div class="form-control w-full max-w-xs">
	<label for="totalTimePerImage" class="label">
		<span class="label-text font-semibold">Duration per image.</span>
	</label>
	<input
		type="number"
		id="totalTimePerImage"
		bind:value={$times.totDurationPerImage}
		min="1.0"
		max="25.0"
		class="input input-bordered input-primary input-sm text-xl"
		step="0.5"
	/>
</div>

<div class="form-control w-full max-w-xs">
	<label for="inTransitionTime" class="label">
		<span class="label-text font-semibold">In transition duration.</span>
	</label>
	<input
		type="number"
		id="inTransitionTime"
		bind:value={$times.inTransition}
		min="1.0"
		max="25.0"
		class="input input-bordered input-primary input-sm text-xl"
		step="0.5"
	/>
</div>

<div class="form-control w-full">
	<label for="outTransitionTime" class="label">
		<span class="label-text font-semibold">Out transition duration.</span>
	</label>
	<input
		type="number"
		id="outTransitionTime"
		bind:value={$times.outTransition}
		min="1.0"
		max="25.0"
		class="input input-bordered input-primary input-sm text-xl"
		step="0.5"
	/>
</div>

<div class="form-control">
	<label for="mainImgInTransTime" class="label">
		<span class="label-text font-semibold">Main image in transition time.</span>
	</label>
	<input
		type="number"
		id="mainImgInTransTime"
		bind:value={$times.mainImageInTrans}
		min="1.0"
		max="25.0"
		class="input input-bordered input-primary input-sm text-xl"
		step="0.5"
	/>
</div>
