
interface ILogger {
    id: number;
    user_id: number;
    company_id: number;
    email: string;
    user: {
        first_name: string;
        last_name: string;
    };
    company: {
        company_name: string;
    };
    desc :string;
    created_at: string;
  } 
  
export type { ILogger };