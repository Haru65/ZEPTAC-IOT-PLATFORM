

interface ICustomers {
  id: number;
  name: string;
  email: string;
  company_name: string;
  mobile: string;
  company_details: {
    company_name: string;
  };
  created_at: string;
  srf_link: string;
  feedback_link: string;
  company_id: number;
}


export type { ICustomers };
