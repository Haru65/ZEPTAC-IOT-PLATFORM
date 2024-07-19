
/* 

RGP STATUS (status)
1 : In Process
2 : Completed

*/

interface IRGP {
    id: number;
    rgp_no: string;
    customer: {
        id: string;
        name: string;
        company_name: string;
    };
    quotation_id:string;
    engineers:string;
    instruments:string;
    status:string;
    date: string;
    duedate: string;
    approval_status: string;
    company_id:string;
}
  
export type { IRGP };
