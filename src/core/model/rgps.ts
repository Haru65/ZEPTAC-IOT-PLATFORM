interface IRGP {
    id: number;
    rgp_no: string;
    customer_name:{
        first_name: string;
        last_name: string;
    };
    quotation_id:string;
    engineers:string;
    instruments:string;
    status:string;
    date: string;
    duedate: string;
}
  
export type { IRGP };
