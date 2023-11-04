interface IWorksheet {
    id: number;
    rgp_no: string;
    customer_name:{
        company_name: string;
    };
    engineer_name:{
        first_name: string;
        last_name: string;
    };
    total_amount:string;
    status:string;
}

export type { IWorksheet };

export const AcceptanceCriteria = [
    {
        id: "0",
        certified: "ISO - 14644",
    },
    {
        id: "1",
        certified: "EC GUIDELINE SEPT 2003",
    },
    {
        id: "2",
        certified: "FED STD 209 E",
    },
    {
        id: "3",
        certified: "AS PER COMPANY SOP",
    }
  ];
  