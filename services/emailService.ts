import emailjs from '@emailjs/browser';

// Configuration EmailJS - Mêmes clés que dans email.js
const EMAILJS_USER_ID = '9bBAaUfzPUgf6Ho1Z';
const EMAILJS_SERVICE_ID = 'service_vocrjx9';
const EMAILJS_TEMPLATE_USER = 'template_pvowh8p';
const EMAILJS_TEMPLATE_ADMIN = 'template_szlgmdo';
const ADMIN_EMAIL = 'cineeffrance@gmail.com';

// Variable pour s'assurer que l'initialisation ne se fait qu'une fois
let isInitialized = false;

function initEmailJS() {
  if (!isInitialized) {
    try {
      emailjs.init(EMAILJS_USER_ID);
      isInitialized = true;
      console.log('✅ EmailJS initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur d\'initialisation EmailJS:', error);
      throw error;
    }
  }
}

export interface EvaluationData {
  brand: string;
  model: string;
  repair: string | string[];
  price: string | number;
  totalSansReduc?: string | number;
  reductionPercent?: string | number;
}

export interface RdvData {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time?: string;
}

/**
 * Formate les types de réparations sous la forme (type1 + type2)
 */
function formatRepairTypes(repair: string | string[]): string {
  if (Array.isArray(repair)) {
    return repair.length > 1 ? `(${repair.join(' + ')})` : (repair[0] || '');
  }
  
  if (typeof repair === 'string') {
    const arr = repair.split(',').map(s => s.trim()).filter(Boolean);
    return arr.length > 1 ? `(${arr.join(' + ')})` : (arr[0] || '');
  }
  
  return repair || '';
}

/**
 * Envoie les emails de confirmation à l'utilisateur et à l'admin
 */
export async function sendScreenfixEmails(
  evaluation: EvaluationData,
  rdv: RdvData
): Promise<void> {
  // Initialiser EmailJS si ce n'est pas déjà fait
  initEmailJS();
  
  const repairStr = formatRepairTypes(evaluation.repair);
  
  console.log('=== EmailJS Debug ===');
  console.log('Type(s) de réparation sélectionné(s) :', repairStr);
  console.log('Prix sans réduction :', evaluation.totalSansReduc);
  console.log('Prix avec réduction :', evaluation.price);
  console.log('RDV:', rdv);

  // Paramètres pour l'email à l'utilisateur
  const userParams = {
    to_email: rdv.email,
    user_name: rdv.name,
    phone_number: rdv.phone || 'Non fourni',
    rdv_date: rdv.date,
    rdv_time: rdv.time || '',
    hours_arrived: rdv.time || '',
    eval_brand: evaluation.brand || 'Apple',
    eval_model: evaluation.model,
    eval_repair: repairStr,
    eval_price: String(evaluation.price),
    eval_total_sans_reduc: String(evaluation.totalSansReduc || evaluation.price),
    eval_total_reduction_percent: String(evaluation.reductionPercent || '0'),
  };

  // Paramètres pour l'email à l'admin
  const adminParams = {
    to_email: ADMIN_EMAIL,
    user_name: rdv.name,
    user_email: rdv.email,
    phone_number: rdv.phone || 'Non fourni',
    user_phone: rdv.phone || 'Non fourni',
    rdv_date: rdv.date,
    rdv_time: rdv.time || '',
    hours_arrived: rdv.time || '',
    eval_brand: evaluation.brand || 'Apple',
    eval_model: evaluation.model,
    eval_repair: repairStr,
    eval_price: String(evaluation.price),
    eval_total_sans_reduc: String(evaluation.totalSansReduc || evaluation.price),
    eval_total_reduction_percent: String(evaluation.reductionPercent || '0'),
  };

  console.log('User params:', userParams);
  console.log('Admin params:', adminParams);

  let userEmailSuccess = false;
  let adminEmailSuccess = false;
  let errors: string[] = [];

  try {
    // Envoi à l'utilisateur
    console.log('Envoi email utilisateur...');
    const userResponse = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_USER, userParams);
    console.log('✅ Email utilisateur envoyé:', userResponse);
    userEmailSuccess = true;
  } catch (error) {
    console.error('❌ Échec envoi email utilisateur:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    errors.push(`Email utilisateur: ${errorMessage}`);
  }

  try {
    // Envoi à l'admin
    console.log('Envoi email admin...');
    const adminResponse = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, adminParams);
    console.log('✅ Email admin envoyé:', adminResponse);
    adminEmailSuccess = true;
  } catch (error) {
    console.error('❌ Échec envoi email admin:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    errors.push(`Email admin: ${errorMessage}`);
  }

  // Vérifier si au moins un email a été envoyé
  if (!userEmailSuccess && !adminEmailSuccess) {
    const errorMsg = `Échec complet de l'envoi des emails. Erreurs: ${errors.join(', ')}`;
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  if (errors.length > 0) {
    console.warn('⚠️ Envoi partiel:', errors.join(', '));
  } else {
    console.log('✅ Tous les emails ont été envoyés avec succès');
  }
}
