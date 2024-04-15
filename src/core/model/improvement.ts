// import { getAssetPath } from "@/core/helpeassets";

interface IImprovement {
    id: number;
    area: string;
    target: string;
    outcome: string;
    quarter: string;
    created_at: string;
    company_id: string;
  }

export type { IImprovement };


export const AreaOfImprovement = [
  {
      id: "1",
      area: "Customer Base",
      target: "Monthly 5 New Customer",
  },
  {
      id: "2",
      area: "Customer Complaint",
      target: "0 Complaints",

  },
  {
      id: "3",
      area: "Personnel Training",
      target: "Minimum 1 for Quarterly",
  },
  {
      id: "4",
      area: "NCR'S",
      target: "0 NCR'S",
  },
  {
      id: "5",
      area: "Customer Satisfaction",
      target: "Monthly 100% Achievement",
  },
  {
      id: "6",
      area: "On Time Delivery for Calibration Certificate",
      target: "Monthly 100% Achievement",
  },
  {
      id: "7",
      area: "Company Turnover",
      target: "Monthly 1 Lakh",
  },
  {
      id: "8",
      area: "Master Equipment Breakdown Performance",
      target: "0 Breakdown",
  },
];

export const GetAreaOfImprovement = (id) => {
  const item = AreaOfImprovement.find(item => item.id == id);
  return item ? item.area : "";
};

export const GetAreaTarget = (id) => {
  const item = AreaOfImprovement.find(item => item.id == id);
  return item ? item.target : "";
};



export const Quarters = [
  {
    id:"1",
    quarter: "Quarter 1"
  },
  {
    id:"2",
    quarter: "Quarter 2"
  },
  {
    id:"3",
    quarter: "Quarter 3"
  },
  {
    id:"4",
    quarter: "Quarter 4"
  }
]
  