import { getAssetPath } from "@/core/helpers/assets";

interface IQuotations {
  id: number;
  customer_name: string;
  date: string;
}

const quotations: Array<IQuotations> = [
  {
    id: 1,
    customer_name: "Customer 1",
    date: new Date().toDateString(),
  },
  {
    id: 2,
    customer_name: "Customer 2",
    date: new Date().toDateString(),
  },
  {
    id: 3,
    customer_name: "Customer 3",
    date: new Date().toDateString(),
  },
  {
    id: 4,
    customer_name: "Customer 4",
    date: new Date().toDateString(),
  },
  {
    id: 5,
    customer_name: "Customer 5",
    date: "2023-06-28",
  },
  {
    id: 6,
    customer_name: "Customer 6",
    date: "2023-06-23",
  },
  {
    id: 7,
    customer_name: "Customer 7",
    date: "2023-06-16",
  },
  {
    id: 8,
    customer_name: "Customer 8",
    date: "2023-06-22",
  },
  {
    id: 9,
    customer_name: "Customer 9",
    date: "2023-06-30",
  },
  {
    id: 10,
    customer_name: "Customer 10",
    date: "2023-06-19",
  },
  {
    id: 11,
    customer_name: "Customer 11",
    date: "2023-06-27",
  },
  {
    id: 12,
    customer_name: "Customer 12",
    date: "2023-06-14",
  },
];

export type { IQuotations };

export default quotations;
