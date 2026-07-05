import React, { useState } from "react";
import { 
  Terminal, ShieldCheck, Cpu, Settings, ArrowRight, CheckCircle, Layers, MessageSquare, Database, Network, Eye, ExternalLink, Mail, Phone, Building, Instagram, ChevronDown, ChevronUp, MessageCircle, Code, Search, PenTool, Rocket
} from "lucide-react";
import { motion } from "motion/react";
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


const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-sm text-slate-600 leading-relaxed">{answer}</p>
      
</motion.div>
    </div>
  );
};

export default function App() {
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



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.projectDescription) return;
    
    // Para hospedagem estática (GitHub Pages), a melhor solução é enviar os dados 
    // direto para o WhatsApp ou E-mail.
    const serviceLabels: Record<string, string> = {
      "ia-atendimento": "IA para Atendimento",
      "automacao-rpa": "Automação Inteligente (RPA)",
      "integracao": "Integração de Sistemas",
      "hardware-iot": "Automação de Hardware & IoT",
      "visao": "Visão Computacional",
      "custom": "Sistemas Customizados"
    };

    const text = `Olá, vim pelo site e gostaria de falar sobre um projeto:
    
*Nome:* ${formData.name}
*Empresa:* ${formData.company || 'Não informada'}
*E-mail:* ${formData.email}
*Telefone:* ${formData.phone || 'Não informado'}

*Serviço de Interesse:* ${serviceLabels[formData.service] || formData.service}
*Prioridade:* ${formData.priority}

*Descrição do Projeto:*
${formData.projectDescription}`;

    const encodedText = encodeURIComponent(text);
    // TODO: Insira o número do WhatsApp da empresa aqui (apenas números, com código do país 55)
    const whatsappNumber = "5573981466703"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

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
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none">
</div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none">
</div>
        
        {/* Left Column: Headline and Positioning */}
        <div className="lg:col-span-12 p-6 sm:p-12 lg:p-20 flex flex-col justify-center items-center text-center relative z-10">
          <motion.div 
            initial="initial"
            animate="whileInView"
            variants={staggerContainer}
            className="space-y-8 flex flex-col items-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Automação e Integração de Elite
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-[4.5rem] font-display font-bold leading-[1.05] tracking-tight text-slate-900">
              Pontes de alto desempenho entre o <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Físico e o Digital.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Seja no chão de fábrica de uma metalúrgica, na automação de processos administrativos na nuvem ou no atendimento de ponta via IA: nossas arquiteturas são desenhadas para durar.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="py-4 px-8 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-700 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Falar com Especialista
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
            
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

        </section>

