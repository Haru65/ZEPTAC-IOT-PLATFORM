// import { getAssetPath } from "@/core/helpeassets";

interface IInstrument {
    id: number;
    model_no: string;
    serial_no: string;
    name: string;
    make: string;
    description: string;
    availability: string;
    datasheet:string;
    calibration_certificate:string;
    traceability:string;
    approval_status:string;
    company_id: string;
  }
  
  export type { IInstrument };
  