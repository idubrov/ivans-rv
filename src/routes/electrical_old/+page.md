---
title: 'Electrical'
layout: standalone
---

Planned electrical equipment / avionics.

## Left wing

- Flyleds Wingtip lighting
  - 3x18AWG shielded cable for POSN-, POSN+, STROBE-, STROBE+
- Flyleds Combo landing light
  - 3x18AWG twisted for the landing light, the taxi light and the ground
- (or) Flyleds landing light
  - 2x14AWG twisted for the landing light and the ground (ground at the wing root)
  - 1x18AWG for the taxi light
- GAP 26 Heated Pitot Tube
  - Pitot input source (to GSU 25)
  - AOA input source (to GSU 25)
  - 2x12AWG twisted for pitot heater
- Van's stall warner
  - 2x22AWG twisted wire
- Archer antenna for NAV in the wingtip
  - RG400 cable
- GTP 59 Temperature probe
  - 3x22AWG shielded cable (to the GSU 25)

## Right wing

- Flyleds Wingtip lighting
  - 3x18AWG shielded cable for POSN-, POSN+, STROBE-, STROBE+
- Flyleds Combo landing light
  - 3x18AWG twisted for the landing light, the taxi light and the ground
- (or) Flyleds landing light
  - 2x14AWG twisted for the landing light and the ground (ground at the wing root)
  - 1x18AWG for the taxi light
- GSA 28 Autopilot roll servo
  - 2x22AWG twisted power / ground
  - 2x22AWG twisted roll trim out
  - 2x22AWG CAN BUS shielded cable (to the panel)
  - 2x22AWG CAN BUS shielded cable (to the GMU 11)
  - 2x22AWG shielded cable for the roll trim motor (to the fuselage)
  - 1x22AWG autopilot disconnect
- GMU 11 Magnetometer in the wingtip
  - 2x22AWG CAN BUS shielded cable (from the roll GSA 28), terminated
  - 2x22AWG twisted power / ground
  - [mount](https://www.steinair.com/product/gmu-11-wing-tip-mount/)
- Camera in the inner access panel (or too annoying for annuals?)
  - RG400 cable for video
  - 2x22AWG twisted power / ground

## Central Fuselage

- Roll trim motor
  - 2x22AWG shielded cable for the roll trim motor (to the GSA 28 roll servo)
  - 3x22AWG shielded cable for the position (to the GEA 24)
- Pilot control stick
  - 1x22 AWG ground
  - 1x22 AWG PTT (to the GMA 245)
  - 2x22 AWG Flaps up/down/gnd (to the GAD 27)
  - 2x22 AWG Pitch trim (to the GAD 27)
  - 2x22 AWG Roll trim (to the GAD 27)
- Co-pilot control stick
  - 1x22 AWG ground
  - 1x22 AWG PTT (to the GMA 245)u
  - 2x22 AWG Flaps up/down/gnd (to the GAD 27)
  - 2x22 AWG Pitch trim (to the GAD 27)
  - 2x22 AWG Roll trim (to the GAD 27)
- Flap Actuator
  - 2x18AWG twisted power (to the GAD 27)
  - 3x22AWG shielded cable for the position (to the GEA 24)

## Aft Fuselage

- GSU 25 ADAHRS unit
  - 2x22AWG CAN BUS shielded cable (to the panel)
  - 2x22AWG CAN BUS shielded cable (to pitch servo)
  - 2x22AWG twisted power / ground
  - 3x22AWG shielded cable (to the GTP 59)
  - pitot tube
  - aoa tube
  - static tube
- GSA 28 Autopilot pitch servo
  - 2x22AWG twisted power / ground
  - 2x22AWG twisted pitch trim out
  - 2x22AWG CAN BUS shielded cable (to the GSU 25), terminated
  - 2x22AWG shielded cable for the pitch trim motor (to the empennage)
  - 1x22AWG autopilot disconnect
- Beacon
  - 2x22AWG twisted power / ground
- ELT Artex 345
  - 3x22AWG shielded cable button and NAV RS

## Empennage

- Flyleds tail light
  - 2x18AWG (or 2X22AWG) shielded cable for TAIL-/TAIL+ (to the empennage)
- Pitch trim motor
  - 2x22AWG shielded cable for the pitch trim motor (to the GSA 28 pitch servo)
  - 3x22AWG shielded cable for the position (to the GEA 24)

## Antennas

- GPS 20A: GA 36 on a glare shield
- GTR 200 (or GTR 20?): DM C63-2 on the belly (in front of the F-705? another behind F-706?)
- (or) GNC 255A: Archer antenna in the wingtip, another DM C63-2 on the belly
- (or) GTN 650: Archer antenna in the wingtip, another DM C63-2 on the belly, GA 36 on a glare shield
- GTX 45R: CI-105, front fuselage
- Artex 345: antenna in front of the stabilizer? Inside the baggage area?

## Chokepoints

### C2: Central Tunnel at F-706

- GSU 25 ADAHRS unit
  - 2x22AWG CAN BUS shielded cable (to the panel)
  - 2x22AWG twisted power / ground
  - 3x22AWG shielded cable (to the GTP 59)
  - Pitot tube
  - AOA tube
- GSA 28 Autopilot pitch servo
  - 2x22AWG twisted power / ground
  - 2x22AWG twisted pitch trim out
  - 1x22AWG autopilot disconnect
- ELT Artex 345
  - 3x22AWG shielded cable button and NAV RS
- Beacon
  - 2x22AWG twisted power / ground
- Flyleds tail light
  - 2X22AWG shielded cable
- Pitch trim motor
  - 3x22AWG shielded cable for the position (to the GEA 24)

Total

- 1x CAN BUS
- 2x tubes
- 9x 22AWG wires
- 3x 3x22AWG shielded cable
- 1x 2X22AWG shielded cable

## Notes

- [Holder for rib lightening holes](https://www.digikey.com/en/products/detail/panduit-corp/LHMS-S6-D/1307127)
- Need to figure out how much real estate is on the turtle deck with Supertracks canopy extension

<!--

TODO: Another / backup GSU-25?

Shielded cable are MIL-C-27500
For Garmin, use MIL-W-22759/16 22AWG or larger, unless otherwise specified. Use MIL-C-27500 for all shielded cable connections.

Temperature probe: next to the inspection panel?
-->
