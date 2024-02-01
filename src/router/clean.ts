import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import {
  getCompany,
  getCustomer,
  getInvoice,
  getLead,
  getPriceListItem,
  getQuotation,
  getInstrument,
  getRGatePass,
  getDailyWorksheet,
  getExpenseSheet,
  getValidationReport,
  getValidationProcedure,
  getQualityProcedure,
  getComplaint,
  getTraining,
  getEmployee,
  getClient,
  getThermalInstrument,
  getThermalReport,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import {
  checkCookie,
  getCookie,
  deleteCookie,
} from "@/core/services/JwtService";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Welcome Admin",
          breadcrumbs: ["Dashboard"],
        },
      },
      {
        path: "/company/list",
        name: "company-list",
        component: () =>
          import("@/views/apps/admin/companies/CompanyListing.vue"),
        meta: {
          pageTitle: "Company List",
          breadcrumbs: ["Company List"],
        },
      },
      {
        path: "/company/add",
        name: "company-add",
        component: () => import("@/views/apps/admin/companies/CompanyAdd.vue"),
        meta: {
          pageTitle: "Company Add",
          breadcrumbs: ["Company Add"],
        },
      },
      {
        path: "/company/edit/:id",
        name: "company-edit",
        beforeEnter: async (to, from, next) => {
          const companyId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getCompany(companyId);
            // //console.log(response);
            if (response.error) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/admin/companies/CompanyEdit.vue"),
        meta: {
          pageTitle: "Company Edit",
          breadcrumbs: ["Company Edit"],
        },
      },
      {
        path: "/users/list",
        name: "users-list",
        component: () => import("@/views/apps/admin/users/UserListing.vue"),
        meta: {
          pageTitle: "User List",
          breadcrumbs: ["User List"],
        },
      },
      {
        path: "/users/add",
        name: "users-add",
        component: () => import("@/views/apps/admin/users/UserAdd.vue"),
        meta: {
          pageTitle: "User Add",
          breadcrumbs: ["User Add"],
        },
      },
      {
        path: "/users/edit/:id",
        name: "users-edit",
        component: () => import("@/views/apps/admin/users/UserEdit.vue"),
        meta: {
          pageTitle: "User Edit",
          breadcrumbs: ["User Edit"],
        },
      },
      {
        path: "/employee/list",
        name: "employee-list",
        component: () =>
          import("@/views/apps/hr/employees/EmployeeListing.vue"),
        meta: {
          pageTitle: "Employee List",
          breadcrumbs: ["Employee List"],
        },
      },
      {
        path: "/employee/add",
        name: "employee-add",
        component: () =>
          import("@/views/apps/hr/employees/EmployeeAdd.vue"),
        meta: {
          pageTitle: "Employee Add",
          breadcrumbs: ["Employee Add"],
        },
      },
      {
        path: "/employee/edit/:id",
        name: "employee-edit",
        beforeEnter: async (to, from, next) => {
          const empId = to.params.id;
          try {
            const response = await getEmployee(empId.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/hr/employees/EmployeeEdit.vue"),
        meta: {
          pageTitle: "Employee Edit",
          breadcrumbs: ["Employee Edit"],
        },
      },
      {
        path: "/leads/list",
        name: "leads-list",
        component: () => import("@/views/apps/sales/leads/LeadsListing.vue"),
        meta: {
          pageTitle: "Leads List",
          breadcrumbs: ["Leads List"],
        },
      },
      {
        path: "/leads/add",
        name: "leads-add",
        component: () => import("@/views/apps/sales/leads/LeadsAdd.vue"),
        meta: {
          pageTitle: "Leads Add",
          breadcrumbs: ["Leads Add"],
        },
      },
      {
        path: "/leads/edit/:id",
        name: "leads-edit",
        component: () => import("@/views/apps/sales/leads/LeadsEdit.vue"),
        beforeEnter: async (to, from, next) => {
          const LeadId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getLead(LeadId);
            console.log(response);
            if (response.error) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        meta: {
          pageTitle: "Leads Edit",
          breadcrumbs: ["Leads Edit"],
        },
      },

      // customers front-end routes
      {
        path: "/customers/list",
        name: "customers-list",
        component: () =>
          import("@/views/apps/sales/customers/CustomersListing.vue"),
        meta: {
          pageTitle: "Customers List",
          breadcrumbs: ["Customers List"],
        },
      },
      {
        path: "/customers/add",
        name: "customers-add",
        component: () =>
          import("@/views/apps/sales/customers/CustomersAdd.vue"),
        meta: {
          pageTitle: "Customers Add",
          breadcrumbs: ["Customers Add"],
        },
      },
      {
        path: "/customers/edit/:id",
        name: "customers-edit",
        component: () =>
          import("@/views/apps/sales/customers/CustomersEdit.vue"),
        beforeEnter: async (to, from, next) => {
          const customerId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getCustomer(customerId);
            console.log(response);
            if (response.error) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        meta: {
          pageTitle: "Customers Edit",
          breadcrumbs: ["Customers Edit"],
        },
      },

      // Clients front-end routes
      {
        path: "/clients/list",
        name: "clients-list",
        component: () =>
          import("@/views/apps/sales/clients/ClientsListing.vue"),
        meta: {
          pageTitle: "Clients List",
          breadcrumbs: ["Clients List"],
        },
      },
      {
        path: "/clients/add",
        name: "clients-add",
        component: () =>
          import("@/views/apps/sales/clients/ClientsAdd.vue"),
        meta: {
          pageTitle: "Clients Add",
          breadcrumbs: ["Clients Add"],
        },
      },
      {
        path: "/clients/edit/:id",
        name: "clients-edit",
        component: () =>
          import("@/views/apps/sales/clients/ClientsEdit.vue"),
        beforeEnter: async (to, from, next) => {
          const clientId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getClient(clientId);
            console.log(response);
            if (response.error) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        meta: {
          pageTitle: "Clients Edit",
          breadcrumbs: ["Clients Edit"],
        },
      },

      // PriceList front-end routes
      {
        path: "/pricelist/list",
        name: "price-list",
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListListing.vue"),
        meta: {
          pageTitle: "Price List",
          breadcrumbs: ["Price List"],
        },
      },
      {
        path: "/pricelist/add",
        name: "price-list-add",
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListAdd.vue"),
        meta: {
          pageTitle: "Price List Item Add",
          breadcrumbs: ["Price List Item Add"],
        },
      },
      {
        path: "/pricelist/edit/:id",
        name: "pricelist-edit",
        beforeEnter: async (to, from, next) => {
          const priceItemId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getPriceListItem(priceItemId.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListEdit.vue"),
        meta: {
          pageTitle: "Price List Edit",
          breadcrumbs: ["Price List Edit"],
        },
      },
      {
        path: "/quotations/list",
        name: "quotation-list",
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsListing.vue"),
        meta: {
          pageTitle: "Quotation List",
          breadcrumbs: ["Quotation List"],
        },
      },
      {
        path: "/quotations/add",
        name: "quotation-add",
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsAdd.vue"),
        meta: {
          pageTitle: "Quotation Add",
          breadcrumbs: ["Quotation Add"],
        },
      },
      {
        path: "/quotations/edit/:id",
        name: "quotation-edit",
        beforeEnter: async (to, from, next) => {
          const quotationId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getQuotation(quotationId);
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsEdit.vue"),
        meta: {
          pageTitle: "Quotation Edit",
          breadcrumbs: ["Quotation Edit"],
        },
      },
      {
        path: "/invoices/list",
        name: "invoices-list",
        component: () =>
          import("@/views/apps/sales/invoices/InvoicesListing.vue"),
        meta: {
          pageTitle: "Invoices List",
          breadcrumbs: ["Invoices List"],
        },
      },
      {
        path: "/invoices/add",
        name: "invoices-add",
        component: () => import("@/views/apps/sales/invoices/InvoicesAdd.vue"),
        meta: {
          pageTitle: "Invoices Add",
          breadcrumbs: ["Invoices Add"],
        },
      },
      {
        path: "/invoices/edit/:id",
        name: "invoice-edit",
        beforeEnter: async (to, from, next) => {
          const invoiceId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getInvoice(invoiceId);
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/sales/invoices/InvoicesEdit.vue"),
        meta: {
          pageTitle: "Invoice Edit",
          breadcrumbs: ["Invoice Edit"],
        },
      },


      // Instruments Front End Routes
      {
        path: "/instruments/list",
        name: "instrument-list",
        component: () =>
          import("@/views/apps/modules/instruments/InstrumentsListing.vue"),
        meta: {
          pageTitle: "Instrument List",
          breadcrumbs: ["Instrument List"],
        },
      },
      {
        path: "/instruments/add",
        name: "instrument-add",
        component: () =>
          import("@/views/apps/modules/instruments/InstrumentsAdd.vue"),
        meta: {
          pageTitle: "Instrument Add",
          breadcrumbs: ["Instrument Add"],
        },
      },
      {
        path: "/instruments/edit/:id",
        name: "instrument-edit",
        beforeEnter: async (to, from, next) => {
          const instrumentItemId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getInstrument(instrumentItemId.toString());
            // console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/modules/instruments/InstrumentsEdit.vue"),
        meta: {
          pageTitle: "Instrument Edit",
          breadcrumbs: ["Instrument Edit"],
        },
      },



      // Validation Service All Front End Routes

      //RGP Routes
      {
        path: "/returnablegatepasses",
        name: "rgp-list",
        component: () =>
          import("@/views/apps/modules/services/rgp/RGatePassListing.vue"),
        meta: {
          pageTitle: "Returnable-Gate-Pass List",
          breadcrumbs: ["Returnable-Gate-Pass List"],
        },
      },
      {
        path: "/returnablegatepasses/add",
        name: "rgp-add",
        component: () =>
          import("@/views/apps/modules/services/rgp/RGatePassAdd.vue"),
        meta: {
          pageTitle: "Returnable-Gate-Pass Add",
          breadcrumbs: ["Returnable-Gate-Pass Add"],
        },
      },

      // Daily Work Sheet Routes
      {
        path: "/dailyworksheets",
        name: "dailyworksheet-list",
        component: () =>
          import("@/views/apps/modules/services/dailyworksheet/DWorksheetListing.vue"),
        meta: {
          pageTitle: "Daily Worksheet List",
          breadcrumbs: ["Daily Worksheet List"],
        },
      },
      {
        path: "/dailyworksheets/add",
        name: "dailyworksheet-add",
        component: () =>
          import("@/views/apps/modules/services/dailyworksheet/DWorksheetAdd.vue"),
        meta: {
          pageTitle: "Daily Worksheet Add",
          breadcrumbs: ["Daily Worksheet Add"],
        },
      },
      {
        path: "/dailyworksheets/edit/:id",
        name: "dailyworksheet-edit",
        beforeEnter: async (to, from, next) => {
          const worksheetID = to.params.id;
          //console.log(companyId);
          try {
            const response = await getDailyWorksheet(worksheetID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/modules/services/dailyworksheet/DWorksheetEdit.vue"),
        meta: {
          pageTitle: "Daily Worksheet Edit",
          breadcrumbs: ["Daily Worksheet Edit"],
        },
      },

      // Expense Sheet Routes
      {
        path: "/expensesheets",
        name: "expensesheet-list",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetListing.vue"),
        meta: {
          pageTitle: "Expense Sheet List",
          breadcrumbs: ["Expense Sheet List"],
        },
      },
      {
        path: "/expensesheets/add",
        name: "expensesheet-add",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetAdd.vue"),
        meta: {
          pageTitle: "Expense Sheet Add",
          breadcrumbs: ["Expense Sheet Add"],
        },
      },
      {
        path: "/expensesheets/edit/:id",
        name: "expensesheet-edit",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetEdit.vue"),
        meta: {
          pageTitle: "Expense Sheet Edit",
          breadcrumbs: ["Expense Sheet Edit"],
        },
      },

      // Expense Sheet Routes
      {
        path: "/expensesheets/approval",
        name: "expensesheet-approval",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetApproval.vue"),
        meta: {
          pageTitle: "Expense Approval",
          breadcrumbs: ["Expense Approval"],
        },
      },

      // Validation Report Routes
      {
        path: "/validationreports/list",
        name: "validationreport-list",
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportListing.vue"),
        meta: {
          pageTitle: "Validation Report List",
          breadcrumbs: ["Validation Report List"],
        },
      },
      {
        path: "/validationreports/add",
        name: "validationreport-add",
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportAdd.vue"),
        meta: {
          pageTitle: "Validation Report Add",
          breadcrumbs: ["Validation Report Add"],
        },
      },
      {
        path: "/validationreports/edit/:id",
        name: "validationreport-edit",
        beforeEnter: async (to, from, next) => {
          const validationReportID = to.params.id;
          //console.log(companyId);
          try {
            const response = await getValidationReport(validationReportID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportEdit.vue"),
        meta: {
          pageTitle: "Validation Report Edit",
          breadcrumbs: ["Validation Report Edit"],
        },
      },

      // Validation Procedure Routes
      {
        path: "/validation",
        name: "validation-list",
        component: () =>
          import("@/views/apps/modules/externalaudit/validationprocedure/ValProcedureListing.vue"),
        meta: {
          pageTitle: "Validation Procedure List",
          breadcrumbs: ["Validation Procedure List"],
        },
      },
      {
        path: "/validation/add",
        name: "validation-add",
        component: () =>
          import("@/views/apps/modules/externalaudit/validationprocedure/ValProcedureAdd.vue"),
        meta: {
          pageTitle: "Validation Procedure Add",
          breadcrumbs: ["Validation Procedure Add"],
        },
      },
      {
        path: "/validation/edit/:id",
        name: "validation-edit",
        beforeEnter: async (to, from, next) => {
          const valProcedureID = to.params.id;
          try {
            const response = await getValidationProcedure(valProcedureID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/modules/externalaudit/validationprocedure/ValProcedureEdit.vue"),
        meta: {
          pageTitle: "Validation Procedure Edit",
          breadcrumbs: ["Validation Procedure Edit"],
        },
      },

      // Quality Procedure Routes
      {
        path: "/quality",
        name: "quality-list",
        component: () =>
          import("@/views/apps/modules/externalaudit/qualityprocedure/QualityProcedureListing.vue"),
        meta: {
          pageTitle: "Quality Procedure List",
          breadcrumbs: ["Quality Procedure List"],
        },
      },
      {
        path: "/quality/add",
        name: "quality-add",
        component: () =>
          import("@/views/apps/modules/externalaudit/qualityprocedure/QualityProcedureAdd.vue"),
        meta: {
          pageTitle: "Quality Procedure Add",
          breadcrumbs: ["Quality Procedure Add"],
        },
      },
      {
        path: "/quality/edit/:id",
        name: "quality-edit",
        beforeEnter: async (to, from, next) => {
          const qualProcedureID = to.params.id;
          try {
            const response = await getQualityProcedure(qualProcedureID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/modules/externalaudit/qualityprocedure/QualityProcedureEdit.vue"),
        meta: {
          pageTitle: "Quality Procedure Edit",
          breadcrumbs: ["Quality Procedure Edit"],
        },
      },


      // Customer Feedback Routes
      {
        path: "/complaint",
        name: "complaint-list",
        component: () =>
          import("@/views/apps/customerfeedback/complaint/ComplaintListing.vue"),
        meta: {
          pageTitle: "Customer Complaint List",
          breadcrumbs: ["Customer Complaint List"],
        },
      },
      {
        path: "/complaint/add",
        name: "complaint-add",
        component: () =>
          import("@/views/apps/customerfeedback/complaint/ComplaintAdd.vue"),
        meta: {
          pageTitle: "Customer Complaint Add",
          breadcrumbs: ["Customer Complaint Add"],
        },
      },
      {
        path: "/complaint/edit/:id",
        name: "complaint-edit",
        beforeEnter: async (to, from, next) => {
          const complaintID = to.params.id;
          try {
            const response = await getComplaint(complaintID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/customerfeedback/complaint/ComplaintEdit.vue"),
        meta: {
          pageTitle: "Customer Complaint Edit",
          breadcrumbs: ["Customer Complaint Edit"],
        },
      },

      // Training Routes
      {
        path: "/training",
        name: "training-list",
        component: () =>
          import("@/views/apps/hr/training/TrainingListing.vue"),
        meta: {
          pageTitle: "Training List",
          breadcrumbs: ["Training List"],
        },
      },
      {
        path: "/training/add",
        name: "training-add",
        component: () =>
          import("@/views/apps/hr/training/TrainingAdd.vue"),
        meta: {
          pageTitle: "Training Add",
          breadcrumbs: ["Training Add"],
        },
      },
      {
        path: "/training/edit/:id",
        name: "training-edit",
        beforeEnter: async (to, from, next) => {
          const trainingID = to.params.id;
          try {
            const response = await getTraining(trainingID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/hr/training/TrainingEdit.vue"),
        meta: {
          pageTitle: "Training Edit",
          breadcrumbs: ["Training Edit"],
        },
      },

      
      // Reports - Thermal Mapping
      {
        path: "/thermalreport/list",
        name: "thermal-report-list",
        component: () =>
          import("@/views/apps/thermal/thermalreports/ThermalReportListing.vue"),
        meta: {
          pageTitle: "Thermal Report List",
          breadcrumbs: ["Thermal Report List"],
        },
      },
      {
        path: "/thermalreport/add",
        name: "thermal-report-add",
        component: () =>
          import("@/views/apps/thermal/thermalreports/ThermalReportAdd.vue"),
        meta: {
          pageTitle: "Thermal Report Add",
          breadcrumbs: ["Thermal Report Add"],
        },
      },
      {
        path: "/thermalreport/edit/:id",
        name: "thermal-report-edit",
        beforeEnter: async (to, from, next) => {
          const reportID = to.params.id;
          try {
            const response = await getThermalReport(reportID.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/thermal/thermalreports/ThermalReportEdit.vue"),
        meta: {
          pageTitle: "Create Diagram",
          breadcrumbs: ["Create Diagram"],
        },
      },

      // Instruments - Thermal Mapping
      {
        path: "/thermalinstrument/list",
        name: "thermal-instrument-list",
        component: () =>
          import("@/views/apps/thermal/instruments/ThermalInstrumentListing.vue"),
        meta: {
          pageTitle: "Thermal Instrument List",
          breadcrumbs: ["Thermal Instrument List"],
        },
      },
      {
        path: "/thermalinstrument/add",
        name: "thermal-instrument-add",
        component: () =>
          import("@/views/apps/thermal/instruments/ThermalInstrumentAdd.vue"),
        meta: {
          pageTitle: "Thermal Instrument Add",
          breadcrumbs: ["Thermal Instrument Add"],
        },
      },
      {
        path: "/thermalinstrument/edit/:id",
        name: "thermal-instrument-edit",
        beforeEnter: async (to, from, next) => {
          
          console.log("Hit");
          const instrumentId = to.params.id;
          try {
            const response = await getThermalInstrument(instrumentId.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/thermal/instruments/ThermalInstrumentEdit.vue"),
        meta: {
          pageTitle: "Thermal Instrument Edit",
          breadcrumbs: ["Thermal Instrument Edit"],
        },
      },
      {
        path: "/thermalinstrument/cloneinstrument/:id",
        name: "thermal-instrument-clone",
        beforeEnter: async (to, from, next) => {
          const instrumentId = to.params.id;
          try {
            const response = await getThermalInstrument(instrumentId.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/thermal/instruments/ThermalInstrumentClone.vue"),
        meta: {
          pageTitle: "Thermal Instrument Clone",
          breadcrumbs: ["Thermal Instrument Clone"],
        },
      },

      {
        path: "/profile/changepassword",
        name: "change-password",
        component: () =>
          import("@/views/crafted/account/Settings.vue"),
        meta: {
          pageTitle: "Profile Details",
        }
      },
    ],
  },


  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Login",
        },
        beforeEnter: async (to, from, next) => {
          const auth = useAuthStore();
          if (auth.isAuthenticated) {
            return next("/dashboard");
          } else {
            return next();
          }
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // theterms route
        path: "/terms",
        name: "terms",
        component: () => import("@/views/crafted/pricing/Terms.vue"),
        meta: {
          pageTitle: "Terms",
        },
      },
      {
        path: "/plans",
        name: "plans",
        component: () => import("@/views/crafted/pricing/Plans.vue"),
        meta: {
          pageTitle: "Plans",
        },
      },
      {
        path: "/contactus",
        name: "contactus",
        component: () => import("@/views/crafted/pricing/ContactUs.vue"),
        meta: {
          pageTitle: "Contact Us",
        },
      },
      {
        path: "/password-reset/:email/:token",
        name: "password-reset-form",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordResetForm.vue"),
        meta: {
          pageTitle: "Password Reset Form",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated !== null && checkCookie()) {
      next();
    } else {
      deleteCookie("Auth");
      authStore.purgeAuth();
      next({ name: "login" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
