<script lang="ts">
	export let width = '720';
	export let height = '540';
	export let video: string;
	export let title: string;
</script>

<iframe {width} {height} {title} src="https://www.youtube.com/embed/{video}" />
