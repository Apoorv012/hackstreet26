

export default function PrizesSection({ sectionRef }) {
  return (
    <>
      <section ref={sectionRef} style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", flexShrink: 0, backgroundColor: "#050505", height: "auto" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <div className="w-full h-full bg-[#050505]">
            <img src="/prizes_bg.png" className="w-full h-full object-cover opacity-50" alt="Prize Background" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle, transparent 20%, #050505 100%)" }} />
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "4vh", minHeight: "100vh" }}>
          <div className="container mx-auto px-6 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mb-4 mt-[-2vh] lg:mt-0">
            <img src="/prizepool.png" alt="Prize Pool" className="w-[110vw] md:w-[60vw] lg:w-[900px] h-auto drop-shadow-[0_0_25px_rgba(220,38,38,0.7)] transform transition-transform duration-700 hover:scale-105" style={{ maxWidth: "none" }} />
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 w-full max-w-7xl">
              <div className="w-full lg:w-2/5 flex justify-center relative pointer-events-none mt-8 lg:mt-12 translate-y-6 lg:translate-y-12">
                <div className="absolute -inset-10 bg-red-600/40 blur-[90px] rounded-full animate-strongPulse" />
                <img src="/cat.png" className="w-[280px] md:w-[450px] lg:w-[650px] relative z-10 opacity-100 drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]" alt="Lucky Cat" />
              </div>
              <div className="w-full lg:w-3/5 flex flex-col gap-4 pb-8">
                {[
                  { rank: "WINNER", desc: "The Grand Prize will be given to a project that outstands all other submissions.", amount: "₹5500", color: "from-yellow-500/40", textColor: "text-yellow-500", glow: "0_0_25px_rgba(234,179,8,1)" },
                  { rank: "1ST RUNNER UP", desc: "1st Runner-up prize will be given to the second best project of the hackathon.", amount: "₹4500", color: "from-slate-400/30", textColor: "text-slate-300", glow: "0_0_25px_rgba(203,213,225,0.9)" },
                  { rank: "2ND RUNNER UP", desc: "2nd Runner-up project of the hackathon will win some awesome prizes.", amount: "₹3000", color: "from-orange-800/30", textColor: "text-orange-700", glow: "0_0_25px_rgba(194,65,12,0.9)" },
                ].map((prize, i) => (
                  <div key={i} className="relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.04]" style={{ clipPath: "polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)" }}>
                    <div className={`bg-gradient-to-r ${prize.color} to-transparent p-[2px] transition-all duration-500`}>
                      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl py-6 md:py-5 px-9 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine pointer-events-none" />
                        <div className="flex-1 pr-4 relative z-10">
                          <h3 className={`text-xl md:text-5xl font-black italic tracking-tighter ${prize.textColor} mb-1 transition-all group-hover:tracking-normal`} style={{ filter: `drop-shadow(${prize.glow})` }}>{prize.rank}</h3>
                          <p className="text-gray-300 text-[7px] md:text-[10px] font-medium max-w-sm uppercase opacity-85">{prize.desc}</p>
                        </div>
                        <div className="text-right shrink-0 relative z-10">
                          <div className="h-[2px] w-12 bg-red-600/50 mb-2 ml-auto transition-all group-hover:w-16 group-hover:bg-red-500" />
                          <span className="text-2xl md:text-5xl font-black text-white italic animate-prizeGlow">{prize.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}