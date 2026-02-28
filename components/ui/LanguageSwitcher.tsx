import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { LANGUAGE_OPTIONS, useI18n } from '../../lib/i18n';

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false }) => {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const currentLanguage = LANGUAGE_OPTIONS.find((option) => option.code === locale) || LANGUAGE_OPTIONS[0];

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${mobile ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-2 rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600 ${
          mobile ? 'w-full px-4 py-3' : 'px-4 py-2.5'
        }`}
        aria-label={t('navbar.language')}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <Globe size={mobile ? 18 : 16} />
          <span className="font-semibold text-sm">{currentLanguage.country}</span>
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute z-40 mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ${
            mobile ? 'left-0 w-full' : 'right-0 w-56'
          }`}
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const active = option.code === locale;
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  setLocale(option.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs font-bold uppercase">{option.country}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
