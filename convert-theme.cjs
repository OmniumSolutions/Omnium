const fs = require('fs');

function convertTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Specific replacements
  content = content.replace(/bg-\[\#050A18\]/g, 'bg-slate-50');
  content = content.replace(/bg-\[\#030612\]/g, 'bg-white');
  content = content.replace(/bg-\[\#02040A\]/g, 'bg-slate-100');
  content = content.replace(/from-\[\#050A18\]/g, 'from-slate-50');
  content = content.replace(/to-\[\#0B1428\]/g, 'to-slate-100');
  
  // Text colors
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/text-slate-300/g, 'text-slate-600');
  content = content.replace(/text-slate-400/g, 'text-slate-500');
  content = content.replace(/text-slate-500/g, 'text-slate-400');
  content = content.replace(/text-blue-400/g, 'text-blue-600');
  content = content.replace(/text-blue-300/g, 'text-blue-700');
  content = content.replace(/text-emerald-400/g, 'text-emerald-600');
  content = content.replace(/text-indigo-400/g, 'text-indigo-600');
  content = content.replace(/text-cyan-400/g, 'text-cyan-600');
  content = content.replace(/text-purple-400/g, 'text-purple-600');
  content = content.replace(/text-amber-400/g, 'text-amber-600');
  content = content.replace(/text-blue-100/g, 'text-blue-900');
  content = content.replace(/text-blue-200/g, 'text-blue-800');

  // Borders
  content = content.replace(/border-white\/5/g, 'border-slate-200');
  content = content.replace(/border-white\/10/g, 'border-slate-200');
  content = content.replace(/border-white\/30/g, 'border-slate-300');
  content = content.replace(/border-blue-900\/20/g, 'border-blue-100');
  
  // Backgrounds opacity based
  content = content.replace(/bg-white\/5/g, 'bg-white');
  content = content.replace(/bg-white\/10/g, 'bg-slate-50');
  content = content.replace(/hover:bg-white\/10/g, 'hover:bg-slate-50');
  content = content.replace(/bg-white\/20/g, 'bg-slate-100');
  content = content.replace(/bg-black\/80/g, 'bg-slate-900/40');
  
  // specific logic for logo
  content = content.replace(/<Logo light/g, '<Logo');
  
  // Specific for App.tsx cards that use text-slate-900 inside dark bg
  // wait we replaced text-white with text-slate-900 so primary buttons which were text-white are now text-slate-900
  // Let's fix primary buttons text-white that got replaced.
  content = content.replace(/text-slate-900 text-xs font-bold uppercase/g, 'text-white text-xs font-bold uppercase'); // submit buttons
  content = content.replace(/bg-blue-600 text-slate-900/g, 'bg-blue-600 text-white'); 
  content = content.replace(/bg-blue-600 hover:bg-blue-500 text-slate-900/g, 'bg-blue-600 hover:bg-blue-500 text-white');
  content = content.replace(/text-slate-900 bg-white/g, 'text-slate-900 bg-white'); // keep these
  
  // Fix specific buttons that should remain white text
  content = content.replace(/bg-blue-600 text-slate-900/g, 'bg-blue-600 text-white');
  
  // In Logo it was `<Logo light ` -> now it is `<Logo ` but there's also `<Logo className` which shouldn't change
  
  fs.writeFileSync(filePath, content, 'utf8');
}

convertTheme('src/App.tsx');
convertTheme('src/components/AIDemo.tsx');
console.log('Conversion done.');
