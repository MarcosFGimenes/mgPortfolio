import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Wrench, 
  Truck, 
  Code, 
  Database, 
  Bot, 
  Workflow, 
  FileText, 
  ChevronRight, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  Layers, 
  Activity, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Cpu, 
  Settings, 
  BarChart3, 
  Compass, 
  Smartphone,
  Radio,
  Zap,
  CheckCircle2,
  Menu,
  Gauge,
  Sliders,
  Play,
  Filter,
  Send,
  AlertCircle
} from 'lucide-react';


// --- DATA DEFINITIONS ---

const TRAJECTORY = [
  { year: "2024", label: "Manutenção Industrial", description: "Atuação direta e próxima da operação e manutenção em ambiente industrial." },
  { year: "2025", label: "Aprofundamento em Tecnologia", description: "Evolução dos estudos formais e aplicação prática de algoritmos para solução de gargalos." },
  { year: "2025–2026", label: "Sistemas & Automações Reais", description: "Desenvolvimento e implantação de ferramentas para rotinas operacionais cotidianas." },
  { year: "2026", label: "Gestão de Frotas", description: "Atuação estratégica no controle, manutenção e custos da frota veicular." },
  { year: "2026", label: "Fundação da Rastrek Céu Azul", description: "Criação de um negócio de rastreamento, telemática e controle veicular." },
  { year: "HOJE", label: "Tecnologia + Indústria + Empreendedorismo", description: "Construção contínua de software com base em vivência operacional genuína." }
];

const PROJECTS = [
  {
    id: "inspecoes",
    title: "Sistema de Inspeções",
    subtitle: "Digitalização de checklists e controle de não conformidades",
    problem: "Processos manuais em papel para vistorias geravam perda de histórico, lentidão na identificação de falhas e falta de padronização nas tratativas.",
    solution: "Aplicação digital para preenchimento de checklists em campo, geração instantânea de alertas e apontamento de falhas para correção rápida.",
    tech: ["React", "Node.js", "Database", "REST API"],
    context: "Operação Industrial / Manutenção",
    featured: true,
    category: "Indústria"
  },
  {
    id: "servicos",
    title: "Gestão de Serviços",
    subtitle: "Ciclo completo da demanda operacional",
    problem: "Acompanhar a jornada do problema desde a identificação inicial até a manutenção concluída exigia múltiplos alinhamentos e gerava ruído.",
    solution: "Fluxo estruturado e integrado: Problema → Inspeção → Programação → Manutenção → Conclusão com rastreabilidade total de etapas.",
    tech: ["TypeScript", "React", "PostgreSQL", "Tailwind"],
    context: "Manutenção & PCM",
    featured: true,
    category: "Indústria"
  },
  {
    id: "terceiros",
    title: "Gestão de Terceiros",
    subtitle: "Controle de prestadores de serviço e ordens externas",
    problem: "Falta de visibilidade centralizada sobre o andamento dos serviços executados por empresas contratadas externas.",
    solution: "Mapeamento em tempo real do fluxo: PCM → Lançamento do Serviço → Terceiro Designado → Atualizações de Status → Conferência.",
    tech: ["Next.js", "Node.js", "REST APIs"],
    context: "Planejamento e Controle de Manutenção",
    featured: true,
    category: "Indústria"
  },
  {
    id: "hora-homem",
    title: "Módulo de Hora-Homem",
    subtitle: "Gestão de equipes, empresas e ordens de serviço",
    problem: "Dificuldade em mensurar com exatidão o tempo efetivo dedicado pelas equipes em cada ordem de serviço específica.",
    solution: "Sistema de alocação de horas com vinculo direto entre profissionais, empresas parceiras, tipos de intervenção e ordens operacionais.",
    tech: ["React", "Express", "PostgreSQL"],
    context: "Gestão Operacional",
    featured: false,
    category: "Indústria"
  },
  {
    id: "whatsapp-bot",
    title: "Identificação & Automação via WhatsApp",
    subtitle: "Tecnologia que entende como conversar",
    problem: "Atendimento via mensagem sofria com falta de contexto, ausência de identificação do atendente e dependência extrema de digitação manual.",
    solution: "Integração inteligente com WhatsApp para identificação automática de quem atende, direcionamento contextual e automação de etapas repetitivas.",
    tech: ["Node.js", "WhatsApp API", "Webhooks", "Automation"],
    context: "Atendimento & Operação",
    featured: true,
    category: "Automação"
  },
  {
    id: "agendamento-veiculos",
    title: "Agendamento de Uso de Veículos",
    subtitle: "Organização e controle de utilitários da frota",
    problem: "Conflitos de horários, veículos parados sem reserva ou saídas não autorizadas em frotas corporativas.",
    solution: "Plataforma para solicitação, aprovação e controle do uso de veículos, garantindo transparência na frota.",
    tech: ["React", "Tailwind CSS", "Node.js"],
    context: "Gestão de Frotas",
    featured: false,
    category: "Frotas"
  },
  {
    id: "vizin",
    title: "Vizin — App Comunitário",
    subtitle: "Conectividade local com mapas e geolocalização",
    problem: "Falta de um canal simples e direto para comunicação e avisos geolocalizados entre moradores de uma determinada região.",
    solution: "Aplicativo mobile focado em comunidade local com integração de mapas em tempo real e avisos por proximidade.",
    tech: ["Flutter", "Firebase", "Google Maps API"],
    context: "Produto Próprio / Mobile",
    featured: false,
    category: "Produtos"
  },
  {
    id: "hairflow",
    title: "Hairflow",
    subtitle: "Gestão e agendamento para estabelecimentos de serviço",
    problem: "Agendamentos manuais provocavam choques de agenda, esquecimentos de clientes e desorganização do fluxo de caixa.",
    solution: "Sistema web com agendamento simplificado, controle de horários de profissionais e acompanhamento financeiro básico.",
    tech: ["React", "Firebase", "Tailwind"],
    context: "SaaS / Produto Web",
    featured: false,
    category: "Produtos"
  }
];

