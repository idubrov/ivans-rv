<script context="module">
	import dayjs from 'dayjs';

	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	import TimeSpent from '../lib/components/TimeSpent.svelte';

	export let title;
	export let format;
	export let date;
	export let time;
	export let key;
</script>

<svelte:head>
	{#if format !== 'summary'}
		<title>{title}</title>
	{/if}
</svelte:head>

{#if format === 'summary'}
	<slot />
{:else}
	<article id={key} class="markdown">
		<h1>
			{title}<sup><TimeSpent {time} /></sup>
		</h1>
		<h2>{dayjs.utc(date).format('MMMM D, YYYY')}</h2>
		<section>
			<slot />
		</section>
	</article>
{/if}