{/* About Section / Technical Specs Matrix */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-8">
           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Especialistas escolhidos por empresas inovadoras</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Building className="w-6 h-6"/> TechCorp</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Database className="w-6 h-6"/> DataLogistics</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Network className="w-6 h-6"/> Industrial Net</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Rocket className="w-6 h-6"/> Startup Hub</div>
           </div>
        </div>
      </section>

      <section id="services" className="py-24 px-4 sm:px-8 bg-slate-900 w-full relative">
        <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[100px] pointer-events-none rounded-full"></div>
        
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
        >
          <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">ATENDIMENTO DE PONTA</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Escale seu Atendimento com IA Humanizada
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Reduza custos, automatize processos repetitivos e aumente suas vendas utilizando agentes de inteligência artificial multimodais que compreendem perfeitamente texto, áudio e imagem. Construímos arquiteturas blindadas contra falhas para a sua empresa.
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
          <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">IA de Atendimento Humanizado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chega de menus numéricos travados ("digite 1 para financeiro"). Criamos soluções inteligentes de inteligência artificial natural para WhatsApp e web. Integra suporte a mensagens de áudio, transcrição instantânea de voz e análise inteligente de anexos e imagens.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-700/50">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Generative AI</span>
              <button 
                onClick={() => selectService("ia-atendimento")}
                className="text-xs font-bold text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                Saber mais <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          
</motion.div>

          {/* Card 2: Automação Inteligente (RPA & Scripts) */}
          <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Automação Inteligente (RPA)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Substitua a digitação e conferência manual de planilhas. Desenvolvemos robôs autônomos para extração de dados em massa da web (Web Scraping), preenchimento automático de formulários e conciliações de sistemas legados.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-700/50">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">RPA & SCRIPTS</span>
              <button 
                onClick={() => selectService("rpa")}
                className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1 transition-colors"
              >
                Saber mais <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          
</motion.div>

          {/* Card 3: Integração de Sistemas */}
          <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Integração de Sistemas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conecte seu CRM, ferramentas internas, e-commerces e bancos de dados legados. Desenvolvemos APIs seguras (REST, SOAP) e gatilhos de Webhooks robustos que sincronizam seus dados em tempo real sem travamentos.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-700/50">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">APIs & WEBHOOKS</span>
              <button 
                onClick={() => selectService("integracao")}
                className="text-xs font-bold text-slate-400 group-hover:text-cyan-600 flex items-center gap-1 transition-colors"
              >
                Saber mais <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          
</motion.div>

          {/* Card 4: Automação Industrial, Automotiva & Residencial */}
          <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Automação de Hardware & IoT</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Programação de embarcados e CLPs no chão de fábrica. Sincronização de sensores de telemetria industrial ou residencial via protocolos consagrados como Modbus e MQTT diretamente para a nuvem.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-700/50">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">IoT & HARDWARE</span>
              <button 
                onClick={() => selectService("iot")}
                className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                Saber mais <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          
</motion.div>

          {/* Card 5: Visão Computacional */}
          <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all group duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Visão Computacional & IA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Processamento visual automatizado com OpenCV ou TensorFlow. Desenvolvemos sistemas inteligentes de monitoramento por imagem para detectar falhas físicas, triagem de controle de qualidade ou leitura ótica (OCR) de painéis físicos.
              </p>
            </div>
            <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-700/50">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">COMPUTER VISION</span>
              <button 
                onClick={() => selectService("visao")}
                className="text-xs font-bold text-slate-400 group-hover:text-purple-600 flex items-center gap-1 transition-colors"
              >
                Saber mais <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
                Saber mais <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          
</motion.div>

        
</motion.div>
              </div>
      </section>
      {/* Process / How it Works Section */}
      <section id="about" className="py-24 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:sticky lg:top-32"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Especialistas Certificados
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 leading-tight">
                Resolvemos os problemas que sistemas genéricos não dão conta.
              </h2>
            </div>
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Diferente de agências que apenas entregam telas bonitas, nosso time de <strong>Engenharia de Software</strong> vai a fundo. Entendemos protocolos industriais (Modbus, MQTT), criamos integrações complexas (APIs legadas) e aplicamos IA de ponta para reduzir seus custos reais.
              </p>
              <ul className="space-y-3 font-medium text-slate-800">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> +9.000 horas manuais salvas para clientes.</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Código robusto com garantia de estabilidade.</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Soluções sob medida (Customizadas para o seu negócio).</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="space-y-6 relative z-10">
              {/* Testimonial 1 - Clínica Odontológica */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                  "Nossa recepção não dava conta de responder todos os pacientes e fazer os agendamentos, volta e meia os horaios conflitavam. A Omnium implementou uma <strong>IA humanizada no WhatsApp que atende 24h por dia.</strong> Ela verifica horários disponíveis, negocia o melhor horário com o paciente e agenda direto na nossa agenda do Google de forma tão natural que acham que estão falando com nossa recepcionista. Nossa agenda lotou e a equipe parou de apagar incêndios."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                    DR
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Dra. Renata M.</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Gestora | Clínica OdontoVip</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 - Indústria e Visão Computacional */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                  "Na nossa linha de produção, um operador tinha que ficar verificando visualmente os parafusos de cada peça, o que gerava gargalos e falhas humanas por fadiga. A Omnium desenvolveu um sistema de <strong>Visão Computacional que inspeciona as peças em milissegundos e reprova as defeituosas automaticamente.</strong> A velocidade e precisão da linha triplicaram."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                    FS
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Fernando Silva</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Diretor de Qualidade | MetalTech</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 - Delivery Automatizado */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                  "O caos do delivery acabou. A IA humanizada atende no WhatsApp, e quando o PIX cai, <strong>o pedido vai pra cozinha e a comanda imprime sozinha</strong>. Ao bater na botoeira que fica cozinha (que eles desenvolveram tbm), o cliente é avisado no whatsapp que o pedido saiu. Na entrega, o motoboy digita o código do cliente e o sistema faz o PIX da taxa de entrega pra ele na hora!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-sm">
                    MC
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Marcos Costa</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Proprietário | Burger Express</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-full bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
          </motion.div>
        </div>
      </section>
      <section id="process" className="py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">Como Trabalhamos</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
              Do problema à solução em 4 passos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-100 via-blue-500 to-emerald-100 z-0"></div>
            
            {[
              { step: "01", title: "Briefing", desc: "Mapeamos os gargalos e processos lentos da sua operação atual.", icon: <Search className="w-6 h-6"/> },
              { step: "02", title: "Arquitetura", desc: "Desenhamos a solução sob medida, validando segurança e escala.", icon: <PenTool className="w-6 h-6"/> },
              { step: "03", title: "Desenvolvimento", desc: "Criamos a automação ou IA com código robusto e limpo.", icon: <Code className="w-6 h-6"/> },
              { step: "04", title: "Deploy & Setup", desc: "Implementamos no seu ambiente e treinamos sua equipe.", icon: <Rocket className="w-6 h-6"/> }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0 md:space-y-4 group">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-500 mb-1 block">PASSO {s.step}</span>
                  <h3 className="font-bold text-slate-900 text-lg">{s.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 md:mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Tech Matrix Panel */}
      <section id="tech-matrix" className="py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">Nossa Tecnologia</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
              Stack de Alto Desempenho
            </h2>
          </div>
{/* Tech Matrix Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white  p-8 sm:p-12 flex flex-col justify-between space-y-10"
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
              <p className="text-slate-900 font-bold text-sm">SQL PostgreSQL, Redis</p>
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


        
</motion.div>
        </div>

      </section>
{/* FAQ Section */}
      <section className="py-24 px-4 sm:px-8 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-blue-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] block">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="O código-fonte da solução é meu?" 
              answer="Sim. Diferente das plataformas SaaS tradicionais que te prendem a mensalidades vitalícias por usuário, nós desenvolvemos a arquitetura e transferimos 100% da propriedade intelectual para sua empresa." 
            />
            <FAQItem 
              question="Quanto tempo leva para implementar um agente de IA?" 
              answer="Projetos simples de IA para WhatsApp podem ser lançados em 2 a 3 semanas. Ecossistemas complexos com visão computacional e RPA podem levar de 2 a 4 meses, dependendo das integrações." 
            />
            <FAQItem 
              question="E se a tecnologia ficar desatualizada?" 
              answer="Utilizamos stacks modernos (React, Node, Python) e arquiteturas escaláveis. Além disso, oferecemos pacotes de manutenção para garantir que os modelos de IA e as integrações (APIs) continuem funcionando com as versões mais recentes." 
            />
            <FAQItem 
              question="Vocês oferecem suporte para GitHub Pages e ambientes sem servidor?" 
              answer="Sim! Adaptamos a entrega para sua infraestrutura. Se você precisa de aplicações puramente client-side, configuramos tudo via APIs serverless, Cloud Functions ou provedores de Backend as a Service." 
            />
          </div>
        </div>
      </section>



      
      

      

      

      

      
      


      

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 px-4 sm:px-8 py-16 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <Logo light className="py-1 opacity-80 hover:opacity-100 transition-opacity" />

          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-4 text-sm font-sans">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono mb-2">Fale Conosco</h4>
            <a href="mailto:solutionsomnium@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-blue-400" />
              solutionsomnium@gmail.com
            </a>
            <a href="https://instagram.com/solutionsomnium" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Instagram className="w-4 h-4 text-pink-400" />
              @solutionsomnium
            </a>
            <a href="https://wa.me/5573981466703" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-emerald-400" />
              WhatsApp: (73) 98146-6703
            </a>
          </div>
          
          {/* Column 3: Copyright */}
          <div className="text-center md:text-right uppercase space-y-2 font-mono tracking-widest">
            <p className="text-slate-300 font-bold text-[11px]">© {new Date().getFullYear()} Omnium Solutions — Todos os direitos reservados</p>
            <p className="text-[9px] text-slate-500 font-sans tracking-normal font-medium max-w-sm ml-auto">
              Desenvolvemos arquiteturas robustas de automação e integração que impulsionam o seu negócio.
            </p>
          </div>
        </div>
      </footer>

      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5573981466703?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20de%20automa%C3%A7%C3%A3o." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-emerald-600 hover:scale-110 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar no WhatsApp
        </span>
      </a>

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
                    <h4 className="text-xl font-bold text-slate-900">Redirecionando...</h4>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Você está sendo redirecionado para o nosso WhatsApp para continuar o atendimento.
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono animate-pulse tracking-widest uppercase bg-emerald-50 py-2 rounded-lg max-w-xs mx-auto">
                    Abrindo WhatsApp...
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
                    Falar com Especialista <ArrowRight className="w-4 h-4" />
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
