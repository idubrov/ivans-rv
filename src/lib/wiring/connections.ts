// FIXME: CAN BUS routing (can bus radio)
// FIXME: check if need GAE12
// FIXME: unwired devices?
// FIXME: verify connectivity
// FIXME: length of wires calculator
// FIXME: calculator for occupancy

import { type DeviceName } from './devices';
import { type Route, ROUTES } from './layout';

export type WireGauge =
	| '2x18AWG shielded'
	| '3x18AWG shielded'
	| '3x20AWG shielded'
	| '2x22AWG shielded'
	| '3x22AWG shielded'
	| '2x12AWG twisted'
	| '2x14AWG twisted'
	| '2x18AWG twisted'
	| '2x22AWG twisted'
	| '2x20AWG twisted'
	| '2x22AWG canbus'
	| '18AWG'
	| '22AWG'
	| 'RG400'
	| 'tubing';

export type Connection = {
	description?: string;
	from: DeviceName;
	to: DeviceName;
	routing: Route;
	gauge: WireGauge;
};

export const CONNECTIONS: Record<string, Connection> = {
	// Left wing
	'strpos.lw': {
		description: 'Strobe/position lights wires for the left wingtip',
		from: 'flyleds',
		to: 'strpos.lw',
		gauge: '3x18AWG shielded',
		routing: ROUTES.aft_to_left_wing
	},
	'land.lw': {
		description:
			'Landing wires in the left wing (landing power, landing ground and a taxi light wire)',
		from: 'gad27',
		to: 'land.lw',
		gauge: '2x14AWG twisted',
		routing: ROUTES.panel_to_left_wing
	},
	'land.lw.taxi': {
		description: 'Taxi light for the landing light in the left wing',
		from: 'switches',
		to: 'land.lw',
		gauge: '18AWG',
		routing: ROUTES.panel_to_left_wing
	},
	'gap26.pwr': {
		description: 'Power wire for the GAP 26 heated pitot',
		from: 'switches',
		to: 'gap26',
		gauge: '2x12AWG twisted',
		routing: ROUTES.panel_to_left_wing
	},
	'gap26.pitot': {
		description: 'Pitot tubing (blue) for the GAP 26 pitot tube',
		from: 'gap26',
		to: 'gsu25',
		gauge: 'tubing',
		routing: ROUTES.aft_to_left_wing
	},
	'gap26.pitot.g5': {
		description: 'Split-off the pitot tubing for the G5',
		from: 'gap26',
		to: 'g5',
		gauge: 'tubing',
		routing: ['central', 'f704.l']
	},
	'gap26.aoa': {
		description: 'AOA tubing (red) for the GAP 26 pitot tube',
		from: 'gap26',
		to: 'gsu25',
		gauge: 'tubing',
		routing: [...ROUTES.tunnel_right, ...ROUTES.tunnel_to_left_wing]
	},
	stall: {
		description: 'Stall warning wire',
		// Could connect to GAD27 as well
		from: 'gea24',
		to: 'stall',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_left_wing
	},
	nav1: {
		description: 'Wire for the NAV antenna',
		from: 'gnc215',
		to: 'nav1',
		gauge: 'RG400',
		routing: ROUTES.panel_to_left_wing
	},
	gtp59: {
		description: 'Wire for the GTP 59 OAT probe',
		from: 'gtp59',
		to: 'gsu25',
		gauge: '3x22AWG shielded',
		routing: ROUTES.aft_to_left_wing
	},

	// Right wing
	'strpos.rw': {
		description: 'Strobe/position lights wires for the right wingtip',
		from: 'flyleds',
		to: 'strpos.rw',
		gauge: '3x18AWG shielded',
		routing: ROUTES.aft_to_right_wing
	},
	'land.rw': {
		description:
			'Landing wires in the right wing (landing power, landing ground and a taxi light wire)',
		from: 'gad27',
		to: 'land.rw',
		gauge: '2x14AWG twisted',
		routing: ROUTES.panel_to_right_wing
	},
	'land.rw.taxi': {
		description: 'Taxi light for the landing light in the right wing',
		from: 'switches',
		to: 'land.rw',
		gauge: '18AWG',
		routing: ROUTES.panel_to_right_wing
	},

	'gsa28.roll.pwr': {
		description: 'Power wire for the GSA 28 roll servo',
		from: 'fusebox',
		to: 'gsa28.roll',
		gauge: '2x20AWG twisted',
		routing: ROUTES.panel_to_right_wing
	},
	'gsa28.roll.trim': {
		description: 'Trim input wire for the GSA 28 roll servo',
		from: 'gad27',
		to: 'gsa28.roll',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_wing
	},
	'gsa28.roll.can': {
		description: 'CAN bus for the GSA 28 roll servo',
		from: 'gdu460.right',
		to: 'gsa28.roll',
		gauge: '2x22AWG canbus',
		routing: ROUTES.panel_to_right_wing
	},
	'gsa28.roll.disc': {
		description: 'Autopilot disconnect/CWS for the GSA 28 roll servo',
		from: 'stick.left',
		to: 'gsa28.roll',
		gauge: '22AWG',
		routing: ['f716.l3', 'f716.l4', 'f715.l']
	},
	'gmu11.pwr': {
		description: 'Power for the GMU 11 magnetometer',
		from: 'fusebox',
		to: 'gmu11',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_wing
	},
	'gmu11.can': {
		description: 'CAN bus for the GMU 11 magnetometer',
		from: 'gsa28.roll',
		to: 'gmu11',
		gauge: '2x22AWG canbus',
		routing: []
	},
	'camera.pwr': {
		description: 'Wire for the camera',
		from: 'fusebox',
		to: 'camera',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_wing
	},
	camera: {
		description: 'Video cable for the camera',
		from: 'camera',
		to: 'gdu460.right',
		gauge: 'RG400',
		routing: ROUTES.panel_to_right_wing
	},

	// Central fuselage
	'trim.roll.pwr': {
		description: 'Trim motor output from the GSA 28 roll servo',
		from: 'gsa28.roll',
		to: 'trim.roll',
		gauge: '2x22AWG shielded',
		routing: ROUTES.tunnel_to_right_wing
	},
	'trim.roll.pos': {
		description: 'Trim position sensor wire for the roll trim',
		from: 'trim.roll',
		to: 'gea24',
		gauge: '3x22AWG shielded',
		routing: ['central', 'f704.l']
	},
	'stick.left.gnd': {
		description: 'Ground wire for the left stick',
		from: 'fusebox',
		to: 'stick.left',
		gauge: '22AWG',
		routing: ROUTES.panel_to_left_stick
	},
	'stick.left.ptt': {
		description: 'PTT wire for the left stick',
		from: 'gma245',
		to: 'stick.left',
		gauge: '22AWG',
		routing: ROUTES.panel_to_left_stick
	},
	'stick.left.flaps': {
		description: 'Flaps wire for the left stick',
		from: 'gad27',
		to: 'stick.left',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_left_stick
	},
	'stick.left.pitch': {
		description: 'Pitch trim for the left stick',
		from: 'gad27',
		to: 'stick.left',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_left_stick
	},
	'stick.left.roll': {
		description: 'Roll trim for the left stick',
		from: 'gad27',
		to: 'stick.left',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_left_stick
	},
	'stick.right.gnd': {
		description: 'Ground wire for the right stick',
		from: 'fusebox',
		to: 'stick.right',
		gauge: '22AWG',
		routing: ROUTES.panel_to_right_stick
	},
	'stick.right.ptt': {
		description: 'PTT wire for the right stick',
		from: 'gma245',
		to: 'stick.right',
		gauge: '22AWG',
		routing: ROUTES.panel_to_right_stick
	},
	'stick.right.flaps': {
		description: 'Flaps wire for the right stick',
		from: 'gad27',
		to: 'stick.right',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_stick
	},
	'stick.right.pitch': {
		description: 'Pitch trim for the right stick',
		from: 'gad27',
		to: 'stick.right',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_stick
	},
	'stick.right.roll': {
		description: 'Roll trim for the right stick',
		from: 'gad27',
		to: 'stick.right',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_right_stick
	},
	'flaps.pwr': {
		description: 'Power for the flaps motor',
		from: 'gad27',
		to: 'flaps',
		gauge: '2x18AWG twisted',
		routing: ['central', 'f704.r']
	},
	'flaps.pos': {
		description: 'Position sensor for the flaps',
		from: 'flaps',
		to: 'gea24',
		gauge: '3x22AWG shielded',
		routing: ['central', 'f704.r']
	},
	'gdu.can': {
		description: 'CAN bus between GDU units',
		from: 'gdu460.left',
		to: 'gdu460.right',
		gauge: '2x22AWG canbus',
		routing: []
	},
	'gsu25.can': {
		description: 'CAN bus for the GSU 25 ADAHRS',
		from: 'gdu460.left',
		to: 'gsu25',
		gauge: '2x22AWG canbus',
		routing: ROUTES.panel_to_aft_left
	},
	'gsu25.pwr': {
		description: 'Power for the GSU 25 ADAHRS',
		from: 'fusebox',
		to: 'gsu25',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_aft_right
	},
	'gsu25.static': {
		description: 'Static pressure line for the GSU 25 ADAHRS',
		from: 'static',
		to: 'gsu25',
		gauge: 'tubing',
		routing: []
	},
	'gsa28.pitch.pwr': {
		description: 'Power for the GSA 28 pitch servo',
		from: 'fusebox',
		to: 'gsa28.pitch',
		gauge: '2x20AWG twisted',
		routing: ROUTES.panel_to_aft_right
	},
	'gsa28.pitch.trim': {
		description: 'Trim input wire for the GSA 28 pitch servo',
		from: 'gad27',
		to: 'gsa28.pitch',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_aft_right
	},
	'gsa28.pitch.can': {
		description: 'CAN bus for the GSA 28 pitch servo',
		from: 'gsu25',
		to: 'gsa28.pitch',
		gauge: '2x22AWG canbus',
		routing: []
	},
	'gsa28.pitch.disc': {
		description: 'Autopilot disconnect/CWS for the GSA 28 pitch servo',
		from: 'stick.left',
		to: 'gsa28.pitch',
		gauge: '22AWG',
		routing: ['f716.l1', 'f716.l2', ...ROUTES.tunnel_left]
	},
	beacon: {
		description: 'Vertical stabilizer beacon',
		from: 'switches',
		to: 'beacon',
		gauge: '2x22AWG twisted',
		routing: ROUTES.panel_to_aft_right
	},
	artex345: {
		description: 'ELT switch wires',
		from: 'fusebox',
		to: 'artex345',
		gauge: '3x22AWG shielded',
		routing: ROUTES.panel_to_aft_right
	},
	tail: {
		description: 'Tail light',
		from: 'flyleds',
		to: 'tail',
		gauge: '2x18AWG shielded',
		routing: []
	},
	'trim.pitch.pwr': {
		description: 'Trim motor output from the GSA 28 pitch servo',
		from: 'gsa28.pitch',
		to: 'trim.pitch',
		gauge: '2x22AWG shielded',
		routing: []
	},
	'trim.pitch.pos': {
		description: 'Trim position sensor wire for the pitch trim',
		from: 'trim.pitch',
		to: 'gea24',
		gauge: '3x22AWG shielded',
		routing: ROUTES.panel_to_aft_right
	},
	'flyleds.pos': {
		description: 'Flyleds position power',
		from: 'switches',
		to: 'flyleds',
		gauge: '18AWG',
		routing: ROUTES.panel_to_aft_left
	},
	'flyleds.strobe': {
		description: 'Flyleds strobe power',
		from: 'switches',
		to: 'flyleds',
		gauge: '18AWG',
		routing: ROUTES.panel_to_aft_left
	},
	'fuel.left': {
		description: 'Left fuel tank sensor',
		from: 'fuel.left',
		to: 'gea24',
		gauge: '2x22AWG twisted',
		// FIXME: don't need to cross F-704?
		routing: ROUTES.panel_to_left_wing
	},
	'fuel.right': {
		description: 'Right fuel tank sensor',
		from: 'fuel.right',
		to: 'gea24',
		gauge: '2x22AWG twisted',
		// FIXME: don't need to cross F-704?
		routing: ROUTES.panel_to_right_wing
	}
};
