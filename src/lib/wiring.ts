export type Device = {
  description: string,
}

export type DeviceName =
  | "flyleds"
  | "strpos.lw"
  | "strpos.rw"
  | "land.lw"
  | "land.rw"
  | "tail"
  | "beacon"
  | "gsa28.pitch"
  | "gsa28.roll"
  | "trim.pitch"
  | "trim.roll"
  | "artex345"
  | "gap26"
  | "gsu25"
  | "g5"
  | "stall"
  | "nav1"
  | "com1"
  | "com2"
  | "gtp59"
  | "gad27"
  | "gmu11"
  | "stick.left"
  | "stick.right"
  | "camera"
  | "gea24"
  | "gma245"
  | "flaps"
  | "switches"
  | "gnc255"
  | "gtr225"
  | "gdu460.left"
  | "gdu460.right"
  | "fusebox"
  | "static"
  | "fuel.left"
  | "fuel.right"
  | "lemo.left"
  | "lemo.right"
  ;

export type ChokePointName =
  | "f704.l"
  | "f704.r"
  | "f704.ol"
  | "f704.or"
  | "f705.l"
  | "f705.r"
  | "f706.l"
  | "f706.r"
  | "f715.l"
  | "f715.r"
  | "f716.l1"
  | "f716.l2"
  | "f716.l3"
  | "f716.l4"
  | "f716.r1"
  | "f716.r2"
  | "f716.r3"
  | "f716.r4"
  | "lw"
  | "rw"
  | "central"
  | "f782.l"
  | "f782.r"
  | "f783.l"
  | "f783.r"
  ;

export type Point = ChokePointName | Device;

const connectivity: [Point, Point][] = [
  ["f715.l", "f716.l1"],
  ["f716.l1", "f716.l2"],
  ["f716.l2", "f716.l3"],
  ["f716.l3", "f716.l4"],
  ["f715.r", "f716.r1"],
  ["f716.r1", "f716.r2"],
  ["f716.r2", "f716.r3"],
  ["f716.r3", "f716.r4"],
  // FIXME: ...
]

export type ChokePoint = {
  description: string,
}

export type WireGauge =
  | "2x18AWG shielded"
  | "3x18AWG shielded"
  | "2x22AWG shielded"
  | "3x22AWG shielded"
  | "2x12AWG twisted"
  | "2x14AWG twisted"
  | "2x18AWG twisted"
  | "2x22AWG twisted"
  | "2x22AWG canbus"
  | "18AWG"
  | "22AWG"
  | "RG400"
  | "tubing";

export type Wire = {
  description?: string,
  from: DeviceName,
  to: DeviceName,
  chokes: readonly ChokePointName[],
  gauge: WireGauge,
}

export const DEVICES: Record<DeviceName, Device> = {
  flyleds: {
    description: "Flyleds controller"
  },
  "strpos.lw": {
    description: "Flyleds original lights left wing"
  },
  "strpos.rw": {
    description: "Flyleds original lights right wing"
  },
  "land.lw": {
    description: "Flyleds landing light left wing"
  },
  "land.rw": {
    description: "Flyleds landing light right wing"
  },
  "tail": {
    description: "Flyleds tail beacon"
  },
  "beacon": {
    description: "Turtle deck beacon"
  },
  "gsa28.pitch": {
    description: "Pitch servo"
  },
  "gsa28.roll": {
    description: "Roll servo"
  },
  "trim.pitch": {
    description: "Pitch trim servo"
  },
  "trim.roll": {
    description: "Roll trim servo"
  },
  artex345: {
    description: "Artex 345 ELT"
  },
  gap26: {
    description: "Garmin GAP 26 heated pitot tube"
  },
  gsu25: {
    description: "Garmin GSU 25 ADAHRS"
  },
  g5: {
    description: "Garmin G5"
  },
  stall: {
    description: "OP-46 stall warner"
  },
  "nav1": {
    description: "Archer NAV antenna in the wingtip"
  },
  "com1": {
    description: "DM C63-2 COM1 antenna"
  },
  "com2": {
    description: "DM C63-2 COM2 antenna"
  },
  "gtp59": {
    description: "Garmin GTP 59 temperature probe"
  },
  "gad27": {
    description: "Garmin GAD 27 electronic adapter unit"
  },
  "gmu11": {
    description: "Garmin GMU 11 magnetometer"
  },
  "stick.left": {
    description: "Left control stick (pilot)"
  },
  "stick.right": {
    description: "Right control stick (copilot)"
  },
  "camera": {
    description: "Reverse camera (under the wing)"
  },
  "gea24": {
    description: "Garmin GEA 24 engine indication system"
  },
  "gma245": {
    description: "Garmin GMA 245 audio panel"
  },
  "flaps": {
    description: "Flaps motor"
  },
  "switches": {
    description: "Panel switches"
  },
  "gnc255": {
    description: "Garmin GNC 255A COM/NAV radio"
  },
  "gtr225": {
    description: "Garmin GTR 225A COM radio"
  },
  "gdu460.left": {
    description: "Garmin GDU 460 left display"
  },
  "gdu460.right": {
    description: "Garmin GDU 460 right display"
  },
  "fusebox": {
    description: "Fuse box"
  },
  "static": {
    description: "Static port"
  },
  "fuel.left": {
    description: "Left fuel tank sensor"
  },
  "fuel.right": {
    description: "Right fuel tank sensor"
  },
  "lemo.left": {
    description: "Left LEMO connector"
  },
  "lemo.right": {
    description: "Right LEMO connector"
  },
};

