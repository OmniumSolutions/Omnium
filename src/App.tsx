import React, { useState } from "react";
import { 
  Terminal, ShieldCheck, Zap, Cpu, Settings, ArrowRight, CheckCircle, 
  Layers, Users, Sparkles, MessageSquare, Database, Network, Eye, 
  ExternalLink, Mail, Phone, Building, Briefcase, DollarSign, Clock, HelpCircle, AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import AIDemo from "./components/AIDemo";
import Logo from "./components/Logo";

const fadeIn = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, type: "spring", stiffness: 100 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { staggerChildren: 0.15 }
};

export default function App() {
  // Calculator States
  const [employees, setEmployees] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(25); 
  
  // Lead Form States
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "ia-atendimento",
    projectDescription: "",
    priority: "medio"
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ROI Calculator Calculations
  const dailySavings = employees * hoursPerDay * hourlyRate;
  const monthlySavings = dailySavings * 22; // 22 working days
  const yearlySavings = monthlySavings * 12;
  const hoursSavedMonthly = employees * hoursPerDay * 22;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectDescription) return;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "ia-atendimento",
        projectDescription: "",
        priority: "medio"
      });
    }, 3000);
  };

  const selectService = (serviceKey: string) => {
    setFormData(prev => ({ ...prev, service: serviceKey }));
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-blue-600 selection:text-white flex flex-col overflow-x-hidden">
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center shrink-0 gap-4 shadow-sm"
      >
        <Logo className="py-1" />
        
        <nav className="flex items-center space-x-6 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          <a href="#about" className="hover:text-blue-600 transition-colors">Sobre</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Soluções</a>
          <a href="#roi-calculator" className="hover:text-blue-600 transition-colors">Calculadora ROI</a>
          <a href="#ai-demo" className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
            Demo IA
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://www.workana.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] font-mono font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            Workana Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-flex bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
          >
            Falar com Especialista
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/50 grid grid-cols-1 lg:grid-cols-12 overflow-hidden border-b border-slate-200 relative min-h-[calc(100vh-80px)]">
        {/* Glow Effects */}
        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none"></motion.div>
        
        {/* Left Column: Headline and Positioning */}
        <div className="lg:col-span-6 p-6 sm:p-12 lg:p-20 flex flex-col justify-center relative z-10">
          <motion.div 
            initial="initial"
            animate="whileInView"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Automação e Integração de Elite
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-[4.5rem] font-display font-bold leading-[1.05] tracking-tight text-slate-900">
              Escale seu Atendimento com <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">IA Humanizada.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Reduza custos, automatize processos repetitivos e aumente suas vendas utilizando agentes de inteligência artificial multimodais que compreendem perfeitamente texto, áudio e imagem. Construímos arquiteturas blindadas contra falhas para a sua empresa.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="py-4 px-8 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-700 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Agendar Consultoria
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#ai-demo" 
                className="py-4 px-8 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all hover:shadow-sm hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                Testar Demo de IA
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="pt-10 flex items-center gap-6 text-xs font-semibold text-slate-500 uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <CheckCircle className="w-4 h-4 text-emerald-500" /> Automação Personalizada
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle className="w-4 h-4 text-emerald-500" /> Código 100% Seu
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: AI Live Assistant Demo Container */}
        <div id="ai-demo" className="lg:col-span-6 bg-slate-50/50 backdrop-blur-sm p-6 sm:p-12 lg:p-16 flex flex-col justify-center border-l border-slate-200 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto w-full space-y-6"
          >
            <div className="flex items-center justify-between bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm">
              <div>
                <span className="text-blue-600 font-mono text-[9px] uppercase tracking-widest font-bold block">DEMONSTRAÇÃO ONLINE</span>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                  Live Preview: IA de Atendimento
                </h2>
              </div>
              <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ONLINE
              </span>
            </div>
            
            <div className="shadow-2xl shadow-blue-900/5 rounded-2xl overflow-hidden ring-1 ring-slate-200">
              <AIDemo />
            </div>
          </motion.div>
        </div>

      </section>

      {/* Services Section / Solutions Grid */}
      <section id="services" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-r from-blue-100/50 to-cyan-100/50 blur-[100px] pointer-events-none rounded-full"></div>
        
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
        >
          <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">NOSSAS SOLUÇÕES</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
            Pontes de alto desempenho entre o físico e o digital
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Seja no chão de fábrica de uma metalúrgica, no sistema de segurança automotiva, na automação de processos administrativos na nuvem ou no atendimento de ponta via IA: nossas arquiteturas são desenhadas para durar.
          </p>
        </motion.div>

        {/* Services Bento Grid */}
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          
          {/* Card 1: IA de Atendimento */}
          <motion.div variants={fadeIn} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">IA de Atendimento Humanizado</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chega de menus numéricos travados ("digite 1 para financeiro"). Criamos soluções inteligentes de inteligência artificial natural para WhatsApp e web. Integra suporte a mensagens de áudio, transcrição instantânea de voz e análise inteligente de anexos e imagens.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Generative AI</span>
              <button 
                onClick={() => selectService("ia-atendimento")}
                className="text-xs font-bold text-slate-500 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Automação Inteligente (RPA & Scripts) */}
          <motion.div variants={fadeIn} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Automação Inteligente (RPA)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Substitua a digitação e conferência manual de planilhas. Desenvolvemos robôs autônomos para extração de dados em massa da web (Web Scraping), preenchimento automático de formulários e conciliações de sistemas legados.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">RPA & SCRIPTS</span>
              <button 
                onClick={() => selectService("rpa")}
                className="text-xs font-bold text-slate-500 group-hover:text-indigo-600 flex items-center gap-1 transition-colors"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Integração de Sistemas */}
          <motion.div variants={fadeIn} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Integração de Sistemas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conecte seu CRM, ferramentas internas, e-commerces e bancos de dados legados. Desenvolvemos APIs seguras (REST, SOAP) e gatilhos de Webhooks robustos que sincronizam seus dados em tempo real sem travamentos.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">APIs & WEBHOOKS</span>
              <button 
                onClick={() => selectService("integracao")}
                className="text-xs font-bold text-slate-500 group-hover:text-cyan-600 flex items-center gap-1 transition-colors"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Automação Industrial, Automotiva & Residencial */}
          <motion.div variants={fadeIn} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Automação de Hardware & IoT</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programação de embarcados e CLPs no chão de fábrica. Sincronização de sensores de telemetria industrial ou residencial via protocolos consagrados como Modbus e MQTT diretamente para a nuvem.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">IoT & HARDWARE</span>
              <button 
                onClick={() => selectService("iot")}
                className="text-xs font-bold text-slate-500 group-hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 5: Visão Computacional */}
          <motion.div variants={fadeIn} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Visão Computacional & IA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Processamento visual automatizado com OpenCV ou TensorFlow. Desenvolvemos sistemas inteligentes de monitoramento por imagem para detectar falhas físicas, triagem de controle de qualidade ou leitura ótica (OCR) de painéis físicos.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">COMPUTER VISION</span>
              <button 
                onClick={() => selectService("visao")}
                className="text-xs font-bold text-slate-500 group-hover:text-purple-600 flex items-center gap-1 transition-colors"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 6: Sistemas Customizados */}
          <motion.div variants={fadeIn} className="bg-blue-600 border border-blue-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20 transition-all group relative overflow-hidden duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-sm">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Sistemas sob Medida</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Desenvolvimento completo de ponta a ponta (Frontend, Backend, Banco de dados e infraestrutura em nuvem). Sistemas corporativos internos focados em blindagem contra falhas para otimizar processos analógicos crônicos.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-blue-500/50 relative z-10">
              <span className="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-widest">Custom Systems</span>
              <button 
                onClick={() => selectService("custom-systems")}
                className="text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all"
              >
                Solicitar projeto <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Interactive Tool: Cost & Time Savings Calculator */}
      <section id="roi-calculator" className="bg-slate-50 py-24 px-4 sm:px-8 border-t border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">RETORNO SOBRE O INVESTIMENTO</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 leading-tight">
                Calcule quanto dinheiro sua empresa perde por não automatizar
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tarefas repetitivas drenam o foco de colaboradores qualificados. Ajuste as barras ao lado com as métricas do seu cenário atual e veja a economia que a Omnium Solutions pode gerar integrando robôs inteligentes e scripts de RPA.
              </p>
            </div>
            
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-blue-600">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono text-slate-800">Tratamento Cirúrgico de Exceções</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nossas automações não param de rodar na primeira mudança de layout de uma página web ou instabilidade de rede. Integramos rotinas robustas de log, e-mail de aviso em tempo real e re-tentativa transparente.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 sm:p-12 space-y-10 relative"
          >
            <div className="space-y-8 relative z-10">
              {/* Parameter 1 */}
              <div className="space-y-4 group">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-blue-600">
                  <span>Colaboradores em processos manuais</span>
                  <span className="text-blue-600 font-mono text-sm bg-blue-50 px-2 py-1 rounded-md">{employees} pessoas</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={employees} 
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-100 h-2 rounded-lg cursor-pointer appearance-none outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Parameter 2 */}
              <div className="space-y-4 group">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-blue-600">
                  <span>Horas desperdiçadas por dia</span>
                  <span className="text-blue-600 font-mono text-sm bg-blue-50 px-2 py-1 rounded-md">{hoursPerDay} horas/dia</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={hoursPerDay} 
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-100 h-2 rounded-lg cursor-pointer appearance-none outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Parameter 3 */}
              <div className="space-y-4 group">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-blue-600">
                  <span>Custo médio por hora (Salário + encargos)</span>
                  <span className="text-blue-600 font-mono text-sm bg-blue-50 px-2 py-1 rounded-md">R$ {hourlyRate} / hora</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="200" 
                  value={hourlyRate} 
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-100 h-2 rounded-lg cursor-pointer appearance-none outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            {/* Results Board */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden ring-1 ring-slate-200 relative z-10 shadow-inner">
              
              <div className="bg-slate-50/80 backdrop-blur-sm p-6 text-center transition-colors hover:bg-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-2">Horas Recuperadas / Mês</span>
                <span className="text-3xl font-display font-bold text-slate-900 tracking-tight">{hoursSavedMonthly}h</span>
              </div>

              <div className="bg-slate-50/80 backdrop-blur-sm p-6 text-center transition-colors hover:bg-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-2">Economia Mensal</span>
                <span className="text-3xl font-display font-bold text-blue-600 tracking-tight">R$ {monthlySavings.toLocaleString()}</span>
              </div>

              <div className="bg-blue-50 p-6 text-center transition-colors hover:bg-blue-100/50">
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-600 block mb-2">Retorno Anual Estimado</span>
                <span className="text-3xl font-display font-bold text-emerald-600 tracking-tight">R$ {yearlySavings.toLocaleString()}</span>
              </div>

            </div>

            <div className="text-center pt-2 relative z-10">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
              >
                Garantir esses Resultados
              </button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* About Section / Technical Specs Matrix */}
      <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">SOBRE A OMNIUM SOLUTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 leading-tight">
              Engenharia de Software e Integração de Sistemas
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>
              Nosso foco corporativo é projetar e construir arquiteturas de software altamente robustas e blindadas contra falhas operacionais.
            </p>
            <p>
              Diferentes de consultorias puramente digitais, transitamos com extrema naturalidade pela física do chão de fábrica e da mecânica veicular. Entendemos protocolos industriais (Modbus, MQTT), painéis de CLP e conexões de sensores. Nossa missão é traduzir as necessidades físicas da sua operação em linhas de código eficientes e escaláveis na nuvem.
            </p>
          </div>

          <div className="border border-slate-200 bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">CONTRATE COM SEGURANÇA</span>
              <p className="text-sm font-bold text-slate-900">Garantia total de suporte técnico</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        {/* Tech Matrix Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 sm:p-12 flex flex-col justify-between space-y-10"
        >
          <div className="flex justify-between items-end border-b border-slate-100 pb-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">Matriz Técnica de Especialidades</h4>
              <p className="text-xs text-slate-500 mt-1">Ferramentas que utilizamos para construir nossas soluções robustas.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            <div className="space-y-3 group cursor-default">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">Linguagens de Programação</p>
              </div>
              <p className="text-slate-900 font-bold text-sm">C#, .NET, Python, Node.js, TS</p>
              <p className="text-xs text-slate-500 leading-relaxed">Adequadas para scripts rápidos, APIs seguras ou hardwares embarcados.</p>
            </div>

            <div className="space-y-3 group cursor-default">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">Banco de Dados</p>
              </div>
              <p className="text-slate-900 font-bold text-sm">SQL Server, PostgreSQL, Redis</p>
              <p className="text-xs text-slate-500 leading-relaxed">Modelagem blindada, índices otimizados e consultas de baixa latência.</p>
            </div>

            <div className="space-y-3 group cursor-default">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">Infraestrutura & Cloud</p>
              </div>
              <p className="text-slate-900 font-bold text-sm">AWS, GCP, Docker, Kubernetes</p>
              <p className="text-xs text-slate-500 leading-relaxed">Ambientes isolados e deploy rápido sem interrupções operacionais.</p>
            </div>

            <div className="space-y-3 group cursor-default">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Garantia de Qualidade</p>
              </div>
              <p className="text-slate-900 font-bold text-sm">TDD, Jest, Cypress, Postman</p>
              <p className="text-xs text-slate-500 leading-relaxed">Nenhuma automação vai para o ar sem passar por testes de estresse rigorosos.</p>
            </div>

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 shadow-sm">
            <span className="text-[11px] text-slate-600 font-mono text-center sm:text-left leading-relaxed">
              <span className="text-xl inline-block mr-2 align-middle text-blue-600">🔌</span>
              Ambientes embarcados? Sim: Arduino, ESP32, Raspberry Pi, CLPs.
            </span>
            <a 
              href="https://www.workana.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-700 bg-white hover:text-blue-600 shrink-0 inline-flex items-center gap-1.5 transition-colors border border-slate-200 px-4 py-2 rounded-lg hover:shadow-sm"
            >
              Workana Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 px-4 sm:px-8 py-12 mt-auto border-t border-slate-800 text-[11px] font-mono tracking-widest flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-5">
          <Logo light className="py-1 opacity-80 hover:opacity-100 transition-opacity" />
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-2 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SISTEMAS OPERACIONAIS: ONLINE
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-300">ATENDIMENTO REMOTO GLOBAL</span>
          </div>
        </div>
        
        <div className="text-center md:text-right uppercase space-y-2">
          <p className="text-slate-300 font-bold">© {new Date().getFullYear()} Omnium Solutions — Todos os direitos reservados</p>
          <p className="text-[9px] text-slate-500 font-sans tracking-normal font-medium max-w-sm ml-auto">
            Landing Page desenvolvida de acordo com especificações técnicas. IA humanizada multimodal ativa e pronta.
          </p>
        </div>
      </footer>

      {/* Modal / Dialog for quote request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white border border-slate-200 rounded-[2rem] max-w-xl w-full overflow-hidden shadow-2xl relative"
          >
            
            {/* Header */}
            <div className="border-b border-slate-100 p-6 flex justify-between items-center bg-slate-50">
              <div className="space-y-2">
                <Logo className="scale-90 origin-left" />
                <div className="pt-2">
                  <span className="text-blue-600 font-mono text-[9px] uppercase tracking-widest font-bold block">FORMULÁRIO DE BRIEFING</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Iniciar Projeto de Automação</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-bold text-xs bg-white px-4 py-2 rounded-xl border border-slate-200 transition-colors self-start shadow-sm"
              >
                Fechar
              </button>
            </div>

            {/* Content / Form */}
            <div className="p-6 sm:p-8 space-y-6">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">Briefing enviado com sucesso!</h4>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      A Omnium Solutions recebeu as suas informações de projeto e analisará a viabilidade operacional nas próximas horas.
                    </p>
                  </div>
                  <div className="text-[10px] text-blue-600 font-mono animate-pulse tracking-widest uppercase bg-blue-50 py-2 rounded-lg max-w-xs mx-auto">
                    Enviando dados ao CRM integrado...
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Seu Nome *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Albuquerque"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">E-mail Corporativo *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: carlos@empresa.com.br"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Telefone / WhatsApp</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Nome da Empresa</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Ex: Metalúrgica Alfa Ltda"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Solução Principal Requerida</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all appearance-none shadow-inner"
                      >
                        <option value="ia-atendimento">IA de Atendimento Humanizado (Sem Botões)</option>
                        <option value="rpa">Automação de Tarefas & RPA / Web Scraping</option>
                        <option value="integracao">Integração de Sistemas & APIs</option>
                        <option value="iot">Automação Industrial & IoT</option>
                        <option value="visao">Visão Computacional & IA OpenCV</option>
                        <option value="custom-systems">Desenvolvimento de Sistemas Customizados</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Nível de Urgência</label>
                      <select 
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all appearance-none shadow-inner"
                      >
                        <option value="alto">🚨 Altíssimo (Gargalo de Produção Ativo)</option>
                        <option value="medio">⚡ Moderado (Melhoria de Margens Operacionais)</option>
                        <option value="baixo">🌱 Longo Prazo (Projeto de Inovação de Processos)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">Descrição do Processo Manual Atual *</label>
                    <textarea 
                      name="projectDescription"
                      required
                      rows={3}
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Ex: Atualmente 2 funcionárias passam o dia copiando dados de ordens de serviço de um sistema legado para uma planilha excel..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-inner resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
                  >
                    Enviar Briefing <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
