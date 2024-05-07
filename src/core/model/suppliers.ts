

interface ISupplier {
    id: number;
    registration_date: string;
    supplier_name: string;
    supplier_code: string;
    contact_person: string;
    contact_number: string;
    email: string;
    supplier_category: string;
    product_service_details: string;
    status: string;
    approval_status: string;
    company_id: string;
  }
  
  
  export type { ISupplier };
  
//   Purchase Product  Question
export const ProductQuestion = [
    { q_no: "1" , q_name: "Delivery Time", rating: 0 },
    { q_no: "2" , q_name: "Quality of Parts", rating: 0 },
    { q_no: "3" , q_name: "Cost of Parts", rating: 0 },
    { q_no: "4" , q_name: "Terms & Conditions", rating: 0 },
    { q_no: "5" , q_name: "Company Reputation", rating: 0 },
    { q_no: "6" , q_name: "Expertise of Staffs", rating: 0 },
  ];

//   Service Question
  export const ServiceQuestion = [
    { q_no: "1" , q_name: "Delivery Time", rating: 0 },
    { q_no: "2" , q_name: "Cost of Calibration", rating: 0 },
    { q_no: "3" , q_name: "Quality of work", rating: 0 },
    { q_no: "4" , q_name: "Company Reputation", rating: 0 },
    { q_no: "5" , q_name: "Expertise of Staffs", rating: 0 },
    { q_no: "6" , q_name: "History of Supplier", rating: 0 },
  ];

  
export const SupplierStatus = [
  {
      id: 1,
      status: "NA",
  },
  {
      id: 2,
      status: "Approved",
  },
  {
      id: 3,
      status: "Rejected",
  },
];
  
export const SupplierCategory = [
  {
      id: "1",
      category: "Purchase of Material",
  },
  {
      id: "2",
      category: "Services",
  },
];

export const GetSupplierStatus = (id) => {
  const status = SupplierStatus.find(item => item.id == id);
  return status ? status.status : "";
};


export const GetSupplierCategory = (id) => {
  const category = SupplierCategory.find(item => item.id == id);
  return category ? category.category : "";
};