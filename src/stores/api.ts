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
const VAL_REPORT_URL = "validationreports";
const VAL_PROC_URL = "validation";
const QUAL_PROC_URL = "quality";
const COMPLAINT_URL = "complaint";
const TRAINING_URL = "training";
const THERMAL_INSTRUMENTS_URL = "thermalinstrument";
const THERMAL_REPORTS_URL = "thermalreport";
const PERMISSION_URL = "permission_manager";
const EXTERNAL_DOC_URL = "externaldocuments";
const INTERNAL_DOC_URL = "internaldocuments";
const NCR_URL = "ncrs";


// Update Password
export async function changeUserPassword(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post("change_password", data);
        return response.data.message;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// forgot Password
export async function resetPassword(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post("reset_password", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}


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

// add user
export async function addEmployee(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        console.log(data);
        const response = await ApiService.post(EMPLOYEE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

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

export async function getEmployee(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(EMPLOYEE_URL, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateEmployee(data: any, id: any) {
    try {
        ApiService.patchsetHeader();
        console.log(data);
        const response = await ApiService.put(EMPLOYEE_URL + "/" + id, data);
        console.log(response)
        return response.data.result;
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
        const response = await ApiService.post('client_search', data);
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
        const response = await ApiService.listingget(CLIENTS_URL, data);
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

export async function GetIncrEnquiry(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_latest_enquiry', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// getlisting
export async function getLeads(data) {
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
        const response = await ApiService.post('pricelist_search', data);
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
export async function GetLeadClients(data: any) {
    try {
        //console.log(data)
        const id = { "leadid": data };
        ApiService.setHeader();
        const response = await ApiService.post('/get_lead_clients', id);
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

export async function DownloadQuotation(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_information_of_quotation",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getLeadNCustomer(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_lead_and_customer",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}





// INVOICES

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

export async function DownloadInvoice(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_information_of_invoice",id);
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

export async function getSiteAddress(data: any) {
    try {
        ApiService.setHeader();
        const id = { "id": data };
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

export async function gatePassSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('returnablegatepass_search', data);
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

export async function addDailyWorksheet(data) {
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

export async function getOnGoingCompletedRGP(data: any) {
    try {
        // console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_ongoing_completed_rgps', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addExpenseSheet(data) {
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

// VALIDATION REPORT


export async function getAllRGP(data: any) {
    try {
        // console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_all_rgps', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addValidationReport(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(VAL_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// getlists
export async function getAllValidationReport(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(VAL_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getValidationReport(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(VAL_REPORT_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteValidationReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(VAL_REPORT_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ValidationReportSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('validation_report_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getReportinfo(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_information_of_report",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateValidationReport(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(VAL_REPORT_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// VALIDATION PROCEDURE

// getlists
export async function getValidationProcedures(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(VAL_PROC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getValidationProcedure(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(VAL_PROC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addValidationProcedure(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(VAL_PROC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateValidationProcedure(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(VAL_PROC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteValidationProcedure(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(VAL_PROC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ValidationProcedureSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('validation_procedure_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// QUALITY PROCEDURE

// getlists
export async function getQualityProcedures(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(QUAL_PROC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getQualityProcedure(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(QUAL_PROC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addQualityProcedure(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(QUAL_PROC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateQualityProcedure(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(QUAL_PROC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteQualityProcedure(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(QUAL_PROC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function QualityProcedureSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('quality_procedure_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// CUSTOMER COMPLAINT

// getlists
export async function getComplaints(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(COMPLAINT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getComplaint(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(COMPLAINT_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addComplaint(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(COMPLAINT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateComplaint(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(COMPLAINT_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteComplaint(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(COMPLAINT_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ComplaintSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('complaint_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// TRAINING

// getlists
export async function getTrainings(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(TRAINING_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getTraining(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(TRAINING_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addTraining(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(TRAINING_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateTraining(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(TRAINING_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteTraining(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(TRAINING_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function TrainingSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('training_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// Dashboard Routes

export async function enquiryGen(company_id, yearOptions) {
    try {
      const id = { "company_id": company_id, "years": yearOptions };
  
      ApiService.setHeader();
      const response = await ApiService.post('enquiry_generated', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

export async function quotationSent(company_id, yearOptions) {
    try {
      const id = { "company_id": company_id, "years": yearOptions };
  
      ApiService.setHeader();
      const response = await ApiService.post('quotation_sent', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

export async function leadConversion(company_id, yearOptions) {
    try {
      const id = { "company_id": company_id, "years": yearOptions };
  
      ApiService.setHeader();
      const response = await ApiService.post('lead_conversion', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

export async function salesDone(company_id, yearOptions) {
    try {
      const id = { "company_id": company_id, "years": yearOptions };
  
      ApiService.setHeader();
      const response = await ApiService.post('sales_done', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

export async function calibrationNotification(company_id) {
    try {
      const id = { "company_id": company_id};
  
      ApiService.setHeader();
      const response = await ApiService.post('upcoming_calibration_notifications', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

export async function maintenanceNotification(company_id) {
    try {
      const id = { "company_id": company_id};
  
      ApiService.setHeader();
      const response = await ApiService.post('upcoming_maintenance_notifications', id);
      return response.data;
    } catch (errors) {
      console.error(errors);
      return { error: errors };
    }
  }

  // Thermal Instruments

// getlists
export async function getThermalInstruments(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(THERMAL_INSTRUMENTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ThermalInstrumentSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('thermal_instrument_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addThermalInstrument(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(THERMAL_INSTRUMENTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getThermalInstrument(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(THERMAL_INSTRUMENTS_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateThermalInstrument(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(THERMAL_INSTRUMENTS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete
export async function deleteThermalInstrument(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(THERMAL_INSTRUMENTS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// custom
export async function GetIncrInstrumentId(data: any) {
    try {
        //console.log(data)
        const id = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post('get_latest_instrument', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// THERMAL MAPPING

// getlists
export async function getThermalReports(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(THERMAL_REPORTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function getThermalReport(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(THERMAL_REPORTS_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addThermalReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(THERMAL_REPORTS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updateThermalReport(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(THERMAL_REPORTS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


export async function deleteThermalReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(THERMAL_REPORTS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ThermalReportSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('thermal_report_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function DownloadThermalReport(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("download_thermal_report",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// PERMISSION MANAGER

export async function getPermission(data: string) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get(PERMISSION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function addPermission(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(PERMISSION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getPermissions(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(PERMISSION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function deletePermission(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(PERMISSION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function updatePermission(userId: any, permArr: any) {
    try {
        //console.log(data)
        const data = {
            "id": userId,
            "permArr" : permArr
        }
        ApiService.setHeader();
        const response = await ApiService.post('update_permission', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function PermissionSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('permissions_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// Quality Documentation
// Quality Work - External

// listing function
export async function getExternalDocs(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(EXTERNAL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function ExternalDocSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('external_doc_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addExternalDoc(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(EXTERNAL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getExternalDoc(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(EXTERNAL_DOC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateExternalDoc(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(EXTERNAL_DOC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteExternalDoc(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(EXTERNAL_DOC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// Quality Documentation
// Quality Work - Internal

// listing function
export async function getInternalDocs(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INTERNAL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function InternalDocSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('internal_doc_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addInternalDoc(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INTERNAL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getInternalDoc(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INTERNAL_DOC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateInternalDoc(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(INTERNAL_DOC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteInternalDoc(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INTERNAL_DOC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// Quality Documentation
// Quality Work - Non Conformance Record

// listing function
export async function getNonConformanceRecords(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(NCR_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function NonConformanceRecordSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('ncr_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addNonConformanceRecord(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(NCR_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getNonConformanceRecord(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(NCR_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateNonConformanceRecord(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(NCR_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteNonConformanceRecord(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(NCR_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}