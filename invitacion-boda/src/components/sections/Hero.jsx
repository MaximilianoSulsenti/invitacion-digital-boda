import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-pink-100 overflow-hidden">

      {/* Glow decorativo */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-rose-300/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-6 max-w-2xl">

        <p className="uppercase tracking-[0.4em] text-xs text-gray-600 mb-6">
          Invitación de boda
        </p>

        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
          Nati <span className="text-rose-500">&</span> Maxi
        </h1>

        <p className="text-lg text-gray-600 mb-3">
          20 de Noviembre 2026
        </p>

        <p className="text-gray-600 mb-10">
          Queremos compartir este momento único con vos.
        </p>

        {/* CTA único fuerte */}
        <a
          href="#confirmacion"
          className="inline-block px-10 py-3 rounded-full bg-rose-500 text-white font-medium shadow-lg hover:bg-rose-600 transition-all duration-300 hover:scale-105"
        >
          Confirmar asistencia 💌
        </a>

      </div>
    </section>
  );
};

export default Hero;