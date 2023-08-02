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

