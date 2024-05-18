// BioSafety Cabinet

interface IBsc {
    id: number;
    service_request_id: string;
    cleanroom_instruments: [];
    bsc_report: string;
    company_id: string;
  }
  
export type { IBsc };

// BioSafety Cabinet Reports
interface IBscReport {
  id: number;
  certificate_number: string;
  ulr_number: string;
  company_id: string;
}

export type { IBscReport };