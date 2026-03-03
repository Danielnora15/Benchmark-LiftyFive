import React, { useState, useMemo } from 'react';
import { 
  Search, CheckCircle2, ShieldCheck, Zap, Database, Mail, BarChart3, Layers,
  Info, X, Plus, DollarSign, ChevronDown, ChevronUp, Globe, Cpu, Link as LinkIcon
} from 'lucide-react';

const toolsData = [
  {
    id: 'ghl',
    name: 'GoHighLevel',
    category: 'CRM + Marketing Automation',
    strength: 'Todo-en-uno para Agencias',
    features: ['Embudos', 'CRM', 'Marketing Automation', 'White Label', 'Citas'],
    detailedFeatures: [
      'Gestión de reputación y reseñas de Google',
      'Social Media Planner para programar posts',
      'Sistemas de SMS marketing y llamadas VoIP nativas',
      'Creador de membresías y cursos online',
      'App móvil personalizada para clientes'
    ],
    pros: 'Consolida múltiples herramientas en un solo costo mensual.',
    cons: 'Curva de aprendizaje empinada y soporte a veces lento.',
    pricing: '$$',
    priceMonthly: '97',
    priceNote: 'Tarifa plana (Ilimitados usuarios en plan Starter)',
    suitability: 'Agencias y PYMEs',
    integrations: ['Zapier', 'Stripe', 'Google Workspace', 'Facebook Ads']
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM + Marketing Automation',
    strength: 'Inbound Marketing & UX',
    features: ['CRM Gratuito', 'Content Management', 'Lead Scoring', 'Workflows'],
    detailedFeatures: [
      'Ecosistema de App Marketplace (+1000 integraciones)',
      'Herramientas avanzadas de SEO y optimización de blogs',
      'Chat en vivo y bots conversacionales personalizables',
      'Reporting avanzado y atribución multi-toque',
      'Smart Content para personalización de landings'
    ],
    pros: 'Ecosistema masivo de integraciones y facilidad de uso.',
    cons: 'Escalamiento de precios muy agresivo.',
    pricing: '$$$',
    priceMonthly: '45',
    priceNote: 'Desde $45/mes por usuario (Starter Hubs)',
    suitability: 'Empresas Mid-Market/Enterprise',
    integrations: ['Salesforce', 'Slack', 'Canva', 'Shopify']
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    category: 'CRM + Marketing Automation',
    strength: 'Ecosistema Modular',
    features: ['Omnicanal', 'IA (Zia)', 'Automatización', 'Personalización'],
    detailedFeatures: [
      'Zia: Asistente de IA para predicción de ventas',
      'Canvas Builder para diseñar interfaces de CRM sin código',
      'Gestión de inventarios y presupuestos integrada',
      'Soporte multi-moneda y reglas de puntuación globales',
      'Integración profunda con Zoho One (más de 40 apps)'
    ],
    pros: 'Extremadamente flexible y económico para lo que ofrece.',
    cons: 'Interfaz puede sentirse fragmentada.',
    pricing: '$',
    priceMonthly: '20',
    priceNote: 'Plan Professional (Usuario/mes)',
    suitability: 'PYMEs con procesos complejos',
    integrations: ['WhatsApp', 'Zoho Books', 'Office 365', 'LinkedIn']
  },
  {
    id: 'ontraport',
    name: 'Ontraport',
    category: 'CRM + Marketing Automation',
    strength: 'Marketing Avanzado & E-commerce',
    features: ['Visual Workflows', 'Order Forms', 'Suscripciones', 'CRM'],
    detailedFeatures: [
      'Mapas de automatización visual de alto nivel',
      'Sistema nativo de afiliados y referidos',
      'Personalización dinámica de sitios web (PURLS)',
      'Manejo avanzado de pagos y suscripciones recurrentes',
      'Lead scoring predictivo basado en comportamiento'
    ],
    pros: 'Gran manejo de datos y automatización visual.',
    cons: 'Menos enfocado en "sales outreach" puro.',
    pricing: '$$',
    priceMonthly: '79',
    priceNote: 'Plan base (incluye 3 usuarios)',
    suitability: 'Creadores de cursos y SaaS',
    integrations: ['QuickBooks', 'WooCommerce', 'ThriveCart', 'Vimeo']
  },
  {
    id: 'clientify',
    name: 'Clientify',
    category: 'CRM + Marketing Automation',
    strength: 'Simplicidad & Social CRM',
    features: ['Inbox centralizado', 'WhatsApp Marketing', 'Ads Tracking', 'Landing Pages'],
    detailedFeatures: [
      'Integración oficial con API de WhatsApp Cloud',
      'Inteligencia de ventas social (LinkedIn integration)',
      'Dashboard unificado para gestión de equipos comerciales',
      'Generador de formularios inteligentes para leads',
      'Optimizado para el mercado de habla hispana'
    ],
    pros: 'Ideal para el mercado hispano, integración nativa con WhatsApp.',
    cons: 'Menos potencia en enriquecimiento de datos que Apollo.',
    pricing: '$',
    priceMonthly: '45',
    priceNote: 'Plan Inbound (Usuario/mes)',
    suitability: 'PYMEs y Agencias Digitales',
    integrations: ['WhatsApp', 'Facebook', 'Instagram', 'Typeform']
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'Datos & Prospección',
    strength: 'Base de Datos B2B Integrada',
    features: ['Extracción de Emails', 'Secuencias', 'Dialer', 'Lead Intel'],
    detailedFeatures: [
      'Base de datos de más de 275 millones de contactos B2B',
      'Extensión de Chrome para LinkedIn y Gmail',
      'Playbooks automatizados para prospección multicanal',
      'IA para redacción de correos electrónicos fríos',
      'Señales de intención de compra (Intent data)'
    ],
    pros: 'Base de datos enorme con secuencias integradas.',
    cons: 'Precisión de datos varía por región.',
    pricing: '$$',
    priceMonthly: '59',
    priceNote: 'Plan Basic (Usuario/mes)',
    suitability: 'Equipos de Ventas Outbound',
    integrations: ['Salesforce', 'HubSpot', 'Salesloft', 'Outreach']
  },
  {
    id: 'lusha',
    name: 'Lusha',
    category: 'Datos & Prospección',
    strength: 'Precisión en Teléfonos Directos',
    features: ['Browser Extension', 'API Enriquecimiento', 'Compliance (GDPR)'],
    detailedFeatures: [
      'Enfoque en números de teléfonos móviles verificados',
      'Enriquecimiento automático de contactos en Salesforce',
      'Filtros de búsqueda avanzada por industria y cargo',
      'Alertas de cambios de puesto en empresas clave',
      'Cumplimiento estricto con GDPR y CCPA'
    ],
    pros: 'Datos de contacto muy fiables para llamadas frías.',
    cons: 'Coste por crédito elevado.',
    pricing: '$$$',
    priceMonthly: '39',
    priceNote: 'Plan Pro (Usuario/mes)',
    suitability: 'SDRs y Reclutadores',
    integrations: ['Salesforce', 'Pipedrive', 'Bullhorn', 'Outreach']
  },
  {
    id: 'instantly',
    name: 'Instantly.ai',
    category: 'Outreach & Secuencias',
    strength: 'Escalabilidad de Cold Email',
    features: ['Unlimited Accounts', 'Email Warmup', 'Unibox'],
    detailedFeatures: [
      'Email Warmup automático incluido para mejorar entregabilidad',
      'Unibox: Bandeja unificada para todas las respuestas de campaña',
      'Soporte para Spin-tax y variables personalizadas dinámicas',
      'Límites de envío inteligentes por cuenta para evitar spam',
      'Analítica detallada de tasas de apertura y clicks'
    ],
    pros: 'Permite enviar miles de correos sin costes por asiento.',
    cons: 'Solo email, no incluye CRM de ventas completo.',
    pricing: '$',
    priceMonthly: '37',
    priceNote: 'Plan Growth (Cuentas de envío ilimitadas)',
    suitability: 'Agencias de Lead Generation',
    integrations: ['Zapier', 'Webhooks', 'Clay', 'Google Sheets']
  }
];

