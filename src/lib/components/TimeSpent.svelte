<script lang="ts">
	export let time: number | undefined;
</script>

{#if time}
	<img class="timer" src="/timer.svg" alt="Timer icon" style="width: 16px; height: 16px;" />{time}h
{/if}
