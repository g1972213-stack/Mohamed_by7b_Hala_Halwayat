import React from 'react';
import { motion } from 'framer-motion';

const futureEras = [
  {
    year: "2028",
    milestone: "The Architecture of Our First Shared Space",
    detail: "High-ceilings, concrete structural surfaces, premium glass panels, and ambient lighting systems. A curated oasis where your laughter is the signature acoustic characteristic."
  },
  {
    year: "2035",
    milestone: "The Deep Trans-Continental Escape",
    detail: "Losing track of calendar metrics completely in forgotten foreign towns. Waking up alongside you to look over high balcony views overlooking historic coastlines."
  },
  {
    year: "2055",
    milestone: "Infinite Continuity Mechanics",
    detail: "Grey hair accents, identical premium taste parameters, and sitting in curated lounge furniture laughing at the exact same jokes we constructed forty years prior."
  }
];

export default function FutureTimeline() {
  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-28">
          <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">CHRONO-CONTINUUM</span>
          <h2 className="text-4xl md:text-5xl font-cinzel text-white tracking-wide">The Future Blueprint</h2>
          <div className="w-16 h-[1px] bg-luxury-rose/40 mx-auto mt-6" />
        </div>

        <div className="relative border-l border-white/10 pl-6 md:pl-12 ml-4 md:ml-8 space-y-16">
          {futureEras.map((era, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-luxury-black border-2 border-luxury-rose group-hover:bg-luxury-rose group-hover:scale-125 transition-all duration-300 shadow-luxury-glow" />

              <div className="glass-panel p-8 rounded-xl transition-all duration-500 hover:border-white/20">
                <span className="text-3xl font-cinzel font-bold text-glow-rose text-luxury-rose tracking-wider block mb-2">
                  {era.year}
                </span>
                <h3 className="text-xl font-serif text-white tracking-wide mb-3">
                  {era.milestone}
                </h3>
                <p className="text-luxury-silver/70 text-sm md:text-base font-sans font-light leading-relaxed">
                  {era.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}