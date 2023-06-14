/* eslint-disable prettier/prettier */
// all apis for CRUD options
import ApiService from "@/core/services/ApiService";

// companies
// gell all comapnies
export async function getCompanies(data: any) {
    try {
        console.log(data)
        ApiService.setHeader();
        const response = await ApiService.companyget("company", data);
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
        const response = await ApiService.post("company", data);
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
        const response = await ApiService.delete("company/" + data);
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
        const response = await ApiService.get("company", data);
        console.log(response)
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
        const response = await ApiService.put("company/" + id, data);
        console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}