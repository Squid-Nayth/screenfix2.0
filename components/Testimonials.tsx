import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Aksel T.",
    device: "iPhone 14 Pro Max",
    text: "Je recommande très fortement Screenfix, que du bonheur, super conseil, super explications, le jeune homme partage sa passion, il vous invite même à voir comment ces interventions se déroule... vraiment top et en plus super agréable. Bravo changez rien.",
    rating: 5
  },
  {
    name: "Sophie M.",
    device: "iPhone 13 Pro Max",
    text: "Excellent atelier de reparation; honnête et sacré professional..! Thank you Mr: DAO",
    rating: 5
  },
  {
    name: "Vincent B.",
    device: "iPhone 15",
    text: "Au top ! Rapide, efficace et pas cher ! Les seuls à pouvoir changer la vitre d'un iPhone sans changer tout l'écran (vitre+dalle LCD). Merci !",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="avis" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-5xl md:text-[64px] font-bold text-center mb-20 text-slate-900 tracking-tight">
          CLIENTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">VÉRIFIÉS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] relative flex flex-col justify-between hover:bg-white/80 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 group">
              <Quote className="absolute top-8 right-8 text-slate-300 w-12 h-12 transform -rotate-12 group-hover:text-yellow-400 transition-colors" />
              
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-base md:text-[18px] font-normal leading-relaxed mb-8">"{review.text}"</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-[16px]">{review.name}</h4>
                    <span className="text-[13px] text-slate-400 font-semibold">{review.device}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};