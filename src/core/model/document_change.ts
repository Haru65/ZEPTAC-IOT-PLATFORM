

interface IDocumentChange {
    id: number;
    request_date: string;
    request_no: string;
    document_name: string;
    document_no: string;
    req_from: string;
    req_to: string;
    nature: string;
    details: string;
    reason: string;
    department: string;
    effective_date: string;
    authority_comments: string;
    comments: string;
    approval_status: string;
    company_id: string;
  }

export type { IDocumentChange };

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

