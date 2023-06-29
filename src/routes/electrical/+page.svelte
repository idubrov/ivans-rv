<script context="module" lang="ts">
  import {queryWiresByChokepoints} from "$lib/wiring";

  const wiresByChokepoints = queryWiresByChokepoints();
</script>

<article class="standalone">

    <section>
        <p>Wires by chokepoints:
        <table>
            <thead>
            <tr>
                <th>Chokepoint</th>
                <th>Wires</th>
            </tr>
            </thead>
            <tbody>
            {#each wiresByChokepoints as {chokepoint, gauges}}
                <tr>
                    <td>{chokepoint}</td>
                    <td>
                        <ul>
                            {#each gauges as { gauge, count }}
                                <li>{gauge}: {count}</li>
                            {/each}
                        </ul>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </section>
</article>
