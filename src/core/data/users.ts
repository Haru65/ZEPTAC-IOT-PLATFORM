import { getAssetPath } from "@/core/helpers/assets";

interface IUser {
  id: number;
  profile: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  company_name: string;
  date: string;
}

const user: Array<IUser> = [
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
    id: 548,
    profile: getAssetPath("media/avatars/300-2.jpg"),
    name: "Emma Johnson",
    email: "emma.johnson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Wed Jun 01 2022",
  },
  {
    id: 912,
    profile: getAssetPath("media/avatars/300-3.jpg"),
    name: "David Lee",
    email: "david.lee@fakeemail.com",
    mobile: "5551234567",
    role: "User",
    company_name: "Test Corp.",
    date: "Thu Mar 24 2022",
  },
  {
    id: 371,
    profile: getAssetPath("media/avatars/300-4.jpg"),
    name: "Sarah Williams",
    email: "sarah.williams@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test LLC",
    date: "Fri Oct 21 2022",
  },
  {
    id: 645,
    profile: getAssetPath("media/avatars/300-5.jpg"),
    name: "John Smith",
    email: "john.smith@fakeemail.com",
    mobile: "5551234567",
    role: "User",
    company_name: "Test Inc.",
    date: "Mon May 02 2022",
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
    id: 193,
    profile: getAssetPath("media/avatars/300-7.jpg"),
    name: "Michael Brown",
    email: "michael.brown@fakeemail.com",
    mobile: "5551234567",
    role: "User",
    company_name: "Test Corp.",
    date: "Sun Jan 16 2022",
  },
  {
    id: 496,
    profile: getAssetPath("media/avatars/300-8.jpg"),
    name: "Ava Wilson",
    email: "ava.wilson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Sat Nov 26 2022",
  },
  {
    id: 496,
    profile: getAssetPath("media/avatars/300-9.jpg"),
    name: "Ava Wilson",
    email: "ava.wilson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Sat Nov 26 2022",
  },
  {
    id: 496,
    profile: getAssetPath("media/avatars/300-10.jpg"),
    name: "Ava Wilson",
    email: "ava.wilson@fakeemail.com",
    mobile: "9876543210",
    role: "Admin",
    company_name: "Test Co.",
    date: "Sat Nov 26 2022",
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

export type { IUser };

export default user;
