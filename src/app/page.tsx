"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Mode = "ai" | "clasico";

const problems = [
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

const solutionFeatures = [
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

const steps = [
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
    name: "Andrés Rivera",
    role: "Dueño, Burger Street",
    quote:
      '“Fast Trucks nos permitió ver que el evento más grande no siempre era el más rentable. Ahora elegimos mejor dónde estar.”',
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8zScc_zPs5dBvobHCX2Ib4Gc4yG-vGqpAycuYPKnjc6c-OvuCQtWAzzTmj8a9CFgozWsGysM9fl131eYhBgzBcffbFmbwEooH2Yp2A1l8LP0i4m4ykZN_qn9xLBpyPB_QmmC0fetqrNIPHEd7X7TdnGG4HB9wlMs9Xp_bXEhHCKANtx-n1RQGIwSVp_QoX80vYL8QvxMtrNyYfia62WRwu1DkRYo6rPBfBTpoyiT_Hr8h4qyiJdn7ZCzkd4IYZl2rRVtgnZ9_0gX",
  },
  {
    name: "Carolina Soto",
    role: "Gerente, Taco Mobile",
    quote:
      "“La gestión de inventario para eventos es otro nivel. Eliminamos el desperdicio en un 30% desde el primer mes.”",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqrTQCN0FpVsfaEMjqfHt9n6JYYN_ShMFMnVz0H7vGS8Hu7yij0PJHVziEs3pvCvofuv0FybFS0iIr4s04jAsifmjFzq9O_7lbXnXr0X9rmZBil0jKxbhxbhU4U0u4RH98lgos4oiW35l4NLwrXgI1H4yRhek7LeLyC9LlwIHX2K2zzIVWgp6h-YIPvOdN1b5WrCKYCQn4IhhEyjoXFL-MHw_halYNzh7lqjcV3ELVXfz21xtIhyaOJiGSH5buc8j0kmx0u4CKVC7",
  },
  {
    name: "Marco Venegas",
    role: "Fundador, Coffee Van Chile",
    quoteAI:
      "“El módulo AI es increíble. Sus proyecciones nos ayudan a saber exactamente cuánto personal llevar a cada festival.”",
    quoteClassic:
      "“Incluso sin IA, los reportes en tiempo real nos permiten ajustar personal y stock en cada festival.”",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrCvHdJdvklGm4zDWQYWzRRlyUmnzNeNE6nUAwyB2BQt0iz71wESP4stquHy1SZOIgeUeo0qHJnAHVBL_ex3OE4QaUq1KK4MVGCBWU8uirlwjDVe3PdeJxPwN-3B2872TbjusRCGLUg_hrVx_3NyFUODPk8HwWFltzTFY8mCTN8k9AzOuaF9klC6drb2ZpShWGOtdgxVP6ykH1KtvSOibSt3x2TccC4zx0o-OisqhfRZQCag1a2Yz0F_KmDN2caZ_C9-mJmJDEk8Ai",
  },
];

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/70 border border-primary/20 px-1.5 py-1 shadow-sm">
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

export default function Home() {
  const [mode, setMode] = useState<Mode>("ai");
  const aiEnabled = mode === "ai";

  const heroBadge = useMemo(
    () =>
      aiEnabled
        ? { text: "Nuevo: Módulo Fast Trucks AI", tone: "text-primary bg-primary/10" }
        : { text: "Modo clásico sin IA (IA pronto)", tone: "text-slate-700 bg-white/80" },
    [aiEnabled]
  );

  const stepFour = useMemo(
    () =>
      aiEnabled
        ? {
            title: "Decide con IA",
            text: "Usa los datos y la IA para planificar tu próxima inversión.",
          }
        : {
            title: "Decide",
            text: "Usa los datos para planificar tu próxima inversión. El módulo IA se activará en cuanto tengamos datos suficientes.",
          },
    [aiEnabled]
  );

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-display">
      <header className="sticky top-0 z-50 w-full bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined text-2xl block">
                local_shipping
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Fast Trucks
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-primary transition-colors" href="#problemas">
              Problemas
            </a>
            <a className="hover:text-primary transition-colors" href="#solucion">
              Solución
            </a>
            {aiEnabled && (
              <a className="hover:text-primary transition-colors" href="#ai">
                Fast Trucks AI
              </a>
            )}
            <a className="hover:text-primary transition-colors" href="#proceso">
              Cómo funciona
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ModeToggle mode={mode} onChange={setMode} />
            <button className="hidden sm:block px-5 py-2.5 text-sm font-semibold border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
              Iniciar sesión
            </button>
            <button className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Solicitar demo
            </button>
          </div>
        </div>
      </header>

      <main>
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
                Controla tus ventas en ferias y eventos y toma{" "}
                <span className="text-primary">decisiones inteligentes</span> con
                datos reales.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {aiEnabled
                  ? "El sistema especializado para negocios móviles que transforma el caos de los eventos en rentabilidad medible. Deja de adivinar y comienza a optimizar."
                  : "El sistema especializado para negocios móviles que transforma el caos de los eventos en rentabilidad medible. Modo clásico habilitado mientras terminamos de entrenar la IA."}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 text-base font-bold bg-primary text-white rounded-xl shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all">
                  Solicitar demo gratuita
                </button>
                <button className="px-8 py-4 text-base font-bold bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">play_circle</span>
                  Ver cómo funciona
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <Image
                  alt="Dashboard de ventas"
                  className="w-full h-auto"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKl4ycpbNal8oh0lKome-8EKOuXlehoFfMbgzleDpHUDegSxs1O_OANvi15HQx8RZxWphfTIOCBB11tZAFR3RsTof28N8P6XuB0Ynxl4AwGwqnnVt_NrHVyKoaRd7gWdsQQsYkevmdmjjaCzpurwme8enSvJfxiSz6N08Z4achpOx1wvDx7sMFWN3ZicYWRm118czdcQAefVUplkWWpNVrz9l5cuWInS_us0M_j2R_LK6FBY9AGOwrJwAI1hu22Ue2WanzxmYNMCpy"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-y border-slate-100" id="problemas">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Supera los desafíos de la venta en terreno
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Identifica y resuelve las fugas de dinero que están afectando tu
                crecimiento actual.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-background-light border border-slate-100 hover:border-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-4">
                    {item.icon}
                  </span>
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT31ayx6u935e1Yz6DjUjq7vBI2L1-MC-UEP4zsbcEZggo8yLlgPE8PCVEjTEbWOHWRVurNiwTI3h3Y5d72knCUIpwEw6LlYgeL8WpEcn93XcFtanQb_c4NBcrklJIm7gCEJwXMIc3ixYY8cfcor5kXB9Djz4Pwdy_QvPiHB_cMmcAfOgPEIgZE-p74dnWOqYa6dNLdC_kouz2shqgWc2U1DneabL0fjAQRxfL9x6YBGWdriONGM6i4Yj0xgkBaG5uzmx9wTDpLhK6"
                    width={1400}
                    height={900}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Una solución diseñada para la velocidad del terreno
                  </h2>
                  <p className="text-slate-600">
                    Gestiona múltiples puntos de venta de forma centralizada y en
                    tiempo real.
                  </p>
                </div>
                <div className="space-y-6">
                  {solutionFeatures.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
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

        {aiEnabled ? (
          <section className="py-24 bg-navy-deep text-white overflow-hidden relative" id="ai">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-sm">
                    smart_toy
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Fast Trucks AI
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Inteligencia Predictiva para tu Negocio
                </h2>
                <p className="text-slate-400 max-w-2xl">
                  Nuestra IA analiza miles de puntos de datos para decirte exactamente
                  dónde y cuándo vender para maximizar tus utilidades.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {aiFeatures.map((item) => (
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
        ) : (
          <section className="py-20 bg-white border-y border-slate-100" id="ai">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                <span className="material-symbols-outlined">hourglass_top</span>
                <span>Módulo Fast Trucks AI en entrenamiento</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                Estamos recolectando datos para habilitar la IA
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Usa el modo clásico hoy. Activaremos las predicciones y recomendaciones
                inteligentes apenas alcancemos el volumen de datos necesario. Si quieres
                ser de los primeros en probarlo, solicita la demo y te avisamos.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Reportes en tiempo real listos
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">
                  Proyecciones y alertas: en piloto
                </span>
              </div>
            </div>
          </section>
        )}

        <section className="py-24 bg-white" id="proceso">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-slate-900">
                Implementación en 4 pasos
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-[2px] bg-primary/10 -z-0"></div>
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative z-10 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-primary/30">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500">{step.text}</p>
                </div>
              ))}
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-primary/30">
                  4
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">
                  {stepFour.title}
                </h4>
                <p className="text-sm text-slate-500">{stepFour.text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background-light">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">
              Lo que dicen los dueños de negocios
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item) => {
                const quote =
                  aiEnabled && item.quoteAI
                    ? item.quoteAI
                    : item.quoteClassic ?? item.quote;
                return (
                  <div
                    key={item.name}
                    className="p-8 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col gap-6"
                  >
                    <div className="flex text-primary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className="material-symbols-outlined font-fill"
                        >
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

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-primary rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center gap-8">
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Descubre qué eventos realmente te generan utilidades
                </h2>
                <p className="text-lg opacity-90 max-w-2xl">
                  Únete a cientos de emprendedores que ya están profesionalizando su
                  operación con Fast Trucks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button className="px-10 py-5 bg-navy-deep text-white font-bold rounded-2xl shadow-2xl hover:bg-navy-deep/90 transition-all flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.594-2.618-1.542-1.06-.948-1.597-1.884-1.741-2.289-.144-.405-.015-.624.114-.753.129-.129.288-.315.405-.441.117-.126.155-.216.234-.351.079-.135.039-.252-.02-.378-.06-.126-.54-1.297-.739-1.774-.194-.465-.394-.402-.54-.41-.139-.007-.3-.008-.459-.008-.16 0-.419.06-.639.3-.219.24-.84.822-.84 2.008s.859 2.333.979 2.494c.121.161 1.69 2.579 4.093 3.619.571.247 1.017.395 1.365.505.574.182 1.097.157 1.511.095.462-.069 1.423-.582 1.623-1.144.2-.563.2-1.044.14-1.144-.06-.099-.219-.155-.459-.275zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174l-1.434 5.234 5.35-1.405c1.472.846 3.18 1.332 5.003 1.332 5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
                    </svg>
                    Hablar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background-dark text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1 rounded-md text-white">
                <span className="material-symbols-outlined text-lg block">
                  local_shipping
                </span>
              </div>
              <span className="text-lg font-bold text-white">Fast Trucks</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a className="hover:text-primary transition-colors" href="#">
                Términos
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Privacidad
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Soporte
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Contacto
              </a>
            </div>
            <div className="flex gap-4">
              <a
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">language</span>
              </a>
            </div>
          </div>
          <div className="text-center text-xs border-t border-white/5 pt-8 text-white/60">
            © 2024 Fast Trucks SaaS. Potenciando la gastronomía móvil en Chile y Latam.
          </div>
        </div>
      </footer>
    </div>
  );
}
