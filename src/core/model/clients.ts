

interface IClients {
  id: number;
  company_name: string;
  customer: {
    id: string;
    name: string;
    company_name: string;
  };
  city: string;
  state: string;
  name: string;
  company_details: {
    company_name: string;
  };
  mobile: string;
  company_id: number;
}


export type { IClients };
