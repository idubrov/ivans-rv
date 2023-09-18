<script lang="ts">
	export let data: any;
</script>

<svelte:component this={data.component} previous={data.previous} next={data.next} />
