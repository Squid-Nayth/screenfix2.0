import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode
} from 'libphonenumber-js/min';

export interface CountryPhoneOption {
  iso: CountryCode;
  name: string;
  dialCode: string;
}

const DEFAULT_COUNTRY: CountryCode = 'FR';
const PRIORITY_COUNTRIES: CountryCode[] = ['FR', 'BE', 'CH', 'LU', 'CA', 'US', 'GB', 'DE', 'ES', 'IT'];

const displayNames =
  typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['fr'], { type: 'region' })
    : null;

const formatCountryName = (iso: CountryCode) => {
  return displayNames?.of(iso) || iso;
};

const buildCountryOptions = () => {
  const baseOptions = getCountries().map((iso) => ({
    iso,
    name: formatCountryName(iso),
    dialCode: `+${getCountryCallingCode(iso)}`
  }));

  const prioritySet = new Set(PRIORITY_COUNTRIES);
  const priorityOptions = PRIORITY_COUNTRIES.map((iso) => {
    return baseOptions.find((option) => option.iso === iso);
  }).filter(Boolean) as CountryPhoneOption[];

  const restOptions = baseOptions
    .filter((option) => !prioritySet.has(option.iso))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  return [...priorityOptions, ...restOptions];
};

export const PHONE_COUNTRY_OPTIONS = buildCountryOptions();
export const DEFAULT_PHONE_COUNTRY = DEFAULT_COUNTRY;

export const getCountryOption = (iso?: string) => {
  return (
    PHONE_COUNTRY_OPTIONS.find((option) => option.iso === iso) ||
    PHONE_COUNTRY_OPTIONS.find((option) => option.iso === DEFAULT_COUNTRY) ||
    PHONE_COUNTRY_OPTIONS[0]
  );
};

export const sanitizeLocalPhoneInput = (value: string) => {
  return value.replace(/[^\d\s().-]/g, '').replace(/\s{2,}/g, ' ').trimStart();
};

export const buildInternationalPhone = (countryIso: string, localNumber: string) => {
  const option = getCountryOption(countryIso);
  const sanitizedLocal = sanitizeLocalPhoneInput(localNumber).trim();
  if (!sanitizedLocal) return '';
  return `${option.dialCode} ${sanitizedLocal}`.trim();
};

export const isInternationalPhoneValid = (countryIso: string, localNumber: string, required = false) => {
  const phone = buildInternationalPhone(countryIso, localNumber);
  const digitsOnly = phone.replace(/\D/g, '');

  if (!digitsOnly) return !required;
  if (digitsOnly.length < 6 || digitsOnly.length > 15) return false;

  try {
    return isValidPhoneNumber(phone);
  } catch {
    return digitsOnly.length >= 6 && digitsOnly.length <= 15;
  }
};
