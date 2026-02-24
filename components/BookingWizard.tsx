import React, { useState, useMemo } from 'react';
import { Check, Smartphone, Calendar, Clock, ChevronRight, ChevronLeft, AlertCircle, Loader2, Percent, Tag, Plus, Zap, Info } from 'lucide-react';
import { sendScreenfixEmails } from '../services/emailService';

// --- DATABASE PRICES (Based on OCR) ---
const SERVICES = [
  { id: 'recond', label: 'Reconditionnement Écran', key: 'recond', desc: "Vitre fissurée mais l'image est intacte" },
  { id: 'screen', label: 'Écran Original Reconditionné', key: 'screen', desc: 'Écran noir, lignes vertes ou tâches' },
  { id: 'back', label: 'Vitre Arrière', key: 'back', desc: 'Le dos du téléphone est brisé' },
  { id: 'battery', label: 'Batterie', key: 'battery', desc: "L'autonomie est faible" },
  { id: 'camera', label: 'Appareil Photo', key: 'camera', desc: 'Photos floues ou caméra noire' },
  { id: 'charge', label: 'Connecteur de Charge', key: 'charge', desc: 'Le téléphone ne charge plus' },
];

const MODELS = [
  { name: 'iPhone 17', recond: 170, screen: 335, back: 150, battery: 90, camera: 145, charge: 140 },
  { name: 'iPhone 17 Air', recond: 170, screen: 335, back: 150, battery: 95, camera: 145, charge: 150 },
  { name: 'iPhone 17 Pro', recond: 190, screen: 435, back: 150, battery: 95, camera: 175, charge: 160 },
  { name: 'iPhone 17 Pro Max', recond: 190, screen: 445, back: 150, battery: 95, camera: 175, charge: 160 },
  { name: 'iPhone 16', recond: 140, screen: 280, back: 150, battery: 85, camera: 145, charge: 120 },
  { name: 'iPhone 16 Plus', recond: 150, screen: 330, back: 150, battery: 95, camera: 145, charge: 130 },
  { name: 'iPhone 16 Pro', recond: 160, screen: 350, back: 150, battery: 95, camera: 165, charge: 130 },
  { name: 'iPhone 16 Pro Max', recond: 170, screen: 380, back: 150, battery: 95, camera: 165, charge: 130 },
  { name: 'iPhone 15', recond: 100, screen: 225, back: 130, battery: 75, camera: 135, charge: 100 },
  { name: 'iPhone 15 Plus', recond: 115, screen: 275, back: 150, battery: 85, camera: 135, charge: 100 },
  { name: 'iPhone 15 Pro', recond: 160, screen: 295, back: 150, battery: 85, camera: 155, charge: 120 },
  { name: 'iPhone 15 Pro Max', recond: 170, screen: 335, back: 150, battery: 95, camera: 155, charge: 130 },
  { name: 'iPhone 14', recond: 90, screen: 195, back: 125, battery: 75, camera: 129, charge: 85 },
  { name: 'iPhone 14 Plus', recond: 100, screen: 215, back: 125, battery: 85, camera: 135, charge: 95 },
  { name: 'iPhone 14 Pro', recond: 130, screen: 245, back: 95, battery: 85, camera: 150, charge: 95 },
  { name: 'iPhone 14 Pro Max', recond: 150, screen: 265, back: 95, battery: 85, camera: 150, charge: 95 },
  { name: 'iPhone 13', recond: 80, screen: 125, back: 75, battery: 65, camera: 119, charge: 75 },
  { name: 'iPhone 13 Mini', recond: 80, screen: 135, back: 75, battery: 65, camera: 110, charge: 75 },
  { name: 'iPhone 13 Pro', recond: 95, screen: 175, back: 85, battery: 75, camera: 130, charge: 85 },
  { name: 'iPhone 13 Pro Max', recond: 100, screen: 185, back: 85, battery: 85, camera: 140, charge: 85 },
  { name: 'iPhone 12', recond: 50, screen: 115, back: 75, battery: 65, camera: 99, charge: 75 },
  { name: 'iPhone 12 Mini', recond: 50, screen: 115, back: 75, battery: 65, camera: 90, charge: 75 },
  { name: 'iPhone 12 Pro', recond: 50, screen: 115, back: 75, battery: 65, camera: 105, charge: 75 },
  { name: 'iPhone 12 Pro Max', recond: 80, screen: 165, back: 85, battery: 75, camera: 120, charge: 75 },
  { name: 'iPhone 11', recond: 50, screen: 75, back: 65, battery: 55, camera: 89, charge: 65 },
  { name: 'iPhone 11 Pro', recond: 50, screen: 100, back: 65, battery: 55, camera: 95, charge: 70 },
  { name: 'iPhone 11 Pro Max', recond: 70, screen: 110, back: 65, battery: 65, camera: 100, charge: 75 },
  { name: 'iPhone X', recond: 50, screen: 85, back: 65, battery: 45, camera: 80, charge: 60 },
  { name: 'iPhone XS', recond: 50, screen: 85, back: 65, battery: 45, camera: 85, charge: 65 },
  { name: 'iPhone XS Max', recond: 60, screen: 100, back: 65, battery: 60, camera: 90, charge: 70 },
  { name: 'iPhone XR', recond: 50, screen: 75, back: 65, battery: 45, camera: 75, charge: 55 },
  { name: 'iPhone SE 2022', recond: 50, screen: 65, back: 65, battery: 45, camera: 70, charge: 50 },
];

