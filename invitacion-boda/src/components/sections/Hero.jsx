const Hero = ({ invitado }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FDFCF0] overflow-hidden pt-10 pb-20">

      {/* Sutiles reflejos marfil */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#F3E5AB]/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#F3E5AB]/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* CONTENEDOR DE IMAGEN MEJORADO */}
        <div className="flex justify-center w-full mb-10 px-6">
          <img
            src="/img/fondohero.jpeg"
            alt="Nati y Maxi"
            className="
      /* Tamaño en Móvil */
      w-[85%] 
      max-w-[300px] 
      
      /* Tamaño en Pantallas Grandes (PC) */
      md:max-w-[450px] 
      
      /* Proporción y Ajuste */
      aspect-[3/4]      /* Proporción de retrato elegante */
      object-cover      /* Evita que se estire la cara */
      
      /* Estética */
      rounded-[3rem]    /* Bordes muy redondeados (estilo cápsula) */
      shadow-xl 
      border-[6px] border-white
      mx-auto
    "
            style={{ pointerEvents: "none" }}
          />
        </div>

        <p className="uppercase tracking-[0.5em] text-[9px] md:text-xs text-gray-700 mb-8 font-medium">
          Nuestra Boda
        </p>

        {/* Saludo personalizado */}
        {invitado && (
          <div className="mb-4">
            <span className="text-[#B8860B] font-serif italic text-xl md:text-2xl">
              ¡Hola {invitado.nombre}!
            </span>
          </div>
        )}

        {/* NOMBRES */}
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

        {/* Tu frase sugerida con estilo */}
        <p className="text-lg md:text-lg text-gray-600 max-w-xs md:max-w-xl mx-auto italic font-serif leading-relaxed px-4 opacity-90">
          "Una promesa, un sí y una historia que empieza con una nueva etapa. El comienzo de una vida juntos rodeados de nuestra familia y amigos."
        </p>

      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#B8860B] to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;