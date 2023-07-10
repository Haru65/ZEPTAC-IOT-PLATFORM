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

export { InvoiceStatus, InvoiceStatusArray, GetInvoiceStatus };