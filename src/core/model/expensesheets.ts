interface IExpenseSheet {
    id: number;
    rgp_no: string;
    customer_name:{
        first_name: string;
        last_name: string;
    };
    engineer_name:{
        first_name: string;
        last_name: string;
    };
    status:string;
    total_amount:string;
}
  
export type { IExpenseSheet };