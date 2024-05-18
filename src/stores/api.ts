/* eslint-disable prettier/prettier */
// all apis for CRUD options
import ApiService from "@/core/services/ApiService";
import axios, { type AxiosProgressEvent } from "axios";
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
const MODULE_URL = "module_manager";
const EXTERNAL_DOC_URL = "externaldocuments";
const INTERNAL_DOC_URL = "internaldocuments";
const NCR_URL = "ncrs";
const RISK_URL = "risks";
const IMPROVEMENT_PLAN__URL = "improvements";
const AUDIT_OBSERVATION_URL = "auditobservations";
const CORRECTIVE_ACTION_URL = "non_conformance";
const AUDIT_SCHEDULE_URL = "auditschedule";
const ISO_RULE_URL = "iso";
const QMS_PROCEDURE_URL = "qms_procedures";
const WORK_INSTRUCTION_URL = "work_instructions";
const FORMS_AND_FORMATS_URL = "forms_and_formats";
const NABL_DOC_URL = "nabl_documents";
const NI_DOC_URL = "ni_documents";
const RECORDS_URL = "records";
const SKILL_MATRIX_URL = "skill_matrix";
const INTERMEDIATE_RECORD_URL = "intermediate_check_records";
const INSPECTION_RECORD_URL = "inspection_records";
const SUPPLIER_URL = "suppliers";
const SUPPLIER_EVALUATION_URL = "supplier_evaluation";
const METHOD_VALIDATION_URL = "method_validation";
const INTER_LAB_COMPARISON_URL = "interlaboratory";
const REPLICATE_REPORT_URL = "replicate_report";
const DOC_CHANGE_URL = "document_change_request";
const PLAN_URL = "plan";
const PLANNER_URL = "planner";
const MRM_SCHEDULE_URL = "mrm_schedule";
const MRM_MINUTE_URL = "mrm_minutes";
const SRF_URL = "srf";
const LAF_URL = "laf";
const LAF_REPORT_URL = "laf_reports";
const BSC_URL = "bsc";
const BSC_REPORT_URL = "bsc_reports";
const FEEDBACK_URL = "feedbacks";



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