// Function to get iPhone image based on model name
const getIphoneImage = (modelName: string): string => {
  if (modelName.includes('17') || modelName.includes('16')) return '/iphones/Iphone-15.png';
  if (modelName.includes('15') || modelName.includes('14')) return '/iphones/Iphone-15.png';
  if (modelName.includes('13') || modelName.includes('12') || modelName.includes('11')) return '/iphones/iphone13_12_11.png';
  if (modelName.includes('X')) return '/iphones/iphone-X.png';
  if (modelName.includes('SE')) return '/iphones/iphone-SE-2022.png';
  return '/iphones/chassis-iphone-12-removebg-preview.png'; // default
};

export const BookingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  // Multi-select state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isOther, setIsOther] = useState(false);
  const [customIssue, setCustomIssue] = useState('');
  
  // Scheduling State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Contact State
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ email: false, phone: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track first render to avoid auto-scroll on page load
  const isFirstRender = React.useRef(true);

  // Constants
  const timeSlots = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  // Generate next 5 business days
  const days = useMemo(() => {
    const arr = [];
    let d = new Date();
    while (arr.length < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) { // Skip Sunday
        arr.push(new Date(d));
      }
    }
    return arr;
  }, []);

  // Helpers
  const currentModelData = MODELS.find(m => m.name === selectedModel);
  const getPrice = (serviceKey: string) => {
    if (!currentModelData) return 0;
    // @ts-ignore - dynamic key access
    return currentModelData[serviceKey] || 0;
  };

  // Pricing Logic with Multi-Select Discounts
  const pricingSummary = useMemo(() => {
    if (isOther) return { total: 0, discount: 0, final: 0, percent: 0 };
    
    let baseTotal = 0;
    selectedServices.forEach(id => {
      const service = SERVICES.find(s => s.id === id);
      if (service) {
        baseTotal += getPrice(service.key);
      }
    });

    const count = selectedServices.length;
    let discountPercent = 0;
    
    if (count === 1) discountPercent = 0.10;
    else if (count === 2) discountPercent = 0.15;
    else if (count >= 3) discountPercent = 0.25;

    const discountAmount = Math.round(baseTotal * discountPercent);
    const finalPrice = baseTotal - discountAmount;

    return {
      total: baseTotal,
      discount: discountAmount,
      final: finalPrice,
      percent: discountPercent * 100
    };
  }, [selectedServices, isOther, currentModelData]);

  const toggleService = (id: string) => {
    if (isOther) {
        setIsOther(false);
        setSelectedServices([id]);
    } else {
        setSelectedServices(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }
  };

  const selectOther = () => {
      setIsOther(true);
      setSelectedServices([]);
  };

  const validateContact = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/; // Basic French format
    
    const isEmailValid = emailRegex.test(contact.email);
    const isPhoneValid = contact.phone.length > 8; // Simple length check for international compatibility

    setErrors({
      email: !isEmailValid,
      phone: !isPhoneValid
    });

    return isEmailValid && isPhoneValid && contact.name.length > 0;
  };

  const submitToGoogleSheets = async () => {
    if (!validateContact()) return;
    
    setIsSubmitting(true);

    // Liste des services sélectionnés (comme tableau de strings)
    const serviceLabels = selectedServices
      .map(id => SERVICES.find(s => s.id === id)?.label)
      .filter(Boolean) as string[];

    const serviceNames = isOther 
        ? `Autre: ${customIssue}` 
        : serviceLabels;

    const priceDisplay = isOther 
        ? 'Sur devis' 
        : `${pricingSummary.final}€`;

    // Préparer les données pour EmailJS
    const evaluation = {
      brand: 'Apple',
      model: selectedModel || '',
      repair: serviceNames, // Tableau de strings ou string unique
      price: priceDisplay,
      totalSansReduc: isOther ? 'Sur devis' : `${pricingSummary.total}€`,
      reductionPercent: isOther ? '0' : `${pricingSummary.percent}`,
    };

    const rdv = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      date: selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : '',
      time: selectedTime || '',
    };

    console.log('=== Données envoyées à EmailJS ===');
    console.log('Evaluation:', evaluation);
    console.log('RDV:', rdv);

    try {
      // Envoi des emails via EmailJS
      await sendScreenfixEmails(evaluation, rdv);
      setStep(4);
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails:", error);
      alert("Une erreur est survenue lors de l'envoi de la confirmation. Veuillez nous contacter par téléphone au +33 6 22 18 85 74.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top when step changes (but not on first render)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const element = document.getElementById('booking-card');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [step]);

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20">
      
      {/* Promo Banner Enhanced */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 bg-[length:200%_auto] animate-gradient text-white p-6 md:p-8 rounded-[2rem] mb-10 shadow-2xl shadow-rose-500/30 relative overflow-hidden border border-white/10">
         {/* Decorative Background Pattern */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Info */}
            <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                     <span className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
                         <Zap size={24} className="text-yellow-300 fill-yellow-300" />
                     </span>
                     <h3 className="font-bold text-2xl md:text-3xl tracking-tight leading-none">
                        Offre Web <span className="text-white/80">Exclusive</span>
                     </h3>
                </div>
                <p className="text-white/90 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                   Réservez en ligne et cumulez les réparations pour débloquer des réductions immédiates. <span className="opacity-75 block mt-1 text-xs md:inline md:mt-0">*La remise s'applique automatiquement au panier.</span>
                </p>
            </div>

            {/* Right Tiers */}
            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex flex-col items-center min-w-[100px] transition-transform hover:scale-105">
                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider mb-1">1 Service</span>
                    <span className="text-2xl font-bold text-white">-10%</span>
                </div>
                
                <div className="bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-3 flex flex-col items-center min-w-[100px] relative transition-transform hover:scale-105">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">2 Services</span>
                    <span className="text-2xl font-bold text-white">-15%</span>
                </div>

                 <div className="bg-white text-rose-600 rounded-2xl p-3 flex flex-col items-center min-w-[110px] shadow-xl transform scale-105 border-2 border-white/50 relative">
                    <div className="absolute -top-3 bg-yellow-400 text-rose-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                        Best Deal
                    </div>
                    <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mb-1">3+ Services</span>
                    <span className="text-3xl font-extrabold">-25%</span>
                </div>
            </div>

         </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 md:mb-12 px-6 max-w-3xl mx-auto">
        <div className="flex justify-between text-[12px] md:text-[14px] font-semibold text-gray-400 mb-4 tracking-wide uppercase">
          <span className={step >= 1 ? 'text-blue-600' : ''}>01. Modèle</span>
          <span className={step >= 2 ? 'text-blue-600' : ''}>02. Panne</span>
          <span className={step >= 3 ? 'text-blue-600' : ''}>03. Infos</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Card */}
      <div id="booking-card" className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-[3rem] p-5 sm:p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px]">
        
        {/* Step 1: Select Model */}
        {step === 1 && (
          <div className="animate-fade-in">
             <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8 text-center tracking-tight">
              Quel est votre <span className="text-blue-600">iPhone</span> ?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {MODELS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => { setSelectedModel(m.name); setStep(2); }}
                  className="p-4 rounded-2xl border bg-white border-slate-100 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all text-sm md:text-base font-bold text-slate-700 hover:text-blue-700 flex flex-col items-center gap-2"
                >
                  <img 
                    src={getIphoneImage(m.name)} 
                    alt={m.name} 
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                  <span className="text-center">{m.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 text-center">
               <p className="text-slate-400 text-sm">Vous ne trouvez pas votre modèle ? <a href="tel:+33622188574" className="text-blue-600 underline font-semibold">Appelez-nous</a></p>
            </div>
          </div>
        )}

        {/* Step 2: Select Service */}
        {step === 2 && (
          <div className="animate-fade-in pb-20"> {/* Added padding bottom for fixed price bar on mobile if needed, or just space */}
            <div className="flex items-center gap-2 mb-8 justify-center">
                <span className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide">{selectedModel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-center tracking-tight">
              Quelle est la <span className="text-blue-600">Panne</span> ?
            </h2>
            <p className="text-center text-slate-400 mb-6 md:mb-8 text-xs sm:text-sm">Sélectionnez plusieurs services pour augmenter votre réduction</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((s) => {
                const price = getPrice(s.key);
                const isSelected = selectedServices.includes(s.id);
                // HIGHLIGHT LOGIC: Identify if it is the service to highlight
                const isRecommended = s.id === 'recond';

                return (
                  <button
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`p-6 rounded-2xl border flex items-center justify-between group transition-all relative overflow-hidden ${
                        isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                        : isRecommended 
                            ? 'bg-blue-50/60 border-blue-300 shadow-md ring-1 ring-blue-200 hover:bg-blue-100/50' // Highlight styles
                            : 'bg-white border-slate-100 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    {/* RECOMMENDED BADGE */}
                    {isRecommended && (
                         <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}>
                             Recommandé
                         </div>
                    )}

                    <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'border-blue-500 bg-blue-500' : isRecommended ? 'border-blue-500 text-blue-500' : 'border-slate-200'}`}>
                            {isSelected ? <Check size={14} className="text-white" /> : (isRecommended && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>)}
                        </div>
                        <div className="flex flex-col items-start text-left">
                           <span className={`font-bold text-lg leading-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>{s.label}</span>
                           <span className={`text-xs font-medium mt-1 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>{s.desc}</span>
                        </div>
                    </div>
                    <span className={`font-bold text-xl ${isSelected ? 'text-blue-400' : 'text-blue-600'}`}>{price}€</span>
                  </button>
                )
              })}
              
              {/* Option Autre */}
              <button
                onClick={selectOther}
                className={`p-6 rounded-2xl border flex flex-col items-start justify-center group transition-all md:col-span-2 ${
                    isOther
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                    : 'bg-white border-slate-100 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                 <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${isOther ? 'border-blue-500 bg-blue-500' : 'border-slate-200'}`}>
                            {isOther && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className={`font-bold text-lg ${isOther ? 'text-white' : 'text-slate-800'}`}>Autre problème ?</span>
                             <span className={`text-xs font-medium mt-1 ${isOther ? 'text-blue-200' : 'text-slate-400'}`}>Diagnostic personnalisé</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`font-bold text-xl ${isOther ? 'text-blue-400' : 'text-blue-600'}`}>35€</span>
                        <span className={`text-xs font-medium ${isOther ? 'text-gray-300' : 'text-gray-400'}`}>Sur devis</span>
                    </div>
                 </div>
                 {isOther && (
                     <div className="w-full mt-4" onClick={(e) => e.stopPropagation()}>
                         <textarea 
                            value={customIssue}
                            onChange={(e) => setCustomIssue(e.target.value)}
                            placeholder="Veuillez décrire brièvement le problème..."
                            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            rows={2}
                         />
                     </div>
                 )}
              </button>
            </div>

            {/* Price Summary Live Update */}
            {!isOther && selectedServices.length > 0 && (
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 sm:mb-0">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <Tag size={20} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Réduction appliquée ({pricingSummary.percent}%)</p>
                            <p className="text-slate-900 font-bold text-lg">
                                <span className="line-through text-slate-400 mr-2">{pricingSummary.total}€</span>
                                <span className="text-green-600">-{pricingSummary.discount}€</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-slate-500 text-sm font-medium">Total Estimé</p>
                        <p className="text-3xl font-bold text-blue-700">{pricingSummary.final}€</p>
                    </div>
                </div>
            )}
          </div>
        )}

        {/* Step 3: Schedule & Contact */}
        {step === 3 && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Scheduling */}
            <div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Choisissez votre créneau
                 </h3>
                 
                 <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">Jour</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {days.map((d, i) => {
                            const isSelected = selectedDate === d.toDateString();
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(d.toDateString())}
                                    className={`min-w-[80px] p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                                        isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                                    }`}
                                >
                                    <span className="text-xs font-bold uppercase opacity-70">{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
                                    <span className="text-xl font-bold">{d.getDate()}</span>
                                </button>
                            )
                        })}
                    </div>
                 </div>

                 {selectedDate && (
                     <div className="animate-fade-in">
                        <p className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">Heure</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                                        selectedTime === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                     </div>
                 )}

                 {/* Order Summary Recap */}
                 <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Récapitulatif</h4>
                    <ul className="space-y-2 mb-4">
                        {isOther ? (
                            <li className="text-sm text-slate-600 font-medium flex justify-between">
                                <span>Demande spécifique</span>
                                <span>Sur devis</span>
                            </li>
                        ) : (
                            selectedServices.map(id => {
                                const s = SERVICES.find(x => x.id === id);
                                return (
                                    <li key={id} className="text-sm text-slate-600 font-medium flex justify-between">
                                        <span>{s?.label}</span>
                                        <span>{getPrice(s?.key || '')}€</span>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                    {!isOther && (
                        <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                             <span className="text-sm font-bold text-slate-500">Total avec remise (-{pricingSummary.percent}%)</span>
                             <span className="text-xl font-bold text-blue-600">{pricingSummary.final}€</span>
                        </div>
                    )}
                 </div>
            </div>

            {/* Right: Contact Form */}
            <div className={`transition-opacity duration-500 ${selectedDate && selectedTime ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    Vos Coordonnées
                 </h3>

                 <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nom Complet</label>
                        <input 
                            type="text" 
                            value={contact.name}
                            onChange={(e) => setContact({...contact, name: e.target.value})}
                            placeholder="Jean Dupont"
                            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email <span className="text-red-500">*</span></label>
                        <input 
                            type="email" 
                            value={contact.email}
                            onChange={(e) => {
                                setContact({...contact, email: e.target.value});
                                if (errors.email) setErrors({...errors, email: false});
                            }}
                            placeholder="jean@example.com"
                            className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                                errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle size={12}/> Email invalide</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Téléphone <span className="text-red-500">*</span></label>
                        <input 
                            type="tel" 
                            value={contact.phone}
                            onChange={(e) => {
                                setContact({...contact, phone: e.target.value});
                                if (errors.phone) setErrors({...errors, phone: false});
                            }}
                            placeholder="06 12 34 56 78"
                            className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                                errors.phone ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                            }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle size={12}/> Numéro requis</p>}
                    </div>
                 </div>
                 
                 {/* Privacy Policy Notice */}
                 <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <p className="text-xs text-slate-600 text-center">
                        En remplissant notre formulaire, vous acceptez notre{' '}
                        <button 
                            onClick={() => (window as any).showPrivacyPolicy?.()}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            politique de confidentialité
                        </button>.
                    </p>
                 </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
             <div className="text-center py-10 animate-fade-in max-w-lg mx-auto">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/30 animate-bounce-slow">
                    <Check className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Merci, {contact.name.split(' ')[0]} !</h2>
                <p className="text-slate-600 mb-6 text-lg font-normal">
                    Votre rendez-vous pour <span className="text-slate-900 font-bold">{selectedModel}</span> est confirmé le <br/>
                    <span className="text-blue-600 font-bold text-xl">{selectedDate && new Date(selectedDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long'})} à {selectedTime}</span>.
                </p>
                
                {/* Services Recap */}
                <div className="bg-slate-50 rounded-xl p-4 text-left max-w-md mx-auto mb-8 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Prestations choisies</p>
                    {isOther ? (
                        <p className="font-semibold text-slate-900">Demande spécifique sur devis</p>
                    ) : (
                        <div className="space-y-1">
                            {selectedServices.map(id => (
                                <p key={id} className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Check size={14} className="text-green-500" />
                                    {SERVICES.find(s => s.id === id)?.label}
                                </p>
                            ))}
                            <p className="pt-2 mt-2 border-t border-slate-200 font-bold text-blue-600 text-right">Total: {pricingSummary.final}€</p>
                        </div>
                    )}
                </div>

                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100">
                    Un email de confirmation a été envoyé à <strong>{contact.email}</strong>.
                </div>
                <button onClick={() => window.location.reload()} className="mt-8 text-slate-400 font-semibold hover:text-slate-600 underline">Retour à l'accueil</button>
             </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
             <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
                {step > 1 ? (
                    <button 
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-3 rounded-full hover:bg-slate-50 text-slate-500 font-bold text-sm transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft size={18} /> Retour
                    </button>
                ) : <div></div>}
                
                {step === 1 && (
                     <button 
                     onClick={() => setStep(2)}
                     disabled={!selectedModel}
                     className="px-8 py-4 bg-slate-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-bold text-base shadow-lg flex items-center gap-2 transition-all"
                 >
                     Suivant <ChevronRight size={18} />
                 </button>
                )}

                {step === 2 && (
                     <button 
                     onClick={() => setStep(3)}
                     disabled={(!isOther && selectedServices.length === 0) || (isOther && customIssue.length < 3)}
                     className="px-8 py-4 bg-slate-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-bold text-base shadow-lg flex items-center gap-2 transition-all"
                 >
                     Suivant <ChevronRight size={18} />
                 </button>
                )}

                {step === 3 && (
                    <button 
                        onClick={submitToGoogleSheets}
                        disabled={!selectedDate || !selectedTime || !contact.email || !contact.phone || isSubmitting}
                        className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-bold text-base shadow-lg shadow-blue-600/30 flex items-center gap-3 transition-all transform hover:-translate-y-1"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmer le RDV'} 
                    </button>
                )}
             </div>
        )}

      </div>
    </div>
  );
};