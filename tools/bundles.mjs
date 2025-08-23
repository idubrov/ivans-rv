import fs from 'node:fs';
import parse from 's-expression';

const data = parse(fs.readFileSync('./electrical/electrical.kicad_sch', 'utf-8'));

const bundles = {};

for (const bus of data.slice(1).filter((item) => item[0] === 'bus_alias')) {
	const members = bus.find((item) => Array.isArray(item) && item[0] === 'members');
	bundles[bus[1].toString()] = members.slice(1).map((item) => item.toString());
}

fs.writeFileSync('src/lib/wiring/bundles.json', JSON.stringify(bundles, null, 2), 'utf-8');
