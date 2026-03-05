"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Mode = "ai" | "clasico";

const WEBHOOK_URL = "https://n8n.chilsmart.com/webhook-test/TAIGA";
const CTA_WEBHOOK_URL = "https://n8n.chilsmart.com/webhook/operfoods-contact";

const aiProblems = [
  {
    icon: "trending_down",
    title: "Incertidumbre de ganancias",
    text: "¿Realmente ganaste dinero hoy o solo moviste caja? El flujo de efectivo no siempre es utilidad.",
  },
  {
    icon: "account_balance_wallet",
    title: "Mezcla de ventas local/eventos",
    text: "Separa tus ingresos del local fijo de tus activaciones externas de forma automática.",
  },
  {
    icon: "calculate",
    title: "Falta de rentabilidad clara",
    text: "Cálculo automático de costos operativos y margen real por cada feria o festival.",
  },
  {
    icon: "inventory_2",
    title: "Caos de inventario",
    text: "Control preciso de insumos antes, durante y después del evento para evitar mermas.",
  },
];

const aiSolutionFeatures = [
  {
    icon: "print",
    title: "Órdenes rápidas e impresión",
    text: "Interfaz optimizada para alta rotación y conexión con impresoras Bluetooth para tickets.",
  },
  {
    icon: "event_available",
    title: "Asociación de ventas a eventos",
    text: "Cada transacción se etiqueta automáticamente al evento activo para reportes precisos.",
  },
  {
    icon: "bar_chart",
    title: "Reportes por evento",
    text: "Analiza el rendimiento individual de cada ubicación y compara resultados históricos.",
  },
  {
    icon: "insights",
    title: "Control de rentabilidad en tiempo real",
    text: "Visualiza ingresos, costos estimados y márgenes por evento para tomar decisiones estratégicas al instante.",
  },
];

const aiFeatures = [
  {
    icon: "star",
    title: "Ranking de eventos",
    text: "Identifica los eventos más rentables históricamente para priorizar tu agenda.",
  },
  {
    icon: "insights",
    title: "Proyecciones de ventas",
    text: "Pronósticos basados en clima, ubicación y afluencia esperada de público.",
  },
  {
    icon: "inventory",
    title: "Recomendaciones de stock",
    text: "Sugerencias inteligentes de carga de insumos para evitar quiebres o desperdicio.",
  },
  {
    icon: "warning",
    title: "Alertas de margen",
    text: "Notificaciones en tiempo real si tus costos operativos superan el umbral de ganancia.",
  },
];

const aiSteps = [
  {
    number: "1",
    title: "Registra",
    text: "Crea tus productos y precios en segundos desde el celular.",
  },
  {
    number: "2",
    title: "Asocia",
    text: "Define el evento donde participarás antes de iniciar ventas.",
  },
  {
    number: "3",
    title: "Obtén análisis",
    text: "Visualiza el desempeño en tiempo real durante la jornada.",
  },
];

const testimonials = [
  {
    name: "Gabriela Ramirez",
    role: "Gerente, Gaby's Burgers",
    quote:
      '“Operfoods nos permitió ver que el evento más grande no siempre era el más rentable. Ahora elegimos mejor dónde estar.”',
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8zScc_zPs5dBvobHCX2Ib4Gc4yG-vGqpAycuYPKnjc6c-OvuCQtWAzzTmj8a9CFgozWsGysM9fl131eYhBgzBcffbFmbwEooH2Yp2A1l8LP0i4m4ykZN_qn9xLBpyPB_QmmC0fetqrNIPHEd7X7TdnGG4HB9wlMs9Xp_bXEhHCKANtx-n1RQGIwSVp_QoX80vYL8QvxMtrNyYfia62WRwu1DkRYo6rPBfBTpoyiT_Hr8h4qyiJdn7ZCzkd4IYZl2rRVtgnZ9_0gX",
  },
  {
    name: "Sebastian Villagrán",
    role: "Gerente, Pigzas pizzeria",
    quote:
      "“La gestión de inventario para eventos es otro nivel. Eliminamos el desperdicio en un 30% desde el primer mes.”",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqrTQCN0FpVsfaEMjqfHt9n6JYYN_ShMFMnVz0H7vGS8Hu7yij0PJHVziEs3pvCvofuv0FybFS0iIr4s04jAsifmjFzq9O_7lbXnXr0X9rmZBil0jKxbhxbhU4U0u4RH98lgos4oiW35l4NLwrXgI1H4yRhek7LeLyC9LlwIHX2K2zzIVWgp6h-YIPvOdN1b5WrCKYCQn4IhhEyjoXFL-MHw_halYNzh7lqjcV3ELVXfz21xtIhyaOJiGSH5buc8j0kmx0u4CKVC7",
  },
  {
    name: "Marco Venegas",
    role: "Fundador, Coffee Van Chile",
    quoteAI:
      "“El módulo Reportes es increíble. Sus proyecciones nos ayudan a saber exactamente cuánto personal llevar a cada festival.”",
    quoteClassic:
      "“Incluso sin IA, los reportes en tiempo real nos permiten ajustar personal y stock en cada festival.”",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrCvHdJdvklGm4zDWQYWzRRlyUmnzNeNE6nUAwyB2BQt0iz71wESP4stquHy1SZOIgeUeo0qHJnAHVBL_ex3OE4QaUq1KK4MVGCBWU8uirlwjDVe3PdeJxPwN-3B2872TbjusRCGLUg_hrVx_3NyFUODPk8HwWFltzTFY8mCTN8k9AzOuaF9klC6drb2ZpShWGOtdgxVP6ykH1KtvSOibSt3x2TccC4zx0o-OisqhfRZQCag1a2Yz0F_KmDN2caZ_C9-mJmJDEk8Ai",
  },
];

