
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