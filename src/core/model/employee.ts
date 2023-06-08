import { getAssetPath } from "@/core/helpers/assets";

interface IEmployee {
  id: number;
  profile: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  company_name: string;
  date: string;
}

const employee: Array<IEmployee> = [
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
    profile: getAssetPath("media/avatars/300-1.jpg"),
    name: "XYZ",
    email: "xyz@gmail.com",
    mobile: "123456789",
    role: "Admin",
    company_name: "Test",
    date: new Date().toDateString(),
  },

  {
    id: 827,
    profile: getAssetPath("media/avatars/300-6.jpg"),
    name: "Emily Davis",
    email: "emily.davis@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Enterprises",
    date: "Wed Jul 27 2022",
  },
  {
    id: 496,
    profile: getAssetPath("media/avatars/300-11.jpg"),
    name: "Ava Wilson",
    email: "ava.wilson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Sat Nov 26 2022",
  },
  {
    id: 496,
    profile: getAssetPath("media/avatars/300-12.jpg"),
    name: "Ava Wilson",
    email: "ava.wilson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Sat Nov 26 2022",
  },
];

export type { IEmployee };

export default employee;
