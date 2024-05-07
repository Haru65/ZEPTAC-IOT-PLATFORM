interface IExpenseSheet {
    id: number;
    rgp_no: string;
    customer_name:{
        company_name: string;
    };
    engineer_name:{
        first_name: string;
        last_name: string;
    };
    status:string;
    total_amount:string;
    approval_status:string;
}
  
export type { IExpenseSheet };


export const ExpenseStatus = [
    {
        id: 1,
        status: "Pending",
    },
    {
        id: 2,
        status: "Reject",
    },
    {
        id: 3,
        status: "Approve",
    }
  ];

  export const GetExpenseStatus = (id) => {
    const status = ExpenseStatus.find(item => item.id == id);
    return status ? status.status : "";
  };