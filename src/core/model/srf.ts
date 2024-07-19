
interface ISrf {
    id: number;
    customer_id: number;
    customer_name: string;
    srf_no: string;
    srf_data: [];
    due_date: string;
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
    created_at: string;
    company_id,
  } 

export type { ISrf };

export const SrfTests = [
    { id: "1" , test: "Filter Integrity"},
    { id: "2" , test: "Velocity"},
    { id: "3" , test: "Particle count"},
    { id: "4" , test: "Recovery"},
    { id: "5" , test: "Airflow Pattern"},
    { id: "6" , test: "Differential Pressure"},
    { id: "7" , test: "Temp & RH"},
    { id: "8" , test: "Air Capture Hood"},
    { id: "9" , test: "Light Intensity"},
    { id: "10" , test: "Noise Level"},
  ];

export const SrfItems = [
    { id: "1" , test: "Clean Room"},
    { id: "2" , test: "AHU"},
    { id: "3" , test: "Biosafety Cabinet"},
    { id: "4" , test: "Laminar Airflow"},
    { id: "5" , test: "Dynamic Pass Box"},
    { id: "6" , test: "Dispensing Booth"},
    { id: "7" , test: "Fume Hood"},
  ];


export const TestMethods = [
    {
        id: "1",
        method: "ISO 14644-1",
    },
    {
        id: "2",
        method: "ISO 14644-2",
    },
    {
        id: "3",
        method: "ISO 14644-3",
    },
    {
        id: "4",
        method: "NSF 49",
    },
    {
        id: "5",
        method: "ASHRAE 110-1995",
    },
  ];
  
  export const GetTestMethod = (id) => {
    const method = TestMethods.find(item => item.id == id);
    return method ? method.method : "";
  };