const METHODOLOGY_STEPS = [
  { step: "01", title: "ENTENDER", desc: "Ir até a operação, conversar com quem realiza o trabalho e enxergar a dor de perto." },
  { step: "02", title: "MAPEAR", desc: "Desenhar o fluxo real das informações, etapas manuais, gargalos e gargalos ocultos." },
  { step: "03", title: "SIMPLIFICAR", desc: "Eliminar etapas desnecessárias antes mesmo de codificar. Nem todo processo precisa virar tela." },
  { step: "04", title: "CONSTRUIR", desc: "Desenvolver software enxuto, rápido, focado no uso diário e livre de excessos." },
  { step: "05", title: "TESTAR", desc: "Colocar na mão de quem opera, ajustar sob uso real e validar o ganho prático." },
  { step: "06", title: "MELHORAR", desc: "Acompanhar a evolução, colher dados operacionais e aprimorar a ferramenta continuadamente." }
];

const ARTICLES = [
  {
    id: "art-1",
    date: "2026",
    category: "Indústria & Código",
    title: "Por que software industrial falha quando é pensado apenas dentro do escritório",
    excerpt: "Sistemas desenhados sem vivenciar o chão de fábrica geram retrabalho, resistência dos operadores e dados irreais. A solução precisa nascer do processo real.",
    content: "Na rotina da manutenção e da gestão de frotas, aprendi uma lição fundamental: a tela de um computador no escritório aceita qualquer fluxo idealizado, mas o operador com as mãos sujas de graxa ou o motorista na pista só usará a ferramenta se ela for rápida, objetiva e realmente facilitar o seu trabalho. Quando criamos sistemas sem entender o tempo e o ambiente da operação, o resultado é um formulário ignorado ou preenchido de qualquer jeito. O bom software operacional é invisível: ele resolve a dor com o menor número de cliques possível."
  },
  {
    id: "art-2",
    date: "2026",
    category: "Automação",
    title: "A diferença entre automatizar um processo e digitalizar uma bagunça",
    excerpt: "Digitalizar um fluxo burocrático e ineficiente apenas produz burocracia digital rápida. O passo zero é organizar a rotina.",
    content: "Muitas vezes a busca por tecnologia começa com a frase: 'precisamos de um sistema para isso'. No entanto, se o processo manual não possui regras claras, etapas definidas ou responsáveis diretos, colocar um software por cima só vai amplificar o caos. Antes de escrever a primeira linha de código, a verdadeira engenharia consiste em mapear o processo, cortar o que é inútil e padronizar. Só então o código entra como um acelerador e garantidor daquele padrão."
  },
  {
    id: "art-3",
    date: "2026",
    category: "Produtos",
    title: "Rastrek Céu Azul: Aprendizados ao criar um serviço de telemática na prática",
    excerpt: "Conectar hardware de rastreamento, infraestrutura de dados e atendimento humanizado em um mercado competitivo.",
    content: "Construir a Rastrek Céu Azul tem sido o laboratório ideal onde tecnologia, operação física e gestão de negócios se encontram diariamente. Lidar com instalação em veículos, alertas em tempo real de ignição, cercas virtuais e, ao mesmo tempo, gerenciar precificação, suporte e cobrança traz uma perspectiva que nenhum curso teórico consegue entregar. Mostra na prática como a tecnologia se transforma em valor tangível para o cliente final."
  }
];


