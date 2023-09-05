interface IWorksheet {
    id: number;
    rgp_no: string;
    engineer_name:{
        first_name: string;
        last_name: string;
    };
    total_amount:string;
    status:string;
}
  
export type { IWorksheet };