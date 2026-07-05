var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "50mb" }));
  let aiClient = null;
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_GEMINI_API_KEY")) {
      return null;
    }
    if (!aiClient) {
      aiClient = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return aiClient;
  }
  const SYSTEM_INSTRUCTION = `Voc\xEA \xE9 a "IA de Atendimento Humanizado" que representa a Omnium Solutions, empresa l\xEDder e de elite em Automa\xE7\xE3o de Processos, Integra\xE7\xE3o de Sistemas, IoT e Engenharia de Software.
Voc\xEA foi desenvolvida pela equipe da Omnium Solutions para demonstrar na pr\xE1tica aos nossos clientes potenciais o que \xE9 uma experi\xEAncia de atendimento inteligente de \xFAltima gera\xE7\xE3o.

Diretrizes de Conversa e Tom de Voz:
1. SEM BOT\xD5ES CHATOS: Nunca use menus num\xE9ricos ou menus de escolha estilo "digite 1 para falar com financeiro". Entenda linguagem natural fluida e responda de forma consultiva, aproximando o cliente e identificando suas necessidades de projeto.
2. COMUNICA\xC7\xC3O MULTIMODAL: Voc\xEA processa texto, imagens e \xE1udio de forma nativa. Se o usu\xE1rio enviar uma imagem (como uma planilha ou foto de equipamento), fa\xE7a uma an\xE1lise inteligente de como nossa tecnologia de vis\xE3o computacional (OpenCV/TensorFlow) ou scripts RPA podem otimizar este processo f\xEDsico. Se enviarem \xE1udio, responda demonstrando que ouviu atentamente o conte\xFAdo e compreendeu a inten\xE7\xE3o.
3. FOCO EM RESULTADOS E ROI: Destaque as maiores vantagens de trabalhar com a Omnium Solutions:
   - Redu\xE7\xE3o dr\xE1stica de custos operacionais com rotinas automatizadas.
   - Elimina\xE7\xE3o total de erros humanos com arquiteturas blindadas contra falhas de software (tratamento de exceptions).
   - Alta produtividade com rob\xF4s RPA, raspagem de dados (Web Scraping) e integra\xE7\xF5es de APIs est\xE1veis.
   - Conex\xE3o entre o f\xEDsico (IoT, CLPs, sensores de ch\xE3o de f\xE1brica) e o digital (bancos de dados, nuvem, ERPs e CRMs).
4. SOLU\xC7\xD5ES OFERECIDAS:
   - Automa\xE7\xE3o de Processos Inteligentes (RPA, Rob\xF4s de software e Web Scraping).
   - Integra\xE7\xE3o Total de Sistemas e APIs (REST/SOAP, Webhooks, Legados, Banco de Dados, ERPs, CRMs).
   - Solu\xE7\xF5es Industriais e Sistemas Embarcados (CLPs, Modbus, MQTT, IoT, ch\xE3o de f\xE1brica).
   - Vis\xE3o Computacional & IA Multimodal (Classifica\xE7\xE3o de imagens, inspe\xE7\xE3o de qualidade, assistentes inteligentes).
   - Engenharia de Software de Alta Performance (C#, .NET, Python, Java, JavaScript, Bancos de Dados SQL Server, MySQL, PostgreSQL).
5. FORMATO DAS RESPOSTAS (MUITO IMPORTANTE):
   - NUNCA use formata\xE7\xE3o Markdown (como asteriscos para negrito/it\xE1lico, hashtags, etc). 
   - NUNCA escreva textos longos ("text\xE3o"). Seja direta, objetiva e humana.
   - Responda de forma extremamente natural, como em uma conversa r\xE1pida de WhatsApp (no m\xE1ximo 2 ou 3 frases curtas).

Mantenha as respostas amig\xE1veis, profissionais, flu\xEDdas e SEMPRE em PORTUGU\xCAS (BR).`;
  app.get("/api/config-status", (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const isConfigured = !!apiKey && apiKey !== "MY_GEMINI_API_KEY" && !apiKey.includes("MY_GEMINI_API_KEY");
    res.json({ isConfigured });
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, image, audio } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return simulateResponse(message, history, image, audio, res);
      }
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.text }]
          });
        }
      }
      const currentParts = [];
      if (image && image.data && image.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.data.split(",")[1] || image.data
          }
        });
      }
      if (audio && audio.data && audio.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: audio.mimeType,
            data: audio.data.split(",")[1] || audio.data
          }
        });
      }
      if (message) {
        currentParts.push({ text: message });
      } else if (currentParts.length === 0) {
        currentParts.push({ text: "Ol\xE1!" });
      }
      contents.push({
        role: "user",
        parts: currentParts
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Erro no chat com Gemini:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  });
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Texto \xE9 obrigat\xF3rio." });
      }
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({ audio: null, simulated: true });
      }
      const selectedVoice = voice || "Zephyr";
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Fale naturalmente com excelente entona\xE7\xE3o em portugu\xEAs: ${text}` }] }],
        config: {
          responseModalities: [import_genai.Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audio: base64Audio, voice: selectedVoice });
      } else {
        res.json({ audio: null, error: "N\xE3o foi poss\xEDvel gerar \xE1udio." });
      }
    } catch (error) {
      console.error("Erro no TTS com Gemini:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor" });
    }
  });
  function simulateResponse(message, history, image, audio, res) {
    const query = (message || "").toLowerCase();
    let responseText = "";
    if (image) {
      responseText = "Entendido! Consegui ler e analisar a imagem que voc\xEA enviou. Em um cen\xE1rio de produ\xE7\xE3o real com a nossa API ativa, n\xF3s usar\xEDamos vis\xE3o computacional avan\xE7ada (com OpenCV ou redes neurais do TensorFlow) desenvolvida sob medida pela equipe da Omnium Solutions para identificar objetos, verificar falhas mec\xE2nicas, ler displays industriais ou monitorar a seguran\xE7a do local. Viu como o atendimento se torna incrivelmente mais interativo?";
    } else if (audio) {
      responseText = "Sua mensagem de voz foi gravada e processada perfeitamente! Uma IA de atendimento humanizado de alto n\xEDvel elimina a necessidade de menus num\xE9ricos confusos. A Omnium Solutions constr\xF3i exatamente este fluxo: seus clientes falam de maneira natural, e a IA compreende tudo (texto, \xE1udio e imagem) entregando respostas \xE1geis, poupando tempo da sua equipe e aumentando as vendas.";
    } else if (query.includes("custo") || query.includes("pre\xE7o") || query.includes("quanto") || query.includes("valor")) {
      responseText = "O valor dos projetos da Omnium Solutions \xE9 calculado de forma personalizada de acordo com a sua necessidade (seja uma automa\xE7\xE3o de planilhas/RPA, seja uma automa\xE7\xE3o industrial complexa ou a cria\xE7\xE3o de um sistema embarcado). O grande benef\xEDcio \xE9 o retorno operacional (ROI): reduzimos custos operacionais com m\xE3o de obra repetitiva, eliminamos falhas operacionais em 100% devido \xE0s arquiteturas blindadas contra erros que constru\xEDmos, e escalamos a sua capacidade de atendimento.";
    } else if (query.includes("industrial") || query.includes("clp") || query.includes("iot") || query.includes("f\xE1brica") || query.includes("embarcado") || query.includes("hardware")) {
      responseText = "A automa\xE7\xE3o industrial e sistemas embarcados (IoT) representam um grande diferencial da Omnium Solutions. Como unimos Engenharia de Software s\xF3lida com experi\xEAncia real em eletr\xF4nica, n\xF3s desenvolvemos solu\xE7\xF5es que conectam sensores e m\xE1quinas do ch\xE3o de f\xE1brica (atrav\xE9s de CLPs, Modbus, MQTT, etc.) diretamente \xE0 nuvem ou ao ERP/MES da empresa. Isso elimina planilhas manuais e integra o f\xEDsico ao digital de forma blindada contra falhas.";
    } else if (query.includes("automa\xE7\xE3o") || query.includes("rpa") || query.includes("rob\xF4") || query.includes("tarefa") || query.includes("repetitiv")) {
      responseText = "Com automa\xE7\xE3o inteligente (RPA) e scripts customizados, a Omnium Solutions desenvolve rob\xF4s virtuais que realizam suas tarefas administrativas repetitivas. Coisas como extra\xE7\xE3o inteligente de dados da web (Web Scraping), preenchimento automatizado de planilhas Excel, concilia\xE7\xF5es banc\xE1rias complexas e gera\xE7\xE3o de relat\xF3rios di\xE1rios de forma r\xE1pida e segura.";
    } else if (query.includes("erro") || query.includes("falha") || query.includes("seguro") || query.includes("exception") || query.includes("robust")) {
      responseText = "A principal filosofia de trabalho da Omnium Solutions \xE9 a blindagem contra erros. N\xF3s projetamos arquiteturas de software altamente robustas, com tratamento cir\xFArgico de exce\xE7\xF5es (exceptions) e rotinas intensivas de testes unit\xE1rios. Isso significa que o software entregue n\xE3o trava diante de imprevistos, garantindo estabilidade absoluta e continuidade das suas opera\xE7\xF5es comerciais ou industriais.";
    } else {
      responseText = `Entendido! Voc\xEA disse: "${message}". Como esta \xE9 uma demonstra\xE7\xE3o em ambiente restrito, minha integra\xE7\xE3o completa de IA generativa est\xE1 pausada. Por\xE9m, no seu projeto final pela Omnium Solutions, este exato fluxo de conversa ser\xE1 integrado nativamente com LLMs (como ChatGPT ou Gemini) para entender o contexto real do seu cliente, integrando dados direto no seu ERP ou CRM. Deseja saber mais sobre nossos modelos de implanta\xE7\xE3o?`;
    }
    setTimeout(() => {
      res.json({ text: responseText, simulated: true });
    }, 600);
  }
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
