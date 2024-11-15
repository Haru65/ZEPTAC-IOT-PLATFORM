interface ITempLeads {
    id: number;
    og_lead_id: number;
    company_name: string;
    city: string;
    state: string;
    name: string;
    source: string;
    company_details: {
      company_name: string;
    };
    mobile: string;
    created_at: string;
    company_id: number;
  }
  
  
  export type { ITempLeads };
  
  export const SourcesList = [
    {
        id: "1",
        source: "webapp",
        labelValue: "Web App"
    },
    {
        id: "2",
        source: "indiamart",
        labelValue: "India Mart"
    }
  ];