// Abstract Industry-to-Business Schematic Component for Hero
function HeroSchematic() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { title: "INDÚSTRIA", code: "01_OP", desc: "Maquinas, Frotas, Manutenção, Processos de Campo", icon: Wrench },
    { title: "DADOS", code: "02_DT", desc: "Telemetria, Checklists, Apontamentos, Horas", icon: Activity },
    { title: "SOFTWARE", code: "03_SW", desc: "Sistemas Web, APIS, Automações, Dashboards", icon: Code },
    { title: "NEGÓCIO", code: "04_BZ", desc: "Decisão, Eficiência, Rastrek, Redução de Custos", icon: BarChart3 }
  ];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 text-neutral-100 font-mono relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
      
      <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 text-xs text-neutral-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-widest uppercase">SCHEMATIC ENGINE V2.6</span>
        </div>
        <div className="hidden sm:block text-neutral-500">SYSTEM ARCHITECTURE // MARCOS GIMENES</div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isActive = activeNode === idx;
          return (
            <div
              key={node.code}
              onClick={() => setActiveNode(idx)}
              className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 relative ${
                isActive
                  ? 'bg-neutral-800/90 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.15)] text-white'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              {idx < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-neutral-600">
                  <ChevronRight size={16} />
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {node.code}
                </span>
                <Icon size={18} className={isActive ? 'text-sky-400' : 'text-neutral-500'} />
              </div>

              <div className="text-sm font-bold tracking-tight text-neutral-100 mb-1">
                {node.title}
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-400 font-sans">
                {node.desc}
              </p>

              {isActive && (
                <div className="mt-3 pt-2 border-t border-neutral-700/60 flex items-center justify-between text-[10px] text-sky-400 font-mono">
                  <span>STATUS: ACTIVE</span>
                  <span className="animate-pulse">● FLOWING</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-sans gap-2">
        <div className="flex items-center space-x-2">
          <Workflow size={14} className="text-sky-400" />
          <span className="font-mono text-[11px] text-neutral-300">
            METODOLOGIA: <span className="text-sky-400">ENTENDER</span> → <span className="text-sky-400">MAPEAR</span> → <span className="text-sky-400">CONSTRUIR</span>
          </span>
        </div>
        <div className="text-[11px] font-mono text-neutral-500">
          TECNOLOGIA A SERVIÇO DA OPERAÇÃO
        </div>
      </div>
    </div>
  );
}

function IndustrialFlowSimulator() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "1. Ocorrência em Campo",
      desc: "Operador identifica ruído ou desvio no equipamento/veículo durante a rotina operacional.",
      output: "STATUS: Falha detectada pelo operador",
      badge: "CHÃO DE FÁBRICA",
      badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
    },
    {
      id: 2,
      title: "2. Registro no App de Inspeção",
      desc: "Preenchimento do checklist digital direto no smartphone com foto e classificação de gravidade.",
      output: "PAYLOAD: { id: 'INSP-894', severidade: 'ALTA', anexos: 2 }",
      badge: "SISTEMA REACT / MOBILE",
      badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30"
    },
    {
      id: 3,
      title: "3. Disparo & Notificação Automática",
      desc: "Webhook processa a não conformidade e notifica o responsável no WhatsApp com identificação clara do atendente.",
      output: "BOT: 'Novo chamado urgente #894 direcionado para Oficina 02'",
      badge: "AUTOMAÇÃO / BOT",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    },
    {
      id: 4,
      title: "4. Programação PCM & Resolução",
      desc: "Ordem de serviço gerada, peça reservada, HH contabilizado e status concluído com rastreabilidade.",
      output: "DASHBOARD: Tempo de resposta otimizado e histórico centralizado.",
      badge: "GESTÃO DE MANUTENÇÃO",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
    }
  ];

  return (
    <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center space-x-2">
          <Play size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-neutral-200 font-bold uppercase tracking-wider">SIMULADOR DE FLUXO OPERACIONAL</span>
        </div>
        <span className="text-neutral-500 text-[10px]">INTERATIVO</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === idx 
                ? 'bg-neutral-800 border-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.2)]' 
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            <span className={`text-[9px] px-1.5 py-0.5 rounded border ${s.badgeColor} block mb-2 w-max font-bold`}>
              {s.badge}
            </span>
            <div className="font-bold text-neutral-200 text-[11px]">{s.title}</div>
          </button>
        ))}
      </div>

      <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-sky-400 font-bold">{steps[activeStep].title}</span>
          <span className="text-neutral-500">ETAPA {activeStep + 1} DE 4</span>
        </div>
        <p className="text-neutral-300 font-sans text-xs leading-relaxed">
          {steps[activeStep].desc}
        </p>
        <div className="pt-2 border-t border-neutral-800 text-[10px] text-emerald-400 flex items-center space-x-2">
          <span>CONSOLE:</span>
          <span className="bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 font-mono text-neutral-300 flex-1 overflow-x-auto">
            {steps[activeStep].output}
          </span>
        </div>
      </div>
    </div>
  );
}

