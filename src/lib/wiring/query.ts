import { type ChokePointName } from './layout';
import { type WireGauge, CONNECTIONS } from './connections';

export type GaugeInfo = {
	gauge: WireGauge;
	count: number;
};

export type ChokePointSummary = {
	chokepoint: ChokePointName;
	gauges: GaugeInfo[];
};

/**
 * Returns a summary of the chokepoints in the wiring.
 */
export function queryWiresByChokepoints(): ChokePointSummary[] {
	type ChokePointSummaryTemp = {
		chokepoint: ChokePointName;
		gauges: Partial<Record<WireGauge, number>>;
	};

	const chokepoints: Record<string, ChokePointSummaryTemp> = {};
	Object.values(CONNECTIONS).forEach((conn) => {
		[...new Set(conn.routing)].forEach((chkName) => {
			chokepoints[chkName] = chokepoints[chkName] ?? {
				chokepoint: chkName,
				gauges: {}
			};
			const chokepoint = chokepoints[chkName];
			chokepoint.gauges[conn.gauge] = (chokepoint.gauges[conn.gauge] ?? 0) + 1;
		});
	});
	return Object.values(chokepoints)
		.sort((a, b) => a.chokepoint.localeCompare(b.chokepoint))
		.map(({ chokepoint, gauges }) => ({
			chokepoint,
			gauges: Object.entries(gauges)
				.map(([gauge, count]: [string, number]) => ({ gauge: gauge as WireGauge, count }))
				.sort((a, b) => a.gauge.localeCompare(b.gauge))
		}));
}
