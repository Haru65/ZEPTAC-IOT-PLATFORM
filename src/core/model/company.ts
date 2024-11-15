
interface ICompany {
  id: number;
  name: string;
  email: string;
  address: string;
  created_at: string;
}

export type { ICompany };


export const usageTypes = [
  {
      id: "1",
      name: "Free Trail (7 days)",
  },
  {
      id: "2",
      name: "Subscription",
  },
];

export const getUsageType = (id) => {
  const usage = usageTypes.find(item => item.id == id);
  return usage ? usage.name : "";
};

export const financialTypes = [
  {
      id: "1",
      name: "January - December",
  },
  {
      id: "2",
      name: "April - March",
  },
];


export const billingFormatTypes = [
  {
      id: "1",
      name: "billing-format-1",
  },
  {
      id: "2",
      name: "billing-format-2",
  },
];
