const fs = require('fs');
let appContent = fs.readFileSync('src/components/AIDemo.tsx', 'utf8');

// Revert header to dark mode
appContent = appContent.replace(
  '<div className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 shrink-0 shadow-sm z-10 relative">',
  '<div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-4 shrink-0 shadow-lg z-10 relative">'
);
appContent = appContent.replace(
  '<div className="relative">\n          <motion.div \n            animate={{ boxShadow: [\'0px 0px 0px rgba(59, 130, 246, 0.2)\', \'0px 0px 15px rgba(59, 130, 246, 0.4)\', \'0px 0px 0px rgba(59, 130, 246, 0.2)\'] }}\n            transition={{ duration: 2, repeat: Infinity }}\n            className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center backdrop-blur-sm"\n          >\n            <MessageSquare className="w-5 h-5 text-blue-600" />\n          </motion.div>\n          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>\n        </div>\n        <div>\n          <h3 className="font-bold text-slate-900 tracking-tight flex items-center gap-2">\n            Inteligência de Atendimento\n            <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm uppercase">Online</span>\n          </h3>\n          <p className="text-xs text-slate-500 font-medium">Motor IA Híbrido — Omnium Solutions</p>\n        </div>',
  `<div className="relative">
          <motion.div 
            animate={{ boxShadow: ['0px 0px 0px rgba(59, 130, 246, 0.4)', '0px 0px 15px rgba(59, 130, 246, 0.8)', '0px 0px 0px rgba(59, 130, 246, 0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/50 flex items-center justify-center backdrop-blur-sm"
          >
            <MessageSquare className="w-5 h-5 text-blue-300" />
          </motion.div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
        </div>
        <div>
          <h3 className="font-bold text-white tracking-tight flex items-center gap-2">
            Inteligência de Atendimento
            <span className="bg-blue-500/20 text-blue-200 border border-blue-500/30 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold shadow-sm uppercase">Online</span>
          </h3>
          <p className="text-xs text-slate-300/80 font-medium">Motor IA Híbrido — Omnium Solutions</p>
        </div>`
);

// Remove auto scroll
appContent = appContent.replace(
  `  useEffect(() => {\n    if (chatContainerRef.current) {\n      chatContainerRef.current.scrollTo({\n        top: chatContainerRef.current.scrollHeight,\n        behavior: "smooth"\n      });\n    }\n  }, [messages, isPending]);`,
  ``
);

fs.writeFileSync('src/components/AIDemo.tsx', appContent);
