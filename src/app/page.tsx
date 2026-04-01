"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Mode = "ai" | "clasico";

const WEBHOOK_URL = "https://n8n.chilsmart.com/webhook-test/TAIGA";
const CTA_WEBHOOK_URL = "https://n8n.chilsmart.com/webhook/operfoods-contact";
const INTRO_VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/fast-trucks.firebasestorage.app/o/WhatsApp%20Video%202026-03-18%20at%209.35.43%20AM.mp4?alt=media&token=64f1fcbb-807b-464b-8d80-e271f4675414";

const aiProblems = [
  {
    icon: "menu_book",
    title: "Menú difícil de mantener",
    text: "Actualizar precios, agregar productos o subir fotos se vuelve una tarea lenta y propensa a errores.",
  },
  {
    icon: "link",
    title: "Sin link para pedir",
    text: "Tus clientes te escriben por WhatsApp o Instagram y se pierden pedidos entre mensajes.",
  },
  {
    icon: "hourglass_empty",
    title: "Pedidos sin estado",
    text: "No tienes un flujo claro: recibido → preparando → listo → entregado. Eso genera demoras y reclamos.",
  },
  {
    icon: "qr_code_2",
    title: "Eventos sin trazabilidad",
    text: "Vendes en ferias, pero luego no sabes qué se vendió ahí vs en local. Te quedas sin data para decidir.",
  },
];

const aiSolutionFeatures = [
  {
    icon: "storefront",
    title: "Crea tu negocio y tu usuario",
    text: "En minutos tienes tu cuenta y tu negocio listo para empezar a vender en local o en eventos.",
  },
  {
    icon: "upload_file",
    title: "Carga el menú fácil",
    text: "Sube tu menú por CSV o PDF, o cárgalo manualmente. Incluye plantilla descargable para CSV.",
  },
  {
    icon: "public",
    title: "Publica tu menú y comparte un link",
    text: "Obtienes un link para que tus clientes pidan directo desde tu menú online, con logo y colores de tu negocio.",
  },
  {
    icon: "checklist",
    title: "Recibe pedidos y adminístralos",
    text: "Ve pedidos entrantes, cambia estados, registra órdenes manuales y guarda tu historial de clientes.",
  },
];

const aiSteps = [
  {
    number: "1",
    title: "Crea tu cuenta",
    text: "Registra tu usuario y tu negocio (foodtruck o local de comida rápida).",
  },
  {
    number: "2",
    title: "Carga tu menú",
    text: "Importa por CSV/PDF o cárgalo manualmente. Puedes descargar nuestra plantilla CSV.",
  },
  {
    number: "3",
    title: "Publica y recibe pedidos",
    text: "Publica tu menú, comparte tu link y gestiona pedidos y registro de clientes.",
  },
];

const testimonials = [
  {
    name: "Gabriela Ramirez",
    role: "Gerente, Gaby's Burgers",
    quote:
      '“Operfoods nos permitió ver que el evento más grande no siempre era el más rentable. Ahora elegimos mejor dónde estar.”',
    initials: "GR",
  },
  {
    name: "Sebastian Villagrán",
    role: "Gerente, Pigzas pizzeria",
    quote:
      "“La gestión de inventario para eventos es otro nivel. Eliminamos el desperdicio en un 30% desde el primer mes.”",
    initials: "SV",
  },
  {
    name: "Marco Venegas",
    role: "Fundador, Coffee Van Chile",
    quoteAI:
      "“El módulo Reportes es increíble. Sus proyecciones nos ayudan a saber exactamente cuánto personal llevar a cada festival.”",
    quoteClassic:
      "“Incluso sin IA, los reportes en tiempo real nos permiten ajustar personal y stock en cada festival.”",
    initials: "MV",
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
    question: "¿Cómo cargo mi menú?",
    answer:
      "Puedes subir tu menú por CSV o PDF, o cargar productos manualmente. Si no tienes CSV, puedes descargar una plantilla y rellenarla en Excel/Google Sheets.",
  },
  {
    question: "¿Cómo funciona el menú online y el link?",
    answer:
      "Cuando publicas tu menú, Operfoods te entrega un link único para compartir. Tus clientes ven tu menú online (con logo y colores del negocio) y pueden hacer pedidos directamente.",
  },
  {
    question: "¿Puedo administrar el estado de los pedidos?",
    answer:
      "Sí. Puedes ver pedidos entrantes y actualizar estados (por ejemplo: recibido, preparando, listo, entregado). También puedes registrar órdenes manualmente.",
  },
  {
    question: "¿Puedo editar mi menú después de publicarlo?",
    answer:
      "Sí. Puedes ver y modificar el menú en cualquier momento (precios, productos, disponibilidad) y los cambios se reflejan en el link compartido.",
  },
  {
    question: "¿Cómo funcionan los eventos con QR?",
    answer:
      "Puedes crear un evento y Operfoods genera un QR que dirige a tu menú. La diferencia es que los pedidos que llegan quedan asociados a ese evento para luego ver reportes ordenados.",
  },
  {
    question: "¿Local y evento funcionan igual?",
    answer:
      "Sí. Operan igual; la diferencia es que en modo evento las órdenes (y tu data) quedan asociadas al evento hasta que lo terminas o vuelves a modo local.",
  },
];

