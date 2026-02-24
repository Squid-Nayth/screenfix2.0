import React from 'react';
import { Shield, Database, Lock, Eye, FileText, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <section className="py-24 relative bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-50 text-green-600 border border-green-100 mb-6">
            <Shield size={20} />
            <span className="text-[14px] font-semibold tracking-wide">Protection des données</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 tracking-tight mb-6">
            Politique de <span className="text-green-600">Confidentialité</span>
          </h1>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10">
          
          {/* 1. Données collectées */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Données collectées</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p className="mb-4">Le site ScreenFix collecte uniquement les données suivantes via son formulaire de commande :</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Nom</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Prénom</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Adresse email</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Finalité de la collecte */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Finalité de la collecte</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>Ces informations sont utilisées uniquement pour traiter la demande de réparation du client.</p>
            </div>
          </div>

          {/* 3. Conservation des données */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Conservation des données</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>Les données ne sont pas conservées après traitement. Aucune base de données ni fichier client n'est stocké sur le site.</p>
            </div>
          </div>

          {/* 4. Confidentialité */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Confidentialité</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>Les données sont traitées de manière confidentielle et ne sont transmises à aucun tiers.</p>
            </div>
          </div>

          {/* 5. Vos droits */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Vos droits</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p className="mb-4">
                Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification ou de suppression à l'adresse suivante :
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                <a href="mailto:cineeffrance@gmail.com" className="text-green-600 hover:underline font-semibold">
                  cineeffrance@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* 6. Services utilisés */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Services utilisés</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>
                Le formulaire utilise un service externe pour l'envoi des messages du nom d'<strong>EmailJS</strong>, conforme au RGPD.
              </p>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => (window as any).hidePrivacyPolicy?.()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg"
          >
            Retour à l'accueil
          </button>
        </div>

      </div>
    </section>
  );
};
