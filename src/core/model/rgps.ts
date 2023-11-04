interface IRGP {
    id: number;
    rgp_no: string;
    customer_name:{
        company_name: string;
    };
    quotation_id:string;
    engineers:string;
    instruments:string;
    status:string;
    date: string;
    duedate: string;
}
  
export type { IRGP };
