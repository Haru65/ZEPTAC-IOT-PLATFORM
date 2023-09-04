/* eslint-disable prettier/prettier */
// all apis for CRUD options
import ApiService from "@/core/services/ApiService";
const COMPANY_URL = "company";
const USER_URL = "users";
const CUSTOMERS_URL = "customers";
const PRICELIST_URL = "pricelist";
const INVOICE_URL = "invoice";
const QUOTATION_URL = "quotation";
const LEADS_URL = 'leads';
const CLIENTS_URL = "clients";
const EMPLOYEE_URL = "employee";
const INSTRUMENTS_URL = "instruments";
const RGP_URL = "returnablegatepasses";
const DWSHEET_URL = "dailyworksheets";
const EXPSHEET_URL = "expensesheets";

// COMPANIES

// gell all comapnies
export async function CompaniesSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('company_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



export async function getCompanies(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(COMPANY_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// company add
export async function addCompany(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post(COMPANY_URL, data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// company delete
export async function deletecompany(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.delete(COMPANY_URL + "/" + data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get comapany
export async function getCompany(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(COMPANY_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update company
export async function updateCompany(data: any, id: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.put(COMPANY_URL + "/" + id, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// EMPLOYEES

export async function EmployeeSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('employee_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getEmployees(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(EMPLOYEE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// USER

export async function UserSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('user_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getUsers(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(USER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add user
export async function addUser(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        console.log(data);
        const response = await ApiService.post(USER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete user
// company delete
export async function deleteUser(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.delete(USER_URL + "/" + data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get User
export async function getUser(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(USER_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// update company
export async function updateUser(data: any, id: any) {
    try {
        ApiService.patchsetHeader();
        console.log(data);
        const response = await ApiService.put(USER_URL + "/" + id, data);
        console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// CUSTOMERS



// CLIENTS APIs

// search

export async function ClientSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('customer_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}
// get all clients
export async function getClients(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(CLIENTS_URL);
        console.log(response.data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Add a client -- ADMIN
export async function addClient(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post(CLIENTS_URL, data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Delete A Client
export async function deleteClient(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.delete(CLIENTS_URL + "/" + data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Get A client
export async function getClient(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(CLIENTS_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Update A Client
export async function updateClient(data: any, id: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.put(CLIENTS_URL + "/" + id, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// end of clients api




// CUSTOMERS
// 
// search Customets

export async function CustomerSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('customer_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// get customers

export async function getCustomers(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(CUSTOMERS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}
export async function addCustomer(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        console.log(data);
        const response = await ApiService.post(CUSTOMERS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getCustomer(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(CUSTOMERS_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateCustomer(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(CUSTOMERS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deletecustomer(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(CUSTOMERS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// LEADS

// gell all comapnies
export async function LeadsSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('leads_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// getlisting
export async function getLeadsList(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(LEADS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addLead(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        console.log(data);
        const response = await ApiService.post(LEADS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getLead(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(LEADS_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateLead(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(LEADS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deleteLead(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(LEADS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// PRICELISTS

// gell all comapnies
export async function PriceListSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('leads_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}
// getlists
export async function getPriceList(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(PRICELIST_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function addPriceList(data: object) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(PRICELIST_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getPriceListItem(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get(PRICELIST_URL, data);
        return response.data.result[0];
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updatePriceListItem(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(PRICELIST_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deletePriceListItem(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(PRICELIST_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// QUOTATION

// gell all comapnies
export async function QuotationSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('quotation_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// custom
export async function GetCustomerClients(data: any) {
    try {
        //console.log(data)
        const id = { "customerid": data };
        ApiService.setHeader();
        const response = await ApiService.post('/get_customer_clients', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function GetIncrQuotationId(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('/get_latest_quotation', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get listing
export async function getQuotationList(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(QUOTATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// delete
export async function deletequotation(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(QUOTATION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get comapany
export async function getQuotation(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(QUOTATION_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addQuotation(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(QUOTATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get comapany
export async function updateQuotation(data: any, id) {
    try {
        ApiService.setHeader();
        const response = await ApiService.put(QUOTATION_URL + "/" + id, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// INVOICES

// custom
export async function GetIncrInvoiceId(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('/get_latest_invoice', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// getlists

export async function InvoiceSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('invoice_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getInvoiceList(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INVOICE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addInvoice(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INVOICE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get comapany
export async function getInvoice(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INVOICE_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get comapany
export async function updateInvoice(data: any, id) {
    try {
        ApiService.setHeader();
        const response = await ApiService.put(INVOICE_URL + "/" + id, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function deleteinvoice(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INVOICE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// INSTRUMENTS

// getlists
export async function getAllInstrument(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INSTRUMENTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function InstrumentSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('instrument_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addInstrument(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INSTRUMENTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getInstrument(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INSTRUMENTS_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateInstrument(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(INSTRUMENTS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deleteInstrument(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INSTRUMENTS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// RETURNABLE GATE PASS


// custom
export async function GetAppovedQuotationsList(data: any) {
    try {
        // console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_approved_quotations', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getEngineers(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_service_engineers', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getInstruments(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_instruments', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getSiteAddress(data: any){
    try {
        ApiService.setHeader();
        const id = {"id" : data};
        const response = await ApiService.post('get_site_address', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function GetIncrReturnableGatePassId(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_latest_returnablegatepass', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// getlists
export async function getAllRGatePass(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(RGP_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function addRGatePass(data: object) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(RGP_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function UpdateStatus(data: object) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post('update_status', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getRGatePass(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get(RGP_URL, data);
        return response.data.result[0];
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getRGPInfo(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_information_of_rgp",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deleteRGatePass(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(RGP_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// DAILY WORKSHEET

export async function getDailyWorksheet(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get(DWSHEET_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addDailyWorksheet(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(DWSHEET_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getDailyWorksheets(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(DWSHEET_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function deleteDailyWorksheet(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(DWSHEET_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getOnGoingRGP(data: any) {
    try {
        // console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_ongoing_rgps', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function WorksheetSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('worksheet_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// EXPENSE SHEET

export async function addExpenseSheet(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(EXPSHEET_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getExpenseSheets(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(EXPSHEET_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getPendingExpenseSheets(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(EXPSHEET_URL + "/approval", data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function deleteExpenseSheet(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(EXPSHEET_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ExpenseSheetSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('expensesheet_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getExpenseSheet(id: any) {
    try {
        ApiService.setHeader();
        const data = {
            id : id,
        }
        const response = await ApiService.post("get_expense_sheet", data);
        // console.log(response)
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function updateExpenseSheet(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(EXPSHEET_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}