const App = () => {
  const [filter, setFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesFilter = filter === "Todos" || tool.category === filter;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.strength.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const toggleToolSelection = (tool) => {
    if (selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools(selectedTools.filter(t => t.id !== tool.id));
    } else {
      if (selectedTools.length < 3) {
        setSelectedTools([...selectedTools, tool]);
      }
    }
  };

  const getPriceColor = (price) => {
    switch (price) {
      case '$': return 'text-green-600 bg-green-50';
      case '$$': return 'text-blue-600 bg-blue-50';
      case '$$$': return 'text-orange-600 bg-orange-50';
      case '$$$$': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Benchmark <span className="text-indigo-600">Marketing & Sales Stack</span>
            </h1>
            <p className="text-slate-500 mt-2">Comparativa interactiva de funcionalidades y costos</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Buscar herramienta o ventaja..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-48 md:w-64 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {["Todos", "CRM + Marketing Automation", "Datos & Prospección", "Outreach & Secuencias"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 items-start">
          {filteredTools.map((tool) => {
            const isSelected = selectedTools.find(t => t.id === tool.id);
            const isExpanded = expandedId === tool.id;

            return (
              <div 
                key={tool.id} 
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-xl' : 'border-slate-200 hover:shadow-lg'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] w-fit uppercase font-bold tracking-wider ${getPriceColor(tool.pricing)}`}>
                        {tool.pricing}
                      </span>
                      <div className="flex items-center text-lg font-black text-slate-800">
                        <DollarSign className="w-4 h-4" />
                        {tool.priceMonthly}
                        <span className="text-[10px] text-slate-400 ml-1 font-normal tracking-tight">/mes avg.</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleToolSelection(tool)}
                      className={`p-2 rounded-full transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <Plus className={`w-5 h-5 ${isSelected ? 'rotate-45' : ''} transition-transform`} />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-1">{tool.name}</h3>
                  <p className="text-xs font-semibold text-indigo-500 mb-3 uppercase tracking-wide">{tool.category}</p>
                  
                  <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <p className="text-sm font-medium text-slate-700 flex items-center gap-2 leading-tight">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      {tool.strength}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {tool.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {isExpanded ? <><ChevronUp className="w-4 h-4" /> Menos Detalles</> : <><ChevronDown className="w-4 h-4" /> Ver Detalles Individuales</>}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase mb-2">
                          <Cpu className="w-3 h-3" /> Capacidades Únicas
                        </div>
                        <ul className="space-y-1.5">
                          {tool.detailedFeatures.map((df, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                              <div className="w-1 h-1 rounded-full bg-indigo-300 mt-1.5 shrink-0" />
                              {df}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase mb-2">
                          <LinkIcon className="w-3 h-3" /> Integraciones Clave
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {tool.integrations.map((int, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] border border-slate-200">
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 p-3 rounded-xl">
                        <p className="text-[11px] text-indigo-700 italic">
                          <strong>Veredicto:</strong> {tool.pros}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Uso ideal</div>
                    <Globe className="w-3 h-3 text-slate-300" />
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">{tool.suitability}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {showComparison && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Layers className="text-indigo-600" />
                Matriz de Comparación Detallada
              </h2>
              <button onClick={() => setShowComparison(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">Atributo</th>
                    {selectedTools.map(tool => (
                      <th key={tool.id} className="p-6 text-center border-b border-slate-200 min-w-[200px]">
                        <div className="text-lg font-bold text-indigo-700">{tool.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Costo Estimado</td>
                    {selectedTools.map(tool => <td key={tool.id} className="p-4 text-center font-bold">${tool.priceMonthly}/mes</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Ventaja Pro</td>
                    {selectedTools.map(tool => <td key={tool.id} className="p-4 text-center text-slate-600">{tool.pros}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Punto Débil</td>
                    {selectedTools.map(tool => <td key={tool.id} className="p-4 text-center text-rose-600 text-xs px-2">{tool.cons}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
              <button onClick={() => setShowComparison(false)} className="bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg">Cerrar Comparativa</button>
            </div>
          </div>
        </div>
      )}

      {selectedTools.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 p-4 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {selectedTools.map(tool => (
                <div key={tool.id} className="bg-indigo-50 px-3 py-1 rounded-lg flex items-center gap-2 border border-indigo-100">
                  <span className="text-sm font-semibold text-indigo-700">{tool.name}</span>
                  <button onClick={() => toggleToolSelection(tool)} className="hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowComparison(true)}
              disabled={selectedTools.length < 2}
              className={`px-6 py-2 rounded-xl font-bold text-white transition-all ${
                selectedTools.length >= 2 ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Comparar {selectedTools.length}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;