interface IValidationReport {
    id: number;
    customer_name:{
        first_name: string;
        last_name: string;
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