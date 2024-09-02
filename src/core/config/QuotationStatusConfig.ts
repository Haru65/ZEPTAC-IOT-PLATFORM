// get API Data From /permissions and map for usage
// store in local storage for reference

const QuotationStatus = {
    1: "Draft",
    2: "Sent",
    3: "Converted to Invoice",
    4: "Approved",
};

const QuotationStatusArray = Object.keys(QuotationStatus).map((id) => ({
    id: parseInt(id),
    name: QuotationStatus[parseInt(id)],
}));

const GetQuotationStatus = (id: number) => {
    if (id in QuotationStatus) {
        // Return the value of the key
        return QuotationStatus[id];
    } else {
        // Return null if the key doesn't exist
        return "";
    }
};

// fix for add and edit view
QuotationStatusArray.splice(2, 1);

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



export { QuotationStatus, QuotationStatusArray, GetQuotationStatus, TaxArray };