const classicProblems = [
  {
    icon: "payments",
    title: "Falta de conocimiento de márgenes",
    text: "No saber cuánto ganas realmente en cada evento o turno. Las mermas y costos ocultos devoran tu utilidad.",
  },
  {
    icon: "terminal",
    title: "Dependencia total del POS",
    text: "Estar amarrado a sistemas cerrados sin análisis profundo. El POS solo registra, no te ayuda a crecer.",
  },
  {
    icon: "query_stats",
    title: "Decisiones por instinto",
    text: "Cambiar precios o menús sin datos que lo respalden. Arriesgas tu capital en cada movimiento estratégico.",
  },
];

const classicFeatures = [
  {
    icon: "event_available",
    title: "Ventas por evento",
    text: "Desglosa tus ingresos por food truck, feria o local físico. Compara el rendimiento de diferentes locaciones al instante.",
  },
  {
    icon: "credit_card",
    title: "Integración Transbank",
    text: "Sincronización automática de tus pagos con tarjeta. Olvida la conciliación manual y los errores humanos al cierre de caja.",
  },
];

const classicBenefits = [
  {
    icon: "analytics",
    title: "Más control",
    text: "Visibilidad total de cada peso que entra y sale de tu operación.",
  },
  {
    icon: "sentiment_satisfied",
    title: "Menos estrés",
    text: "Automatiza reportes y deja de sufrir con excels complicados cada noche.",
  },
  {
    icon: "rocket_launch",
    title: "Crecimiento real",
    text: "Escala tu negocio abriendo nuevas sucursales con procesos validados.",
  },
];

const classicSteps = [
  { number: "1", title: "Conecta", text: "Sincroniza tus medios de pago y carga tu menú base en minutos." },
  { number: "2", title: "Visualiza", text: "Observa cómo fluyen los datos en tiempo real desde cualquier dispositivo." },
  { number: "3", title: "Mejora", text: "Ajusta tus márgenes y optimiza tu rentabilidad con insights precisos." },
];

const classicRoadmap = [
  {
    icon: "receipt_long",
    title: "Integración SII",
    text: "Emisión automática de boletas electrónicas sincronizadas con tus ventas.",
    tag: "Q3 2024",
    highlight: true,
  },
  {
    icon: "inventory_2",
    title: "Inventario automatizado",
    text: "Control de stock basado en recetas y ventas proyectadas.",
    tag: "Q4 2024",
    highlight: false,
  },
];

const faqItems = [
  {
    question: "¿Cómo separo las ventas de eventos y local fijo?",
    answer:
      "Activa el evento antes de vender y todas las transacciones se etiquetan automáticamente. Luego ves ingresos, costos y margen por evento o por tu local fijo.",
  },
  {
    question: "¿El POS imprime comandas y se integra con Transbank?",
    answer:
      "Sí. Puedes imprimir comandas por Bluetooth para cocina/barra y conciliar pagos con Transbank para evitar descuadres de caja.",
  },
  {
    question: "¿Cómo controlo inventario y recetas?",
    answer:
      "Carga tus recetas y descontamos insumos por venta. Obtienes alertas de stock, costos por plato y valorización de inventario en planes avanzados.",
  },
  {
    question: "¿Puedo operar múltiples cajas y turnos en un mismo día?",
    answer:
      "Puedes abrir varias cajas y turnos simultáneos, con arqueos y movimientos separados. Ideal para ferias grandes o varios food trucks.",
  },
  {
    question: "¿Qué reportes en tiempo real obtengo?",
    answer:
      "Dashboard con ventas por evento, margen estimado, medios de pago, ranking de productos y proyección simple para decidir personal y stock.",
  },
  {
    question: "¿Qué tan rápido puedo empezar?",
    answer:
      "En menos de un día: cargamos tu menú, precios y medios de pago. Incluye onboarding y acompañamiento inicial.",
  },
];

