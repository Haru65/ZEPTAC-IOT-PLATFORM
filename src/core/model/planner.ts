
interface IPlan {
    id: number;
    data: {};
    month_id: string;
    company_id: string;
  }
  
  export type { IPlan };


export const monthNames = [
    { id: 4, name: "Apr" },
    { id: 5, name: "May" },
    { id: 6, name: "Jun" },
    { id: 7, name: "Jul" },
    { id: 8, name: "Aug" },
    { id: 9, name: "Sep" },
    { id: 10, name: "Oct" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Dec" },
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
  ];

export const GetMonthName = (id) => {
  const item = monthNames.find(item => item.id == id);
  return item ? item.name : "";
};

export const plans = [
  {
    id:"1",
    plan: "Training Plan",
  },
  {
    id:"2",
    plan: "Intermediate Check Plan",
  },
  {
    id:"3",
    plan: "Maintenance Plan",
  },
  {
    id:"4",
    plan: "Replicate Plan",
  },
  {
    id:"5",
    plan: "Interlaboratory Comparison Plan",
  },
  {
    id:"6",
    plan: "Internal Audit Plan",
  },
  {
    id:"7",
    plan: "MRM Plan",
  },
];

export const GetPlanName = (id) => {
  const item = plans.find(item => item.id == id);
  return item ? item.plan : "";
};
