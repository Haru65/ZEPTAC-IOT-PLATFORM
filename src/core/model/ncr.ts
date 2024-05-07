// import { getAssetPath } from "@/core/helpeassets";

interface INCR {
    id: number;
    nc_details: string;
    action_required: string;
    completion_date: string;
    review_date: string;
    verification_details: string;
    approval_status: string;
    company_id: string;
  }
  
  export type { INCR };

  export const ApprovalStatus = [
    {
      id:"1",
      status: "Pending",
    },
    {
      id:"2",
      status: "Rejected",
    },
    {
      id:"3",
      status: "Approved",
    }
  ];
  
  export const GetApprovalStatus = (id) => {
    const item = ApprovalStatus.find(item => item.id == id);
    return item ? item.status : "";
  };
  
  