const pricingPlans = [
  {
    name: "Plan Inicial",
    price: "$ 22.500 /mes",
    tagline: "Impulsa tu negocio con las herramientas esenciales.",
    features: [
      "Punto de venta rápido para ferias y local fijo",
      "Arqueos y movimientos de caja en cada turno",
      "Impresión de comandas (Bluetooth)",
      "Descuentos y combos configurables",
      "Carta QR siempre actualizada",
    ],
  },
  {
    name: "Plan Avanzado",
    price: "$ 32.500 /mes",
    tagline: "Profesionaliza tu gestión, analiza y toma decisiones sobre tu negocio.",
    features: [
      "Punto de venta rápido para ferias y local fijo",
      "Arqueos y movimientos de caja en cada turno",
      "Impresión de comandas (Bluetooth)",
      "Descuentos y combos configurables",
      "Carta QR siempre actualizada",
      "Inventario básico por insumo y alertas de stock",
      "Costeo de recetas y margen por producto",
      "Gestión de clientes y proveedores",
      "Reportes diarios y por evento con comparativas",
    ],
    highlight: true,
  },
  {
    name: "Plan Pro",
    price: "$ 50.000 /mes",
    tagline: "Controla cada detalle con herramientas avanzadas.",
    features: [
      "Punto de venta rápido para ferias y local fijo",
      "Arqueos y movimientos de caja en cada turno",
      "Impresión de comandas (Bluetooth)",
      "Descuentos y combos configurables",
      "Carta QR siempre actualizada",
      "Inventario básico por insumo y alertas de stock",
      "Costeo de recetas y margen por producto",
      "Gestión de clientes y proveedores",
      "Reportes diarios y por evento con comparativas",
      "Múltiples cajas y turnos simultáneos",
      "Estado de resultados por evento y consolidado",
      "Listas de precios por canal o evento",
      "Inventario valorizado y trazabilidad",
    ],
  },
];

