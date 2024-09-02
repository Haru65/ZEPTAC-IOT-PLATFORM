// import { getAssetPath } from "@/core/helpeassets";

interface ICalibrationInstrument {
    id: number;
    instrument_id: string;
    name: string;
    parameter: string;
    ranges: string;
    location: string;
    calibration_date: string;
    calibration_due_date: string;
    company_id: string;
  }
  
  export type { ICalibrationInstrument };
  

  export const parameters = [
    {
      id: "1",
      param_name: "Pressure",
      ranges: "range-1",
      accuracy: "accuracy-1",
      resolution: "resolution-1",
    },
    {
      id: "2",
      param_name: "Thermal",
      ranges: "range-2",
      accuracy: "accuracy-2",
      resolution: "resolution-2",
    },
    {
      id: "3",
      param_name: "Mass & Volume",
      ranges: "range-3",
      accuracy: "accuracy-3",
      resolution: "resolution-3",
    }
  ];

  export const months = [
    {
      id:"6"
    },
    {
      id:"12"
    }
  ];
