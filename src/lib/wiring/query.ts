import { type ChokePointName } from './layout';
import { type WireGauge, CONNECTIONS } from './connections';
import bundlesRaw from './bundles.json';
import { CABLES } from '$lib/wiring/cables';

const BUNDLES: Bundles = bundlesRaw;

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

/** Mapping from a bundle name to a list of signals. */
export type Bundles = Record<string, string[]>;

export type CableInfo = {
	name: string;
	gauge: WireGauge;
};

export type BundleSummary = {
	bundle: string;
	cable: CableInfo[];
};

/**
 * The idea is to decompose a bundle (generated from KiCAD schematic) into a list of cables that
 * this bundle consists of.
 */
export function queryWireBundles(): BundleSummary[] {
	return Object.entries(BUNDLES).map(([bundle, signals]) => ({
		bundle,
		cable: decomposeBundle(signals)
	}));
}

function decomposeBundle(signals: string[]): CableInfo[] {
	signals = [...signals];
	const info: CableInfo[] = [];
	while (signals.length > 0) {
		const signal = signals[0];
		const cable = CABLES.find((cable) => cable.signals.every((signal) => signals.includes(signal)));
		if (!cable) {
			throw new Error(`Failed to find cable for a signal ${signal}, remaning signals: ${signals}`);
		}
		signals = signals.filter((signal) => !cable.signals.includes(signal));
		info.push({
			name: cable.name,
			gauge: cable.gauge
		});
	}
	return info;
}

function includesCable(signals: string[], signals2: string[]) {
	return undefined;
}
