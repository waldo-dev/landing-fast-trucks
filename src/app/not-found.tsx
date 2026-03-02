import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-light flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-6 bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="text-3xl font-black text-slate-900">No encontramos esa página</h1>
        <p className="text-slate-600">
          Puede que el enlace esté roto o que hayas escrito mal la dirección. Vuelve al inicio o revisa nuestros planes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white font-bold shadow-primary/20 shadow-lg hover:bg-primary/90 transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/#precios"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-primary/30 text-primary font-bold bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            Ver planes
          </Link>
        </div>
      </div>
    </main>
  );
}

