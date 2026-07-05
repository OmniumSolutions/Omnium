import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Lazy initialization of Gemini
  let aiClient: any = null;
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_GEMINI_API_KEY")) {
      return null;
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // System instruction for the humanized AI representation of Omnium Solutions
    const SYSTEM_INSTRUCTION = `Você é a "IA de Atendimento Humanizado" que representa a Omnium Solutions, empresa líder e de elite em Automação de Processos, Integração de Sistemas, IoT e Engenharia de Software.
Você foi desenvolvida pela equipe da Omnium Solutions para demonstrar na prática aos nossos clientes potenciais o que é uma experiência de atendimento inteligente de última geração.

Diretrizes de Conversa e Tom de Voz:
1. SEM BOTÕES CHATOS: Nunca use menus numéricos ou menus de escolha estilo "digite 1 para falar com financeiro". Entenda linguagem natural fluida e responda de forma consultiva, aproximando o cliente e identificando suas necessidades de projeto.
2. COMUNICAÇÃO MULTIMODAL: Você processa texto, imagens e áudio de forma nativa. Se o usuário enviar uma imagem (como uma planilha ou foto de equipamento), faça uma análise inteligente de como nossa tecnologia de visão computacional (OpenCV/TensorFlow) ou scripts RPA podem otimizar este processo físico. Se enviarem áudio, responda demonstrando que ouviu atentamente o conteúdo e compreendeu a intenção.
3. FOCO EM RESULTADOS E ROI: Destaque as maiores vantagens de trabalhar com a Omnium Solutions:
   - Redução drástica de custos operacionais com rotinas automatizadas.
   - Eliminação total de erros humanos com arquiteturas blindadas contra falhas de software (tratamento de exceptions).
   - Alta produtividade com robôs RPA, raspagem de dados (Web Scraping) e integrações de APIs estáveis.
   - Conexão entre o físico (IoT, CLPs, sensores de chão de fábrica) e o digital (bancos de dados, nuvem, ERPs e CRMs).
4. SOLUÇÕES OFERECIDAS:
   - Automação de Processos Inteligentes (RPA, Robôs de software e Web Scraping).
   - Integração Total de Sistemas e APIs (REST/SOAP, Webhooks, Legados, Banco de Dados, ERPs, CRMs).
   - Soluções Industriais e Sistemas Embarcados (CLPs, Modbus, MQTT, IoT, chão de fábrica).
   - Visão Computacional & IA Multimodal (Classificação de imagens, inspeção de qualidade, assistentes inteligentes).
   - Engenharia de Software de Alta Performance (C#, .NET, Python, Java, JavaScript, Bancos de Dados SQL Server, MySQL, PostgreSQL).
5. FORMATO DAS RESPOSTAS (MUITO IMPORTANTE):
   - NUNCA use formatação Markdown (como asteriscos para negrito/itálico, hashtags, etc). 
   - NUNCA escreva textos longos ("textão"). Seja direta, objetiva e humana.
   - Responda de forma extremamente natural, como em uma conversa rápida de WhatsApp (no máximo 2 ou 3 frases curtas).

Mantenha as respostas amigáveis, profissionais, fluídas e SEMPRE em PORTUGUÊS (BR).`;

  // API Route: Check Gemini Config status
  app.get("/api/config-status", (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const isConfigured = !!apiKey && apiKey !== "MY_GEMINI_API_KEY" && !apiKey.includes("MY_GEMINI_API_KEY");
    res.json({ isConfigured });
  });

  // API Route: Send message to Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, image, audio } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback simulation mode
        return simulateResponse(message, history, image, audio, res);
      }

      // Format history into contents for Gemini
      const contents: any[] = [];

      // Add history messages
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.text }],
          });
        }
      }

      // Prepare parts for the current message
      const currentParts: any[] = [];

      // Add image if present
      if (image && image.data && image.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.data.split(",")[1] || image.data,
          },
        });
      }

      // Add audio if present
      if (audio && audio.data && audio.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: audio.mimeType,
            data: audio.data.split(",")[1] || audio.data,
          },
        });
      }

      // Add text input
      if (message) {
        currentParts.push({ text: message });
      } else if (currentParts.length === 0) {
        currentParts.push({ text: "Olá!" });
      }

      // Add the final user turn
      contents.push({
        role: "user",
        parts: currentParts,
      });

      // Call Gemini 3.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro no chat com Gemini:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  });

  // API Route: TTS (Text-to-Speech) using gemini-3.1-flash-tts-preview
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Texto é obrigatório." });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({ audio: null, simulated: true });
      }

      const selectedVoice = voice || "Zephyr"; // Zephyr, Kore, Puck, Charon

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Fale naturalmente com excelente entonação em português: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audio: base64Audio, voice: selectedVoice });
      } else {
        res.json({ audio: null, error: "Não foi possível gerar áudio." });
      }
    } catch (error: any) {
      console.error("Erro no TTS com Gemini:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor" });
    }
  });

  // Helper function for simulated responses when API key is missing
  function simulateResponse(message: string, history: any[], image: any, audio: any, res: any) {
    const query = (message || "").toLowerCase();
    let responseText = "";

    if (image) {
      responseText = "Entendido! Consegui ler e analisar a imagem que você enviou. Em um cenário de produção real com a nossa API ativa, nós usaríamos visão computacional avançada (com OpenCV ou redes neurais do TensorFlow) desenvolvida sob medida pela equipe da Omnium Solutions para identificar objetos, verificar falhas mecânicas, ler displays industriais ou monitorar a segurança do local. Viu como o atendimento se torna incrivelmente mais interativo?";
    } else if (audio) {
      responseText = "Sua mensagem de voz foi gravada e processada perfeitamente! Uma IA de atendimento humanizado de alto nível elimina a necessidade de menus numéricos confusos. A Omnium Solutions constrói exatamente este fluxo: seus clientes falam de maneira natural, e a IA compreende tudo (texto, áudio e imagem) entregando respostas ágeis, poupando tempo da sua equipe e aumentando as vendas.";
    } else if (query.includes("custo") || query.includes("preço") || query.includes("quanto") || query.includes("valor")) {
      responseText = "O valor dos projetos da Omnium Solutions é calculado de forma personalizada de acordo com a sua necessidade (seja uma automação de planilhas/RPA, seja uma automação industrial complexa ou a criação de um sistema embarcado). O grande benefício é o retorno operacional (ROI): reduzimos custos operacionais com mão de obra repetitiva, eliminamos falhas operacionais em 100% devido às arquiteturas blindadas contra erros que construímos, e escalamos a sua capacidade de atendimento.";
    } else if (query.includes("industrial") || query.includes("clp") || query.includes("iot") || query.includes("fábrica") || query.includes("embarcado") || query.includes("hardware")) {
      responseText = "A automação industrial e sistemas embarcados (IoT) representam um grande diferencial da Omnium Solutions. Como unimos Engenharia de Software sólida com experiência real em eletrônica, nós desenvolvemos soluções que conectam sensores e máquinas do chão de fábrica (através de CLPs, Modbus, MQTT, etc.) diretamente à nuvem ou ao ERP/MES da empresa. Isso elimina planilhas manuais e integra o físico ao digital de forma blindada contra falhas.";
    } else if (query.includes("automação") || query.includes("rpa") || query.includes("robô") || query.includes("tarefa") || query.includes("repetitiv")) {
      responseText = "Com automação inteligente (RPA) e scripts customizados, a Omnium Solutions desenvolve robôs virtuais que realizam suas tarefas administrativas repetitivas. Coisas como extração inteligente de dados da web (Web Scraping), preenchimento automatizado de planilhas Excel, conciliações bancárias complexas e geração de relatórios diários de forma rápida e segura.";
    } else if (query.includes("erro") || query.includes("falha") || query.includes("seguro") || query.includes("exception") || query.includes("robust")) {
      responseText = "A principal filosofia de trabalho da Omnium Solutions é a blindagem contra erros. Nós projetamos arquiteturas de software altamente robustas, com tratamento cirúrgico de exceções (exceptions) e rotinas intensivas de testes unitários. Isso significa que o software entregue não trava diante de imprevistos, garantindo estabilidade absoluta e continuidade das suas operações comerciais ou industriais.";
    } else {
      responseText = `Entendido! Você disse: "${message}". Como esta é uma demonstração em ambiente restrito, minha integração completa de IA generativa está pausada. Porém, no seu projeto final pela Omnium Solutions, este exato fluxo de conversa será integrado nativamente com LLMs (como ChatGPT ou Gemini) para entender o contexto real do seu cliente, integrando dados direto no seu ERP ou CRM. Deseja saber mais sobre nossos modelos de implantação?`;
    }

    setTimeout(() => {
      res.json({ text: responseText, simulated: true });
    }, 600);
  }

  // Vite development middleware vs Static Production files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
