

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
    company_id: string;
  }

export type { IDocumentChange };