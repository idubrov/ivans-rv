---
title: 'Working on electrical system.'
categories: ['avionics']
time: 6
thumbnail: '0-electrical.png'
---

I spent some evenings designing my avionics / electrical / wiring.

<!-- more -->

I am getting close to finishing the wings. I would like to install everything in them at this point, then fully close them. For that, I need to know what am I putting in the wings, and how much wire do I need for these components.

I like doing things in smaller chunks, and I thought that I can wire wings without fully planning my avionics. To do that, I started working on the schematics. I have a general idea what avionics I want in my RV-7. It might be a bit overly ambitious and unnecessary (I am not instrument rated, and yet I plan for IFR capability), but this is the setup I have in mind:

* Everything is Garmin, with two main G3X screens, and a communication/autopilot/audio stack in the middle.
* GTN 650Xi navigator in the central communication stack.
* Electronic fuel injection (likely, SDS EFI, but I am not there yet to decide).
* Dual electrical system, with two batteries and alternator + generator.

For the wings, I am planning the following components.

Left wing:

* FlyLEDs Essential kit for position / strobe.
* FlyLEDs Taildragger Max for landing / taxi.
* Fuel sender.
* Garmin GAP 26 heated pitot tube.
* Archer NAV antenna.
* Van's stall sensor (in addition to AOA, as a secondary alert).

Right wing:

* FlyLEDs Essential kit for position / strobe.
* FlyLEDs Taildragger Max for landing / taxi.
* Fuel sender.
* GSA 28 roll autopilot servo.
* GMU 11 magnetometer.
* "Taxi" camera for G3X GDU.

Here is an example of schematic I have for the right wing:

![](./0-electrical.png)

I would like to buy wires for the wings first. I will spend more in the end, but I don't see a reason why I cannot wire the wings now. I won't be able to attach them to the fuselage any time soon, so I will leave some extra long wire tails to be routed through the fuselage.

Also, I want to plan the majority of the components in the fuselage itself to see if I can fit everything through the existing wiring holes. The most concerning parts are the air tubing for the airspeed and AOA. I did some mock-ups of wires going through some of the snap bushings (wing and aft fuselage ones), and it seems like it is going to work. I don't know yet about the bushings in the central section (but some of the wing wires will go through the existing side holes in the central section, which should save some space in the central ones).

This is photo of one of the mockups. I think, this was the right aft fuselage bushing (currently, the busier one), and in addition to all these wires, it should also fit one one air tubing, pitot or AOA (the other one will go through the other side):

![](./1-wiring-mockup.jpeg)