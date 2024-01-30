// import { getAssetPath } from "@/core/helpeassets";

interface ITInstrument {
    id: number;
    model_no: string;
    serial_no: string;
    name: string;
    make: string;
    ranges:string;
    accuracy:string;
    availability: string;
    calibration_date:string;
    calibration_due_date:string;
    company_id: string;
  }
  
  export type { ITInstrument };
  