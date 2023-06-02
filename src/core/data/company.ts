import { getAssetPath } from "@/core/helpers/assets";

interface ICompany {
  id: number;
  company_name: string;
  company_email: string;
  company_address: string;
  date: string;
}

const company: Array<ICompany> = [
  // {
  //   id: Math.floor(Math.random() * 99999) + 1,
  //   name: "Emma Smith",
  //   email: "e.smith@kpmg.com.au",
  //   company: "-",
  //   payment: {
  //     icon: getAssetPath("media/svg/card-logos/mastercard.svg"),
  //     ccnumber: "**** " + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
  //     label: "mastercard",
  //   },
  //   date: "14 Dec 2020, 8:43 pm",
  // },
  {
    id: 1,
    company_name: "Decode Digital",
    company_email: "decodedigital@gmail.com",
    company_address: "Vico Naka",
    date:new Date().toDateString()
  }
];

export type { ICompany };

export default company;
