interface IPoPayment {
    id: number;
    purchase_order_id: string;
    po_number: string;
    purchase_order: {
        id: string;
        po_number: string;
    };
    customer_information:{
        name: string;
        company_name: string;
    };
    payment_method: string;
    payment_note: string;
    payment_date: string;
    status: string;
    amount_paid: string;
    company_id: string;
}
  
export type { IPoPayment };

export const PoPaymentMethod = [
    {
        method: "Bank Transfer",
    },
    {
        method: "Cash",
    },
    {
        method: "Cheque",
    }
];

export const PoPaymentStatus = [
    {
        id: 0,
        status: "Pending",
    },
    {
        id: 1,
        status: "Completed",
    },
    {
        id: 2,
        status: "Failed",
    }
  ];

export const GetPoPaymentStatus = (id) => {
    const status = PoPaymentStatus.find(item => item.id == id);
    return status ? status.status : "";
};

