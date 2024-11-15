

interface ICustomers {
  id: number;
  name: string;
  email: string;
  company_name: string;
  mobile: string;
  grant_access: boolean;
  company_details: {
    company_name: string;
  };
  created_at: string;
  company_id: number;
}


export type { ICustomers };