// Validate User for Service Request
export async function validateUser(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post("validate_user", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

// Validate User for Customer Feedback
export async function validateFeedback(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post("validate_feedback", data);
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


// update function
export async function InstrumentStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("instruments_status", details);
        return response.data;
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

// update function
export async function RGatePassStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("returnablegatepasses_status", details);
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

// update function
export async function DailyWorksheetStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("dailyworksheet_status", details);
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

// update function
export async function ExpenseSheetStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("expensesheets_status", details);
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

// update function
export async function ComplaintStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("complaint_status", details);
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


// update function
export async function TrainingStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("training_status", details);
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


// forgot Password
export async function process_json_data(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.post("process_json_data", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: error };
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


// PERMISSION MANAGER

export async function addModule(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(MODULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getModules(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(MODULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function assignModules(companyId: any, moduleArr: any) {
    try {
        //console.log(data)
        const data = {
            "id": companyId,
            "moduleArr" : moduleArr
        }
        ApiService.setHeader();
        const response = await ApiService.post('update_modules', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function ModuleSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('modules_search', data);
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

// update function
export async function NonConformanceRecordStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("non_conformance_status", details);
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



// Quality Documentation
// Quality Work - Risk Register

// listing function
export async function getRiskRegisters(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(RISK_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function RiskRegisterSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('risk_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addRiskRegister(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(RISK_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function addUpdateRiskIdenfication(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post("store_risk_identification", data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function addUpdateRiskEvaluation(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post("store_risk_evaluation", data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function addUpdateRiskCounter(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post("store_risk_counter", data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// get function
export async function getRiskRegister(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(RISK_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateRiskRegister(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(RISK_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function RiskRegisterStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("risk_register_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteRiskRegister(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(RISK_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// Quality Documentation
// Quality Work - Document Change Request

// listing function
export async function getDocumentChanges(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(DOC_CHANGE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function DocumentChangeSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('document_change_request_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addDocumentChange(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(DOC_CHANGE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getDocumentChange(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(DOC_CHANGE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateDocumentChange(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(DOC_CHANGE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function DocumentChangeStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("document_change_request_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteDocumentChange(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(DOC_CHANGE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// Quality Documentation
// Quality Work - Improvement Action Plan

// listing function
export async function getImprovementPlans(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(IMPROVEMENT_PLAN__URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function ImprovementPlanSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('improvement_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addImprovementPlan(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(IMPROVEMENT_PLAN__URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getImprovementPlan(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(IMPROVEMENT_PLAN__URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateImprovementPlan(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(IMPROVEMENT_PLAN__URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function ImprovementPlanStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("improvement_plan_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteImprovementPlan(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(IMPROVEMENT_PLAN__URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// SUPER ADMIN - ISO Audit Rule

// listing function
export async function getISORules(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(ISO_RULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// add function
export async function addISORule(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(ISO_RULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getISORule(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(ISO_RULE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateISORule(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(ISO_RULE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteISORule(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(ISO_RULE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// Quality Documentation
// Internal Audit - Audit Observation

// listing function
export async function getIAuditObservations(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(AUDIT_OBSERVATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function IAuditObservationSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('audit_observation_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addIAuditObservation(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(AUDIT_OBSERVATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getIAuditObservation(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(AUDIT_OBSERVATION_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateIAuditObservation(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(AUDIT_OBSERVATION_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function IAuditObservationStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("auditobservations_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteIAuditObservation(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(AUDIT_OBSERVATION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// Quality Documentation
// Internal Audit - Non-Conformance List (NON COMPILANCE)

// listing function
export async function getCorrectiveActions(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(CORRECTIVE_ACTION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addCorrectiveAction(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(CORRECTIVE_ACTION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getCorrectiveAction(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(CORRECTIVE_ACTION_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateCorrectiveAction(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(CORRECTIVE_ACTION_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function CorrectiveActionStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("non_conformance_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteCorrectiveAction(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(CORRECTIVE_ACTION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// Quality Documentation
// Internal Audit - Audit Schedule 

// listing function
export async function getIAuditSchedules(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(AUDIT_SCHEDULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function IAuditScheduleSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('audit_schedule_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addIAuditSchedule(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(AUDIT_SCHEDULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getIAuditSchedule(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(AUDIT_SCHEDULE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateIAuditSchedule(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(AUDIT_SCHEDULE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function IAuditScheduleStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("auditschedule_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteIAuditSchedule(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(AUDIT_SCHEDULE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// MASTER LIST MODULE
// QMS Procedure

// listing function
export async function getQMSProcedures(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(QMS_PROCEDURE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function QMSProcedureSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('qms_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addQMSProcedure(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(QMS_PROCEDURE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getQMSProcedure(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(QMS_PROCEDURE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateQMSProcedure(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(QMS_PROCEDURE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function QMSProcedureStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("qms_procedure_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteQMSProcedure(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(QMS_PROCEDURE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// MASTER LIST MODULE
// Work Instructions

// listing function
export async function getWorkInstructions(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(WORK_INSTRUCTION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function WorkInstructionSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('work_instruction_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addWorkInstruction(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(WORK_INSTRUCTION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getWorkInstruction(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(WORK_INSTRUCTION_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateWorkInstruction(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(WORK_INSTRUCTION_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function WorkInstructionStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("work_instruction_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteWorkInstruction(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(WORK_INSTRUCTION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// MASTER LIST MODULE
// Form and Format

// listing function
export async function getFormAndFormats(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(FORMS_AND_FORMATS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function FormAndFormatSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('form_format_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addFormAndFormat(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(FORMS_AND_FORMATS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getFormAndFormat(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(FORMS_AND_FORMATS_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateFormAndFormat(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(FORMS_AND_FORMATS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function FormAndFormatStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("form_format_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteFormAndFormat(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(FORMS_AND_FORMATS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// MASTER LIST MODULE
// NABL Document

// listing function
export async function getNABLDocs(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(NABL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function NABLDocSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('nabl_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addNABLDoc(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(NABL_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getNABLDoc(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(NABL_DOC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateNABLDoc(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(NABL_DOC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function NABLDocStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("nabl_document_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteNABLDoc(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(NABL_DOC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// MASTER LIST MODULE
// National-International Document (NI)

// listing function
export async function getNIDocs(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(NI_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function NIDocSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('ni_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addNIDoc(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(NI_DOC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getNIDoc(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(NI_DOC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateNIDoc(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(NI_DOC_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function NIDocStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("ni_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteNIDoc(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(NI_DOC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// MASTER LIST MODULE
// Records

// listing function
export async function getRecords(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(RECORDS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function RecordSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('records_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addRecord(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(RECORDS_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getRecord(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(RECORDS_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateRecord(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(RECORDS_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// update function
export async function RecordStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("quality_record_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteRecord(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(RECORDS_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// EMPLOYEE MANAGEMENT
// SKILL MATRIX

// listing function
export async function getSkillMatrixs(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(SKILL_MATRIX_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function SkillMatrixSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('skill_matrix_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addSkillMatrix(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(SKILL_MATRIX_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getSkillMatrix(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(SKILL_MATRIX_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateSkillMatrix(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(SKILL_MATRIX_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function SkillMatrixStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("skill_matrix_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteSkillMatrix(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(SKILL_MATRIX_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// INSTRUMENT MANAGEMENT
// INTERMEDIATE CHECK RECORD

// listing function
export async function getIntermediateCheckRecords(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INTERMEDIATE_RECORD_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function IntermediateCheckRecordSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('intermediate_check_records_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getCalibrationInstrumentForIntermediate(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post('intermediate_instrument', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addIntermediateCheckRecord(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INTERMEDIATE_RECORD_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getIntermediateCheckRecord(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INTERMEDIATE_RECORD_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateIntermediateCheckRecord(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(INTERMEDIATE_RECORD_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// // update function
// export async function IntermediateCheckRecordStatus(id: any, data: any) {
//     try {
//         //console.log(data)
//         const details = {
//             id: id,
//             data: data
//         }
//         ApiService.setHeader();
//         const response = await ApiService.post("intermediate_check_status", details);
//         return response.data;
//     } catch (errors) {
//         console.error(errors);
//         return { error: errors };
//     }
// }

// delete function
export async function deleteIntermediateCheckRecord(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INTERMEDIATE_RECORD_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// INSTRUMENT MANAGEMENT
// INSPECTION RECORD

// listing function
export async function getInspectionRecords(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INSPECTION_RECORD_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function InspectionRecordSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('inspection_records_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

export async function getCalibrationInstrumentForInspection(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post('inspection_instrument', id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addInspectionRecord(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INSPECTION_RECORD_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getInspectionRecord(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INSPECTION_RECORD_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateInspectionRecord(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(INSPECTION_RECORD_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// // update function
// export async function InspectionRecordStatus(id: any, data: any) {
//     try {
//         //console.log(data)
//         const details = {
//             id: id,
//             data: data
//         }
//         ApiService.setHeader();
//         const response = await ApiService.post("inspection_records_status", details);
//         return response.data;
//     } catch (errors) {
//         console.error(errors);
//         return { error: errors };
//     }
// }

// delete function
export async function deleteInspectionRecord(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INSPECTION_RECORD_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// SUPPLIER MANAGEMENT

// listing function
export async function getSuppliers(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(SUPPLIER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function SupplierSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('suppliers_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addSupplier(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(SUPPLIER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getSupplier(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(SUPPLIER_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateSupplier(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(SUPPLIER_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function SupplierStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("suppliers_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// delete function
export async function deleteSupplier(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(SUPPLIER_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// SUPPLIER EVALUATION MANAGEMENT

// listing function
export async function getSupplierEvaluations(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(SUPPLIER_EVALUATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function SupplierEvaluationSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('supplier_evaluation_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addSupplierEvaluation(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(SUPPLIER_EVALUATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getSupplierEvaluation(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(SUPPLIER_EVALUATION_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateSupplierEvaluation(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(SUPPLIER_EVALUATION_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteSupplierEvaluation(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(SUPPLIER_EVALUATION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// QUALITY ASSURANCE
// Method Validation

// listing function
export async function getMethodValidations(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(METHOD_VALIDATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function MethodValidationSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('method_validation_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addMethodValidation(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(METHOD_VALIDATION_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getMethodValidation(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(METHOD_VALIDATION_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateMethodValidation(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(METHOD_VALIDATION_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function MethodValidationStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("method_validation_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteMethodValidation(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(METHOD_VALIDATION_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// QUALITY ASSURANCE
// InterLaboratory Comparision

// listing function
export async function getInterLabComparisons(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(INTER_LAB_COMPARISON_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function InterLabComparisonSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('interlaboratory_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addInterLabComparison(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(INTER_LAB_COMPARISON_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getInterLabComparison(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(INTER_LAB_COMPARISON_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateInterLabComparison(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(INTER_LAB_COMPARISON_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function InterLabComparisonStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("interlaboratory_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteInterLabComparison(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(INTER_LAB_COMPARISON_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// QUALITY ASSURANCE
// Replicate Report

// listing function
export async function getReplicateReports(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(REPLICATE_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function ReplicateReportSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('replicate_report_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addReplicateReport(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(REPLICATE_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getReplicateReport(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(REPLICATE_REPORT_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateReplicateReport(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(REPLICATE_REPORT_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// update function
export async function ReplicateReportStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("replicate_report_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteReplicateReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(REPLICATE_REPORT_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// PLAN - PLANNER  

// listing function
export async function getPlans(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(PLAN_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addPlan(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(PLAN_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getPlan(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(PLAN_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updatePlan(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(PLAN_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deletePlan(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(PLAN_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}




// PLAN - PLANNER  

// listing function
export async function getPlanners(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(PLANNER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function PlannerSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('planner_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addPlanner(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(PLANNER_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getPlanner(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(PLANNER_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updatePlanner(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(PLANNER_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deletePlanner(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(PLANNER_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// add function
export async function getCalibratedInstruments(data:any) {
    try {
        //console.log(data)
        const companyID = { "company_id": data };
        ApiService.setHeader();
        const response = await ApiService.post("get_calibration_instruments", companyID);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }

}

// add function
export async function getPlansWithPlanner() {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.get("plans_with_planner");
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }

}




// MRM - MRM Schedule  

// listing function
export async function getMRMSchedules(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(MRM_SCHEDULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function MRMScheduleSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('mrm_schedule_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addMRMSchedule(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(MRM_SCHEDULE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getMRMSchedule(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(MRM_SCHEDULE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateMRMSchedule(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(MRM_SCHEDULE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function MRMScheduleStatus(id: any, data: any) {
    try {
        //console.log(data)
        const details = {
            id: id,
            data: data
        }
        ApiService.setHeader();
        const response = await ApiService.post("mrm_schedule_status", details);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteMRMSchedule(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(MRM_SCHEDULE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// listing function
export async function getMRMMinutes(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(MRM_MINUTE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addMRMMinute(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(MRM_MINUTE_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getMRMMinute(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(MRM_MINUTE_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateMRMMinute(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(MRM_MINUTE_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteMRMMinute(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(MRM_MINUTE_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// // image upload api
// export async function uploadImage(fileData: any) {
//     try {
//         ApiService.setHeader();
//         const response = await ApiService.post("upload_image", fileData);
//         // console.log(response)
//         return response.data;
//     } catch (errors) {
//         console.error(errors);
//         return { error: errors };
//     }
// }

// Define a custom type for the onUploadProgress callback
type UploadProgressCallback = (progressEvent: AxiosProgressEvent) => void;

// image upload api
export async function uploadImage(fileData: FormData, onUploadProgress: UploadProgressCallback) {
    try {
        const response = await axios.post("upload_image", fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: onUploadProgress,
        });

        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// SERVICE REQUEST FORM
// listing function
export async function getServiceRequests(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(SRF_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function ServiceRequestSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('srf_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// add function
export async function addServiceRequest(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(SRF_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getServiceRequest(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(SRF_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateServiceRequest(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(SRF_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteServiceRequest(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(SRF_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// NABL REPORTS - LAF

// listing function
export async function getLaminarAirFlows(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(LAF_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function LaminarAirFlowSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('laf_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addLaminarAirFlow(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(LAF_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getLaminarAirFlow(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(LAF_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
// export async function updateLaminarAirFlow(id: any, data: any) {
//     try {
//         //console.log(data)
//         ApiService.setHeader();
//         const response = await ApiService.put(LAF_URL + "/" + id, data);
//         return response.data;
//     } catch (errors) {
//         console.error(errors);
//         return { error: errors };
//     }
// }

// delete function
export async function deleteLaminarAirFlow(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(LAF_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// NABL REPORTS - LAF REPORT

// listing function
export async function getLAFReports(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(LAF_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addLAFReport(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(LAF_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getLAFReport(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(LAF_REPORT_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateLAFReport(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(LAF_REPORT_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteLAFReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(LAF_REPORT_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Download LAF Report
export async function DownloadLAFReport(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("download_laf_report",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// NABL REPORTS - BSC

// listing function
export async function getBioSafetyCabinets(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(BSC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function BioSafetyCabinetSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('bsc_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addBioSafetyCabinet(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(BSC_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getBioSafetyCabinet(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(BSC_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
// export async function updateBioSafetyCabinet(id: any, data: any) {
//     try {
//         //console.log(data)
//         ApiService.setHeader();
//         const response = await ApiService.put(BSC_URL + "/" + id, data);
//         return response.data;
//     } catch (errors) {
//         console.error(errors);
//         return { error: errors };
//     }
// }

// delete function
export async function deleteBioSafetyCabinet(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(BSC_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}



// NABL REPORTS - BSC REPORT

// listing function
export async function getBSCReports(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(BSC_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// add function
export async function addBSCReport(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(BSC_REPORT_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getBSCReport(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(BSC_REPORT_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateBSCReport(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(BSC_REPORT_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteBSCReport(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(BSC_REPORT_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// Download LAF Report
export async function DownloadBSCReport(data: any) {
    try {
        //console.log(data)
        const id = { "id": data };
        ApiService.setHeader();
        const response = await ApiService.post("download_bsc_report",id);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}







// CUSTOMER FEEDBACK FORM
// listing function
export async function getFeedbacks(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.listingget(FEEDBACK_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// searching function
export async function FeedbackSearch(search: any) {
    try {
        //console.log(data)
        const data = {
            search: search
        }
        ApiService.setHeader();
        const response = await ApiService.post('feedbacks_search', data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}


// add function
export async function addFeedback(data) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.post(FEEDBACK_URL, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// get function
export async function getFeedback(data: any) {
    try {
        ApiService.setHeader();
        const response = await ApiService.get(FEEDBACK_URL, data);
        // console.log(response)
        return response.data.result;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// update function
export async function updateFeedback(id: any, data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.put(FEEDBACK_URL + "/" + id, data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}

// delete function
export async function deleteFeedback(data: any) {
    try {
        //console.log(data)
        ApiService.setHeader();
        const response = await ApiService.delete(FEEDBACK_URL + "/" + data);
        return response.data;
    } catch (errors) {
        console.error(errors);
        return { error: errors };
    }
}