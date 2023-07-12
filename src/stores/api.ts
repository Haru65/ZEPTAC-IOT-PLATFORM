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

// COMPANIES

// gell all comapnies
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

// USER
export async function getUsers() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(USER_URL);
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
        ApiService.setHeader();
        const response = await ApiService.put(USER_URL + "/" + id, data);
        //console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// CUSTOMERS
// get customers
export async function getCustomers() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get(CUSTOMERS_URL);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// CUSTOMERS
// 
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

// LEADS
// getlisting
export async function getLeadsList() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(LEADS_URL);
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

// PRICELISTS
// getlists
export async function getPriceList() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(PRICELIST_URL);
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
// get listing
export async function getQuotationList() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(QUOTATION_URL);
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
// getlists
export async function getInvoiceList() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INVOICE_URL);
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

