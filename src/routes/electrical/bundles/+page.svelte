<script context="module" lang="ts">
	import { queryWireBundles } from '$lib/wiring/query';

	const wiresByChokepoints = queryWireBundles();
</script>

<article class="standalone">
	<section>
		<p>Wire bundles:</p>
		<table>
			<thead>
				<tr>
					<th>Bundle name</th>
					<th>Wires</th>
				</tr>
			</thead>
			<tbody>
				{#each wiresByChokepoints as { bundle, cable }}
					<tr>
						<td>{bundle}</td>
						<td>
							<ul>
								{#each cable as { name, gauge }}
									<li>{name}: {gauge}</li>
								{/each}
							</ul>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</article>
