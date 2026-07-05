import React, { useState, useRef, useEffect } from "react";
import { Send, Image, MessageSquare, RefreshCw, AudioLines, Check, CheckCircle2, Mic, MicOff, AlertCircle, Trash2, Volume2, VolumeX, Zap, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  image?: string | null;
  audioUrl?: string | null;
  timestamp: Date;
  isSimulated?: boolean;
}

export default function AIDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      text: "Olá! Eu sou a Inteligência de Atendimento da Omnium Solutions. Fui projetada para funcionar de forma 100% humanizada: sem botões chatos de opções, apenas conversa natural por texto, áudio ou imagens. \n\nExperimente digitar sua dúvida sobre automação, gravar um áudio pelo microfone ou anexar uma das imagens de exemplo abaixo para ver meu cérebro de IA em ação!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageMime, setSelectedImageMime] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const synth = window.speechSynthesis;
  const [autoSpeak, setAutoSpeak] = useState(false);



    const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchAsBase64 = async (url: string): Promise<string | null> => {
    if (url.startsWith('data:')) return url;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await blobToBase64(blob);
    } catch (e) {
      console.error("Failed to fetch image", e);
      return null;
    }
  };

  const sendToBackend = async (userMsg: Message) => {
    setIsPending(true);
    let imagePayload = null;
    let audioPayload = null;
    
    if (userMsg.image) {
      const base64 = await fetchAsBase64(userMsg.image);
      if (base64) {
        imagePayload = { data: base64, mimeType: selectedImageMime || "image/jpeg" };
      }
    }
    
    if (userMsg.audioUrl && audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const base64 = await blobToBase64(audioBlob);
      audioPayload = { data: base64, mimeType: 'audio/webm' };
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          image: imagePayload,
          audio: audioPayload
        })
      });
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.text || "Desculpe, ocorreu um erro.",
        timestamp: new Date(),
        isSimulated: data.simulated
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      if (autoSpeak) {
        speakResponse(assistantMsg.text, assistantMsg.id);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Desculpe, ocorreu um erro de conexão com o servidor.",
        timestamp: new Date(),
        isSimulated: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsPending(false);
      if (userMsg.audioUrl) {
         setAudioChunks([]);
      }
    }
  };

useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPending]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
      image: selectedImage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setSelectedImage(null);
    setSelectedImageMime(null);
    setIsPending(true);

    sendToBackend(userMsg);
  };

  const speakResponse = (text: string, msgId: string) => {
    if (synth.speaking && isSpeaking === msgId) {
      synth.cancel();
      setIsSpeaking(null);
      return;
    }
    
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    
    const voices = synth.getVoices();
    const ptVoices = voices.filter(v => v.lang.includes('pt'));
    if (ptVoices.length > 0) {
      utterance.voice = ptVoices.find(v => v.name.includes('Google') || v.name.includes('Neural')) || ptVoices[0];
    }

    utterance.rate = 1.1;
    
    utterance.onstart = () => setIsSpeaking(msgId);
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    
    synth.speak(utterance);
  };

  const startRecording = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.onstop = () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
        
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const userMsg: Message = {
          id: Date.now().toString(),
          role: "user",
          text: "🎵 Mensagem de voz gravada via microfone.",
          audioUrl: audioUrl,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMsg]);
        setRecordingSeconds(0);
        sendToBackend(userMsg);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Microphone access error:", err);
      setMicError("Permissão de microfone negada. Clique no cadeado na barra de URL para permitir o uso do microfone na demonstração.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedImageMime(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const IMAGE_PRESETS = [
    { id: 1, name: "Planilha_Vendas.jpg", url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=200&h=200", mimeType: "image/jpeg" },
    { id: 2, name: "Painel_Industrial.jpg", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200&h=200", mimeType: "image/jpeg" },
    { id: 3, name: "Motor_Avaria.jpg", url: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&q=80&w=200&h=200", mimeType: "image/jpeg" }
  ];

  const VOICE_PRESETS = [
    { id: 1, label: `"Oi, qual o custo para integrar meu ERP?"` },
    { id: 2, label: `"Vocês trabalham com CLPs industriais?"` },
    { id: 3, label: `"Tenho um processo de planilha chato para automatizar."` }
  ];

  const handleImagePresetClick = (preset: typeof IMAGE_PRESETS[0]) => {
    setSelectedImage(preset.url);
    setSelectedImageMime(preset.mimeType);
  };

  const triggerVoicePreset = (text: string) => {
    setInputText(text.replace(/"/g, ''));
    setTimeout(() => {
      const e = new Event('submit') as unknown as React.FormEvent;
      handleSendMessage(e);
    }, 100);
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-50/80 backdrop-blur-xl rounded-2xl overflow-hidden font-sans shadow-2xl border border-blue-100/50 relative">
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Chat header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-4 shrink-0 shadow-lg z-10 relative">
        <div className="relative">
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
        </div>
      </div>

      {/* Chat messages area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth z-10 relative">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <div 
                className={`p-4 rounded-2xl shadow-md ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-blue-600/30" 
                    : "bg-white/90 backdrop-blur-md border border-slate-200/60 text-slate-700 rounded-tl-sm shadow-slate-200/50"
                }`}
              >
                {msg.image && (
                  <div className="mb-3 rounded-xl overflow-hidden bg-slate-50 p-1 border border-slate-200 shadow-inner relative group cursor-pointer">
                    <img src={msg.image} alt="Anexo de IA" className="w-full h-auto object-cover max-h-40 rounded-lg transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                )}
                
                {msg.audioUrl && (
                  <div className="mb-3 w-64 bg-black/20 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm border border-white/10">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                    >
                      <AudioLines className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="h-full bg-blue-400 w-full rounded-full"
                      ></motion.div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white/90">AUDIO_DATA</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                {msg.isSimulated && (
                  <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-200/50 pt-2 flex items-center justify-between font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                      Processamento Híbrido
                    </div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                )}
              </div>

              {/* Micro interactions: Timestamp & Voice Speaker */}
              <div className="flex items-center gap-2 mt-2 px-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakResponse(msg.text, msg.id)}
                    className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all px-2.5 py-1 rounded-md border ${
                      isSpeaking === msg.id 
                        ? "bg-blue-100 border-blue-300 text-blue-700" 
                        : "bg-white/80 border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
                    }`}
                  >
                    {isSpeaking === msg.id ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                          <VolumeX className="w-3 h-3" />
                        </motion.div>
                        PARAR
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        OUVIR
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isPending && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-xs text-blue-600 bg-blue-50 w-fit px-4 py-3 rounded-2xl border border-blue-100 shadow-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            <span className="font-bold tracking-tight">Analisando intenção via modelo LLM...</span>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Instant Demo Triggers/Chips (Value injection for fast testing) */}
      <div className="px-5 py-3 bg-white/60 backdrop-blur-md border-t border-slate-200/60 flex flex-col gap-3 z-20 relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Testes Rápidos
          </span>
          
          <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-500 select-none font-bold uppercase tracking-widest hover:text-blue-600 transition-colors bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm hover:border-blue-200">
            <input 
              type="checkbox" 
              checked={autoSpeak} 
              onChange={() => setAutoSpeak(!autoSpeak)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
            />
            Áudio Automático
          </label>
        </div>
        
        {/* Voice Chips */}
        <div className="flex flex-wrap gap-2">
          {VOICE_PRESETS.map(preset => (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              key={preset.id}
              onClick={() => triggerVoicePreset(preset.label)}
              className="text-[11px] font-semibold bg-white text-slate-600 hover:text-blue-700 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left truncate max-w-xs md:max-w-md shadow-sm"
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        {/* Multimodal Images Chips */}
        <div className="flex items-center gap-3 mt-1 bg-white p-2 rounded-xl border border-slate-100 shadow-inner">
          <span className="text-[10px] text-slate-400 font-bold shrink-0 uppercase tracking-widest">VISÃO (ANEXAR):</span>
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full hide-scrollbar">
            {IMAGE_PRESETS.map(preset => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={preset.id}
                onClick={() => handleImagePresetClick(preset)}
                className="text-[11px] font-bold bg-white text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 flex items-center gap-2 shrink-0 transition-all shadow-sm hover:shadow-md"
              >
                <img src={preset.url} alt={preset.name} className="w-5 h-5 rounded bg-slate-100 object-cover border border-slate-200" />
                <span>{preset.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Input box */}
      <div className="p-4 bg-white border-t border-slate-200 z-20 relative">
        {/* Selected Image Thumbnail preview */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              className="flex items-center justify-between bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 shadow-sm mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={selectedImage} alt="Anexo pronto" className="w-12 h-12 object-cover rounded-lg border border-blue-200 shadow-sm" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-blue-900 block font-bold">Análise Visual Ativada</span>
                  <span className="text-[10px] text-blue-600/80 font-mono font-medium">Processamento multimodal pronto</span>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedImage(null); setSelectedImageMime(null); }}
                className="p-2 bg-white hover:bg-red-50 hover:text-red-600 text-slate-400 border border-slate-200 hover:border-red-200 rounded-lg transition-colors shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {micError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-700 flex items-center gap-2 bg-red-50 px-4 py-2.5 rounded-xl border border-red-200 mb-3 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{micError}</span>
          </motion.div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          {/* Audio Recording Button */}
          {isRecording ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={stopRecording}
              className="p-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all flex items-center justify-center relative shadow-[0_4px_14px_0_rgba(239,68,68,0.39)]"
            >
              <span className="absolute -inset-1.5 bg-red-500/30 rounded-xl animate-ping"></span>
              <MicOff className="w-5 h-5 shrink-0 z-10" />
              <span className="ml-2 font-mono text-xs font-bold z-10">{formatTime(recordingSeconds)}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={startRecording}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all flex items-center justify-center shadow-sm relative overflow-hidden group"
              title="Gravar Mensagem de Voz"
            >
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Mic className="w-5 h-5 relative z-10" />
            </motion.button>
          )}

          {/* Text Input */}
          <div className="flex-1 bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100/50 focus-within:bg-white rounded-xl px-4 py-3 flex items-center gap-2 transition-all shadow-inner">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isRecording ? "Gravando áudio..." : "Digite, fale ou anexe imagens..."}
              disabled={isRecording}
              className="bg-transparent flex-1 outline-none text-sm text-slate-900 placeholder-slate-400 disabled:opacity-50 font-medium"
            />
            
            {/* Native Image Upload Trigger */}
            <label className="p-1.5 hover:bg-blue-50 rounded-lg cursor-pointer text-slate-400 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomImageUpload}
                className="hidden"
                disabled={isRecording}
              />
              <Image className="w-4 h-4" />
            </label>
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={(!inputText.trim() && !selectedImage) || isRecording || isPending}
            className="p-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] disabled:shadow-none flex items-center justify-center shrink-0"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
