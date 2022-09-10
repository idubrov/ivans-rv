<script lang="ts">
  export let data;
</script>

<svelte:component this={data.current.component} previous={data.previous} next={data.next}/>
