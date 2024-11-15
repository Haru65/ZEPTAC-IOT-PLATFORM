interface IInvoices {
  id: number;
  customer:{
    name: string;
    company_name: string;
  };
  client:{
    city: string;
    state: string;
  };
  company_details: {
    company_name: string;
  };
  date: string;
  status: string;
  total: string;
  company_id: string;
}

export type { IInvoices };

export const uomOptions = [
  { id: "kg", label: "Kilogram" },
  { id: "ltr", label: "Liter" },
  { id: "pcs", label: "Pieces" },
  { id: "m", label: "Meter" },
  { id: "cm", label: "Centimeter" },
  { id: "inch", label: "Inch" },
  { id: "lb", label: "Pound" },
  { id: "hr", label: "Hours" },
];


// Define the structure for ItemFormat1
export interface ItemFormat1 {
  id: string;
  site_location: string;
  per_day_charge: string;
  number_of_days: string;
  accommodation: number;
  travelling: number;
  training: number;
  boarding: number;
  pickup: number;
  accomm: boolean;
  travel: boolean;
  train: boolean;
  board: boolean;
  pick: boolean;
  equipment_wise: any[]; // Specific types can be defined here if necessary
}

// Define the structure for ItemFormat2
export interface ItemFormat2 {
  item: string;
  uom: string;
  price: string;
  quantity: string;
  amount: string;
}

// Union type for Items
export type ItemsType = ItemFormat1 | ItemFormat2[];

// Customer and Client Info types
export interface CustomerClientInfo {
  id: string;
  name: string;
  mobile: string;
  company_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// Quotation Info Type
export interface InvoiceInfoType {
  id: string;
  invoice_no: string;
  customer_id: string;
  client_id: string;
  items: ItemsType;
  date: string;
  duedate: string;
  enquiry_no: string;
  status: string;
  scope_of_work: string;
  terms_and_conditions: string;
  customer: CustomerClientInfo;
  client: CustomerClientInfo;
  clientx: CustomerClientInfo;
  sub_total: number;
  tax_id: number | string;
  tax_type: string;
  tax_description: string;
  tax_rate: number;
  tax_amount: number;
  total: number;
  company_id: string;
}
