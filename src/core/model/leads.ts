interface ILeads {
  id: number;
  enquiry_no: string;
  lead_company: string;
  location: {
    city: string;
    states: string;
  };
  name: string;
  company: {
    company_name: string;
  };
  mobile: string;
  created_at: string;
}


export type { ILeads };
