import type { WireGauge } from '$lib/wiring/connections';

export type CableInfo = {
	name: string;
	gauge: WireGauge;
	signals: string[];
	// If includes a dedicated ground wire.
	ground?: true;
	// Details about wire colors
	colors?: string;
};

/**
 * Cables used to route various signals.
 */
export const CABLES: CableInfo[] = [
	{
		name: 'CAN bus',
		gauge: '2x22AWG canbus',
		signals: ['CAN_HI', 'CAN_LO']
	},
	{
		name: 'GTX 45r to GDU #1 connection',
		gauge: '3x22AWG shielded',
		signals: ['GTX_GDU1_TX', 'GTX_GDU1_RX', 'GTX_GDU1_GND']
	},
	{
		name: 'GTX 45r to GDU #2 connection',
		gauge: '3x22AWG shielded',
		signals: ['GTX_GDU2_TX', 'GTX_GDU2_RX', 'GTX_GDU2_GND']
	},
	{
		name: 'Artex 345 cable to panel',
		gauge: '3x22AWG shielded',
		signals: ['ARTEX_RX', 'ARTEX_SW8', 'ARTEX_SW7']
	},
	{
		name: 'Pitch trim (before servo)',
		gauge: '2x22AWG shielded',
		signals: ['PITCH_TRIM1', 'PITCH_TRIM2']
	},
	{
		name: 'Pitch trim (after servo)',
		gauge: '2x22AWG shielded',
		signals: ['PITCH_AP_TRIM1', 'PITCH_AP_TRIM2']
	},
	{
		name: 'Pitch trim position',
		gauge: '3x22AWG shielded',
		signals: ['PITCH_TRIM_POS_HI', 'PITCH_TRIM_POS', 'PITCH_TRIM_POS_LO']
	},
	{
		name: 'Roll trim (before servo)',
		gauge: '2x22AWG shielded',
		signals: ['ROLL_TRIM1', 'ROLL_TRIM2']
	},
	{
		name: 'Roll trim (after servo)',
		gauge: '2x22AWG shielded',
		signals: ['ROLL_AP_TRIM1', 'ROLL_AP_TRIM2']
	},
	{
		name: 'Roll trim position',
		gauge: '3x22AWG shielded',
		signals: ['ROLL_TRIM_POS_HI', 'ROLL_TRIM_POS', 'ROLL_TRIM_POS_LO']
	},
	{
		name: 'Garmin Control Wheel Steering / disconnect',
		gauge: '22AWG',
		signals: ['CWS'],
		colors: 'white',
	},
	{
		name: 'Left wing FlyLeds cable',
		gauge: '3x20AWG shielded',
		signals: ['LEFT_POSN+', 'LEFT_POSN-', 'LEFT_STROBE+', 'LEFT_STROBE-']
	},
	{
		name: 'Left wing landing light',
		gauge: '2x14AWG twisted',
		signals: ['LEFT_LAND'],
		ground: true,
		colors: 'red for power, black for ground',
	},
	{
		name: 'Left wing taxi light',
		gauge: '18AWG',
		signals: ['LEFT_TAXI'],
		colors: 'red',
	},
	{
		name: 'Right wing FlyLeds cable',
		gauge: '3x20AWG shielded',
		signals: ['RIGHT_POSN+', 'RIGHT_POSN-', 'RIGHT_STROBE+', 'RIGHT_STROBE-']
	},
	{
		name: 'Right wing landing light',
		gauge: '2x14AWG twisted',
		signals: ['RIGHT_LAND'],
		ground: true,
		colors: 'red for power, black for ground',
	},
	{
		name: 'Right wing taxi light',
		gauge: '18AWG',
		signals: ['RIGHT_TAXI'],
		colors: 'red',
	},
	{
		name: 'Left wing fuel',
		gauge: '2x22AWG twisted',
		signals: ['LEFT_FUEL'],
		colors: 'white for signal, black for ground',
	},
	{
		name: 'Right wing fuel',
		gauge: '2x22AWG twisted',
		signals: ['RIGHT_FUEL'],
		colors: 'white for signal, black for ground',
	},
	{
		name: 'Pitot tube temperature signal',
		gauge: '22AWG',
		signals: ['PITOT_TEMP'],
		colors: 'white',
	},
	{
		name: 'Tail light',
		gauge: '2x22AWG shielded',
		signals: ['TAIL+', 'TAIL-']
	},
	{
		name: 'OAT sensor',
		gauge: '3x22AWG shielded',
		signals: ['OAT_POWER', 'OAT_HIGH', 'OAT_LOW']
	},
	{
		name: 'GTX 45r to GTN 650Xi position',
		gauge: '2x22AWG shielded',
		signals: ['GTX_GTN_ETH_IN1A', 'GTX_GTN_ETH_IN1B']
	},
	{
		name: 'GTX 45r to GTN 650Xi traffic',
		gauge: '2x22AWG shielded',
		signals: ['GTX_GTN_ETH_OUT1A', 'GTX_GTN_ETH_OUT1B']
	},
	{
		name: 'Transponder failure',
		gauge: '22AWG',
		signals: ['XPDR_FAIL']
	},

	// Power lines
	{
		name: 'Beacon power',
		gauge: '2x22AWG twisted',
		signals: ['BEACON_12V'],
		ground: true
	},
	{
		name: 'Strobe power',
		gauge: '2x18AWG twisted',
		signals: ['STROBE_12V'],
		ground: true
	},
	{
		name: 'Position power',
		gauge: '18AWG',
		signals: ['POS_12V']
	},
	{
		name: 'Flood power',
		gauge: '18AWG',
		signals: ['FLOOD_12V']
	},
	{
		name: 'GSU 25 power #1',
		gauge: '2x22AWG twisted',
		signals: ['GSU_12V_1']
	},
	{
		name: 'GSU 25 power #2',
		gauge: '2x22AWG twisted',
		signals: ['GSU_12V_2']
	},
	{
		name: 'GMU 11 power #1',
		gauge: '2x22AWG twisted',
		signals: ['GMU_12V_1'],
		colors: 'red for power, black for ground',
	},
	{
		name: 'GMU 11 power #2',
		gauge: '2x22AWG twisted',
		signals: ['GMU_12V_2'],
		colors: 'red for power, black for ground',
	},
	{
		name: 'GTX 45r power #1',
		gauge: '2x22AWG twisted',
		signals: ['GTX_12V_1']
	},
	{
		name: 'GTX 45r power #2',
		gauge: '2x22AWG twisted',
		signals: ['GTX_12V_2']
	},
	{
		name: 'Pitch servo power',
		gauge: '2x20AWG twisted',
		ground: true,
		signals: ['PITCH_AP_12V']
	},
	{
		name: 'Roll servo power',
		gauge: '2x20AWG twisted',
		ground: true,
		signals: ['ROLL_AP_12V']
	},
	{
		name: 'Pitot heater power',
		gauge: '2x12AWG twisted',
		ground: true,
		signals: ['PITOT_12V']
	},
	{
		name: 'Camera power',
		gauge: '2x22AWG twisted',
		ground: true,
		signals: ['CAMERA_12V']
	},
	{
		name: 'Pitch trim power',
		gauge: '2x22AWG twisted',
		ground: true,
		signals: ['PITCH_TRIM_12V']
	},
	{
		name: 'Roll trim power',
		gauge: '2x22AWG twisted',
		ground: true,
		signals: ['ROLL_TRIM_12V']
	},

	// Antennas
	{
		name: 'GPS antenna cable',
		gauge: 'RG400',
		signals: ['GPS']
	},
	{
		name: 'NAV antenna cable',
		gauge: 'RG400',
		signals: ['NAV']
	},
	{
		name: 'Video antenna cable',
		gauge: 'RG400',
		signals: ['VIDEO']
	}
];
