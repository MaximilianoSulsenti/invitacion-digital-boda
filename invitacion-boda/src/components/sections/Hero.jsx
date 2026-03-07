import React from "react";

const Hero = ({ invitado }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FDFCF0] overflow-hidden">
      
      {/* Sutiles reflejos marfil */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#F3E5AB]/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#F3E5AB]/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        
        <p className="uppercase tracking-[0.5em] text-[9px] md:text-xs text-gray-400 mb-12 font-medium">
          Nuestra Boda
        </p>

        {/* Saludo personalizado */}
        {invitado && (
          <div className="mb-4 animate-fade-in">
            <span className="text-[#B8860B] font-serif italic text-lg md:text-xl">
              ¡Hola {invitado.nombre}!
            </span>
          </div>
        )}

        {/* NOMBRES: Con Shelley Script style (Pinyon Script) */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-shelley text-black mb-10 leading-none">
          Nati <span className="text-[#B8860B] mx-2">&</span> Maxi
        </h1>

        {/* Separador elegante */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-[0.5px] bg-[#B8860B]/30"></div>
          <p className="text-sm md:text-base text-black tracking-[0.3em] font-light uppercase">
            20 . 11 . 2026
          </p>
          <div className="w-8 h-[0.5px] bg-[#B8860B]/30"></div>
        </div>

        <p className="text-xl md:text-lg text-gray-500 max-w-xs md:max-w-sm mx-auto italic font-serif leading-relaxed px-4 opacity-80">
          {invitado
            ? "Queremos compartir este momento único con vos."
            : "¡Nos casamos y queremos que seas parte de nuestra historia!"}
        </p>

      </div>

      {/* Indicador de scroll minimalista */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#B8860B] to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;