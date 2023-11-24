// import { getAssetPath } from "@/core/helpeassets";

interface IPriceList {
  id: string;
  site_location: string;
  per_day_charge: string;
  equipment_wise: [{
    id: number;
    name: string;
    charge: string;
  }];
  accommodation: string;
  travelling: string;
  training: string;
  customer_type: string;
  created_at: string;
}

export type { IPriceList };


export const Equipments = [
  {
      id: 0,
      name: "LAF",
  },
  {
      id: 1,
      name: "BSF",
  },
];

export const GetEquipment = (id) => {
  const equip = Equipments.find(item => item.id == id);
  return equip ? equip.name : "";
};