function RastrekTelemetryWidget() {
  const [ignition, setIgnition] = useState(true);
  const [locked, setLocked] = useState(false);
  const [speed, setSpeed] = useState(64);
  const [fenceActive, setFenceActive] = useState(true);

  return (
    <div className="bg-neutral-950 rounded-xl p-5 border border-amber-500/30 text-white font-mono space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center space-x-2">
          <Gauge size={16} className="text-amber-500" />
          <span className="text-xs font-bold uppercase text-amber-400">PAINEL DE TELEMETRIA AO VIVO (SIMULADOR)</span>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
          VEÍCULO #042 - CÉU AZUL
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-1">
          <span className="text-[10px] text-neutral-400 block">IGNIÇÃO</span>
          <button 
            onClick={() => {
              setIgnition(!ignition);
              if (!ignition) setSpeed(0);
              else setSpeed(55);
            }}
            className={`px-2 py-1 text-[10px] font-bold rounded w-full border transition-colors ${
              ignition 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
            }`}
          >
            {ignition ? '● LIGADA' : '○ DESLIGADA'}
          </button>
        </div>

        <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-1">
          <span className="text-[10px] text-neutral-400 block">BLOQUEIO REMOTO</span>
          <button 
            onClick={() => {
              setLocked(!locked);
              if (!locked) {
                setIgnition(false);
                setSpeed(0);
              }
            }}
            className={`px-2 py-1 text-[10px] font-bold rounded w-full border transition-colors ${
              locked 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' 
                : 'bg-neutral-800 text-neutral-300 border-neutral-700'
            }`}
          >
            {locked ? '🔒 BLOQUEADO' : '🔓 LIBERADO'}
          </button>
        </div>

        <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-1">
          <span className="text-[10px] text-neutral-400 block">CERCA VIRTUAL</span>
          <button 
            onClick={() => setFenceActive(!fenceActive)}
            className={`px-2 py-1 text-[10px] font-bold rounded w-full border transition-colors ${
              fenceActive 
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' 
                : 'bg-neutral-800 text-neutral-400 border-neutral-700'
            }`}
          >
            {fenceActive ? '🛡 ATIVA (RAIO 5km)' : 'INATIVA'}
          </button>
        </div>

        <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-1">
          <span className="text-[10px] text-neutral-400 block">VELOCIDADE ESTIMADA</span>
          <div className="text-sm font-bold text-neutral-100 pt-0.5">
            {ignition && !locked ? `${speed} km/h` : '0 km/h'}
          </div>
        </div>
      </div>

      <div className="bg-neutral-900/90 p-3 rounded border border-neutral-800 text-[10px] flex items-center justify-between text-neutral-400">
        <div className="flex items-center space-x-2">
          <Radio size={12} className={ignition ? 'text-emerald-400 animate-pulse' : 'text-neutral-600'} />
          <span>STATUS DA TELEMETRIA: {locked ? 'ALERTA DE BLOQUEIO ATIVADO' : ignition ? 'TRANSMITINDO DADOS EM TEMPO REAL' : 'SISTEMA EM STANDBY'}</span>
        </div>
        <span className="hidden sm:inline text-neutral-500">LATÊNCIA: 14ms</span>
      </div>
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectCategory, setProjectCategory] = useState('Todos');
  const [selectedIssue, setSelectedIssue] = useState('Processos Manuais / Papel');

  const categories = ['Todos', 'Indústria', 'Automação', 'Frotas', 'Produtos'];

  const filteredProjects = projectCategory === 'Todos' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === projectCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('marcosgimenesdev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const issuesList = [
    "Processos Manuais / Papel",
    "Falta de Visibilidade de Frotas",
    "Comunicação Lenta no WhatsApp",
    "Desenvolvimento de Sistema Sob Medida",
    "Rastreamento e Telemática Veicular"
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono text-sm tracking-tighter font-bold uppercase flex items-center space-x-2 text-neutral-900 hover:text-sky-700 transition-colors">
            <span className="w-2.5 h-2.5 bg-neutral-900 rounded-sm" />
            <span>MARCOS GIMENES</span>
          </a>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono font-medium text-neutral-600">
            <a href="#trajetoria" className="hover:text-neutral-900 transition-colors">TRAJETÓRIA</a>
            <a href="#lar" className="hover:text-neutral-900 transition-colors">INDÚSTRIA & LAR</a>
            <a href="#projetos" className="hover:text-neutral-900 transition-colors">O QUE CONSTRUO</a>
            <a href="#rastrek" className="hover:text-amber-600 transition-colors">RASTREK</a>
            <a href="#como-trabalho" className="hover:text-neutral-900 transition-colors">PROCESSO</a>
            <a href="#notas" className="hover:text-neutral-900 transition-colors">NOTAS</a>
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href="#contato"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors"
            >
              <span>FALAR COMIGO</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Alternar Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 bg-[#F8F9FA] px-4 py-4 space-y-3 font-mono text-xs text-neutral-700">
            <a href="#trajetoria" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-neutral-900">TRAJETÓRIA</a>
            <a href="#lar" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-neutral-900">INDÚSTRIA & LAR</a>
            <a href="#projetos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-neutral-900">O QUE CONSTRUO</a>
            <a href="#rastrek" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-amber-600 font-bold">RASTREK CÉU AZUL</a>
            <a href="#como-trabalho" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-neutral-900">PROCESSO</a>
            <a href="#notas" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-neutral-900">NOTAS</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="block pt-2 text-sky-700 font-bold">CONTATO →</a>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32 py-12 sm:py-16">
        
        {/* HERO SECTION */}
        <section className="space-y-10 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-200/70 border border-neutral-300 text-neutral-800 text-xs font-mono rounded-full">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <span>ENGENHARIA, SOFTWARE & OPERAÇÃO INDUSTRIAL</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 uppercase font-sans leading-[1.08]">
              MARCOS GIMENES
            </h1>
            <p className="text-2xl sm:text-3xl font-medium text-neutral-800 leading-tight">
              Tecnologia para problemas que existem de verdade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-8 text-neutral-700 text-base sm:text-lg leading-relaxed space-y-3">
              <p>
                Desenvolvo sistemas, automações e produtos digitais enquanto vivo diariamente os desafios de uma operação industrial.
              </p>
              <p className="text-neutral-500 font-mono text-sm pt-1 border-l-2 border-sky-600 pl-3">
                Entre código, indústria, manutenção, frotas e empreendedorismo.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between space-y-4 pt-2 md:pt-0">
              <div className="flex flex-col space-y-2">
                <a
                  href="#trajetoria"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-neutral-900 text-white rounded font-mono text-xs font-medium hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>CONHECER MINHA TRAJETÓRIA</span>
                  <ChevronRight size={14} />
                </a>
                <a
                  href="#projetos"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-white border border-neutral-300 text-neutral-800 rounded font-mono text-xs font-medium hover:bg-neutral-100 transition-colors"
                >
                  <span>VER O QUE EU CONSTRUO</span>
                  <ChevronRight size={14} />
                </a>
              </div>

              <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-neutral-600 border-t border-neutral-200">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors flex items-center space-x-1">
                  <span>GitHub</span>
                  <ArrowUpRight size={11} />
                </a>
                <span>/</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors flex items-center space-x-1">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} />
                </a>
                <span>/</span>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors flex items-center space-x-1">
                  <span>WhatsApp</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <HeroSchematic />
          </div>
        </section>

        {/* QUEM SOU SECTION */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">01 // VISÃO DE MUNDO</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                Não comecei tentando criar produtos. Comecei tentando resolver problemas.
              </h2>
            </div>

            <div className="lg:col-span-8 text-neutral-700 text-base leading-relaxed space-y-4 font-sans">
              <p className="text-lg text-neutral-900 font-medium">
                Minha trajetória profissional começou próxima da operação industrial e da manutenção. Com o tempo, a tecnologia passou a ocupar cada vez mais espaço na minha forma de pensar e resolver problemas.
              </p>
              <p>
                Hoje transito entre dois mundos que normalmente aparecem separados: a operação e a tecnologia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-white border border-neutral-200 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-neutral-900 font-mono text-xs font-bold uppercase">
                    <Wrench size={16} className="text-neutral-700" />
                    <span>LADO OPERACIONAL</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Acompanho manutenção, equipamentos, veículos, processos e gestão de frotas dentro de uma operação industrial real.
                  </p>
                </div>

                <div className="p-4 bg-white border border-neutral-200 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-neutral-900 font-mono text-xs font-bold uppercase">
                    <Code size={16} className="text-sky-600" />
                    <span>LADO TECNOLÓGICO</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Desenvolvo sistemas, automações, aplicações web, integrações e soluções sob medida utilizando tecnologia moderna.
                  </p>
                </div>
              </div>
              <p className="text-neutral-900 font-medium font-mono text-sm bg-neutral-100 p-3 rounded border border-neutral-200">
                "Essa combinação acabou se tornando uma das principais características do meu trabalho."
              </p>
            </div>
          </div>
        </section>

        {/* TRAJETÓRIA SECTION */}
        <section id="trajetoria" className="border-t border-neutral-200 pt-16">
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">02 // EVOLUÇÃO</span>
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">Minha Trajetória</h2>
              </div>
              <p className="text-xs font-mono text-neutral-500 max-w-xs">
                Linha do tempo sem floreios: da prática em campo ao desenvolvimento e negócios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRAJECTORY.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg border border-neutral-200 flex flex-col justify-between hover:border-neutral-400 transition-colors relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold px-2 py-0.5 bg-neutral-900 text-white rounded">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">MARCOS GIMENES</span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 pt-1">
                      {item.label}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-neutral-700">
                    <span>FASE {index + 1}</span>
                    <span>●</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LAR COOPERATIVA & SIMULATOR SECTION */}
        <section id="lar" className="border-t border-neutral-200 pt-16">
          <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-6 sm:p-10 lg:p-12 space-y-10 relative overflow-hidden shadow-xl">
            
            <div className="space-y-4 max-w-3xl relative z-10">
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-bold">
                EXPERIÊNCIA INDUSTRIAL // LAR COOPERATIVA AGROINDUSTRIAL
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
                Na indústria, aprendi que software só é bom quando resolve o problema de quem está na operação.
              </h2>
            </div>

            <div className="relative z-10 inline-flex flex-wrap items-center gap-3 bg-neutral-800/80 p-3 rounded-lg border border-neutral-700 text-xs font-mono">
              <span className="text-neutral-400">EVOLUÇÃO NA LAR:</span>
              <span className="text-neutral-200 font-bold px-2 py-1 bg-neutral-700 rounded">Auxiliar de Manutenção</span>
              <ChevronRight size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold px-2 py-1 bg-emerald-950 border border-emerald-800 rounded">Gestão de Frotas</span>
            </div>

            <div className="relative z-10 space-y-3">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                VIVÊNCIA DIÁRIA & DESAFIOS OPERACIONAIS PRÁTICOS:
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {[
                  "manutenção preventiva", "manutenção preditiva", "manutenção corretiva",
                  "veículos", "máquinas", "checklists", "quilometragem", "despesas",
                  "programação", "terceiros", "relatórios", "Excel", "sistemas internos",
                  "acompanhamento de serviços"
                ].map((tag, i) => (
                  <span 
                    key={i}
                    className="px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded border border-neutral-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* LAR + TECH FLOW PIPELINE & INTERACTIVE SIMULATOR */}
            <div className="relative z-10 pt-6 border-t border-neutral-800 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  LAR + TECNOLOGIA: FLUXO DE TRANSFORMAÇÃO & SIMULAÇÃO
                </h3>
                <p className="text-xs text-neutral-400">
                  Como a vivência no chão da operação molda o desenvolvimento de software útil.
                </p>
              </div>

              <IndustrialFlowSimulator />
            </div>

          </div>
        </section>

        {/* ESTUDOS SECTION */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">03 // FORMAÇÃO TÉCNICA</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">
                Duas áreas diferentes. Uma mesma direção.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="text-xs font-mono font-bold text-sky-700 uppercase">CURSO SUPERIOR</span>
                    <span className="text-xs font-mono font-bold text-neutral-400">UNIVEL</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Análise e Desenvolvimento de Sistemas</h3>
                    <p className="text-xs font-mono text-neutral-500 mt-1">SISTEMAS & ENGENHARIA DE SOFTWARE</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-neutral-700">
                    {["Software", "Programação", "Backend", "Frontend", "Banco de dados", "APIs"].map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-neutral-500 font-mono pt-4 border-t border-neutral-100">
                  FOCO: Arquitetura, código sustentável e integração.
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase">FORMAÇÃO TÉCNICA</span>
                    <span className="text-xs font-mono font-bold text-neutral-400">SENAI</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Eletromecânica</h3>
                    <p className="text-xs font-mono text-neutral-500 mt-1">AUTOMAÇÃO INDUSTRIAL & HARDWARE</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-neutral-700">
                    {["Manutenção", "Elétrica", "Mecânica", "Máquinas", "Automação", "Indústria"].map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-neutral-500 font-mono pt-4 border-t border-neutral-100">
                  FOCO: Equipamentos, processos físicos e diagnóstico.
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-xl border border-neutral-200 text-center max-w-3xl mx-auto space-y-2">
              <div className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
                SOFTWARE ↔ INDÚSTRIA
              </div>
              <p className="text-base sm:text-lg text-neutral-800 font-medium italic">
                "Enquanto um lado me ensina a construir sistemas, o outro me ensina a entender as máquinas, processos e pessoas que utilizam esses sistemas."
              </p>
            </div>
          </div>
        </section>

        {/* PROJETOS SECTION WITH CATEGORY FILTER */}
        <section id="projetos" className="border-t border-neutral-200 pt-16">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">04 // PROJETOS & SOLUÇÕES</span>
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">
                  Eu não começo pelo código. Começo pelo problema.
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500 max-w-xs">
                Sistemas e ferramentas apresentados como histórias de contexto e solução.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-neutral-200 pb-4">
              <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center space-x-1">
                <Filter size={12} />
                <span>FILTRAR:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                    projectCategory === cat
                      ? 'bg-neutral-900 text-white font-bold'
                      : 'bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={`bg-white rounded-xl border transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                    proj.featured 
                      ? 'border-neutral-300 shadow-sm hover:border-neutral-500' 
                      : 'border-neutral-200 hover:border-neutral-300 opacity-95'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded border border-neutral-200 uppercase">
                        {proj.context}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {proj.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">{proj.title}</h3>
                      <p className="text-xs font-mono text-neutral-500 mt-1">{proj.subtitle}</p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs leading-relaxed">
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200/80 space-y-1">
                        <span className="font-mono text-[10px] font-bold text-rose-700 uppercase block">PROBLEMA REAL</span>
                        <p className="text-neutral-700">{proj.problem}</p>
                      </div>

                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200/80 space-y-1">
                        <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase block">SOLUÇÃO CONSTRUÍDA</span>
                        <p className="text-neutral-700">{proj.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-neutral-600">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveProject(proj)}
                      className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-neutral-900 hover:text-sky-700"
                    >
                      <span>DETALHES</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* WHATSAPP AUTOMATION SPOTLIGHT */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 space-y-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-emerald-700 tracking-wider uppercase font-bold">
                AUTOMAÇÃO & INTERACTION DESIGN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Tecnologia também precisa saber conversar.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Integração inteligente via WhatsApp para identificação de atendente, automação de respostas operacionais e redução extrema de trabalho repetitivo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100 text-xs font-mono">
              <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                <MessageSquare size={18} className="text-emerald-600" />
                <div className="font-bold text-neutral-900">IDENTIFICAÇÃO DE ATENDENTE</div>
                <p className="text-neutral-600 font-sans text-[11px]">
                  Rastreabilidade clara de quem está interagindo, eliminando mensagens anônimas na equipe.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                <Bot size={18} className="text-sky-600" />
                <div className="font-bold text-neutral-900">AUTOMAÇÃO CONTEXTUAL</div>
                <p className="text-neutral-600 font-sans text-[11px]">
                  Envio de confirmações, dados operacionais e chamados sem intervenção manual contínua.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                <Zap size={18} className="text-amber-600" />
                <div className="font-bold text-neutral-900">REDUÇÃO DE ERRO HUMANO</div>
                <p className="text-neutral-600 font-sans text-[11px]">
                  Padronização do formato de entrada de dados para alimentar os sistemas internos sem atrito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RASTREK CÉU AZUL WITH LIVE TELEMETRY WIDGET */}
        <section id="rastrek" className="border-t border-neutral-200 pt-16">
          <div className="bg-[#0f1115] text-white rounded-2xl p-6 sm:p-10 lg:p-12 space-y-12 border border-neutral-800 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono rounded">
                  <Radio size={12} className="animate-pulse" />
                  <span>NEGÓCIO PRÓPRIO // TELEMÁTICA VEICULAR</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
                  RASTREK CÉU AZUL
                </h2>
                <p className="text-lg text-amber-400/90 font-medium">
                  Tecnologia, veículos e empreendedorismo na prática.
                </p>
              </div>

              <div className="text-xs font-mono text-neutral-400 max-w-xs space-y-1">
                <div>OPERAÇÃO DE RASTREAMENTO</div>
                <div className="text-neutral-300">Construção contínua de um serviço de gestão e segurança veicular.</div>
              </div>
            </div>

            {/* LIVE TELEMETRY WIDGET */}
            <RastrekTelemetryWidget />

            <div className="space-y-4">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                RECURSOS DA PLATAFORMA & ATUAÇÃO OPERACIONAL:
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {[
                  { label: "Rastreamento 24h", icon: MapPin },
                  { label: "Localização em Tempo Real", icon: Compass },
                  { label: "Bloqueio Remoto", icon: ShieldAlert },
                  { label: "Cerca Virtual", icon: Layers },
                  { label: "Alertas de Ignição", icon: Zap },
                  { label: "Controle de Jornadas", icon: Clock },
                  { label: "Relatórios de Rotas", icon: FileText },
                  { label: "Assistência & Suporte", icon: Smartphone }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-neutral-900/80 p-3 rounded border border-neutral-800 flex items-center space-x-2.5">
                      <Icon size={16} className="text-amber-500 shrink-0" />
                      <span className="text-neutral-200 text-[11px]">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                NAVEGAÇÃO DE NEGÓCIO: DA OPORTUNIDADE À OPERAÇÃO
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-mono">
                {[
                  { step: "01", title: "OPORTUNIDADE", text: "Identificação de demanda na região." },
                  { step: "02", title: "CONSTRUÇÃO", text: "Identidade, planos, suporte e infraestrutura." },
                  { step: "03", title: "OPERAÇÃO", text: "Instalação, clientes, faturamento e pós-venda." },
                  { step: "04", title: "APRENDIZADO", text: "Vendas, precificação e suporte diário." },
                  { step: "05", title: "PRÓXIMOS PASSOS", text: "Expansão da base de veículos rastreados." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-neutral-900/90 p-3 rounded border border-neutral-800 space-y-1.5">
                    <span className="text-[10px] text-amber-500 font-bold block">{item.step}</span>
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CONEXÃO TRÍPLICE SECTION */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">
                05 // ESTRUTURA CENTRAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                A Conexão Entre os Três Pilares
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center font-mono font-bold text-xs mx-auto border border-neutral-300">
                  01
                </div>
                <h3 className="font-extrabold text-base text-neutral-900 font-mono uppercase">LAR COOPERATIVA</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  Onde aprendi a enxergar problemas reais do chão de fábrica, máquinas e gestão de frotas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono font-bold text-xs mx-auto border border-sky-300">
                  02
                </div>
                <h3 className="font-extrabold text-base text-neutral-900 font-mono uppercase">TECNOLOGIA</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  Onde aprendi a transformar problemas complexos em software, automações e fluxos digitais.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-mono font-bold text-xs mx-auto border border-amber-300">
                  03
                </div>
                <h3 className="font-extrabold text-base text-neutral-900 font-mono uppercase">RASTREK CÉU AZUL</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  Onde comecei a transformar tecnologia e experiência veicular em um negócio próprio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMO TRABALHO SECTION */}
        <section id="como-trabalho" className="border-t border-neutral-200 pt-16">
          <div className="space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">06 // METODOLOGIA</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">
                Eu começo pelo problema.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {METHODOLOGY_STEPS.map((m) => (
                <div key={m.step} className="bg-white p-6 rounded-xl border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      ETAPA {m.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 font-mono">{m.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FERRAMENTAS SECTION */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">07 // FERRAMENTAS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Tecnologia como ferramenta, não como identidade.
              </h2>
              <p className="text-xs font-mono text-neutral-500 max-w-xl">
                Linguagens e infraestruturas utilizadas conforme a necessidade da solução.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                <div className="font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center justify-between">
                  <span>DESENVOLVIMENTO</span>
                  <Code size={14} className="text-neutral-400" />
                </div>
                <div className="space-y-2 text-neutral-700">
                  {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Flutter"].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-sky-600">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                <div className="font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center justify-between">
                  <span>DADOS / INFRA</span>
                  <Database size={14} className="text-neutral-400" />
                </div>
                <div className="space-y-2 text-neutral-700">
                  {["Firebase", "Firestore", "MongoDB", "REST APIs", "Vercel"].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-emerald-600">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                <div className="font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center justify-between">
                  <span>AUTOMAÇÃO & IA</span>
                  <Bot size={14} className="text-neutral-400" />
                </div>
                <div className="space-y-2 text-neutral-700">
                  {["Inteligência Artificial", "Automação de Processos", "Integrações WhatsApp", "Processamento de Dados"].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-amber-600">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTAS SECTION */}
        <section id="notas" className="border-t border-neutral-200 pt-16">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-sky-700 tracking-wider uppercase font-bold">08 // EDITORIAL</span>
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900">
                  Notas de quem constrói
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Reflexões sobre código, indústria, produtos e automação.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ARTICLES.map((art) => (
                <article 
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4 flex flex-col justify-between cursor-pointer hover:border-neutral-400 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="text-sky-700 font-bold">{art.category}</span>
                      <span>{art.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-bold text-neutral-900">
                    <span>LER NOTA</span>
                    <ArrowUpRight size={14} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO SECTION WITH INTERACTIVE PROBLEM SELECTOR */}
        <section id="contato" className="border-t border-neutral-200 pt-16">
          <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 space-y-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">
                VAMOS CONVERSAR?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Vamos conversar sobre um problema?
              </h2>
              <p className="text-neutral-300 text-base leading-relaxed">
                Se você tem um processo manual, uma ideia de sistema ou um problema real que pode ser resolvido com tecnologia, podemos conversar.
              </p>
            </div>

            {/* Interactive Issue Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                QUAL É O SEU GARGALO PRINCIPAL? (OPCIONAL)
              </label>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {issuesList.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => setSelectedIssue(issue)}
                    className={`px-3 py-1.5 rounded border transition-colors ${
                      selectedIssue === issue
                        ? 'bg-sky-600 text-white border-sky-500 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Copy Email & Dynamic Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="bg-neutral-950 border border-neutral-800 px-4 py-3 rounded text-sm font-mono text-neutral-200 flex-1 flex items-center justify-between">
                <span>marcosgimenesdev@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center space-x-1 pl-2"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:marcosgimenesdev@gmail.com?subject=Contato via Site - Marcos Gimenes (${encodeURIComponent(selectedIssue)})`}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail size={16} />
                <span>ENVIAR E-MAIL</span>
              </a>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex flex-wrap gap-6 text-xs font-mono text-neutral-400">
              <a 
                href={`https://wa.me/5500000000000?text=${encodeURIComponent(`Olá Marcos, vim pelo seu site. Gostaria de conversar sobre: ${selectedIssue}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1 text-emerald-400"
              >
                <span>WhatsApp (Direto com contexto)</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-neutral-900 uppercase">MARCOS GIMENES</div>
            <div>"Tecnologia para problemas que existem de verdade."</div>
          </div>
          <div className="text-center sm:text-right">
            <div>© {new Date().getFullYear()} Marcos Gimenes. Todos os direitos reservados.</div>
            <div className="text-[10px] text-neutral-400">ADS (UNIVEL) ↔ ELETROMECÂNICA (SENAI)</div>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded uppercase">
                {activeProject.context}
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">{activeProject.title}</h3>
              <p className="text-xs font-mono text-neutral-500">{activeProject.subtitle}</p>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 font-sans leading-relaxed">
              <div>
                <span className="font-mono text-[10px] font-bold text-rose-700 uppercase block mb-1">
                  CONTEXTO DO PROBLEMA
                </span>
                <p className="bg-neutral-50 p-3 rounded border border-neutral-200">{activeProject.problem}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase block mb-1">
                  ARQUITETURA DA SOLUÇÃO
                </span>
                <p className="bg-neutral-50 p-3 rounded border border-neutral-200">{activeProject.solution}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                  TECNOLOGIAS ENVOLVIDAS
                </span>
                <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                  {activeProject.tech.map((t, idx) => (
                    <span key={idx} className="bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-mono font-bold"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sky-700 font-bold uppercase">{activeArticle.category}</span>
                <span className="text-neutral-400">{activeArticle.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">{activeArticle.title}</h3>
            </div>

            <div className="text-sm text-neutral-700 leading-relaxed font-sans space-y-4">
              <p className="font-medium text-neutral-900 italic border-l-2 border-sky-600 pl-3">
                {activeArticle.excerpt}
              </p>
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-mono font-bold"
              >
                FECHAR NOTA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}