const planFeatures = [
  "Usuario + negocio (foodtruck o local)",
  "Carga de menú por CSV, PDF o manual",
  "Plantilla CSV descargable",
  "Publicación de menú y link para compartir",
  "Menú online personalizable (logo y colores)",
  "Pedidos entrantes con estados",
  "Registro de órdenes manuales",
  "Clientes e historial",
  "Eventos con QR y asociación de pedidos",
  "Reportes ordenados por evento / local",
];

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

function AiLanding({
  onCta,
  onWatchVideo,
}: {
  onCta: (source: string) => void;
  onWatchVideo: () => void;
}) {
  const heroBadge = {
    text: "Nuevo: menú online + pedidos + eventos con QR",
    tone: "text-primary bg-primary/10",
  };

  const stepFour = {
    title: "Activa eventos y obtén reportes",
    text: "Crea eventos, usa QR y revisa la data por evento para decidir mejor.",
  };

  return (
    <>
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
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
              Tu <span className="text-primary">menú online</span> listo para vender en local y eventos
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Crea tu usuario y negocio, carga tu menú (CSV, PDF o manual), publícalo y recibe pedidos. Activa eventos y
              usa un QR para asociar órdenes al evento y ver reportes claros.
            </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">public</span>
              Publica tu menú y comparte un link para pedir
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">checklist</span>
              Gestiona pedidos por estado y registra órdenes manuales
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">qr_code_2</span>
              Eventos con QR y reportes por evento
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-4 text-base font-bold bg-primary text-white rounded-xl shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all cursor-pointer"
                type="button"
                onClick={() => onCta("cta-ai-hero-demo")}
              >
                Probar Operfoods · 30 días gratis
              </button>
            <a
              className="px-8 py-4 text-base font-bold bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              href="#precios"
            >
              <span className="material-symbols-outlined">payments</span>
              Ver precio
            </a>
            <button
              type="button"
              className="px-6 py-4 font-semibold text-sm bg-white border border-slate-200 text-slate-900 rounded-xl flex items-center gap-2 shadow-sm hover:border-primary hover:text-primary transition-all cursor-pointer"
              onClick={onWatchVideo}
            >
              <span className="material-symbols-outlined text-base">play_circle</span>
              Ver cómo funciona
            </button>
            </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <span className="material-symbols-outlined text-base">redeem</span>
            Prueba gratuita de 30 días incluida.
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="material-symbols-outlined text-base">verified_user</span>
            Creado por un desarrollador cuyo hermano vende en eventos gastronómicos.
          </div>
          <ul className="flex flex-wrap gap-3 text-sm text-slate-700">
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">public</span>
              Menú online
            </li>
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">checklist</span>
              Gestión de pedidos
            </li>
            <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">qr_code_2</span>
              Eventos + QR
            </li>
          </ul>
          </div>
          <div className="relative group lg:scale-110 lg:translate-x-4 transition-transform">
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Vender sin un sistema te hace perder pedidos (y control)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Si tu menú no está publicado, los pedidos llegan por chat y los eventos no quedan registrados. Operfoods ordena tu operación
              para vender mejor y obtener data usable.
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
                  alt="Menú online y pedidos"
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
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Tu menú online, pedidos y eventos en un solo lugar</h2>
                <p className="text-slate-600">
                  Publica tu menú, comparte tu link y administra pedidos. En eventos, usa QR y obtén reportes ordenados por evento.
                </p>
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

      <section className="py-20 bg-white border-t border-slate-100" id="beneficio">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Beneficio económico</p>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Vende más rápido y con menos fricción</h2>
            <p className="text-slate-600">
              Un link de menú reduce el ida y vuelta por chat, ordena pedidos y te da data por local/evento. Operfoods te ayuda a operar
              mejor y decidir con información real.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary mt-[2px]">check_circle</span>
                Menos pedidos perdidos y menos errores.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary mt-[2px]">check_circle</span>
                Flujo claro de estados para tu equipo.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary mt-[2px]">check_circle</span>
                Reportes por evento para repetir lo que funciona.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-background-light border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-primary">Ejemplo de evento</p>
                <h4 className="text-xl font-black text-slate-900">Feria Plaza Puente Alto</h4>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">
                <span className="material-symbols-outlined text-base">done_all</span>
                Rentable
              </span>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100">
                <span className="font-semibold text-slate-500">Órdenes</span>
                <span className="text-lg font-black text-slate-900">128</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100">
                <span className="font-semibold text-slate-500">Ticket promedio</span>
                <span className="text-lg font-black text-slate-900">$3.750</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                <span className="font-semibold text-primary">Resumen del evento</span>
                <span className="text-2xl font-black text-primary">$480.000</span>
              </div>
              <p className="text-xs text-slate-500">
                La idea es separar local vs eventos y tener reportes ordenados para decidir mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light" id="comparativa">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Olvida el cuaderno y el POS genérico</h2>
            <p className="text-slate-600">Compara tu forma actual de operar con una herramienta hecha para eventos.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-4 text-xs font-bold uppercase text-slate-400 bg-slate-50 px-4 py-3">
              <span>Método</span>
              <span className="text-center">Problema</span>
              <span className="text-center">¿Muestra ganancias?</span>
              <span className="text-center text-primary">Operfoods</span>
            </div>
            {[
              { metodo: "Cuaderno", problema: "No sabes ganancias reales", check: false },
              { metodo: "Excel", problema: "Difícil de usar en eventos", check: false },
              { metodo: "POS genérico", problema: "Solo sirve para cobrar", check: false },
              { metodo: "Operfoods", problema: "Muestra cuánto ganas por evento", check: true },
            ].map((row) => (
              <div key={row.metodo} className="grid grid-cols-4 px-4 py-4 border-t border-slate-100 items-center text-sm">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">payments</span>
                  {row.metodo}
                </div>
                <div className="text-center text-slate-600">{row.problema}</div>
                <div className="text-center">
                  {row.check ? (
                    <span className="material-symbols-outlined text-green-500">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-slate-300">close</span>
                  )}
                </div>
                <div className="text-center">
                  {row.check ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                      Sí, por evento
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">No</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="foodtrucks">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Hecho para foodtrucks</p>
            <h2 className="text-3xl font-bold text-slate-900">Diseñado para vender en terreno</h2>
            <p className="text-slate-600">
              Operfoods nació trabajando con foodtrucks en ferias, festivales y food parks. Es simple, móvil y listo para operar
              desde el celular.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              {["Ferias gastronómicas", "Festivales", "Eventos privados", "Food parks"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">local_activity</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="material-symbols-outlined text-base">smartphone</span>
              Optimizado para uso en celular y venta rápida.
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
              <Image
                alt="Operfoods en celular"
                src="https://firebasestorage.googleapis.com/v0/b/fast-trucks.firebasestorage.app/o/operfoods-celular-cortado.jpeg?alt=media&token=842eddfb-fe37-4ea8-aa42-71dd3af75f9c"
                width={1200}
                height={1400}
                className="w-full h-auto"
              />
            </div>
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 font-bold text-navy-deep">
                      {item.initials}
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
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Empieza a entender realmente tu negocio</h2>
              <p className="text-lg opacity-90 max-w-2xl">
                Prueba Operfoods gratis por 30 días y ve de inmediato cuánto ganas en cada evento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a
                className="px-10 py-5 bg-navy-deep text-white font-bold rounded-2xl shadow-2xl hover:bg-navy-deep/90 transition-all flex items-center justify-center gap-3 cursor-pointer"
                onClick={() => onCta("cta-ai-banner")}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.594-2.618-1.542-1.06-.948-1.597-1.884-1.741-2.289-.144-.405-.015-.624.114-.753.129-.129.288-.315.405-.441.117-.126.155-.216.234-.351.079-.135.039-.252-.02-.378-.06-.126-.54-1.297-.739-1.774-.194-.465-.394-.402-.54-.41-.139-.007-.3-.008-.459-.008-.16 0-.419.06-.639.3-.219.24-.84.822-.84 2.008s.859 2.333.979 2.494c.121.161 1.69 2.579 4.093 3.619.571.247 1.017.395 1.365.505.574.182 1.097.157 1.511.095.462-.069 1.423-.582 1.623-1.144.2-.563.2-1.044.14-1.144-.06-.099-.219-.155-.459-.275zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174l-1.434 5.234 5.35-1.405c1.472.846 3.18 1.332 5.003 1.332 5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
                  </svg>
                  Crear cuenta ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-12 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/Logo-operfoods-1.svg"
                  alt="Operfoods"
                  width={120}
                  height={120}
                  className="h-16 w-16 md:h-20 md:w-20"
                  priority
                />
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
                  <a className="hover:text-primary" href="#precios">
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
            <div>
              <h5 className="mb-4 font-bold text-navy-deep">Redes</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="https://www.instagram.com/operfoods" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="https://www.linkedin.com/company/operfoods" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400 space-y-1">
            <div>© 2026 Chilsmart. Todos los derechos reservados.</div>
            <div className="text-[11px]">
              Creado por{" "}
              <a className="text-primary hover:underline" href="https://chilsmart.com" target="_blank" rel="noopener noreferrer">
                Chilsmart
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function ClassicLanding({
  onCta,
  onWatchVideo,
}: {
  onCta: (source: string) => void;
  onWatchVideo: () => void;
}) {
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
                Ver precio
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-navy-deep hover:border-primary hover:text-primary transition-colors cursor-pointer"
                onClick={onWatchVideo}
              >
                <span className="material-symbols-outlined text-base">play_circle</span>
                Ver cómo funciona
              </button>
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
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <Image src="/Logo-operfoods-1.svg" alt="Operfoods" width={40} height={40} className="h-10 w-10" />
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
            <div>
              <h5 className="mb-4 font-bold text-navy-deep">Redes</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="https://www.instagram.com/operfoods" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="https://www.linkedin.com/company/operfoods" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="https://www.youtube.com/@operfoods" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400 space-y-1">
            <div>© 2026 Chilsmart. Todos los derechos reservados.</div>
            <div className="text-[11px]">
              Creado por{" "}
              <a className="text-primary hover:underline" href="https://chilsmart.com" target="_blank" rel="noopener noreferrer">
                Chilsmart
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function PricingSection({ onCta }: { onCta: (source: string) => void }) {
  const [billing, setBilling] = useState<"mensual" | "anual">("mensual");
  const monthlyPrice = 30000;
  const annualPrice = 300000;
  const annualMonthlyEquivalent = Math.round(annualPrice / 12);

  return (
    <section className="px-6 py-24 md:px-20 bg-white" id="precios">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-navy-deep">Un solo plan, todas las funcionalidades</h2>
          <p className="mt-3 text-slate-600">
            Menú online, pedidos, clientes, eventos con QR y reportes. Sin complicaciones.
          </p>
        </div>
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setBilling("mensual")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                billing === "mensual" ? "bg-white text-navy-deep shadow-sm" : "text-slate-600 hover:text-navy-deep"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setBilling("anual")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                billing === "anual" ? "bg-white text-navy-deep shadow-sm" : "text-slate-600 hover:text-navy-deep"
              }`}
            >
              Anual{" "}
              <span className="ml-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-black text-primary">
                Ahorra
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/30 bg-white p-10 shadow-xl shadow-primary/10 ring-2 ring-primary/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-primary">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Plan Operfoods
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-black text-navy-deep">Todo lo que necesitas para vender con tu menú online</h3>
              <p className="mt-2 text-slate-600">
                Ideal para foodtrucks y locales de comida rápida que quieren recibir pedidos, administrar eventos y ver reportes.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-center">
              <div className="text-xs font-bold uppercase text-slate-500">{billing === "mensual" ? "Precio mensual" : "Precio anual"}</div>
              <div className="mt-1 text-4xl font-black text-navy-deep">
                {billing === "mensual"
                  ? `$ ${monthlyPrice.toLocaleString("es-CL")}`
                  : `$ ${annualPrice.toLocaleString("es-CL")}`}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                {billing === "mensual" ? "/ mes" : "/ año"}
              </div>
              {billing === "anual" && (
                <div className="mt-2 text-xs text-slate-500">
                  Equivale a <span className="font-bold text-navy-deep">$ {annualMonthlyEquivalent.toLocaleString("es-CL")}</span> / mes
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {planFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="material-symbols-outlined text-primary text-base mt-[1px]">check_circle</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <button
              className="w-full inline-flex justify-center rounded-xl bg-primary text-white font-black py-3.5 shadow-primary/20 shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
              type="button"
              onClick={() => onCta(`cta-pricing-${billing}`)}
            >
              Probar 30 días gratis
            </button>
            <a
              className="w-full inline-flex justify-center rounded-xl border border-slate-200 bg-white text-navy-deep font-bold py-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
              href="#contacto"
            >
              Hablar con ventas
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            Puedes cambiar a plan anual cuando quieras.
          </div>
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
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    negocio: "",
    negocioNombre: "",
    telefono: "",
    pass: "",
  });

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setForm({ nombre: "", email: "", negocio: "", negocioNombre: "", telefono: "", pass: "" });
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Crea tu cuenta</p>
          <h3 className="text-2xl font-black text-navy-deep">Déjanos tus datos y te creamos tu cuenta</h3>
          <p className="text-sm text-slate-600 mt-1">Solo pedimos lo esencial para crear tu cuenta.</p>
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
            <label className="mb-1 block text-sm font-semibold text-navy-deep">Contraseña</label>
            <input
              required
              name="pass"
              value={form.pass}
              onChange={(e) => setForm((f) => ({ ...f, pass: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-primary focus:ring-primary"
              placeholder="Crea una contraseña segura"
              type="password"
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
            {status === "loading" ? "Enviando..." : "Crear mi cuenta"}
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

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl bg-slate-900 shadow-2xl border border-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white transition-colors"
          aria-label="Cerrar video"
        >
          <span className="material-symbols-outlined text-xl leading-none">close</span>
        </button>
        <div className="flex justify-center p-6 bg-white">
          <video
            controls
            autoPlay
            className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            src={INTRO_VIDEO_URL}
          >
            Este navegador no soporta el reproductor de video.
          </video>
        </div>
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
  const [videoOpen, setVideoOpen] = useState(false);

  const openCta = (source: string) => setCtaModal({ open: true, source });
  const closeCta = () => setCtaModal({ open: false, source: null });
  const openVideo = () => setVideoOpen(true);
  const closeVideo = () => setVideoOpen(false);

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
        { href: "#beneficio", label: "Beneficio" },
        { href: "#comparativa", label: "Comparativa" },
        { href: "#foodtrucks", label: "Foodtrucks" },
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
            <a
              className="px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-navy-deep border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
              href="https://app.operfoods.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar sesión
            </a>
            <button
              className="px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              type="button"
              onClick={() => openCta(aiEnabled ? "cta-header-demo" : "cta-header-acceso")}
            >
              {aiEnabled ? "Solicitar demo" : "Solicitar acceso"}
            </button>
          </div>
        </div>
      </header>

      <main>
        {aiEnabled ? (
          <AiLanding onCta={openCta} onWatchVideo={openVideo} />
        ) : (
          <ClassicLanding onCta={openCta} onWatchVideo={openVideo} />
        )}
      </main>

      <CTAModal open={ctaModal.open} source={ctaModal.source} onClose={closeCta} />
      <VideoModal open={videoOpen} onClose={closeVideo} />
    </div>
  );
}