const allPricingFeatures = Array.from(new Set(pricingPlans.flatMap((plan) => plan.features)));

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/70 border border-primary/20 px-1.5 py-1 shadow-sm">
      {(["ai", "clasico"] as Mode[]).map((value) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={active}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
              active
                ? "bg-primary text-white shadow-[0_8px_20px_rgba(242,127,13,0.35)]"
                : "text-slate-700 hover:bg-primary/10"
            }`}
          >
            {value === "ai" ? "Con IA" : "Sin IA"}
          </button>
        );
      })}
    </div>
  );
}

function AiLanding({ onCta }: { onCta: (source: string) => void }) {
  const heroBadge = {
    text: "Proximamente: Módulo Operfoods AI",
    tone: "text-primary bg-primary/10",
  };

  const stepFour = {
    title: "Decide con IA",
    text: "Usa los datos y la IA para planificar tu próxima inversión.",
  };

  return (
    <>
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${heroBadge.tone}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {heroBadge.text}
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900">
              Controla tus ventas en ferias y eventos para tomar{" "}
              <span className="text-primary">decisiones inteligentes</span> con datos reales.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              El sistema especializado para negocios móviles que transforma el caos de los eventos en rentabilidad medible.
              Deja de adivinar y comienza a optimizar.
            </p>
          <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-4 text-base font-bold bg-primary text-white rounded-xl shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all cursor-pointer"
                type="button"
                onClick={() => onCta("cta-ai-hero-demo")}
              >
                Solicitar demo gratuita
              </button>
            <a
              className="px-8 py-4 text-base font-bold bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              href="#precios"
            >
              <span className="material-symbols-outlined">payments</span>
              Ver planes
            </a>
            </div>
          <ul className="flex flex-wrap gap-3 text-sm text-slate-700">
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">event_available</span>
              Ventas por evento
            </li>
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">inventory_2</span>
              Inventario y recetas
            </li>
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">insights</span>
              Dash en tiempo real
            </li>
          </ul>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <Image
                alt="Dashboard de ventas"
                className="w-full h-auto"
                src="https://firebasestorage.googleapis.com/v0/b/fast-trucks.firebasestorage.app/o/dashboard.jpeg?alt=media&token=c124bd54-e9fd-419d-b54e-fed27f67b0c7"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <PricingSection onCta={onCta} />

      <section className="py-24 bg-white border-y border-slate-100" id="problemas">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Supera los desafíos de la venta en terreno</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Identifica y resuelve las fugas de dinero que están afectando tu crecimiento actual.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiProblems.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-background-light border border-slate-100 hover:border-primary/30 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-4">{item.icon}</span>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" id="solucion">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <Image
                  alt="Punto de venta móvil"
                  className="rounded-xl shadow-lg border border-slate-200"
                  src="https://firebasestorage.googleapis.com/v0/b/fast-trucks.firebasestorage.app/o/food-truck.png?alt=media&token=ff65467d-fafa-4612-84fe-da45f57901c1"
                  width={1400}
                  height={900}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Una solución diseñada para la velocidad del terreno</h2>
                <p className="text-slate-600">Gestiona múltiples puntos de venta de forma centralizada y en tiempo real.</p>
              </div>
              <div className="space-y-6">
                {aiSolutionFeatures.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-deep text-white overflow-hidden relative" id="ai">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              <span className="text-xs font-bold tracking-widest uppercase">Operfoods</span>
            </div>
            {/*<h2 className="text-4xl font-bold mb-6">Inteligencia Predictiva para tu Negocio</h2>
            <p className="text-slate-400 max-w-2xl">
              Nuestra IA analiza miles de puntos de datos para decirte exactamente dónde y cuándo vender para maximizar tus utilidades.
            </p>*/}
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Una solución diseñada para la velocidad del terreno</h2>
              <p className="text-slate-200">Gestiona múltiples puntos de venta de forma centralizada y en tiempo real.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiSolutionFeatures.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="proceso">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900">Implementación en 4 pasos</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-[2px] bg-primary/10 -z-0"></div>
            {aiSteps.map((step) => (
              <div key={step.number} className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-primary/30">
                  {step.number}
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.text}</p>
              </div>
            ))}
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-primary/30">
                4
              </div>
              <h4 className="font-bold text-lg mb-2 text-slate-900">{stepFour.title}</h4>
              <p className="text-sm text-slate-500">{stepFour.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Lo que dicen los dueños de negocios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => {
              const quote = item.quoteAI ?? item.quote;
              return (
                <div
                  key={item.name}
                  className="p-8 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col gap-6"
                >
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="material-symbols-outlined font-fill">
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 italic">{quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                      <Image
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                        src={item.avatar}
                        width={96}
                        height={96}
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{item.name}</h5>
                      <span className="text-xs text-slate-400">{item.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection />

      <ContactSection source="contacto-ai" onCta={onCta} />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-primary rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Descubre qué eventos realmente te generan utilidades</h2>
              <p className="text-lg opacity-90 max-w-2xl">
                Únete a cientos de emprendedores que ya están profesionalizando su operación con Operfoods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a
                className="px-10 py-5 bg-navy-deep text-white font-bold rounded-2xl shadow-2xl hover:bg-navy-deep/90 transition-all flex items-center justify-center gap-3 cursor-pointer"
                onClick={() => onCta("cta-ai-banner")}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.594-2.618-1.542-1.06-.948-1.597-1.884-1.741-2.289-.144-.405-.015-.624.114-.753.129-.129.288-.315.405-.441.117-.126.155-.216.234-.351.079-.135.039-.252-.02-.378-.06-.126-.54-1.297-.739-1.774-.194-.465-.394-.402-.54-.41-.139-.007-.3-.008-.459-.008-.16 0-.419.06-.639.3-.219.24-.84.822-.84 2.008s.859 2.333.979 2.494c.121.161 1.69 2.579 4.093 3.619.571.247 1.017.395 1.365.505.574.182 1.097.157 1.511.095.462-.069 1.423-.582 1.623-1.144.2-.563.2-1.044.14-1.144-.06-.099-.219-.155-.459-.275zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174l-1.434 5.234 5.35-1.405c1.472.846 3.18 1.332 5.003 1.332 5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
                  </svg>
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ClassicLanding({ onCta }: { onCta: (source: string) => void }) {
  return (
    <>
      <section className="relative px-6 py-16 md:px-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Beta abierta para fundadores
            </div>
            <h1 className="text-5xl font-black leading-tight text-navy-deep md:text-6xl lg:text-7xl">
              Toma el control <span className="text-primary">real</span> de tus ventas hoy
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              Deja de adivinar tus ganancias. Toma decisiones basadas en datos reales y optimiza la rentabilidad de tu negocio gastronómico con
              Operfoods.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform cursor-pointer"
                type="button"
                onClick={() => onCta("cta-classic-hero-acceso")}
              >
                Solicitar acceso anticipado
              </button>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-transparent px-8 py-4 text-base font-bold text-navy-deep hover:bg-slate-50 transition-colors cursor-pointer"
                href="#precios"
              >
                <span className="material-symbols-outlined">payments</span>
                Ver planes
              </a>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-base">event_available</span>
                Ventas por evento
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-base">inventory_2</span>
                Inventario y stock
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-base">insights</span>
                Reportes al instante
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video w-full rounded-2xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-200">
              <div
                className="h-full w-full overflow-hidden rounded-xl bg-slate-800"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_QA9OhC3BEQKUmyoAK8IGXX_8ipn1itOL7G-hF0pqDTW7j3DWE0rkVZxfOYunQJQR1BabL20vhHTrAQTmLZsUmxT0x_rzkS_htfM6h1Mb3VwXNRqO6YilwmSYnlIkOpgRKA-1LK0PSlqj8ota7sJaTtuTPHwmVtBYXJZClTAfdfbe0j_N4Pi8z5DUs4kibIRPFF3SyhIcMLheT0j5eVsiKPzOYgURNDEoW1ZiW8ygcoW9sAg_vD51wnNoaqvL3VnqgFwCPBe_Dpkl')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-6 shadow-2xl md:block">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Margen promedio</p>
                  <p className="text-2xl font-black text-navy-deep">+24% este mes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection onCta={onCta} />

      <section className="bg-slate-50 px-6 py-20 md:px-20" id="problemas">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black text-navy-deep md:text-4xl">¿Cansado de no conocer tus márgenes reales?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Muchos negocios gastronómicos operan a ciegas. Identifica si estás cometiendo estos errores comunes.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {classicProblems.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-navy-deep">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20" id="soluciones">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="mb-4 text-3xl font-black text-navy-deep md:text-5xl">Visualiza tu éxito en tiempo real</h2>
            <p className="max-w-xl text-slate-600">
              Un panel de control diseñado para la velocidad de la industria gastronómica. Centraliza tus operaciones en un solo lugar.
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              {classicFeatures.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-navy-deep">{item.title}</h4>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="h-32 rounded-lg bg-slate-100"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbuOUqgejx7uJfS6LHP-R4sNs6H6WLfwzNxRT3SsxMFR1KtHHFGcy7lpGtqjqhuI4CD8Id_7Xlbl2UCFh1tZmbg0RRSkbE_DzSGknrPKRG9QrgVafBbX1UnmAd40u78HD_hytGyA5Sc-7F95qSusYmqNrYDdlgprvIpOPiwB6270t4AneXoUUseZr0zTw2GoJK5Fjq2lzHOG7cDeoYz294pAoQDV_Gtb0glYzuOUvpFFX_yqK6Q3rpFvm6HZy6QpZteAlopcvRDC1O')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div
                    className="h-32 rounded-lg bg-slate-100"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7aqTnghndAzuOI5nfZRkBvs2jK4rFJ0v3_LRQ82lAtUuMJWuzmi72_yY3RNDffgpHIeXJYjIdXb5RSms1AdBxOFz1rPBtGnQmxvXEnyClol9YaKzIHpX31ZdVYj8RcSbh4UNyzdP8XrXx8sSSSziQ8R5FM_tppozkWjP1W01ZmQ84SKkPkKRAwXHpSSnFg_3ggy4yk0R6uJr_SGG2cj_E6Y4JwjeYFsi3tXMaI_7zfuPfte6-kqlScssBN5mlgreqxiQVE9Rmmd8x')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div
                    className="col-span-2 h-48 rounded-lg bg-slate-100"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPXKaRjYtDXPQEPqAcMp1N6cCJdjweN3jmFCtIp2j1zgeUwfrtsvb1y9hpY85rjipkQogatIzdYHwIu-gKYbgSbqHwfYT42S08eedd4Pq9g2nugQa66mM_39ltYyud9Jop6kHC7yaGuokh2YxooNvBKpLGWy-Y-mpZ70yKE9N4RHOxUxSbfkVaBOLhBFQU77wtZlhK7-UK7swKDluDSU5QT-DdBmYc4xhjFZsCnqtuYXOTcZaTSirOQMdFiaQZBiUcmeNGNAVo0zQ4')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-20 text-white md:px-20" id="beneficios">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-16 text-3xl font-black md:text-4xl">Por qué elegir Operfoods</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {classicBenefits.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-4">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                  <span className="material-symbols-outlined text-4xl text-primary">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-3xl font-black text-navy-deep md:text-4xl">Implementación en 3 pasos</h2>
          <div className="relative grid gap-12 md:grid-cols-3">
            <div className="absolute left-1/4 top-10 hidden h-0.5 w-1/2 bg-slate-100 md:block"></div>
            {classicSteps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-primary shadow-xl ring-4 ring-primary/5">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold text-navy-deep">{step.title}</h3>
                <p className="text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 md:px-20" id="roadmap">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Próximamente</span>
            <h2 className="mt-4 text-3xl font-black text-navy-deep md:text-4xl">Nuestra hoja de ruta</h2>
          </div>
          <div className="space-y-6">
            {classicRoadmap.map((item) => (
              <div
                key={item.title}
                className={`flex items-center gap-6 rounded-2xl bg-white p-6 shadow-sm border-l-4 ${
                  item.highlight ? "border-primary" : "border-slate-200"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-deep">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
                <div
                  className={`ml-auto hidden rounded-full px-3 py-1 text-[10px] font-bold uppercase md:block ${
                    item.highlight ? "bg-orange-100 text-primary" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <ContactSection source="contacto-clasico" onCta={onCta} />

      <section className="px-6 py-24 md:px-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-navy-deep p-8 md:p-16 relative">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 text-white">
              <h2 className="text-4xl font-black leading-tight md:text-5xl">Cupos limitados para fundadores</h2>
              <p className="text-lg text-slate-300">
                Únete a los primeros 50 negocios y obtén un descuento vitalicio del 50% y soporte prioritario.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEhgbbUlxheQgnRdLJlYbFYWVZblJgOCJUFOXLgiPQo6iPN3LYekE4lQQ9B1BHZZciYGJ8qlDKsRdlxOd_5OXdCv8HdjOWVkB9SXSBzWmQ708knqrV-fyyDXrnHUIhn-0a_d4Rr-ksCXiRBz0Z55yVnEh50UWzvJ5fL3a4qvpJEu0xu7HU9z2h4ehxelyltmCfT1ePSAAoWKefT_5-ee4rh7jNQbttImS7C_sOdIUPrSTo3IVGLFn3us-_I1JhlbpV3JAUgtLQx9vf",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDzm-WNdbQO_6OUvHFnXa999IGkfzsjdjXXMuDY5JXrHtf4cNqceF2D_bcnlps5yPi7pR9P4HLGgxGLUSG5Rg8DU03mqelLqCsz4YFXhsAFWgVUk2ZTG7ht2p5FQtS1Q6XDcKOuispCmriSdTJqBGFYI77T0upzWTaEsL2Z8-fF49yO6D73ZdNR5XL79qsNLgXKObtrEuegrgXAbg8PUTfrA_WFYys5fj7c-60dSVAb0HGhoPBEeKkMi0BRWAtaEnTRW6njX7aRZU31",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVUyMisnkFE71Too2OYbeZ5AFU-vS6-z0qVrqeYk1bNlFyABU0X04-Y-M88uhKKiSCXXN9eMv3xkafJuyhQ_RMtGeya6MbiH1IGLHp034ogG1PUhpCytUpkn6-DHYJ0tBfo2Szpc9KofLP7qWmG-yvJki-8glIVyJVKISBqfab_7xbHD-Mvavc-p8IcVVRx7fbbvlWyPjsJacH4uTpEURiIiD_W4xUEazj9dMHSIakaykafpXJzP2yc-IdRZZ65d1gHi3j39MeoKrz",
                  ].map((avatar, index) => (
                    <div
                      key={avatar}
                      className="h-10 w-10 rounded-full border-2 border-navy-deep bg-slate-400"
                      style={{
                        backgroundImage: `url('${avatar}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: 10 - index,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-400">42 dueños ya se unieron</span>
              </div>
            </div>
            <ContactForm source="cta-pro" />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-12 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                </div>
                <span className="text-lg font-black tracking-tight text-navy-deep">Operfoods</span>
              </div>
              <p className="max-w-xs text-sm text-slate-500">
                Optimizando la rentabilidad de la gastronomía móvil en Chile con tecnología de vanguardia.
              </p>
            </div>
            <div>
              <h5 className="mb-4 font-bold text-navy-deep">Producto</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="#">
                    Características
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Precios
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Integraciones
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-bold text-navy-deep">Compañía</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="#">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Soporte
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
            © 2026 Chilsmart. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

function PricingSection({ onCta }: { onCta: (source: string) => void }) {
  return (
    <section className="px-6 py-24 md:px-20 bg-white" id="precios">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-navy-deep">Planes que crecen contigo</h2>
          <p className="mt-3 text-slate-600">Elige el plan de Operfoods que mejor se adapta a tu operación.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.highlight ? "border-primary shadow-primary/20 ring-2 ring-primary/10 order-first md:order-none" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-navy-deep">{plan.name}</h3>
                {plan.highlight && (
                  <span className="text-xs font-bold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Más elegido
                  </span>
                )}
              </div>
              <p className="mt-2 text-3xl font-black text-navy-deep">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-600">{plan.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {allPricingFeatures.map((feature) => {
                  const included = plan.features.includes(feature);
                  return (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 ${included ? "text-slate-700" : "text-slate-400 line-through"}`}
                    >
                      <span
                        className={`material-symbols-outlined text-base mt-[2px] ${
                          included ? "text-primary" : "text-slate-300"
                        }`}
                      >
                        {included ? "check_circle" : "cancel"}
                      </span>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              <button
                className="mt-8 w-full inline-flex justify-center rounded-xl border border-primary bg-primary text-white font-bold py-3 shadow-primary/20 shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
                type="button"
                onClick={() => onCta(`cta-pricing-${plan.name.toLowerCase().replace(/\s+/g, "-")}`)}
              >
                Ver todas las funcionalidades
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ source, onCta }: { source: string; onCta: (source: string) => void }) {
  return (
    <section className="px-6 py-16 md:px-20 bg-background-light" id="contacto">
      <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-navy-deep">¿Prefieres que te contactemos?</h3>
          <p className="text-slate-600">
            Déjanos tus datos y agenda una demo. También puedes escribirnos directo por WhatsApp si necesitas una respuesta rápida.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-primary/20 shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
              onClick={() => onCta(`cta-contacto-${source}`)}
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Abrir WhatsApp
            </button>
          </div>
        </div>
        <ContactForm source={source} />
      </div>
    </section>
  );
}

function CTAModal({
  open,
  onClose,
  source,
}: {
  open: boolean;
  onClose: () => void;
  source: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [form, setForm] = useState({ nombre: "", email: "", negocio: "", negocioNombre: "", telefono: "" });

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setForm({ nombre: "", email: "", negocio: "", negocioNombre: "", telefono: "" });
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const payload = { ...form, source: source ?? "cta" };
      const res = await fetch(CTA_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("cta_webhook_error");
      setStatus("ok");
      setTimeout(onClose, 1200);
    } catch (error) {
      console.error("Error enviando CTA", error);
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Agenda tu acceso</p>
          <h3 className="text-2xl font-black text-navy-deep">Déjanos tus datos y te creamos credenciales</h3>
          <p className="text-sm text-slate-600 mt-1">Solo pedimos lo esencial para activar tu cuenta.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Nombre completo</label>
            <input
              required
              name="nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
              placeholder="Ej: Carla Rodríguez"
              type="text"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Nombre del negocio</label>
            <input
              required
              name="negocioNombre"
              value={form.negocioNombre}
              onChange={(e) => setForm((f) => ({ ...f, negocioNombre: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
              placeholder="Ej: Operfoods Truck"
              type="text"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Email</label>
            <input
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
              placeholder="correo@tu-negocio.cl"
              type="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Tipo de negocio</label>
            <select
              required
              name="negocio"
              value={form.negocio}
              onChange={(e) => setForm((f) => ({ ...f, negocio: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
            >
              <option value="">Selecciona una opción</option>
              <option value="Food truck">Food truck</option>
              <option value="Local establecido">Local establecido</option>
              <option value="Eventos / catering">Eventos / catering</option>
              <option value="Dark kitchen">Dark kitchen</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Teléfono (opcional)</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
              placeholder="+56 9 1234 5678"
              type="tel"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-primary py-3 text-base font-black text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 cursor-pointer"
          >
            {status === "loading" ? "Enviando..." : "Crear mis credenciales"}
          </button>
          {status === "ok" && (
            <p className="text-center text-sm font-semibold text-green-600">¡Listo! Te contactaremos en minutos.</p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-semibold text-red-600">No se pudo enviar. Intenta de nuevo.</p>
          )}
        </form>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="px-6 py-20 md:px-20 bg-white border-t border-slate-100" id="faq">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-navy-deep">Preguntas frecuentes</h2>
          <p className="mt-3 text-slate-600">
            Todo lo que necesitas para operar ventas en terreno, controlar stock y decidir con datos.
          </p>
        </div>
        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm divide-y divide-slate-200">
          {faqItems.map((item) => (
            <div key={item.question} className="px-5 py-4">
              <h3 className="text-base font-bold text-navy-deep">{item.question}</h3>
              <p className="text-sm text-slate-600 mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ source }: { source: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const data = new FormData(event.currentTarget);
    const payload = {
      nombre: data.get("nombre"),
      email: data.get("email"),
      negocio: data.get("negocio"),
      mensaje: data.get("mensaje"),
      origen: source,
    };
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("webhook_error");
      setStatus("ok");
      event.currentTarget.reset();
    } catch (error) {
      console.error("Error enviando contacto", error);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl shadow-primary/10 border border-slate-100">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-bold text-navy-deep">Nombre completo</label>
          <input
            name="nombre"
            required
            className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
            placeholder="Ej: Juan Pérez"
            type="text"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-navy-deep">Email de empresa</label>
          <input
            name="email"
            required
            className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
            placeholder="juan@tu-foodtruck.cl"
            type="email"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-navy-deep">Tipo de negocio</label>
          <select
            name="negocio"
            required
            className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
          >
            <option value="">Selecciona una opción</option>
            <option>Food Truck</option>
            <option>Local físico</option>
            <option>Eventos / Catering</option>
            <option>Comida rápida</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-navy-deep">Mensaje</label>
          <textarea
            name="mensaje"
            rows={3}
            className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
            placeholder="Cuéntanos tu contexto y fechas de eventos"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 w-full rounded-lg bg-primary py-4 text-lg font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 cursor-pointer"
        >
          {status === "loading" ? "Enviando..." : "Enviar y agendar demo"}
        </button>
        {status === "ok" && (
          <p className="text-center text-sm font-semibold text-green-600">¡Recibido! Te contactaremos pronto.</p>
        )}
        {status === "error" && (
          <p className="text-center text-sm font-semibold text-red-600">No pudimos enviar. Intenta de nuevo en unos segundos.</p>
        )}
      </form>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("ai");
  const aiEnabled = mode === "ai";
  const [ctaModal, setCtaModal] = useState<{ open: boolean; source: string | null }>({ open: false, source: null });

  const openCta = (source: string) => setCtaModal({ open: true, source });
  const closeCta = () => setCtaModal({ open: false, source: null });

  // Notificar visita a webhook (se ejecuta solo en cliente)
  useEffect(() => {
    const payload = {
      event: "visit",
      ts: Date.now(),
      path: typeof window !== "undefined" ? window.location.pathname : "/",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.warn("No se pudo enviar visita", error);
    });
  }, []);

  const navLinks = aiEnabled
    ? [
        { href: "#problemas", label: "Problemas" },
        { href: "#solucion", label: "Solución" },
        { href: "#ai", label: "Operfoods AI" },
        { href: "#proceso", label: "Cómo funciona" },
        { href: "#precios", label: "Precios" },
        { href: "#contacto", label: "Contacto" },
        { href: "#faq", label: "FAQ" },
      ]
    : [
        { href: "#problemas", label: "Problemas" },
        { href: "#soluciones", label: "Soluciones" },
        { href: "#beneficios", label: "Beneficios" },
        { href: "#roadmap", label: "Próximamente" },
        { href: "#precios", label: "Precios" },
        { href: "#contacto", label: "Contacto" },
        { href: "#faq", label: "FAQ" },
      ];

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-display">
      <header className="sticky top-0 z-50 w-full bg-background-light/80 backdrop-blur-md border-b border-primary/10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo-operfoods-1.svg"
              alt="Logotipo"
              width={80}
              height={80}
              className="h-20 w-20"
              priority
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((item) => (
              <a key={item.href} className="hover:text-primary transition-colors" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/*<ModeToggle mode={mode} onChange={setMode} />*/}
            <button
              className="hidden sm:block px-5 py-2.5 text-sm font-semibold text-navy-deep border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
              type="button"
              onClick={() => openCta("cta-header-login")}
            >
              Iniciar sesión
            </button>
            <button
              className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              type="button"
              onClick={() => openCta(aiEnabled ? "cta-header-demo" : "cta-header-acceso")}
            >
              {aiEnabled ? "Solicitar demo" : "Solicitar acceso"}
            </button>
          </div>
        </div>
      </header>

      <main>{aiEnabled ? <AiLanding onCta={openCta} /> : <ClassicLanding onCta={openCta} />}</main>

      <CTAModal open={ctaModal.open} source={ctaModal.source} onClose={closeCta} />
    </div>
  );
}
