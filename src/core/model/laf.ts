// Laminar Air Flow

interface ILaf {
    id: number;
    service_request_id: string;
    cleanroom_instruments: [];
    laf_report: string;
    company_id: string;
  }
  
export type { ILaf };

// Laminar Air Flow Reports
interface ILafReport {
  id: number;
  certificate_number: string;
  ulr_number: string;
  company_id: string;
}

export type { ILafReport };