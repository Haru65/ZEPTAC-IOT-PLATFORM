/* eslint-disable prettier/prettier */
// all apis for CRUD options




import ApiService from "@/core/services/ApiService";
const COMPANY_URL = "company";
const USER_URL = "users";
const CUSTOMERS_URL = "customers";
const PRICELIST_URL = "pricelist";

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
export async function deleteCompany(data: any) {
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