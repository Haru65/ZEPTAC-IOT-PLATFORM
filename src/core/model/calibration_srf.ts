
interface ICalibrationSrf {
    id: number;
    customer_id: number;
    customer_name: string;
    srf_no: string;
    customer: {
      id: string;
      name: string;
      company_name: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    request_date: string;
    calibration_instruments_count: string;
    comments: string;
    approval_status: string;
    reading_data: [];
    engineer: {
      id: string;
      first_name: string;
      last_name: string;
    };
    createdByUser: {
        id: string;
        first_name: string;
        last_name: string;
    };
    created_by: string;
    company_id,
  } 

export type { ICalibrationSrf };

export const CalibrationSrfStatus = [
    { id: "1" , status: "Draft"},
    { id: "2" , status: "Pending"},
    { id: "3" , status: "Completed"},
  ];

  export const GetCalSrfStatus = (id) => {
    const calStatus = CalibrationSrfStatus.find(item => item.id == id);
    return calStatus ? calStatus.status : "";
  };