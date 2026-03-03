export interface RepairServiceDocument {
  key: string;
  label: string;
  description: string;
  order?: number;
  active?: boolean;
  recommended?: boolean;
}

export interface IphoneModelRepairDocument {
  serviceKey: string;
  price: number;
}

export interface IphoneModelDocument {
  brand: string;
  name: string;
  image: string;
  order?: number;
  active?: boolean;
  repairs: IphoneModelRepairDocument[];
}

export interface BookingRepairService {
  id: string;
  key: string;
  label: string;
  desc: string;
  order: number;
  active: boolean;
  recommended: boolean;
}

export interface BookingRepairModel {
  brand: string;
  name: string;
  image: string;
  order: number;
  active: boolean;
  priceMap: Record<string, number>;
}

const serviceModules = import.meta.glob('../content/repair-services/*.json', {
  eager: true
}) as Record<string, { default: RepairServiceDocument } | RepairServiceDocument>;

const modelModules = import.meta.glob('../content/iphone-models/*.json', {
  eager: true
}) as Record<string, { default: IphoneModelDocument } | IphoneModelDocument>;

const toModuleValue = <T,>(value: { default: T } | T): T => ('default' in value ? value.default : value);

const repairServices: BookingRepairService[] = Object.values(serviceModules)
  .map((moduleValue) => toModuleValue(moduleValue))
  .map((service, index) => ({
    id: service.key,
    key: service.key,
    label: service.label,
    desc: service.description,
    order: service.order ?? (index + 1) * 10,
    active: service.active !== false,
    recommended: Boolean(service.recommended)
  }))
  .sort((a, b) => a.order - b.order);

const repairModels: BookingRepairModel[] = Object.values(modelModules)
  .map((moduleValue) => toModuleValue(moduleValue))
  .map((model, index) => ({
    brand: model.brand || 'Apple',
    name: model.name,
    image: model.image,
    order: model.order ?? (index + 1) * 10,
    active: model.active !== false,
    priceMap: Object.fromEntries(
      (model.repairs || [])
        .filter((repair) => repair.serviceKey && Number.isFinite(Number(repair.price)))
        .map((repair) => [repair.serviceKey, Number(repair.price)])
    )
  }))
  .sort((a, b) => a.order - b.order);

export const getActiveRepairServices = () => repairServices.filter((service) => service.active);

export const getAllRepairServices = () => repairServices;

export const getActiveIphoneModels = () => repairModels.filter((model) => model.active);

export const getAllIphoneModels = () => repairModels;

export const getIphoneModelByName = (name: string | null | undefined) =>
  repairModels.find((model) => model.name === name) || null;
