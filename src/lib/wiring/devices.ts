export type Device = {
	description: string;
	// If device needs to be connected to the CAN BUS
	canbus?: true;
};

export type DeviceName = keyof typeof DEVICES;

export const DEVICES = {
	flyleds: {
		description: 'Flyleds controller'
	},
	'strpos.lw': {
		description: 'Flyleds original lights left wing'
	},
	'strpos.rw': {
		description: 'Flyleds original lights right wing'
	},
	'land.lw': {
		description: 'Flyleds landing light left wing'
	},
	'land.rw': {
		description: 'Flyleds landing light right wing'
	},
	tail: {
		description: 'Flyleds tail beacon'
	},
	beacon: {
		description: 'Vertical stabilizer beacon'
	},
	'gsa28.pitch': {
		description: 'Pitch servo',
		canbus: true,
	},
	'gsa28.roll': {
		description: 'Roll servo',
		canbus: true,
	},
	'trim.pitch': {
		description: 'Pitch trim servo'
	},
	'trim.roll': {
		description: 'Roll trim servo'
	},
	artex345: {
		description: 'Artex 345 ELT'
	},
	gap26: {
		description: 'Garmin GAP 26 heated pitot tube'
	},
	gsu25: {
		description: 'Garmin GSU 25 ADAHRS',
		canbus: true,
	},
	// FIXME: also, acts as a GPS source for GTX 45R?
	gtn650xi: {
		description: 'Garmin 650Xi GPS/NAV/COMM/MFD',
	},
	gtx45r: {
		description: 'Garmin GTX 45r Transponder',
	},
	g5: {
		description: 'Garmin G5',
		canbus: true,
	},
	gmc507: {
		description: 'Garmin Autopilot Control',
		canbus: true,
	},
	stall: {
		description: 'OP-46 stall warner'
	},
	nav1: {
		description: 'Archer NAV antenna in the wingtip'
	},
	com1: {
		description: 'DM C63-2 COM1 antenna'
	},
	com2: {
		description: 'DM C63-2 COM2 antenna'
	},
	gtp59: {
		description: 'Garmin GTP 59 temperature probe'
	},
	gad27: {
		description: 'Garmin GAD 27 electronic adapter unit',
		canbus: true,
	},
	// FIXME: only needed if using an actual navigator GTN 650
	gad29: {
		description: 'ARINC 429 interface',
		canbus: true,
	},
	gmu11: {
		description: 'Garmin GMU 11 magnetometer',
		canbus: true,
	},
	'stick.left': {
		description: 'Left control stick (pilot)'
	},
	'stick.right': {
		description: 'Right control stick (copilot)'
	},
	camera: {
		description: 'Reverse camera (under the wing)'
	},
	gea24: {
		description: 'Garmin GEA 24 engine indication system',
		canbus: true,
	},
	gma245: {
		description: 'Garmin GMA 245 audio panel',
		canbus: true,
	},
	flaps: {
		description: 'Flaps motor'
	},
	switches: {
		description: 'Panel switches'
	},
	// FIXME: if not using GTN 650Xi?
	gnc215: {
		description: 'Garmin GNC 215 COM/NAV radio',
	},
	gtr205: {
		description: 'Garmin GTR 205A COM radio',
		canbus: true,
	},
	'gdu460.left': {
		description: 'Garmin GDU 460 left display',
		canbus: true,
	},
	'gdu460.right': {
		description: 'Garmin GDU 460 right display',
		canbus: true,
	},
	gha15: {
		description: 'Garmin height advisor (?)',
		canbus: true,
	},
	fusebox: {
		description: 'Fuse box'
	},
	static: {
		description: 'Static port'
	},
	'fuel.left': {
		description: 'Left fuel tank sensor'
	},
	'fuel.right': {
		description: 'Right fuel tank sensor'
	},
	'lemo.left': {
		description: 'Left LEMO connector'
	},
	'lemo.right': {
		description: 'Right LEMO connector'
	}
} satisfies Record<string, Device>;
