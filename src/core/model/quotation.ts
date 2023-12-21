interface IQuotations {
  id: number;
  customer_name:{
    company_name: string;
  };
  customer_company:{
    company_name: string;
  };
  site_location: {
    city: string;
    states: string;
  };
  company_name: {
    company_name: string;
  };
  date: string;
  status: string;
  total: string;
}

export type { IQuotations };
