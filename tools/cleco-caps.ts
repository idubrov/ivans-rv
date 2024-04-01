// TPU

// Speed settings
const initial_speed = 10;
const base_speed = 15;
const speed = 45;
const pressure_advance = 0.075;

// Temperature settings
const fan = 80;
const bed_temp = 60;
const extruder_temp = 230;
const nevermore = false;

const diameter = 10.20;
const hole = 4;
const height = 4.0;

const num_x = 10;
const num_y = 10;

const retract_speed = 2400;
const hop_height = 0.2;
const center_x = 119/2;
const center_y = 119/2;
const stride_x = 12;
const stride_y = 12;

const width = 0.4;
const thickness = 0.2;
const layers_per_section = 5;
const segments = 60;
const extrusion_diameter = 0.365;
const filament_diameter = 1.75;
const extrusion_rate = Math.pow(extrusion_diameter / filament_diameter, 2);


export class PrintHead {
	constructor(
		private x: number,
		private y: number,
		private z: number
	) {}

	// Note: can only go from higher z to lower z
	hop_to(x: number, y: number, z: number = this.z) {
		console.log(`
G1 E-1 F${retract_speed.toFixed(5)} ; retract
G91
G0 Z${hop_height.toFixed(5)} F9000
G90
G0 X${x.toFixed(5)} Y${y.toFixed(5)} F9000
G0 Z${z.toFixed(5)}
G1 E1 F${retract_speed.toFixed(5)} ; unretract
`);
		this.x = x;
		this.y = y;
		this.z = z;
	}

	print_to(
		x: number,
		y: number,
		z: number = this.z
	) {
		const dx = x - this.x;
		const dy = y - this.y;
		const dz = z - this.z;
		this.x = x;
		this.y = y;
		this.z = z;

		const e = extrusion_rate * Math.sqrt(dx * dx + dy * dy + dz * dz);
		const xmove = (dx !== 0) ? ` X${x.toFixed(5)}` : '';
		const ymove = (dy !== 0) ? ` Y${y.toFixed(5)}` : '';
		const zmove = (dz !== 0) ? ` Z${z.toFixed(5)}` : '';
		return `G1${xmove}${ymove}${zmove}E${e.toFixed(5)}`;
	}
}

const lines = Math.floor((diameter - hole) / 2.0 / width);
const actual_hole = diameter - lines * 2 * width;
const r0 = actual_hole / 2.0 + width / 2.0;
const loops = lines - 1;
const total_sections = Math.floor(height / thickness / layers_per_section);
const r1 = r0 + loops * width;

function print_part_base(tool: PrintHead, x: number, y: number) {
	const x0 = start_x + x * stride_x;
	const y0 = start_y + y * stride_y;

	const min_x = x0 - r1;
	const max_x = x0 + r1;
	const min_y = y0 - r1;
	const max_y = y0 + r1;
	console.log(`
EXCLUDE_OBJECT_DEFINE NAME='cap-${x}-${y}' CENTER=${x0.toFixed(5)},${y0.toFixed(5)} POLYGON=[[${min_x.toFixed(5)},${min_y.toFixed(5)}],[${max_x.toFixed(5)},${min_y.toFixed(5)}],[${max_x.toFixed(5)},${max_y.toFixed(5)}],[${min_x.toFixed(5)},${max_y.toFixed(5)}]]
EXCLUDE_OBJECT_START NAME='cap-${x}-${y}'
`);

	tool.hop_to(x0, y0 + r0, thickness);
	console.log(`	
; Initial layer circle
G1 F${initial_speed * 60}
`);
	// Make a circle first
	for (let i = 1; i <= segments; i += 1) {
		const angle = (i * 2 * Math.PI) / segments;
		const x = x0 + r0 * Math.sin(angle);
		const y = y0 + r0 * Math.cos(angle);
		console.log(tool.print_to(x, y));
	}

	console.log(`
; Bottom layer spiral
G1 F${base_speed * 60}
`);
	for (let i = 1; i <= loops * segments; i += 1) {
		const angle = (i * 2 * Math.PI) / segments;
		const r = r0 + (i * width) / segments;
		const x = x0 + r * Math.sin(angle);
		const y = y0 + r * Math.cos(angle);
		console.log(tool.print_to(x, y));
	}
	console.log(`
EXCLUDE_OBJECT_END NAME='cap-${x}-${y}' 
	`)
}

function print_vase_segment(tool: PrintHead, x: number, y: number, from: number, layers: number) {
	const x0 = start_x + x * stride_x;
	const y0 = start_y + y * stride_y;

	console.log(`
EXCLUDE_OBJECT_START NAME='cap-${x}-${y}'
; Vase from ${from.toFixed(5)}
`);
	tool.hop_to(x0, y0 + r1, from);
	console.log(`
; Set vase speed
G1 F${speed * 60}
`);
	for (let i = 1; i <= layers * segments; i += 1) {
		const angle = (i * 2 * Math.PI) / segments;
		const x = x0 + r1 * Math.sin(angle);
		const y = y0 + r1 * Math.cos(angle);
		const z = from + (i * thickness) / segments;
		console.log(tool.print_to(x, y, z));
	}
	console.log(`
EXCLUDE_OBJECT_END NAME='cap-${x}-${y}'
`);
}

console.log(`
PRINT_START BED=${bed_temp.toFixed(5)} EXTRUDER=${extruder_temp.toFixed(5)}
G21 ; set units to millimeters
G90 ; use absolute coordinates
M83 ; use relative distances for extrusion
M107 ; no fan for the first layer
${nevermore ? 'ENABLE_NEVERMORE ; enable nevermore' : ''}
SET_PRESSURE_ADVANCE ADVANCE=${pressure_advance.toFixed(5)}
`);

const tool = new PrintHead(-1, -1, -1);
const start_x = center_x - ((num_x - 1) * stride_x) / 2.0;
const start_y = center_y - ((num_y - 1) * stride_y) / 2.0;
for (let y = 0; y < num_y; y += 1) {
	for (let x = 0; x < num_x; x += 1) {
		const real_x = y % 2 == 0 ? x : (num_x - 1 - x);
		print_part_base(tool, real_x, y);

	}
}

console.log(`
; Turn on the fan
M106 S${Math.round(fan / 100 * 255.0)} ; turn fan on
`);

for (let section = 0; section < total_sections; section += 1) {
	for (let y = 0; y < num_y; y += 1) {
		for (let x = 0; x < num_x; x += 1) {
			const section_thickness = layers_per_section * thickness;
			const real_x = y % 2 == 0 ? x : (num_x - 1 - x);
			print_vase_segment(tool, real_x, y,thickness + section * section_thickness, layers_per_section);
		}
	}
}

console.log(`
M107 ; turn fan off
PRINT_END
`);