export const CHOKEPOINTS: Record<ChokePointName, ChokePoint> = {
  "f704.l": {
    description: "Left snap bushing (in the center) on the F-704 bulkhead"
  },
  "f704.r": {
    description: "Right snap bushing (in the center) on the F-704 bulkhead"
  },
  "f704.ol": {
    description: "Left snap bushing (outer) on the F-704 bulkhead"
  },
  "f704.or": {
    description: "Right snap bushing (outer) on the F-704 bulkhead"
  },
  "f705.l": {
    description: "Left snap bushing on the F-705 bulkhead"
  },
  "f705.r": {
    description: "Right snap bushing on the F-705 bulkhead"
  },
  "f706.l": {
    description: "Left snap bushing on the F-706 bulkhead"
  },
  "f706.r": {
    description: "Right snap bushing on the F-706 bulkhead"
  },
  "f715.l": {
    description: "Snap bushing on the left seat rib F-715"
  },
  "f715.r": {
    description: "Snap bushing on the right seat rib F-715"
  },
  "f716.l1": {
    description: "Snap bushing on the first (from the center) left seat rib F-716 (access seat rib)"
  },
  "f716.l2": {
    description: "Snap bushing on the second (from the center) left seat rib F-716 (inboard seat rib)"
  },
  "f716.l3": {
    description: "Snap bushing on the third (from the center) left seat rib F-716 (outboard seat rib)"
  },
  "f716.l4": {
    description: "Snap bushing on the fourth (from the center) left seat rib F-716 (outboard seat rib)"
  },
  "f716.r1": {
    description: "Snap bushing on the first (from the center) right seat rib F-716 (access seat rib)"
  },
  "f716.r2": {
    description: "Snap bushing on the second (from the center) right seat rib F-716 (inboard seat rib)"
  },
  "f716.r3": {
    description: "Snap bushing on the third (from the center) right seat rib F-716 (outboard seat rib)"
  },
  "f716.r4": {
    description: "Snap bushing on the fourth (from the center) right seat rib F-716 (outboard seat rib)"
  },
  "lw": {
    description: "Left wing (as a unit)"
  },
  "rw": {
    description: "Right wing (as a unit)"
  },
  "central": {
    description: "Central tunnel (under the fuel pumps)"
  },
  "f782.l": {
    description: "Electrical snap bushing on the left F-782-L cover support rib"
  },
  "f782.r": {
    description: "Electrical snap bushing on the right F-782-R cover support rib"
  },
  "f783.l": {
    description: "Electrical snap bushing on the left F-783-L cover support rib"
  },
  "f783.r": {
    description: "Electrical snap bushing on the right F-783-R cover support rib"
  }
}

type Route = readonly ChokePointName[];

