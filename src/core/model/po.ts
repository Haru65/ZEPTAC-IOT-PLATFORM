interface IPurchaseOrder {
    id: number;
    po_number: string;
    quotation_no: string;
    customer:{
      name: string;
      company_name: string;
    };
    po_date: string;
    status: string;
    approval_status: string;
    total: string;
    po_file: string;
    total_paid: string;
    total_pending: string;
    remaining_balance: string;
    company_id: string;
}
  
export type { IPurchaseOrder };

export const PoStatus = [
    {
        id: 0,
        status: "Draft",
    },
    {
        id: 1,
        status: "Partially Paid",
    },
    {
        id: 2,
        status: "Paid",
    },
  ];

  export const GetPoStatus = (id) => {
    const status = PoStatus.find(item => item.id == id);
    return status ? status.status : "";
  };
    
  // Customer and Client Info types
  export interface CustomerClientInfo {
    id: string;
    name: string;
    email: string;
    mobile: string;
    company_name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gst_number: string;
  }

  // Company Type
  export interface CompanyAddress {
    id: string;
    company_name: string;
    company_logo: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    gst_details: string;
  }

  // Payment types
  export interface PoPaymentType {
    id: string;
    purchase_order_id: string;
    payment_method: string;
    amount_paid: string;
    status: string;
    transaction_reference: string;
    payment_notes: string;
    payment_date: string;
  }
  
  // Quotation Info Type
  export interface PoInfoType {
    id: string;
    quotation_id: string;
    quotation_no: string;
    customer_id: string;
    client_id: string;
    
    customer_information: CustomerClientInfo;
    client_information: CustomerClientInfo;

    po_number: string;
    po_date: string;

    payments: PoPaymentType[];

    quotation_total: number;

    total: number;
    total_pending: number;
    total_paid: number;

    po_file: string;

    remaining_balance: number;
    status: string;
    approval_status: string;
    comment_description: string;
    company_id: string;
    company: CompanyAddress;
  }
  
