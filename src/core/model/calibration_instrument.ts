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
    "Pressure",
    "Electro-technical"
  ];

  export const months = [
    {
      id:"6"
    },
    {
      id:"12"
    }
  ];


  // Calibration Information Types for download
  // Enginer Type
  export interface Engineer {
    id: string;
    first_name: string;
    last_name: string;
    mobile: string;
  }
  
  // Approval type
  export interface PersonalInfo {
    id: string;
    first_name: string;
    last_name: string;
  }
  
  // Customer Client Interface Type
  export interface Data {
    id: string;
    name: string;
    company_name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    mobile: string;
  }
  
  // Calibration SRF Details Interface
  export interface SrfData {
    id: string;
    company_id: string;
    customer_id: string;
    srf_no: string;
    purchase_order_no: string;
    request_date: string;
    customer_name: string;
  
    status: string;
    comments: string;
    approval_status: string;
  
    assigned_to: string;
    created_by: string;
    updated_by: string;
  
    customer: Data;
    engineer: Engineer;
    made_by: PersonalInfo;
    approved_by: PersonalInfo;
  }
  
  // Reference Instrument Interface Which is attached in calibration instrument
  export interface ReferenceInstrumentData {
    id: string;
    instrument_id: string;
    parameter: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
  
    calibration_date: string;
    calibration_due_date: string;
  
    ranges_from: string;
    ranges_to: string;
    accuracy: string;
  
    uncertainty: string;
    resolution: string;
    vendor_name: "";
    accessories_list: [];
  
    doi: string;
    manual_available: string;
    manual_file: string;
    software_available: string;
    location: string;
    certificate_no: string;
  
    company_id: string;
    created_by: string;
    updated_by: string;
    is_active: string;
  }
  
  // steps interface for each reading
  export interface Step {
    description: string;
    formula?: string;
    steps?: string[];
  }
  
  // Define the interface for the UncertaintyValue
  export interface UncertaintyValue {
    id: string;
    company_id: string;
    reading_id: string;
    standard_deviation: number;
    uncertainty_due_process: number;
    standard_uncertainty: number;
    uncertainty_resolution: number;
    hysteresis: number;
    uncertainty_due_hysteresis: number;
    max_zero_reading: number;
    zero_deviation: number;
    total_uncertainty: number;
    effective_deg_freedom: number;
    is_infinite: boolean;
    combined_uncertainty: string;
    expanded_uncertainty: string;
    steps: Step[];
  }
  
  // Define the interface for the PressureReading
  export interface PressureReading {
    id: string;
    company_id: string;
    calibration_instrument_id: string;
    uuc_reading: string;
    i1_up: string;
    d1_down: string;
    i2_up: string;
    d2_down: string;
    mean_value: string;
    is_active: string;
    created_at: string;
    updated_at: string;
    uncertainty: UncertaintyValue; // Nested UncertaintyValue
  }
  
  // Calibration Instrument Info Type
  export interface CalibrationInstrumentInfoType {
    id: string;
    instrument_id: string;
    name: string;
    parameter: string;
  
    model_no: string;
    serial_no: string;
    make: string;
  
    calibration_date: string;
    calibration_due_date: string;
  
    location: string;
  
    ranges_from: string;
    ranges_to: string;
    accuracy: string;
    resolution: string;
  
    calibration_points: string;
    periodicity: string;
  
    temp: string;
    rh: string;
  
    instrument_condition: string;
    remark: string;
  
    reference_instrument_id: string;
    service_request_id: string;
  
    readings: PressureReading[];
  
    company_id: string;
    is_active: string;
  
    srf: SrfData;
    reference_instrument: ReferenceInstrumentData;
  }
