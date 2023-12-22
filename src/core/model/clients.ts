

interface IClients {
  id: number;
  client_company: string;
  customer_company: string;
  location: {
    city: string;
    states: string;
  };
  name: string;
  company_name: {
    company_name: string;
  };
  mobile: string;
}


export type { IClients };
