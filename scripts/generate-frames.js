const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/transformer-sequence');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Generating 204 dummy frames...');

for (let i = 1; i <= 204; i++) {
  // SVG formatted as a fake JPG. Modern browsers can load this as an Image source perfectly.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <rect width="100%" height="100%" fill="#0b0b0b"/>
    <path d="M0,${1080 - i*5} L1920,${1080 + i*5} L1920,1080 L0,1080 Z" fill="#2a2a2a" />
    <circle cx="960" cy="${540 + Math.sin(i/10)*50}" r="${100 + (i/204)*150}" fill="none" stroke="#B71C1C" stroke-width="4"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="80" font-weight="bold" fill="#ededed" letter-spacing="4">
      FRAME ${i} / 204
    </text>
    <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#B71C1C" letter-spacing="10">
      SYSTEM SHIFTING
    </text>
  </svg>`;
  
  fs.writeFileSync(path.join(dir, `${i}.jpg`), svg);
}

console.log('Dummy frames generated successfully.');
