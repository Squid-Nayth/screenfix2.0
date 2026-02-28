import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRY_OPTIONS,
  buildInternationalPhone,
  getCountryOption,
  sanitizeLocalPhoneInput
} from '../../lib/phoneUtils';

interface InternationalPhoneInputProps {
  countryIso: string;
  localNumber: string;
  onCountryIsoChange: (value: string) => void;
  onLocalNumberChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  selectClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  countryIso,
  localNumber,
  onCountryIsoChange,
  onLocalNumberChange,
  required = false,
  disabled = false,
  error = false,
  selectClassName = '',
  inputClassName = '',
  placeholder
}) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({});
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const selectedCountry = getCountryOption(countryIso || DEFAULT_PHONE_COUNTRY);
  const prefix = selectedCountry.dialCode;
  const effectivePlaceholder = placeholder || t('phoneInput.localPlaceholder');

  const updateDropdownPosition = React.useCallback(() => {
    if (!triggerRef.current || typeof window === 'undefined') return;

    const rect = triggerRef.current.getBoundingClientRect();
    const width = Math.max(rect.width, 260);
    const maxLeft = Math.max(16, window.innerWidth - width - 16);
    const left = Math.min(rect.left, maxLeft);

    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 8,
      left,
      width,
      zIndex: 10000
    });
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    updateDropdownPosition();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedTrigger && !clickedDropdown) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleReposition = () => {
      updateDropdownPosition();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, updateDropdownPosition]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLocalNumberChange(sanitizeLocalPhoneInput(event.target.value));
  };

  const handleCountryChange = (value: string) => {
    onCountryIsoChange(value);
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] gap-3">
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-label={t('phoneInput.countryCodeAria')}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full h-full min-h-[58px] px-4 rounded-xl bg-slate-50 border outline-none transition-all font-semibold text-slate-700 flex items-center justify-between ${
            error
              ? 'border-red-400 focus:border-red-500 bg-red-50'
              : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white'
          } ${selectClassName}`}
        >
          <span>{prefix}</span>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && typeof document !== 'undefined' && createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            style={dropdownStyle}
            className="max-w-[calc(100vw-32px)] overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-2xl"
          >
            <div className="max-h-72 overflow-y-auto p-2">
              {PHONE_COUNTRY_OPTIONS.map((option) => {
                const isSelected = option.iso === selectedCountry.iso;
                return (
                  <button
                    key={option.iso}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleCountryChange(option.iso)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate text-sm font-medium">{option.name}</span>
                    <span className="shrink-0 text-sm font-bold">{option.dialCode}</span>
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
      </div>

      <input
        type="tel"
        inputMode="tel"
        value={localNumber}
        onChange={handlePhoneChange}
        placeholder={effectivePlaceholder}
        disabled={disabled}
        required={required}
        aria-label={t('phoneInput.phoneNumberAria')}
        className={`w-full p-4 rounded-xl bg-slate-50 border outline-none transition-all font-medium ${
          error
            ? 'border-red-400 focus:border-red-500 bg-red-50'
            : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white'
        } ${inputClassName}`}
      />
      <input type="hidden" value={buildInternationalPhone(selectedCountry.iso, localNumber)} readOnly />
    </div>
  );
};
