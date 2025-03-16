import type { DeviceName } from '$lib/wiring/devices';

export type ChokePoint = {
	description: string;
};

export type ChokePointName = keyof typeof CHOKEPOINTS;
export type Route = readonly ChokePointName[];

export const CHOKEPOINTS = {
	'f704.l': {
		description: 'Left snap bushing (in the center) on the F-704 bulkhead'
	},
	'f704.r': {
		description: 'Right snap bushing (in the center) on the F-704 bulkhead'
	},
	'f704.ol': {
		description: 'Left snap bushing (outer) on the F-704 bulkhead'
	},
	'f704.or': {
		description: 'Right snap bushing (outer) on the F-704 bulkhead'
	},
	'f705.l': {
		description: 'Left snap bushing on the F-705 bulkhead'
	},
	'f705.r': {
		description: 'Right snap bushing on the F-705 bulkhead'
	},
	'f706.l': {
		description: 'Left snap bushing on the F-706 bulkhead'
	},
	'f706.r': {
		description: 'Right snap bushing on the F-706 bulkhead'
	},
	'f715.l': {
		description: 'Snap bushing on the left seat rib F-715'
	},
	'f715.r': {
		description: 'Snap bushing on the right seat rib F-715'
	},
	'f716.l1': {
		description: 'Snap bushing on the first (from the center) left seat rib F-716 (access seat rib)'
	},
	'f716.l2': {
		description:
			'Snap bushing on the second (from the center) left seat rib F-716 (inboard seat rib)'
	},
	'f716.l3': {
		description:
			'Snap bushing on the third (from the center) left seat rib F-716 (outboard seat rib)'
	},
	'f716.l4': {
		description:
			'Snap bushing on the fourth (from the center) left seat rib F-716 (outboard seat rib)'
	},
	'f716.r1': {
		description:
			'Snap bushing on the first (from the center) right seat rib F-716 (access seat rib)'
	},
	'f716.r2': {
		description:
			'Snap bushing on the second (from the center) right seat rib F-716 (inboard seat rib)'
	},
	'f716.r3': {
		description:
			'Snap bushing on the third (from the center) right seat rib F-716 (outboard seat rib)'
	},
	'f716.r4': {
		description:
			'Snap bushing on the fourth (from the center) right seat rib F-716 (outboard seat rib)'
	},
	lw: {
		description: 'Left wing (as a unit)'
	},
	rw: {
		description: 'Right wing (as a unit)'
	},
	central: {
		description: 'Central tunnel (under the fuel pumps)'
	},
	'f782.l': {
		description: 'Electrical snap bushing on the left F-782-L cover support rib'
	},
	'f782.r': {
		description: 'Electrical snap bushing on the right F-782-R cover support rib'
	},
	'f783.l': {
		description: 'Electrical snap bushing on the left F-783-L cover support rib'
	},
	'f783.r': {
		description: 'Electrical snap bushing on the right F-783-R cover support rib'
	}
} satisfies Record<string, ChokePoint>;

// Some standard routes

const tunnel_left: Route = ['f705.l', 'f706.l'];
const tunnel_right: Route = ['f705.r', 'f706.r'];
const tunnel_to_left_wing: Route = ['f716.l1', 'f716.l2', 'f716.l3', 'f716.l4', 'f715.l', 'lw'];
const tunnel_to_right_wing: Route = ['f716.r1', 'f716.r2', 'f716.r3', 'f716.r4', 'f715.r', 'rw'];
const aft_to_left_wing: Route = [...tunnel_left, ...tunnel_to_left_wing];
const aft_to_right_wing: Route = [...tunnel_right, ...tunnel_to_right_wing];
const panel_to_left_stick: Route = ['central', 'f704.l', 'f716.l1', 'f716.l2'];
const panel_to_right_stick: Route = ['central', 'f704.r', 'f716.r1', 'f716.r2'];
const panel_to_aft_left: Route = ['central', ...tunnel_left];
const panel_to_aft_right: Route = ['central', ...tunnel_right];
const panel_to_left_wing: Route = ['central', 'f783.l', 'f782.l', 'lw'];
const panel_to_right_wing: Route = ['central', 'f783.r', 'f782.r', 'rw'];

export const ROUTES = {
	tunnel_left,
	tunnel_right,
	tunnel_to_left_wing,
	tunnel_to_right_wing,
	aft_to_left_wing,
	aft_to_right_wing,
	panel_to_left_stick,
	panel_to_right_stick,
	panel_to_aft_left,
	panel_to_aft_right,
	panel_to_left_wing,
	panel_to_right_wing,
} satisfies Record<string, Route>;

export type Point = ChokePointName | DeviceName;


const connectivity: [Point, Point][] = [
	['f715.l', 'f716.l1'],
	['f716.l1', 'f716.l2'],
	['f716.l2', 'f716.l3'],
	['f716.l3', 'f716.l4'],
	['f715.r', 'f716.r1'],
	['f716.r1', 'f716.r2'],
	['f716.r2', 'f716.r3'],
	['f716.r3', 'f716.r4']
	// FIXME: ...
];
