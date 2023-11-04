interface IQuotations {
  id: number;
  customer_name:{
    company_name: string;
  };
  date: string;
  duedate: string;
  status: string;
  total: string;
}

export type { IQuotations };
