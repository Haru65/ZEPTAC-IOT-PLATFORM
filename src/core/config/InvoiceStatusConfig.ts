// get API Data From /permissions and map for usage
// store in local storage for reference

const InvoiceStatus = {
    1: "Draft",
    2: "Approved",
    3: "Unpaid",
    4: "Overdue",
    5: "Paid",
};

const InvoiceStatusArray = Object.keys(InvoiceStatus).map((id) => ({
    id: parseInt(id),
    name: InvoiceStatus[parseInt(id)],
}));

const GetInvoiceStatus = (id: number) => {
    if (id in InvoiceStatus) {
        // Return the value of the key
        return InvoiceStatus[id];
    } else {
        // Return null if the key doesn't exist
        return "";
    }
};

// GST/Taxes Details

const TaxArray = [
    {
        id: "1",
        tax_type: "(CGST + SGST)",
        tax_description: "Central & State Goods and Services Tax",
        tax_rate: 18,
        tax_amount: 0,
        company_id: 1,
    },
    {
        id: "2",
        tax_type: "IGST",
        tax_description: "Integrated Goods and Services Tax",
        tax_rate: 18,
        tax_amount: 0,
        company_id: 1,
    },
    {
        id: "3",
        tax_type: "Custom",
        tax_description: "Custom GST",
        tax_rate: 10,
        tax_amount: 0,
        company_id: 1,
    },
]


export { InvoiceStatus, InvoiceStatusArray, GetInvoiceStatus, TaxArray };