// Some standard routes
const tunnel_left: Route = ["f705.l", "f706.l"];
const tunnel_right: Route = ["f705.r", "f706.r"];
const tunnel_to_left_wing: Route = ["f716.l1", "f716.l2", "f716.l3", "f716.l4", "f715.l", "lw"];
const tunnel_to_right_wing: Route = ["f716.r1", "f716.r2", "f716.r3", "f716.r4", "f715.r", "rw"];
const aft_to_left_wing: Route = [...tunnel_left, ...tunnel_to_left_wing];
const aft_to_right_wing: Route = [...tunnel_right, ...tunnel_to_right_wing];
const panel_to_left_stick: Route = ["central", "f704.l", "f716.l1", "f716.l2"];
const panel_to_right_stick: Route = ["central", "f704.r", "f716.r1", "f716.r2"];
const panel_to_aft_left: Route = ["central", ...tunnel_left];
const panel_to_aft_right: Route = ["central", ...tunnel_right];
const panel_to_left_wing = ["central", "f783.l", "f782.l", "lw"] as const;
const panel_to_right_wing = ["central", "f783.r", "f782.r", "rw"] as const;


export const WIRES: Record<string, Wire> = {
  // Left wing
  "strpos.lw": {
    description: "Strobe/position lights wires for the left wingtip",
    from: "flyleds",
    to: "strpos.lw",
    gauge: "3x18AWG shielded",
    chokes: aft_to_left_wing,
  },
  "land.lw": {
    description: "Landing wires in the left wing (landing power, landing ground and a taxi light wire)",
    from: "switches",
    to: "land.lw",
    gauge: "2x14AWG twisted",
    chokes: panel_to_left_wing,
  },
  "land.lw.taxi": {
    description: "Taxi light for the landing light in the left wing",
    from: "switches",
    to: "land.lw",
    gauge: "18AWG",
    chokes: panel_to_left_wing,
  },
  "gap26.pwr": {
    description: "Power wire for the GAP 26 heated pitot",
    from: "switches",
    to: "gap26",
    gauge: "2x12AWG twisted",
    chokes: panel_to_left_wing,
  },
  "gap26.pitot": {
    description: "Pitot tubing (blue) for the GAP 26 pitot tube",
    from: "gap26",
    to: "gsu25",
    gauge: "tubing",
    chokes: aft_to_left_wing,
  },
  "gap26.pitot.g5": {
    description: "Split-off the pitot tubing for the G5",
    from: "gap26",
    to: "g5",
    gauge: "tubing",
    chokes: ["central", "f704.l"],
  },
  "gap26.aoa": {
    description: "AOA tubing (red) for the GAP 26 pitot tube",
    from: "gap26",
    to: "gsu25",
    gauge: "tubing",
    chokes: [...tunnel_right, ...tunnel_to_left_wing],
  },
  "stall": {
    description: "Stall warning wire",
    from: "gea24",
    to: "stall",
    gauge: "2x22AWG twisted",
    chokes: panel_to_left_wing,
  },
  "nav1": {
    description: "Wire for the NAV antenna",
    from: "gnc255",
    to: "nav1",
    gauge: "RG400",
    chokes: panel_to_left_wing,
  },
  "gtp59": {
    description: "Wire for the GTP 59 OAT probe",
    from: "gtp59",
    to: "gsu25",
    gauge: "3x22AWG shielded",
    chokes: aft_to_left_wing,
  },

  // Right wing
  "strpos.rw": {
    description: "Strobe/position lights wires for the right wingtip",
    from: "flyleds",
    to: "strpos.rw",
    gauge: "3x18AWG shielded",
    chokes: aft_to_right_wing,
  },
  "land.rw": {
    description: "Landing wires in the right wing (landing power, landing ground and a taxi light wire)",
    from: "switches",
    to: "land.rw",
    gauge: "2x14AWG twisted",
    chokes: panel_to_right_wing,
  },
  "land.rw.taxi": {
    description: "Taxi light for the landing light in the right wing",
    from: "switches",
    to: "land.rw",
    gauge: "18AWG",
    chokes: panel_to_right_wing,
  },

  "gsa28.roll.pwr": {
    description: "Power wire for the GSA 28 roll servo",
    from: "fusebox",
    to: "gsa28.roll",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_wing,
  },
  "gsa28.roll.trim": {
    description: "Trim input wire for the GSA 28 roll servo",
    from: "gad27",
    to: "gsa28.roll",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_wing,
  },
  "gsa28.roll.can": {
    description: "CAN bus for the GSA 28 roll servo",
    from: "gdu460.right",
    to: "gsa28.roll",
    gauge: "2x22AWG canbus",
    chokes: panel_to_right_wing,
  },
  "gsa28.roll.disc": {
    description: "Autopilot disconnect/CWS for the GSA 28 roll servo",
    from: "stick.left",
    to: "gsa28.roll",
    gauge: "22AWG",
    chokes: ["f716.l3", "f716.l4", "f715.l"],
  },
  "gmu11.pwr": {
    description: "Power for the GMU 11 magnetometer",
    from: "fusebox",
    to: "gmu11",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_wing,
  },
  "gmu11.can": {
    description: "CAN bus for the GMU 11 magnetometer",
    from: "gsa28.roll",
    to: "gmu11",
    gauge: "2x22AWG canbus",
    chokes: []
  },
  "camera.pwr": {
    description: "Wire for the camera",
    from: "fusebox",
    to: "camera",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_wing,
  },
  "camera": {
    description: "Video cable for the camera",
    from: "camera",
    to: "gdu460.right",
    gauge: "RG400",
    chokes: panel_to_right_wing,
  },

  // Central fuselage
  "trim.roll.pwr": {
    description: "Trim motor output from the GSA 28 roll servo",
    from: "gsa28.roll",
    to: "trim.roll",
    gauge: "2x22AWG shielded",
    chokes: tunnel_to_right_wing,
  },
  "trim.roll.pos": {
    description: "Trim position sensor wire for the roll trim",
    from: "trim.roll",
    to: "gea24",
    gauge: "3x22AWG shielded",
    chokes: ["central", "f704.l"],
  },
  "stick.left.gnd": {
    description: "Ground wire for the left stick",
    from: "fusebox",
    to: "stick.left",
    gauge: "22AWG",
    chokes: panel_to_left_stick,
  },
  "stick.left.ptt": {
    description: "PTT wire for the left stick",
    from: "gma245",
    to: "stick.left",
    gauge: "22AWG",
    chokes: panel_to_left_stick,
  },
  "stick.left.flaps": {
    description: "Flaps wire for the left stick",
    from: "gad27",
    to: "stick.left",
    gauge: "2x22AWG twisted",
    chokes: panel_to_left_stick,
  },
  "stick.left.pitch": {
    description: "Pitch trim for the left stick",
    from: "gad27",
    to: "stick.left",
    gauge: "2x22AWG twisted",
    chokes: panel_to_left_stick,
  },
  "stick.left.roll": {
    description: "Roll trim for the left stick",
    from: "gad27",
    to: "stick.left",
    gauge: "2x22AWG twisted",
    chokes: panel_to_left_stick,
  },
  "stick.right.gnd": {
    description: "Ground wire for the right stick",
    from: "fusebox",
    to: "stick.right",
    gauge: "22AWG",
    chokes: panel_to_right_stick,
  },
  "stick.right.ptt": {
    description: "PTT wire for the right stick",
    from: "gma245",
    to: "stick.right",
    gauge: "22AWG",
    chokes: panel_to_right_stick,
  },
  "stick.right.flaps": {
    description: "Flaps wire for the right stick",
    from: "gad27",
    to: "stick.right",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_stick,
  },
  "stick.right.pitch": {
    description: "Pitch trim for the right stick",
    from: "gad27",
    to: "stick.right",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_stick,
  },
  "stick.right.roll": {
    description: "Roll trim for the right stick",
    from: "gad27",
    to: "stick.right",
    gauge: "2x22AWG twisted",
    chokes: panel_to_right_stick,
  },
  "flaps.pwr": {
    description: "Power for the flaps motor",
    from: "gad27",
    to: "flaps",
    gauge: "2x18AWG twisted",
    chokes: ["central", "f704.r"],
  },
  "flaps.pos": {
    description: "Position sensor for the flaps",
    from: "flaps",
    to: "gea24",
    gauge: "3x22AWG shielded",
    chokes: ["central", "f704.r"],
  },
  "gdu.can": {
    description: "CAN bus between GDU units",
    from: "gdu460.left",
    to: "gdu460.right",
    gauge: "2x22AWG canbus",
    chokes: []
  },
  "gsu25.can": {
    description: "CAN bus for the GSU 25 ADAHRS",
    from: "gdu460.left",
    to: "gsu25",
    gauge: "2x22AWG canbus",
    chokes: panel_to_aft_left
  },
  "gsu25.pwr": {
    description: "Power for the GSU 25 ADAHRS",
    from: "fusebox",
    to: "gsu25",
    gauge: "2x22AWG twisted",
    chokes: panel_to_aft_right
  },
  "gsu25.static": {
    description: "Static pressure line for the GSU 25 ADAHRS",
    from: "static",
    to: "gsu25",
    gauge: "tubing",
    chokes: []
  },
  "gsa28.pitch.pwr": {
    description: "Power for the GSA 28 pitch servo",
    from: "fusebox",
    to: "gsa28.pitch",
    gauge: "2x22AWG twisted",
    chokes: panel_to_aft_right
  },
  "gsa28.pitch.trim": {
    description: "Trim input wire for the GSA 28 pitch servo",
    from: "gad27",
    to: "gsa28.pitch",
    gauge: "2x22AWG twisted",
    chokes: panel_to_aft_right
  },
  "gsa28.pitch.can": {
    description: "CAN bus for the GSA 28 pitch servo",
    from: "gsu25",
    to: "gsa28.pitch",
    gauge: "2x22AWG canbus",
    chokes: []
  },
  "gsa28.pitch.disc": {
    description: "Autopilot disconnect/CWS for the GSA 28 roll servo",
    from: "stick.left",
    to: "gsa28.roll",
    gauge: "22AWG",
    chokes: ["f716.l1", "f716.l2", ...tunnel_left],
  },
  "beacon": {
    description: "Turtle deck beacon",
    from: "switches",
    to: "beacon",
    gauge: "2x22AWG twisted",
    chokes: panel_to_aft_right
  },
  "artex345": {
    description: "ELT switch wires",
    from: "fusebox",
    to: "artex345",
    gauge: "3x22AWG shielded",
    chokes: panel_to_aft_right
  },
  "tail": {
    description: "Tail light",
    from: "flyleds",
    to: "tail",
    gauge: "2x18AWG shielded",
    chokes: []
  },
  "trim.pitch.pwr": {
    description: "Trim motor output from the GSA 28 pitch servo",
    from: "gsa28.pitch",
    to: "trim.pitch",
    gauge: "2x22AWG shielded",
    chokes: [],
  },
  "trim.pitch.pos": {
    description: "Trim position sensor wire for the pitch trim",
    from: "trim.pitch",
    to: "gea24",
    gauge: "3x22AWG shielded",
    chokes: panel_to_aft_right,
  },
  "flyleds.pos": {
    description: "Flyleds position power",
    from: "switches",
    to: "flyleds",
    gauge: "18AWG",
    chokes: panel_to_aft_left,
  },
  "flyleds.strobe": {
    description: "Flyleds strobe power",
    from: "switches",
    to: "flyleds",
    gauge: "18AWG",
    chokes: panel_to_aft_left,
  },
  "fuel.left": {
    description: "Left fuel tank sensor",
    from: "fuel.left",
    to: "gea24",
    gauge: "2x22AWG twisted",
    // FIXME: don't need to cross F-704?
    chokes: panel_to_left_wing,
  },
  "fuel.right": {
    description: "Right fuel tank sensor",
    from: "fuel.right",
    to: "gea24",
    gauge: "2x22AWG twisted",
    // FIXME: don't need to cross F-704?
    chokes: panel_to_right_wing,
  }
}

