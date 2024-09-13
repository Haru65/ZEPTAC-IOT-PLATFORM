// import { getAssetPath } from "@/core/helpeassets";

interface IRefInstrument {
    id: number;
    instrument_id: string;
    name: string;
    parameter: string;
    ranges_from: string;
    ranges_to: string;
    location: string;
    calibration_date: string;
    calibration_due_date: string;
    company_id: string;
  }
  
  export type { IRefInstrument };
  