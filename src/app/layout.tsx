import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Software POS para food trucks y eventos | Control de ventas en terreno",
  description:
    "Plataforma POS para food trucks, ferias y locales móviles: ventas por evento, inventario, recetas, reportes en tiempo real y múltiples cajas.",
  keywords: [
    "software pos food truck",
    "punto de venta eventos",
    "control de ventas ferias",
    "inventario restaurante móvil",
    "arqueo de caja",
    "recetas y costos",
    "reportes en tiempo real",
    "múltiples cajas y turnos",
    "ventas por evento",
    "integración transbank",
  ],
  openGraph: {
    title: "POS para food trucks y eventos | Ventas, inventario y reportes",
    description:
      "Gestiona ventas por evento, inventario, recetas y reportes en tiempo real. Ideal para food trucks, ferias y locales móviles.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POS para food trucks y eventos | Ventas y reportes en tiempo real",
    description:
      "Punto de venta con ventas por evento, inventario, recetas y dashboards para negocios gastronómicos móviles.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "POS para food trucks y eventos",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Software POS para food trucks, ferias y locales móviles: ventas por evento, inventario, recetas, reportes en tiempo real y múltiples cajas.",
    offers: {
      "@type": "Offer",
      price: "22500",
      priceCurrency: "CLP",
      category: "subscription",
    },
    featureList: [
      "Ventas por evento y local",
      "Arqueos y movimientos de caja",
      "Inventario por insumo y recetas",
      "Reportes en tiempo real",
      "Múltiples cajas y turnos",
    ],
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo separo las ventas por evento y local fijo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cada venta se etiqueta con el evento o local activo para que veas ingresos, costos y margen por ubicación en tiempo real.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo conectar Transbank y emitir comandas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, el POS se integra con Transbank y permite impresión de comandas Bluetooth para cocina o barra.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo se controla el inventario por receta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cargas tus recetas y descontamos insumos por venta. Hay alertas de stock y valorización en planes avanzados.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo operar múltiples cajas y turnos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, puedes abrir varias cajas y turnos simultáneos, con arqueos y movimientos de caja separados.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tan rápido puedo implementar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En menos de un día puedes cargar menú, precios y métodos de pago. Ofrecemos onboarding guiado.",
        },
      },
    ],
  };

  return (
    <html lang="es" className="light">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </head>
      <body className={`${workSans.variable} antialiased bg-background-light`}>
        {children}
      </body>
    </html>
  );
}
