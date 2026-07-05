const fs = require('fs');
let appContent = fs.readFileSync('src/components/AIDemo.tsx', 'utf8');

appContent = appContent.replace(
  'const [isPending, setIsPending] = useState(false);\n  const chatContainerRef = useRef<HTMLDivElement>(null);',
  'const [isPending, setIsPending] = useState(false);\n  const chatContainerRef = useRef<HTMLDivElement>(null);\n  const chatEndRef = useRef<HTMLDivElement>(null);'
);

appContent = appContent.replace(
  'const handleSendMessage = (e?: React.FormEvent) => {',
  'useEffect(() => {\n    if (chatEndRef.current) {\n      chatEndRef.current.scrollIntoView({ behavior: "smooth" });\n    }\n  }, [messages, isPending]);\n\n  const handleSendMessage = (e?: React.FormEvent) => {'
);

appContent = appContent.replace(
  '<motion.div \n              initial={{ opacity: 0, y: 20, scale: 0.95 }}\n              animate={{ opacity: 1, y: 0, scale: 1 }}\n              transition={{ type: "spring", stiffness: 260, damping: 20 }}\n              key={msg.id} ',
  '<motion.div \n              initial={{ opacity: 0, y: 15 }}\n              animate={{ opacity: 1, y: 0 }}\n              transition={{ duration: 0.3, ease: "easeOut" }}\n              key={msg.id} '
);

appContent = appContent.replace(
  '</motion.div>\n        )}\n        \n      </div>',
  '</motion.div>\n        )}\n        <div ref={chatEndRef} />\n      </div>'
);

fs.writeFileSync('src/components/AIDemo.tsx', appContent);
console.log("updated");
