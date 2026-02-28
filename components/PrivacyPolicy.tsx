import React from 'react';
import { Shield, Database, Lock, Eye, FileText, Mail } from 'lucide-react';
import { useI18n, type SupportedLocale } from '../lib/i18n';

export const PrivacyPolicy: React.FC = () => {
  const { t, locale } = useI18n();
  const dataItems = getPrivacyDataItems(locale);

  return (
    <section data-anim-section className="py-24 relative bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-50 text-green-600 border border-green-100 mb-6">
            <Shield size={20} />
            <span className="text-[14px] font-semibold tracking-wide">{t('privacy.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 tracking-tight mb-6">
            {t('privacy.titleLead')} <span className="text-green-600">{t('privacy.titleAccent')}</span>
          </h1>
        </div>

        {/* Content Card */}
        <div data-anim-stagger className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10">
          
          {/* 1. Données collectées */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section1Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p className="mb-4">{t('privacy.section1Intro')}</p>
              <ul className="space-y-2 ml-6">
                {dataItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Finalité de la collecte */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section2Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>{t('privacy.section2Text')}</p>
            </div>
          </div>

          {/* 3. Conservation des données */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section3Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>{t('privacy.section3Text')}</p>
            </div>
          </div>

          {/* 4. Confidentialité */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section4Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>{t('privacy.section4Text')}</p>
            </div>
          </div>

          {/* 5. Vos droits */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section5Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p className="mb-4">
                {t('privacy.section5Text')}
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
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('privacy.section6Title')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <p>{t('privacy.section6Text')}</p>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => (window as any).hidePrivacyPolicy?.()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg"
          >
            {t('privacy.back')}
          </button>
        </div>

      </div>
    </section>
  );
};

const getPrivacyDataItems = (locale: SupportedLocale) => {
  switch (locale) {
    case 'en':
      return ['First name', 'Last name', 'Email address'];
    case 'de':
      return ['Vorname', 'Nachname', 'E-Mail-Adresse'];
    case 'es':
      return ['Nombre', 'Apellido', 'Correo electrónico'];
    case 'vi':
      return ['Tên', 'Họ', 'Địa chỉ email'];
    case 'ja':
      return ['名', '姓', 'メールアドレス'];
    case 'ko':
      return ['이름', '성', '이메일 주소'];
    case 'zh':
      return ['名字', '姓氏', '电子邮箱'];
    case 'zh_tw':
      return ['名字', '姓氏', '電子郵件'];
    case 'th':
      return ['ชื่อ', 'นามสกุล', 'อีเมล'];
    case 'id':
      return ['Nama depan', 'Nama belakang', 'Alamat email'];
    case 'ms':
      return ['Nama pertama', 'Nama keluarga', 'Alamat e-mel'];
    case 'hi':
      return ['पहला नाम', 'उपनाम', 'ईमेल पता'];
    default:
      return ['Nom', 'Prénom', 'Adresse email'];
  }
};
