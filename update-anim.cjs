const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

appContent = appContent.replace(
  'const fadeIn = {\n  initial: { opacity: 0, y: 20 },\n  whileInView: { opacity: 1, y: 0 },\n  viewport: { once: true, margin: "-50px" },\n  transition: { duration: 0.6 }\n};',
  `const fadeIn = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, type: "spring", stiffness: 100 }
};`
);

fs.writeFileSync('src/App.tsx', appContent);
console.log('App.tsx animation updated');
