import React, { useState } from 'react';
import { Building2, User, Mail, Phone, FileText, Store, AlertCircle, Info, X } from 'lucide-react';

interface B2BSignupProps {
  onClose: () => void;
}

export const B2BSignup: React.FC<B2BSignupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    siret: ''
  });
  
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    siret: false
  });
  
  const [showDevMessage, setShowDevMessage] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    const siretRegex = /^\d{14}$/;
    
    const newErrors = {
      email: !emailRegex.test(formData.email),
      phone: formData.phone.length < 8,
      siret: !siretRegex.test(formData.siret.replace(/\s/g, ''))
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Afficher le message de développement
    setShowDevMessage(true);
    setTimeout(() => setShowDevMessage(false), 4000);
  };

  const handleAccessShop = () => {
    setShowDevMessage(true);
    setTimeout(() => setShowDevMessage(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Development Message Notification - Centered */}
      {showDevMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-blue-200 rounded-2xl shadow-2xl p-8 max-w-md mx-4 relative">
            <button 
              onClick={() => setShowDevMessage(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Info className="text-blue-600" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xl mb-2">En développement</h4>
                <p className="text-slate-600">Cette partie du site est en développement, elle sera bientôt disponible.</p>
              </div>
              <button
                onClick={() => setShowDevMessage(false)}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}

        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6">
              <Building2 size={20} />
              <span className="text-sm font-semibold tracking-wide">Espace Professionnel</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Ouvrir un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Compte Pro</span>
            </h1>
            
            <p className="text-slate-600 text-lg">
              Accédez à notre catalogue de pièces détachées aux tarifs revendeurs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <User className="inline mr-2" size={16} />
                Nom Complet <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Jean Dupont"
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
              />
            </div>

            {/* Nom de la société */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <Building2 className="inline mr-2" size={16} />
                Nom de la Société <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Ma Boutique Mobile"
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
              />
            </div>

            {/* Grid pour Email et Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  <Mail className="inline mr-2" size={16} />
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: false});
                  }}
                  placeholder="contact@exemple.com"
                  className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                    errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle size={12}/> Email invalide
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  <Phone className="inline mr-2" size={16} />
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (errors.phone) setErrors({...errors, phone: false});
                  }}
                  placeholder="06 12 34 56 78"
                  className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                    errors.phone ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle size={12}/> Numéro requis
                  </p>
                )}
              </div>
            </div>

            {/* SIRET */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <FileText className="inline mr-2" size={16} />
                Numéro SIRET <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={formData.siret}
                onChange={(e) => {
                  setFormData({...formData, siret: e.target.value});
                  if (errors.siret) setErrors({...errors, siret: false});
                }}
                placeholder="123 456 789 00010"
                maxLength={17}
                className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                  errors.siret ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                }`}
              />
              {errors.siret && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle size={12}/> SIRET invalide (14 chiffres requis)
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1 ml-1">14 chiffres - Permet de vérifier votre activité professionnelle</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
            >
              Créer mon compte professionnel
            </button>
          </form>

          {/* Already Registered */}
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600 mb-4">
              Vous êtes déjà inscrit chez nous ?
            </p>
            <button
              onClick={handleAccessShop}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
            >
              <Store size={18} />
              Accéder à notre boutique
            </button>
          </div>
        </div>
      </div>
    );
  };
