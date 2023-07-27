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

export { QuotationStatus, QuotationStatusArray, GetQuotationStatus };