type GaugeInfo = {
  gauge: WireGauge,
  count: number,
}
type ChokePointSummary = {
  chokepoint: ChokePointName,
  gauges: GaugeInfo[],
};

/**
 * Returns a summary of the chokepoints in the wiring.
 */
export function queryWiresByChokepoints(): ChokePointSummary[] {
  type ChokePointSummaryTemp = {
    chokepoint: ChokePointName,
    gauges: Partial<Record<WireGauge, number>>,
  };

  const chokepoints: Record<string, ChokePointSummaryTemp> = {};
  Object.values(WIRES).forEach((wire) => {
    [...new Set(wire.chokes)].forEach(chkName => {
      if (!chokepoints[chkName]) {
        chokepoints[chkName] = {
          chokepoint: chkName,
          gauges: {},
        }
      }
      const chokepoint = chokepoints[chkName];
      chokepoint.gauges[wire.gauge] = (chokepoint.gauges[wire.gauge] ?? 0) + 1;
    });
  });
  return Object.values(chokepoints)
    .sort((a, b) => a.chokepoint.localeCompare(b.chokepoint))
    .map(({chokepoint, gauges}) => ({
      chokepoint,
      gauges: Object.entries(gauges)
        .map(([gauge, count]: [string, number]) => ({gauge: gauge as WireGauge, count}))
        .sort((a, b) => a.gauge.localeCompare(b.gauge))
    }));
}

// FIXME: unwired devices?
// FIXME: verify connectivity
// FIXME: length of wires calculator
// FIXME: calculator for occupancy