import { getAssetPath } from "@/core/helpers/assets";

interface IInvoices {
  id: number;
  customer_name: string;
  date: string;
}

const invoices: Array<IInvoices> = [
  {
    id: 1,
    customer_name: "John Cena",
    date: new Date().toDateString(),
  },
  {
    id: 827,
    customer_name: "Eva Marie",
    date: new Date().toDateString(),
  },
  {
    id: 496,
    customer_name: "Rey Mysterio",
    date: new Date().toDateString(),
  },
  {
    id: 498,
    customer_name: "Randy Orton",
    date: new Date().toDateString(),
  },
];

export type { IInvoices };

export default invoices;
