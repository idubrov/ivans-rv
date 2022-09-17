<script>
	export let data;

	import 'ress/dist/ress.min.css';
	import '$lib/styles/main.scss';
	import MainMenu from '$lib/components/MainMenu.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
</script>

<svelte:head>
	<title>Ivan's RV-7</title>
</svelte:head>

<header class="main">Ivan's RV-7</header>
<main>
	<slot />
</main>
<MainMenu />
<SideMenu
	categories={data.categories}
	tags={data.tags}
	recent={data.recent}
	searchIndex={data.searchIndex}
/>
