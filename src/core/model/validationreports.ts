interface IValidationReport {
    id: number;
    customer:{
        id: string;
        name: string;
        company_name: string;
    };
    clientx:{
        id: string;
        name: string;
        company_name: string;
        address1: string;
        address2: string;
        city: string;
        pincode: string;
        state: string;
        country: string;

    };
    test_sizes:{};
    report_status:string;
    created_at:string;
}
  
export type { IValidationReport };



export const ReportStatus = [
    {
        id: 1,
        status: "Pending",
    },
    {
        id: 2,
        status: "Completed",
    },
  ];


  
  export const GetReportStatus = (id) => {
    const status = ReportStatus.find(item => item.id == id);
    return status ? status.status : "";
  };