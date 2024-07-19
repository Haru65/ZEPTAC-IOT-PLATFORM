interface ILeads {
  id: number;
  enquiry_no: string;
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


export type { ILeads };

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