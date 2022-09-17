<script lang="ts">
	export let data;
</script>

<svelte:component this={data.currentComponent} previous={data.previous} next={data.next} />
