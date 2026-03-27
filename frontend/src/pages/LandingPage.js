import React, { useState, useEffect } from 'react';
import { 
  Shield, CheckCircle, AlertTriangle, Users, FileText, 
  Clock, Building2, Scan, BarChart3, Bell, Lock, Globe,
  ChevronRight, Mail, MessageCircle, Menu, X,
  ArrowRight, Zap, Target, Award, TrendingUp, Eye,
  HardHat, Sparkles, ChevronLeft, Package, Boxes
} from 'lucide-react';

// Configuração
const API_BASE = '';  // Usa URL relativa para funcionar com o ingress
const WHATSAPP_NUMBER = '5511999999999';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre o GestorEPI.';

// Screenshots do sistema
const SCREENSHOTS = [
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/bfpe8jgc_image.png', 
    title: 'Tela de Login', 
    desc: 'Acesso seguro ao sistema com autenticação por usuário e senha.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/8ydiu5b1_image.png', 
    title: 'Dashboard Principal', 
    desc: 'Visão geral com estatísticas em tempo real, alertas pendentes e métricas de controle.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/mgo2zpvr_image.png', 
    title: 'Cadastro de EPIs', 
    desc: 'Lista completa de EPIs com CA, marca, cor, fornecedor, validade e estoque em tempo real.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/dvvg3yzb_image.png', 
    title: 'Cadastro de Novo EPI', 
    desc: 'Formulário completo com CA, periodicidade de troca, informações de compra e controle de estoque.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/brphrorf_image.png', 
    title: 'Cadastro de Fornecedores', 
    desc: 'Gestão de fornecedores com CNPJ, contato e telefone para rastreamento de compras.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/suc7fvsc_image.png', 
    title: 'Ficha do Colaborador', 
    desc: 'Perfil completo com foto, dados pessoais, setor, cargo e EPIs em uso.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/0sfl60iu_image.png', 
    title: 'Histórico Completo', 
    desc: 'Todas as movimentações registradas com data, hora e porcentagem de verificação facial.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/k9cuda1r_image.png', 
    title: 'Histórico de Entregas', 
    desc: 'Lista completa de entregas com reconhecimento facial (95%, 98% match) e detalhes.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/4rgbb6gq_image.png', 
    title: 'Relatórios Avançados', 
    desc: 'Análises e tendências de uso de EPIs com gráficos de consumo e estoque crítico.' 
  },
  { 
    src: 'https://customer-assets.emergentagent.com/job_multi-epi-control/artifacts/lnstitbj_image.png', 
    title: 'Ficha PDF NR-6', 
    desc: 'Documentação completa para auditoria conforme NR-6, pronta para impressão.' 
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nome: '', empresa: '', telefone: '', mensagem: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ nome: '', empresa: '', telefone: '', mensagem: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3" data-testid="logo">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg shadow-orange-500/20">
                <img src="/logo-gestao-epi.jpg" alt="GestorEPI" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight">Gestor<span className="text-orange-500">EPI</span></span>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Gestão Inteligente</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {['Problema', 'Solução', 'Diferenciais', 'Planos', 'Contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}
                  className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                  data-testid={`nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]"
                data-testid="header-cta"
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </button>
            </div>

            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 absolute w-full">
            <div className="px-4 py-6 space-y-4">
              {['Problema', 'Solução', 'Diferenciais', 'Planos', 'Contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}
                  className="block w-full text-left text-lg font-semibold text-zinc-300 hover:text-white py-2"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white font-bold py-4 px-6 rounded-lg mt-4"
              >
                <MessageCircle className="w-5 h-5" />
                Fale no WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/b892024f-d454-4f6b-8cd4-0af096ea446a/images/332baa2f0044e744acdf6235e849948da2e56262a21e36693dd3073f7a6ceec7.png)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-orange-950/20" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-400">Sistema Multi-Empresa</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Gestão de EPI com{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  reconhecimento facial
                </span>{' '}
                e controle total
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl">
                Controle completo da entrega de EPIs, com rastreabilidade, segurança e conformidade 
                com normas regulamentadoras. Proteja sua empresa e seus colaboradores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contato')}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] group"
                  data-testid="hero-cta-demo"
                >
                  Solicitar Demonstração
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={openWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
                  data-testid="hero-cta-whatsapp"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">LGPD Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Lock className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Dados Seguros</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Globe className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">100% Online</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block flex-1">
              <div className="relative w-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <img
                  src="https://images.pexels.com/photos/7788227/pexels-photo-7788227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Trabalhador com EPI de Segurança"
                  className="relative rounded-2xl shadow-2xl shadow-orange-500/10 border border-white/10 w-full h-auto"
                  data-testid="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="relative py-24 lg:py-32 bg-[#0A0A0A]" data-testid="problem-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-4">O Problema</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Sua empresa está <span className="text-red-500">protegida</span> ou <span className="text-red-500">exposta a riscos</span>?
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Empresas que não possuem controle adequado de EPIs enfrentam riscos sérios que podem comprometer 
              a segurança e a sustentabilidade do negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: 'Falta de Comprovação', desc: 'Sem registros adequados de entrega, sua empresa fica vulnerável em fiscalizações e auditorias.', color: 'red' },
              { icon: AlertTriangle, title: 'Problemas em Auditorias', desc: 'Auditorias trabalhistas revelam falhas no controle, gerando advertências e multas.', color: 'orange' },
              { icon: Target, title: 'Multas Trabalhistas', desc: 'Infrações podem resultar em multas de até R$ 50.000 por colaborador desprotegido.', color: 'red' },
              { icon: Shield, title: 'Processos Judiciais', desc: 'Acidentes sem comprovação de EPI geram processos trabalhistas milionários.', color: 'yellow' },
              { icon: Users, title: 'Segurança Comprometida', desc: 'Colaboradores sem EPIs adequados correm risco de acidentes graves.', color: 'orange' },
              { icon: Clock, title: 'Sem Controle = Sem Garantia', desc: 'Sem sistema de gestão, não há como comprovar conformidade com as normas.', color: 'red' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-[#141414] border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 overflow-hidden"
                data-testid={`problem-card-${i}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#111111]" data-testid="solution-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">A Solução</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              A solução <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">completa</span> para gestão de EPI
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              O GestorEPI oferece todas as ferramentas necessárias para garantir a segurança dos seus colaboradores 
              e a conformidade da sua empresa.
            </p>
          </div>

          <div className="mb-6 p-6 sm:p-8 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Boxes className="w-10 h-10 text-blue-400" />
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">Controle de Estoque Completo</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Gerencie todo o estoque de EPIs com <strong className="text-white">estoque mínimo e máximo</strong>, 
                  alertas automáticos de reposição, controle de <strong className="text-white">validade</strong>, 
                  entradas e saídas, e relatórios de consumo por período.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">Estoque Mínimo</span>
                <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">Alertas Automáticos</span>
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">Controle de Validade</span>
              </div>
            </div>
          </div>

          <div className="mb-12 p-6 sm:p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <div className="w-20 h-20 rounded-2xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-10 h-10 text-purple-400" />
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">Cadastro de Fornecedores e Rastreamento de Compras</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Cadastre todos os seus <strong className="text-white">fornecedores de EPI</strong> com CNPJ, contato e telefone.
                  Vincule cada compra ao fornecedor e tenha <strong className="text-white">rastreabilidade completa</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">Cadastro de Fornecedores</span>
                <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">Nota Fiscal</span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">Rastreamento de Lote</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Cadastro Completo', desc: 'Gestão completa de colaboradores com foto, documentos e histórico.' },
              { icon: HardHat, title: 'Controle de Entregas', desc: 'Registro detalhado de cada entrega e devolução de EPI.' },
              { icon: Scan, title: 'Reconhecimento Facial', desc: 'Validação biométrica para garantir a identidade do colaborador.' },
              { icon: Package, title: 'Gestão de Estoque', desc: 'Controle de entradas, saídas, estoque mínimo/máximo e alertas de reposição.' },
              { icon: TrendingUp, title: 'Cadastro de Fornecedores', desc: 'Gerencie fornecedores e rastreie todas as compras com nota fiscal.' },
              { icon: Zap, title: 'Kits Automáticos', desc: 'Configure kits de EPI por setor para agilizar entregas.' },
              { icon: Bell, title: 'Alertas Inteligentes', desc: 'Notificações de estoque baixo, validade e trocas periódicas.' },
              { icon: Clock, title: 'Troca Periódica', desc: 'Controle automático de periodicidade de substituição.' },
              { icon: FileText, title: 'Relatórios Completos', desc: 'Exportação em PDF e Excel para auditorias e controle.' },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-[#141414] border border-zinc-800 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300"
                data-testid={`solution-card-${i}`}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 lg:py-32 bg-[#111111]" data-testid="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">Como Funciona</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Simples, rápido e <span className="text-orange-500">seguro</span>
            </h2>
          </div>

          {/* Screenshots Gallery */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-3">Veja o Sistema em Ação</h3>
              <p className="text-zinc-400">Navegue pelas telas e conheça todas as funcionalidades do GestorEPI</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-[#0A0A0A] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                  data-testid="main-screenshot"
                >
                  <img
                    src={SCREENSHOTS[currentScreenshot].src}
                    alt={SCREENSHOTS[currentScreenshot].title}
                    className="w-full h-auto transition-opacity duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {SCREENSHOTS[currentScreenshot].title}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Clique para ampliar
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); prevScreenshot(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-orange-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 group"
                  data-testid="prev-screenshot"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextScreenshot(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-orange-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 group"
                  data-testid="next-screenshot"
                >
                  <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>

                <div className="p-6 border-t border-zinc-800 bg-[#0A0A0A]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{SCREENSHOTS[currentScreenshot].title}</h4>
                      <p className="text-zinc-400 text-sm">{SCREENSHOTS[currentScreenshot].desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-500">{currentScreenshot + 1} / {SCREENSHOTS.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 flex-wrap max-w-4xl mx-auto">
              {SCREENSHOTS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentScreenshot(i)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    currentScreenshot === i 
                      ? 'ring-2 ring-orange-500 scale-105' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  data-testid={`thumbnail-${i}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-24 h-16 sm:w-32 sm:h-20 object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Cadastro', desc: 'Cadastre o colaborador com foto e documentos. O sistema captura a biometria facial automaticamente.', icon: Users },
              { step: '02', title: 'Associação ao Setor', desc: 'Vincule o colaborador ao setor de trabalho. O sistema define automaticamente os EPIs obrigatórios.', icon: Building2 },
              { step: '03', title: 'EPIs Obrigatórios', desc: 'O sistema apresenta a lista de EPIs necessários com base no setor e função do colaborador.', icon: HardHat },
              { step: '04', title: 'Entrega com Reconhecimento', desc: 'A entrega é validada com reconhecimento facial, garantindo a identidade do receptor.', icon: Scan },
              { step: '05', title: 'Registro Automático', desc: 'Todas as informações são registradas automaticamente: data, hora, itens e validação.', icon: FileText },
              { step: '06', title: 'Monitoramento em Tempo Real', desc: 'Acompanhe alertas, relatórios e pendências em tempo real pelo dashboard.', icon: BarChart3 },
            ].map((item, i) => (
              <div key={i} className="relative" data-testid={`step-${i}`}>
                <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-8 h-full hover:border-orange-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-black text-orange-500/20">{item.step}</span>
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section id="diferenciais" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#111111] to-[#0A0A0A]" data-testid="differentiators-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">Diferenciais</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
                Por que escolher o <span className="text-blue-500">GestorEPI</span>?
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Nossa solução foi desenvolvida pensando nas necessidades reais das empresas, 
                oferecendo tecnologia de ponta com facilidade de uso.
              </p>

              <div className="space-y-4">
                {[
                  'Reconhecimento facial integrado',
                  'Sistema multiempresa',
                  'Acesso de qualquer lugar',
                  'Controle automático por setor',
                  'Alertas inteligentes',
                  'Histórico completo',
                  'Segurança de dados',
                  'Conformidade com LGPD',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3" data-testid={`diff-${i}`}>
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-3xl blur-3xl" />
              <img
                src="https://images.pexels.com/photos/4981771/pexels-photo-4981771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Trabalhador com EPI"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-24 lg:py-32 bg-[#0A0A0A]" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-500 mb-4">Benefícios</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Transforme a gestão de <span className="text-green-500">segurança</span> da sua empresa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Evita Multas', desc: 'Elimine riscos de multas e problemas legais com documentação completa.', color: 'green' },
              { icon: Users, title: 'Mais Segurança', desc: 'Aumente a segurança dos colaboradores com controle rigoroso.', color: 'blue' },
              { icon: Target, title: 'Menos Erros', desc: 'Reduza erros humanos com automação e validação biométrica.', color: 'orange' },
              { icon: BarChart3, title: 'Controle Total', desc: 'Melhore o controle interno com dashboards em tempo real.', color: 'purple' },
              { icon: FileText, title: 'Auditorias Fáceis', desc: 'Facilite auditorias com relatórios completos e rastreáveis.', color: 'cyan' },
              { icon: Award, title: 'Empresa Profissional', desc: 'Profissionalize sua empresa com gestão moderna e eficiente.', color: 'yellow' },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#141414] to-[#1A1A1A] border border-zinc-800 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                data-testid={`benefit-${i}`}
              >
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#111111]" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">Investimento</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Plano único, <span className="text-orange-500">sem complicação</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Sem limite de colaboradores. Sem taxa por inativos. Sem taxa por CNPJ. Sistema completo liberado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 mb-12">
            {/* 12 months */}
            <div className="bg-[#141414] border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 relative" data-testid="plan-12">
              <div className="absolute -top-3 left-6 bg-green-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Base
              </div>
              <div className="text-center mb-6 pt-2">
                <span className="text-sm font-bold text-green-400 uppercase tracking-wider">12 Meses</span>
                <div className="mt-4">
                  <span className="text-5xl font-black">R$ 560</span>
                  <span className="text-zinc-500">/mês</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Sistema completo liberado', 'Sem limite de colaboradores', 'Sem taxa por inativos', 'Sem taxa por CNPJ', 'Treinamento inicial incluso', 'Suporte padrão'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('contato')}
                className="w-full py-4 px-6 border-2 border-green-500/50 text-green-400 rounded-lg font-bold hover:bg-green-500/10 transition-colors"
              >
                Solicitar Proposta
              </button>
            </div>

            {/* 24 months - Featured */}
            <div className="relative bg-gradient-to-b from-[#1A1A1A] to-[#141414] border-2 border-orange-500 rounded-2xl p-8 shadow-[0_0_50px_rgba(234,88,12,0.25)] lg:scale-105 z-10" data-testid="plan-24">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                Mais Escolhido
              </div>
              <div className="text-center mb-6 pt-2">
                <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">24 Meses</span>
                <div className="mt-4">
                  <span className="text-5xl font-black">R$ 504</span>
                  <span className="text-zinc-500">/mês</span>
                </div>
                <p className="text-sm text-green-500 font-semibold">Economia de 10%</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['Tudo do plano 12 meses', 'Implantação prioritária', 'Logo personalizado no sistema', 'Ícone personalizado (app/sistema)', 'Suporte prioritário', '1 personalização gratuita', '1 treinamento adicional', 'Consultoria inicial de uso'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('contato')}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-lg font-bold transition-all shadow-[0_0_25px_rgba(234,88,12,0.4)]"
              >
                Solicitar Proposta
              </button>
            </div>

            {/* 36 months */}
            <div className="bg-[#141414] border-2 border-red-500/30 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 relative" data-testid="plan-36">
              <div className="absolute -top-3 left-6 bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Melhor Custo-Benefício
              </div>
              <div className="text-center mb-6 pt-2">
                <span className="text-sm font-bold text-red-400 uppercase tracking-wider">36 Meses</span>
                <div className="mt-4">
                  <span className="text-5xl font-black">R$ 448</span>
                  <span className="text-zinc-500">/mês</span>
                </div>
                <p className="text-sm text-green-500 font-semibold">Economia de 20%</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['Tudo do plano 24 meses', 'Implantação EXPRESSA', 'Suporte VIP prioritário', 'Até 6 personalizações gratuitas', 'Consultoria contínua (trimestral)', 'Relatórios personalizados', 'Acompanhamento de implantação', 'Suporte para auditorias'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('contato')}
                className="w-full py-4 px-6 border-2 border-red-500/50 text-red-400 rounded-lg font-bold hover:bg-red-500/10 transition-colors"
              >
                Solicitar Proposta
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">Licença Inicial</h3>
              <p className="text-3xl font-black text-blue-500 mb-2">R$ 1.800</p>
              <p className="text-sm text-zinc-500">Pagamento único</p>
            </div>
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold mb-2">Personalização</h3>
              <p className="text-3xl font-black text-orange-500 mb-2">R$ 599</p>
              <p className="text-sm text-zinc-500">Logo + Domínio próprio</p>
            </div>
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-bold mb-2">Incluso</h3>
              <p className="text-lg font-bold text-green-500 mb-2">Treinamento + Suporte</p>
              <p className="text-sm text-zinc-500">Sem custo adicional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 lg:py-32 bg-[#111111]" data-testid="proof-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-400">Testado e Aprovado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              Sistema testado em <span className="text-green-500">ambiente real</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-12">
              O GestorEPI foi desenvolvido e validado em ambiente real de produção, garantindo 
              desempenho, segurança e confiabilidade para sua empresa.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '< 1s', label: 'Reconhecimento' },
                { value: '100%', label: 'Rastreável' },
                { value: '24/7', label: 'Suporte' },
              ].map((stat, i) => (
                <div key={i} className="text-center" data-testid={`stat-${i}`}>
                  <p className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden" data-testid="final-cta-section">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[#0A0A0A]/90" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Leve sua empresa para o próximo nível de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              controle e segurança
            </span>
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Não deixe a segurança dos seus colaboradores e da sua empresa nas mãos do acaso. 
            Implemente o GestorEPI e tenha controle total.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contato')}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] group"
              data-testid="final-cta-demo"
            >
              Solicitar Demonstração
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
              data-testid="final-cta-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="relative py-24 lg:py-32 bg-[#050505]" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">Contato</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Fale com nossa equipe
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Preencha o formulário ou entre em contato diretamente pelos nossos canais. 
                Estamos prontos para ajudar sua empresa.
              </p>

              <div className="space-y-6">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#141414] border border-zinc-800 rounded-xl hover:border-green-500/50 transition-colors group"
                  data-testid="contact-whatsapp"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-green-400 transition-colors">WhatsApp</p>
                    <p className="text-sm text-zinc-500">Atendimento rápido</p>
                  </div>
                </a>
                <a
                  href="mailto:alexandre_santos@prismaxshop.com.br"
                  className="flex items-center gap-4 p-4 bg-[#141414] border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                  data-testid="contact-email"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-blue-400 transition-colors">E-mail</p>
                    <p className="text-sm text-zinc-500">alexandre_santos@prismaxshop.com.br</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Seu nome"
                    data-testid="form-nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Empresa *</label>
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Nome da empresa"
                    data-testid="form-empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Telefone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="(00) 00000-0000"
                    data-testid="form-telefone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Como podemos ajudar?"
                    data-testid="form-mensagem"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] flex items-center justify-center gap-2"
                  data-testid="form-submit"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Enviado com Sucesso!
                    </>
                  ) : formStatus === 'error' ? (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      Erro ao enviar. Tente novamente.
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src="/logo-gestao-epi.jpg" alt="GestorEPI" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-lg font-bold">Gestor<span className="text-orange-500">EPI</span></span>
                <p className="text-xs text-zinc-500">Sistema Multi-Empresa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
            
            <p className="text-sm text-zinc-500">
              © 2026 GestorEPI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center"
        data-testid="whatsapp-floating"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          data-testid="lightbox-modal"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevScreenshot(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextScreenshot(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-6xl max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={SCREENSHOTS[currentScreenshot].src}
              alt={SCREENSHOTS[currentScreenshot].title}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-white">{SCREENSHOTS[currentScreenshot].title}</h3>
              <p className="text-zinc-400 mt-1">{SCREENSHOTS[currentScreenshot].desc}</p>
              <p className="text-zinc-500 text-sm mt-2">{currentScreenshot + 1} de {SCREENSHOTS.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
