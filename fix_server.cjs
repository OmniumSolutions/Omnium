const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  'responseText = "Olá! Eu sou a Inteligência Artificial Humanizada de atendimento da Omnium Solutions. Atualmente estou operando em Modo de Simulação para demonstração, pois a chave `GEMINI_API_KEY` ainda não foi ativada nas configurações deste applet. Mesmo assim, sinta-se à vontade para explorar minhas soluções! Eu mostro na prática como a Omnium Solutions desenvolve soluções sob medida para automatizar processos industriais, residenciais e corporativos, unindo hardware, software e IA. Como posso ajudar o seu negócio hoje?";',
  'responseText = `Entendido! Você disse: "${message}". Como esta é uma demonstração em ambiente restrito, minha integração completa de IA generativa está pausada. Porém, no seu projeto final pela Omnium Solutions, este exato fluxo de conversa será integrado nativamente com LLMs (como ChatGPT ou Gemini) para entender o contexto real do seu cliente, integrando dados direto no seu ERP ou CRM. Deseja saber mais sobre nossos modelos de implantação?`;'
);

fs.writeFileSync('server.ts', content);
console.log('server.ts updated');
