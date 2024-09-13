// import { getAssetPath } from "@/core/helpeassets";

interface ICalibrationInstrument {
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
  
  export type { ICalibrationInstrument };
  

  export const parameters = [
    {
      id: "1",
      param_name: "Pressure",
      accuracy: "800",
      resolution: "100",
    },
    {
      id: "2",
      param_name: "Thermal",
      accuracy: "200",
      resolution: "400",
    },
    {
      id: "3",
      param_name: "Mass & Volume",
      accuracy: "700",
      resolution: "1000",
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
