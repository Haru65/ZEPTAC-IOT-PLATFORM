// import { getAssetPath } from "@/core/helpeassets";

interface IPriceList {
  id: number;
  name: string;
  description: string;
  price: string;
  date: string;
}

const pricelist: Array<IPriceList> = [
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
    name: "Product A",
    description: "Lorem ipsum dolor sit amet",
    price: "10.99",
    date: "2023-06-01",
  },
  {
    id: 2,
    name: "Product B",
    description: "Consectetur adipiscing elit",
    price: "15.99",
    date: "2023-06-02",
  },
  {
    id: 3,
    name: "Product C",
    description: "Sed do eiusmod tempor incididunt",
    price: "5.49",
    date: "2023-06-03",
  },
  {
    id: 4,
    name: "Product D",
    description: "Ut labore et dolore magna aliqua",
    price: "20.00",
    date: "2023-06-05",
  },
  {
    id: 5,
    name: "Product E",
    description: "Excepteur sint occaecat cupidatat non proident",
    price: "7.99",
    date: "2023-06-07",
  },
  {
    id: 6,
    name: "Product F",
    description:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum",
    price: "12.50",
    date: "2023-06-08",
  },
  {
    id: 7,
    name: "Product G",
    description: "Duis aute irure dolor in reprehenderit",
    price: "9.99",
    date: "2023-06-10",
  },
  {
    id: 8,
    name: "Product H",
    description: "Eu fugiat nulla pariatur",
    price: "18.75",
    date: "2023-06-12",
  },
  {
    id: 9,
    name: "Product I",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur",
    price: "14.99",
    date: "2023-06-14",
  },
  {
    id: 10,
    name: "Product J",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    price: "11.25",
    date: "2023-06-16",
  },
  {
    id: 11,
    name: "Product K",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "8.49",
    date: "2023-06-18",
  },
  {
    id: 12,
    name: "Product L",
    description: "Sed ut peiciatis unde omnis iste natus error sit voluptatem",
    price: "22.99",
    date: "2023-06-20",
  },
];

export type { IPriceList };

export default pricelist;
