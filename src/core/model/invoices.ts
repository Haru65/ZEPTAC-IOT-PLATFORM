interface IInvoices {
  id: number;
  customer:{
    name: string;
    company_name: string;
  };
  client:{
    city: string;
    state: string;
  };
  company_details: {
    company_name: string;
  };
  date: string;
  status: string;
  total: string;
  company_id: string;
}

export type { IInvoices };
