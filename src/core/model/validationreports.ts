interface IValidationReport {
    id: number;
    customer_name:{
        company_name: string;
    };
    site_location:{
        address1: string;
        address2: string;
        city: string;
        pincode: string;
        states: string;
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
        status: "Invalid",
    },
    {
        id: 3,
        status: "Validated",
    }
  ];


  
  export const GetReportStatus = (id) => {
    const status = ReportStatus.find(item => item.id == id);
    return status ? status.status : "";
  };