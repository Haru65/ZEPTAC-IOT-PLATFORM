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
  getExternalDoc,
  getInternalDoc,
  getNonConformanceRecord,
  getRiskRegister,
  getImprovementPlan,
  getIAuditObservation,
  getQMSProcedure,
  getNABLDoc,
  getNIDoc,
  getFormAndFormat,
  getWorkInstruction,
  getRecord,
  getSkillMatrix,
  getIntermediateCheckRecord,
  getCalibrationInstrumentForIntermediate,
  getCalibrationInstrumentForInspection,
  getInspectionRecord,
  getSupplier,
  getMethodValidation,
  getInterLabComparison,
  getReplicateReport,
  getDocumentChange,
  getPlan,
  getMRMSchedule,
  getIAuditSchedule,
  getISORule,
  getCorrectiveAction,
  validateUser,
  validateFeedback,
  getFeedback,

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
        path: "/permission_manager/list",
        name: "permission-manager-list",
        component: () => import("@/views/apps/admin/PermissionManager.vue"),
        meta: {
          pageTitle: "Permission Manager",
          breadcrumbs: ["Permission Manager"],
        },
      },
      {
        path: "/activity_logger/list",
        name: "activity-logger-list",
        component: () => import("@/views/apps/admin/ActivityLogger.vue"),
        meta: {
          pageTitle: "Activity Logger",
          breadcrumbs: ["Activity Logger"],
        },
      },
      {
        path: "/module_manager/list",
        name: "module-manager-list",
        component: () => import("@/views/apps/admin/ModuleManager.vue"),
        meta: {
          pageTitle: "Module Manager",
          breadcrumbs: ["Module Manager"],
        },
      },
      {
        path: "/iso/list",
        name: "iso-list",
        component: () => import("@/views/apps/admin/isorules/ISOClausesListing.vue"),
        meta: {
          pageTitle: "ISO Clauses",
          breadcrumbs: ["ISO Clauses"],
        },
      },
      {
        path: "/iso/add",
        name: "iso-add",
        component: () => import("@/views/apps/admin/isorules/ISOClausesAdd.vue"),
        meta: {
          pageTitle: "ISO Clauses Add",
          breadcrumbs: ["ISO Clauses Add"],
        },
      },
      {
        path: "/iso/edit/:id",
        name: "iso-edit",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await getISORule(itemId.toString());
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
        component: () => import("@/views/apps/admin/isorules/ISOClausesEdit.vue"),
        meta: {
          pageTitle: "ISO Clauses Edit",
          breadcrumbs: ["ISO Clauses Edit"],
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
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
        path: "/company/settings/:id",
        name: "company-settings",
        component: () => import("@/views/apps/admin/companies/CompanySettings.vue"),
        meta: {
          pageTitle: "Company Settings",
          breadcrumbs: ["Company Settings"],
        },
      },
      {
        path: "/subscription/:id",
        name: "company-subscription",
        component: () => import("@/views/apps/admin/CompanySubscription.vue"),
        meta: {
          pageTitle: "Subscription",
        },
        // beforeEnter: async (to, from, next) => {
        //   const authStore = useAuthStore();
        //   authStore.verifyAuth();
        //   next();
        // },
      },
      {
        path: "/company/modules/:id",
        name: "company-modules",
        component: () => import("@/views/apps/admin/companies/CompanyModules.vue"),
        meta: {
          pageTitle: "Company Modules",
          breadcrumbs: ["Company Modules"],
        },
      },
      {
        path: "/company/apisetting/:id",
        name: "company-apisetting",
        component: () => import("@/views/apps/admin/companies/CompanyApiSetting.vue"),
        meta: {
          pageTitle: "API Setting",
          breadcrumbs: ["API Setting"],
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
          pageTitle: "Price List Add",
          breadcrumbs: ["Price List Add"],
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
            if (response.success == false || response.is_active == 0) {
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
            if (response.success == false || response.is_active == 0) {
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

      // Service Request Form
      {
        path: "/srf/list",
        name: "srf-list",
        component: () =>
          import("@/views/apps/srf/ServiceRequestListing.vue"),
        meta: {
          pageTitle: "Service Requests List",
          breadcrumbs: ["Service Requests List"],
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
            if (response.success == false || response.is_active == 0) {
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
          pageTitle: "Non-NABL Report List",
          breadcrumbs: ["Non-NABL Report List"],
        },
      },
      {
        path: "/validationreports/add",
        name: "validationreport-add",
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportAdd.vue"),
        meta: {
          pageTitle: "Non-NABL Report Add",
          breadcrumbs: ["Non-NABL Report Add"],
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
          pageTitle: "Non-NABL Report Edit",
          breadcrumbs: ["Non-NABL Report Edit"],
        },
      },

      // NABL Reports - Laminar Air Flow
      {
        path: "/laf/list",
        name: "laf-list",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LaminarAirFlowListing.vue"),
        meta: {
          pageTitle: "Laminar Air Flow Report List",
          breadcrumbs: ["Laminar Air Flow Report List"],
        },
      },
      {
        path: "/laf/add",
        name: "laf-add",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LaminarAirFlowAdd.vue"),
        meta: {
          pageTitle: "Laminar Air Flow Add",
          breadcrumbs: ["Laminar Air Flow Add"],
        },
      },
      {
        path: "/laf/edit/:id",
        name: "laf-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LaminarAirFlowEdit.vue"),
        meta: {
          pageTitle: "Laminar Air Flow Reports",
          breadcrumbs: ["Laminar Air Flow Reports"],
        },
      },
      {
        path: "/laf_reports/add/:id",
        name: "laf-report-add",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LAFComponents/LAFAdd.vue"),
        meta: {
          pageTitle: "Laminar Air Flow Report Add",
          breadcrumbs: ["Laminar Air Flow Report Add"],
        },
      },
      {
        path: "/laf_reports/edit/:id",
        name: "laf-report-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LAFComponents/LAFEdit.vue"),
        meta: {
          pageTitle: "Laminar Air Flow Report Edit",
          breadcrumbs: ["Laminar Air Flow Report Edit"],
        },
      },


      // NABL Reports - BioSafety Cabinets
      {
        path: "/bsc/list",
        name: "bsc-list",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BioSafetyCabinetListing.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet Report List",
          breadcrumbs: ["BioSafety Cabinet Report List"],
        },
      },
      {
        path: "/bsc/add",
        name: "bsc-add",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BioSafetyCabinetAdd.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet Add",
          breadcrumbs: ["BioSafety Cabinet Add"],
        },
      },
      {
        path: "/bsc/edit/:id",
        name: "bsc-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BioSafetyCabinetEdit.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet Reports",
          breadcrumbs: ["BioSafety Cabinet Reports"],
        },
      },
      {
        path: "/bsc_reports/add/:id",
        name: "bsc-report-add",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BSCComponents/BSCAdd.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet Report Add",
          breadcrumbs: ["BioSafety Cabinet Report Add"],
        },
      },
      {
        path: "/bsc_reports/edit/:id",
        name: "bsc-report-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BSCComponents/BSCEdit.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet Report Edit",
          breadcrumbs: ["BioSafety Cabinet Report Edit"],
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
            if (response.success == false || response.is_active == 0) {
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
            if (response.success == false || response.is_active == 0) {
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


      // Complaint Register Routes
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
            if (response.success == false || response.is_active == 0) {
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

      // Customer Feeback Routes
      {
        path: "/feedbacks/list",
        name: "feedbacks-list",
        component: () =>
          import("@/views/apps/customerfeedback/feedback/FeedbackFormListing.vue"),
        meta: {
          pageTitle: "Customer Feedbacks List",
          breadcrumbs: ["Customer Feedbacks List"],
        },
      },
      {
        path: "/feedbacks/edit/:id",
        name: "feedbacks-edit",
        beforeEnter: async (to, from, next) => {
          const itemID = to.params.id;
          try {
            const response = await getFeedback(itemID.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/customerfeedback/feedback/FeedbackFormView.vue"),
        meta: {
          pageTitle: "Customer Feedback Edit",
          breadcrumbs: ["Customer Feedback Edit"],
        },
      },

      // Training Routes
      {
        path: "/training/list",
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

      // Skill Matrix Routes
      {
        path: "/skill_matrix/list",
        name: "skill-matrix-list",
        component: () =>
          import("@/views/apps/hr/skillmatrix/SkillMatrixListing.vue"),
        meta: {
          pageTitle: "Skill Matrix List",
          breadcrumbs: ["Skill Matrix List"],
        },
      },
      {
        path: "/skill_matrix/add",
        name: "skill-matrix-add",
        component: () =>
          import("@/views/apps/hr/skillmatrix/SkillMatrixAdd.vue"),
        meta: {
          pageTitle: "Skill Matrix Add",
          breadcrumbs: ["Skill Matrix Add"],
        },
      },
      {
        path: "/skill_matrix/edit/:id",
        name: "skill-matrix-edit",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await getSkillMatrix(itemId.toString());
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
          import("@/views/apps/hr/skillmatrix/SkillMatrixEdit.vue"),
        meta: {
          pageTitle: "Skill Matrix Edit",
          breadcrumbs: ["Skill Matrix Edit"],
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

      // Supplier
      {
        path: "/suppliers",
        name: "supplier-list",
        component: () =>
          import("@/views/apps/supplier/Supplier/SupplierListing.vue"),
        meta: {
          pageTitle: "Suppliers List",
          breadcrumbs: ["Suppliers List"],
        },
      },
      {
        path: "/suppliers/evaluation/:id",
        name: "supplier-evaluation",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getSupplier(itemId.toString());
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
          import("@/views/apps/supplier/Supplier/SupplierEvaluation.vue"),
        meta: {
          pageTitle: "Supplier Evalauation",
          breadcrumbs: ["Supplier Evalauation"],
        },
      },
      {
        path: "/suppliers/edit/:id",
        name: "supplier-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getSupplier(docId.toString());
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
          import("@/views/apps/supplier/Supplier/SupplierEdit.vue"),
        meta: {
          pageTitle: "Suppliers Edit",
          breadcrumbs: ["Suppliers Edit"],
        },
      },

      // Quality Assurance - Method Validation
      {
        path: "/method_validation/list",
        name: "method-validation-list",
        component: () =>
          import("@/views/apps/qualityassurance/MethodValidation/MethodValidationListing.vue"),
        meta: {
          pageTitle: "Method Validation List",
          breadcrumbs: ["Method Validation List"],
        },
      },
      {
        path: "/method_validation/add",
        name: "method-validation-add",
        component: () =>
        import("@/views/apps/qualityassurance/MethodValidation/MethodValidationAdd.vue"),
        meta: {
          pageTitle: "Method Validation Add",
          breadcrumbs: ["Method Validation Add"],
        },
      },
      {
        path: "/method_validation/edit/:id",
        name: "method-validation-edit",
        beforeEnter: async (to, from, next) => {
          
          console.log("Hit");
          const itemId = to.params.id;
          try {
            const response = await getMethodValidation(itemId.toString());
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
          import("@/views/apps/qualityassurance/MethodValidation/MethodValidationEdit.vue"),
        meta: {
          pageTitle: "Method Validation Edit",
          breadcrumbs: ["Method Validation Edit"],
        },
      },

      // Quality Assurance - InterLaboratory Comparison
      {
        path: "/interlaboratory/list",
        name: "interlaboratory-list",
        component: () =>
          import("@/views/apps/qualityassurance/InterLabComparison/InterLabComparisonListing.vue"),
        meta: {
          pageTitle: "InterLaboratory Comparison List",
          breadcrumbs: ["InterLaboratory Comparison List"],
        },
      },
      {
        path: "/interlaboratory/add",
        name: "interlaboratory-add",
        component: () =>
        import("@/views/apps/qualityassurance/InterLabComparison/InterLabComparisonAdd.vue"),
        meta: {
          pageTitle: "InterLaboratory Comparison Add",
          breadcrumbs: ["InterLaboratory Comparison Add"],
        },
      },
      {
        path: "/interlaboratory/edit/:id",
        name: "interlaboratory-edit",
        beforeEnter: async (to, from, next) => {
          
          console.log("Hit");
          const itemId = to.params.id;
          try {
            const response = await getInterLabComparison(itemId.toString());
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
          import("@/views/apps/qualityassurance/InterLabComparison/InterLabComparisonEdit.vue"),
        meta: {
          pageTitle: "InterLaboratory Comparison Edit",
          breadcrumbs: ["InterLaboratory Comparison Edit"],
        },
      },

      // Quality Assurance - Replicate Report
      {
        path: "/replicate_report/list",
        name: "replicate-report-list",
        component: () =>
          import("@/views/apps/qualityassurance/ReplicateReport/ReplicateReportListing.vue"),
        meta: {
          pageTitle: "Replicate Report List",
          breadcrumbs: ["Replicate Report List"],
        },
      },
      {
        path: "/replicate_report/add",
        name: "replicate-report-add",
        component: () =>
        import("@/views/apps/qualityassurance/ReplicateReport/ReplicateReportAdd.vue"),
        meta: {
          pageTitle: "Replicate Report Add",
          breadcrumbs: ["Replicate Report Add"],
        },
      },
      {
        path: "/replicate_report/edit/:id",
        name: "replicate-report-edit",
        beforeEnter: async (to, from, next) => {
          
          console.log("Hit");
          const itemId = to.params.id;
          try {
            const response = await getReplicateReport(itemId.toString());
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
          import("@/views/apps/qualityassurance/ReplicateReport/ReplicateReportEdit.vue"),
        meta: {
          pageTitle: "Method Validation Edit",
          breadcrumbs: ["Method Validation Edit"],
        },
      },



      // Quality Work - Quality Documentation
      {
        path: "/internaldocuments",
        name: "internal-documents",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/internal/InternalDocListing.vue"),
        meta: {
          pageTitle: "Internal Document List",
          breadcrumbs: ["Internal Document List"],
        },
      },
      {
        path: "/internaldocuments/edit/:id",
        name: "internal-document-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getInternalDoc(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/internal/InternalDocEdit.vue"),
        meta: {
          pageTitle: "Internal Document Edit",
          breadcrumbs: ["Internal Document Edit"],
        },
      },

      {
        path: "/externaldocuments",
        name: "external-documents",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/external/ExternalDocListing.vue"),
        meta: {
          pageTitle: "External Document List",
          breadcrumbs: ["External Document List"],
        },
      },
      {
        path: "/externaldocuments/edit/:id",
        name: "external-document-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getExternalDoc(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/external/ExternalDocEdit.vue"),
        meta: {
          pageTitle: "External Document Edit",
          breadcrumbs: ["External Document Edit"],
        },
      },

      {
        path: "/ncrs",
        name: "non-conformance-records",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/ncr/NCRListing.vue"),
        meta: {
          pageTitle: "Non Conformance Record List",
          breadcrumbs: ["Non Conformance Record List"],
        },
      },
      {
        path: "/ncrs/edit/:id",
        name: "non-conformance-record-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getNonConformanceRecord(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/ncr/NCREdit.vue"),
        meta: {
          pageTitle: "Non Conformance Record Edit",
          breadcrumbs: ["Non Conformance Record Edit"],
        },
      },
      
      {
        path: "/risks",
        name: "risk-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/risk/RiskListing.vue"),
        meta: {
          pageTitle: "Risk Register List",
          breadcrumbs: ["Risk Register List"],
        },
      },
      {
        path: "/risks/add",
        name: "risk-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/risk/RiskAdd.vue"),
        meta: {
          pageTitle: "Risk Register",
          breadcrumbs: ["Risk Register"],
        },
      },
      {
        path: "/risks/edit/:id",
        name: "risk-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getRiskRegister(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/risk/RiskEdit.vue"),
        meta: {
          pageTitle: "Risk Register Edit",
          breadcrumbs: ["Risk Register Edit"],
        },
      },

      {
        path: "/document_change_request",
        name: "document-change-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/DocumentChange/DocumentChangeListing.vue"),
        meta: {
          pageTitle: "Document Change Request List",
          breadcrumbs: ["Document Change Request List"],
        },
      },
      {
        path: "/document_change_request/add",
        name: "document-change-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/DocumentChange/DocumentChangeAdd.vue"),
        meta: {
          pageTitle: "Document Change Request Add",
          breadcrumbs: ["Document Change Request Add"],
        },
      },
      {
        path: "/document_change_request/edit/:id",
        name: "document-change-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getDocumentChange(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/DocumentChange/DocumentChangeEdit.vue"),
        meta: {
          pageTitle: "Document Change Request Edit",
          breadcrumbs: ["Document Change Request Edit"],
        },
      },


      {
        path: "/improvements",
        name: "improvements-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/improvement/ImprovementListing.vue"),
        meta: {
          pageTitle: "Improvement Action Plan List",
          breadcrumbs: ["Improvement Action Plan List"],
        },
      },
      {
        path: "/improvements/edit/:id",
        name: "improvement-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getImprovementPlan(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/qualitywork/improvement/ImprovementEdit.vue"),
        meta: {
          pageTitle: "Improvement Action Plan Edit",
          breadcrumbs: ["Improvement Action Plan Edit"],
        },
      },

      // Internal Audit - Audit Observation - Quality Documentation
      {
        path: "/auditobservations/add/:id",
        name: "auditobservation-add",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getIAuditSchedule(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/internalaudit/auditobservation/IAObservationAdd.vue"),
        meta: {
          pageTitle: "Internal Audit Observation Add",
          breadcrumbs: ["Internal Audit Observation Add"],
        },
      },
      {
        path: "/auditobservations",
        name: "auditobservations-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/auditobservation/IAObservationListing.vue"),
        meta: {
          pageTitle: "Internal Audit Observation List",
          breadcrumbs: ["Internal Audit Observation List"],
        },
      },
      {
        path: "/auditobservations/edit/:id",
        name: "auditobservation-edit",
        
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/auditobservation/IAObservationEdit.vue"),
        meta: {
          pageTitle: "Internal Audit Observation Edit",
          breadcrumbs: ["Internal Audit Observation Edit"],
        },
      },
      {
        path: "/non_conformance/list/:id",
        name: "non-conformance-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/CorrectiveAction/CorrectiveActionListing.vue"),
        meta: {
          pageTitle: "Non-Conformance List",
          breadcrumbs: ["Non-Conformance List"],
        },
      },

      // Internal Audit - Audit Schedule - Quality Documentation
      {
        path: "/auditschedule/add",
        name: "auditschedule-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/IAuditSchedule/IAuditScheduleAdd.vue"),
        meta: {
          pageTitle: "Internal Audit Schedule Add",
          breadcrumbs: ["Internal Audit Schedule Add"],
        },
      },
      {
        path: "/auditschedule",
        name: "auditschedule-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/IAuditSchedule/IAuditScheduleListing.vue"),
        meta: {
          pageTitle: "Internal Audit Schedule List",
          breadcrumbs: ["Internal Audit Schedule List"],
        },
      },
      {
        path: "/auditschedule/edit/:id",
        name: "auditschedule-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getIAuditSchedule(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/qualitydocumentation/internalaudit/IAuditSchedule/IAuditScheduleEdit.vue"),
        meta: {
          pageTitle: "Internal Audit Schedule Edit",
          breadcrumbs: ["Internal Audit Schedule Edit"],
        },
      },
      
      
      // MRM - MRM Schedule Meeting
      {
        path: "/mrm_schedule/add",
        name: "mrm-schedule-add",
        component: () =>
          import("@/views/apps/MRM/ScheduleMRM/ScheduleMRMAdd.vue"),
        meta: {
          pageTitle: "Schedule MRM",
          breadcrumbs: ["Schedule MRM"],
        },
      },
      {
        path: "/mrm_schedule",
        name: "mrm-schedule-list",
        component: () =>
          import("@/views/apps/MRM/ScheduleMRM/ScheduleMRMListing.vue"),
        meta: {
          pageTitle: "Scheduled MRM List",
          breadcrumbs: ["Scheduled MRM List"],
        },
      },
      {
        path: "/mrm_schedule/edit/:id",
        name: "mrm-schedule-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getMRMSchedule(itemId.toString());
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
          import("@/views/apps/MRM/ScheduleMRM/ScheduleMRMEdit.vue"),
        meta: {
          pageTitle: "Schedule MRM Edit",
          breadcrumbs: ["Schedule MRM Edit"],
        },
      },

      // MRM - Minutes of MRM
      {
        path: "/mrm_minutes/add/:id",
        name: "mrm-minutes-add",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getMRMSchedule(itemId.toString());
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
          import("@/views/apps/MRM/MinutesMRM/MinutesMRMAdd.vue"),
        meta: {
          pageTitle: "Minutes Of MRM",
          breadcrumbs: ["Minutes Of MRM"],
        },
      },
      {
        path: "/mrm_minutes",
        name: "mrm-minutes-list",
        component: () =>
          import("@/views/apps/MRM/MinutesMRM/MinutesMRMListing.vue"),
        meta: {
          pageTitle: "Minutes Of MRM List",
          breadcrumbs: ["Minutes Of MRM List"],
        },
      },
      {
        path: "/mrm_minutes/edit/:id",
        name: "mrm-minutes-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getMRMSchedule(itemId.toString());
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
          import("@/views/apps/MRM/MinutesMRM/MinutesMRMEdit.vue"),
        meta: {
          pageTitle: "Minutes Of MRM Edit",
          breadcrumbs: ["Minutes Of MRM Edit"],
        },
      },


      // Master List - QMS Procedure
      {
        path: "/qms_procedures",
        name: "qms-procedures",
        component: () =>
          import("@/views/apps/master/QMSProcedure/QMSProcedureListing.vue"),
        meta: {
          pageTitle: "QMS Procedure List",
          breadcrumbs: ["QMS Procedure List"],
        },
      },
      {
        path: "/qms_procedures/edit/:id",
        name: "qms-procedure-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getQMSProcedure(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/QMSProcedure/QMSProcedureEdit.vue"),
        meta: {
          pageTitle: "QMS Procedure Edit",
          breadcrumbs: ["QMS Procedure Edit"],
        },
      },

      // Master List - Work Instruction
      {
        path: "/work_instructions",
        name: "work-instructions",
        component: () =>
          import("@/views/apps/master/WorkInstruction/WorkInstructionListing.vue"),
        meta: {
          pageTitle: "Work Instruction List",
          breadcrumbs: ["Work Instruction List"],
        },
      },
      {
        path: "/work_instructions/edit/:id",
        name: "work-instruction-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getWorkInstruction(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/WorkInstruction/WorkInstructionEdit.vue"),
        meta: {
          pageTitle: "Work Instruction Edit",
          breadcrumbs: ["Work Instruction Edit"],
        },
      },

      // Master List - Forms and Formats
      {
        path: "/forms_and_formats",
        name: "forms-formats",
        component: () =>
          import("@/views/apps/master/FormsAndFormats/FormsAndFormatsListing.vue"),
        meta: {
          pageTitle: "Forms & Formats List",
          breadcrumbs: ["Forms & Formats List"],
        },
      },
      {
        path: "/forms_and_formats/edit/:id",
        name: "form-format-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getFormAndFormat(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/FormsAndFormats/FormsAndFormatsEdit.vue"),
        meta: {
          pageTitle: "Forms & Formats Edit",
          breadcrumbs: ["Forms & Formats Edit"],
        },
      },

      // Master List - NABL Document
      {
        path: "/nabl_documents",
        name: "nabl-documents",
        component: () =>
          import("@/views/apps/master/NABLDocument/NABLDocumentListing.vue"),
        meta: {
          pageTitle: "NABL Document List",
          breadcrumbs: ["NABL Document List"],
        },
      },
      {
        path: "/nabl_documents/edit/:id",
        name: "nabl-document-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getNABLDoc(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/NABLDocument/NABLDocumentEdit.vue"),
        meta: {
          pageTitle: "NABL Document Edit",
          breadcrumbs: ["NABL Document Edit"],
        },
      },

      // Master List - NI Document
      {
        path: "/ni_documents",
        name: "ni-documents",
        component: () =>
          import("@/views/apps/master/NIDocument/NIDocumentListing.vue"),
        meta: {
          pageTitle: "National-International Document List",
          breadcrumbs: ["National-International Document List"],
        },
      },
      {
        path: "/ni_documents/edit/:id",
        name: "ni-document-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getNIDoc(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/NIDocument/NIDocumentEdit.vue"),
        meta: {
          pageTitle: "National-International Document Edit",
          breadcrumbs: ["National-International Document Edit"],
        },
      },

      // Master List - Records
      {
        path: "/records",
        name: "records",
        component: () =>
          import("@/views/apps/master/Records/RecordsListing.vue"),
        meta: {
          pageTitle: "Records List",
          breadcrumbs: ["Records List"],
        },
      },
      {
        path: "/records/edit/:id",
        name: "record-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getRecord(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/master/Records/RecordsEdit.vue"),
        meta: {
          pageTitle: "Records Edit",
          breadcrumbs: ["Records Edit"],
        },
      },


      // Instrument Management - Intermedidate Check Records
      {
        path: "/intermediate_check_records",
        name: "intermediate-check-records-list",
        component: () =>
          import("@/views/apps/instrument/IntermediateCheckRecords/IntermediateCheckRecordListing.vue"),
        meta: {
          pageTitle: "Intermediate Check Records List",
          breadcrumbs: ["Intermediate Check Records List"],
        },
      },
      {
        path: "/intermediate_check_records/add/:id",
        name: "intermediate-check-records-add",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrumentForIntermediate(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/IntermediateCheckRecords/IntermediateCheckRecordAdd.vue"),
        meta: {
          pageTitle: "Intermediate Check Records Add",
          breadcrumbs: ["Intermediate Check Records Add"],
        },
      },
      {
        path: "/intermediate_check_records/view/:id",
        name: "intermediate-check-records-view",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrumentForIntermediate(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/IntermediateCheckRecords/IntermediateCheckRecordView.vue"),
        meta: {
          pageTitle: "View Intermediate Checks",
          breadcrumbs: ["View Intermediate Checks"],
        },
      },
      {
        path: "/intermediate_check_records/edit/:id",
        name: "intermediate-check-records-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getIntermediateCheckRecord(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/IntermediateCheckRecords/IntermediateCheckRecordEdit.vue"),
        meta: {
          pageTitle: "Intermediate Check Records Edit",
          breadcrumbs: ["Intermediate Check Records Edit"],
        },
      },

      // Instrument Management - Inspection Records
      {
        path: "/inspection_records",
        name: "inspection-records-list",
        component: () =>
          import("@/views/apps/instrument/InspectionRecords/InspectionRecordsListing.vue"),
        meta: {
          pageTitle: "Inspection Records List",
          breadcrumbs: ["Inspection Records List"],
        },
      },
      {
        path: "/inspection_records/add/:id",
        name: "inspection-records-add",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrumentForInspection(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/InspectionRecords/InspectionRecordsAdd.vue"),
        meta: {
          pageTitle: "Inspection Records Add",
          breadcrumbs: ["Inspection Records Add"],
        },
      },
      {
        path: "/inspection_records/view/:id",
        name: "inspection-records-view",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrumentForInspection(itemId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/InspectionRecords/InspectionRecordsView.vue"),
        meta: {
          pageTitle: "View Inspections",
          breadcrumbs: ["View Inspections"],
        },
      },
      {
        path: "/inspection_records/edit/:id",
        name: "inspection-records-edit",
        beforeEnter: async (to, from, next) => {

          const docId = to.params.id;
          try {
            const response = await getInspectionRecord(docId.toString());
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/instrument/InspectionRecords/InspectionRecordsEdit.vue"),
        meta: {
          pageTitle: "Inspection Records Edit",
          breadcrumbs: ["Inspection Records Edit"],
        },
      },


      // Planner And CheckList Management - Planner
      {
        path: "/plan",
        name: "plan-list",
        component: () =>
          import("@/views/apps/Planner/PlannerListing.vue"),
        meta: {
          pageTitle: "Planner List",
          breadcrumbs: ["Planner List"],
        },
      },
      {
        path: "/plan/add",
        name: "plan-add",
        component: () =>
          import("@/views/apps/Planner/PlannerAdd.vue"),
        meta: {
          pageTitle: "Planner Add",
          breadcrumbs: ["Planner Add"],
        },
      },
      {
        path: "/plan/training",
        name: "plan-training",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/TrainingPlan.vue"),
        meta: {
          pageTitle: "Training Plan",
          breadcrumbs: ["Training Plan"],
        },
      },
      {
        path: "/plan/intermediate",
        name: "plan-intermediate",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/IntermediatePlan.vue"),
        meta: {
          pageTitle: "Intermediate Check Plan",
          breadcrumbs: ["Intermediate Check Plan"],
        },
      },
      {
        path: "/plan/maintenance",
        name: "plan-maintenance",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/MaintenancePlan.vue"),
        meta: {
          pageTitle: "Maintenance Plan",
          breadcrumbs: ["Maintenance Plan"],
        },
      },
      {
        path: "/plan/replicate",
        name: "plan-replicate",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/ReplicatePlan.vue"),
        meta: {
          pageTitle: "Replicate Plan",
          breadcrumbs: ["Replicate Plan"],
        },
      },
      {
        path: "/plan/interlaboratory",
        name: "plan-interlaboratory",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/InterLaboratoryPlan.vue"),
        meta: {
          pageTitle: "Interlaboratory Comparison Plan",
          breadcrumbs: ["Interlaboratory Comparison Plan"],
        },
      },
      {
        path: "/plan/audit",
        name: "plan-audit",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/AuditPlan.vue"),
        meta: {
          pageTitle: "Internal Audit Plan",
          breadcrumbs: ["Internal Audit Plan"],
        },
      },
      {
        path: "/plan/mrm",
        name: "plan-mrm",
        component: () =>
          import("@/views/apps/Planner/PlannerComponents/MRMPlan.vue"),
        meta: {
          pageTitle: "Management Review Meeting Plan",
          breadcrumbs: ["Management Review Meeting Plan"],
        },
      },
      {
        path: "/plan/edit/:id",
        name: "plan-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getPlan(itemId.toString());
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
        import("@/views/apps/Planner/PlannerEdit.vue"),
        meta: {
          pageTitle: "Planner Edit",
          breadcrumbs: ["Planner Edit"],
        },
      },

      // Planner And CheckList Management - Planner
      {
        path: "/checklist",
        name: "checklist-list",
        component: () =>
          import("@/views/apps/CheckList/CheckListListing.vue"),
        meta: {
          pageTitle: "CheckList List",
          breadcrumbs: ["CheckList List"],
        },
      },
      

      // Profile Page - Change Password
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
        path: "/401",
        name: "401",
        component: () => import("@/views/crafted/authentication/Error401.vue"),
        meta: {
          pageTitle: "Error 401",
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
        path: "/thankyou",
        name: "thankyou",
        component: () => import("@/views/apps/ThankYou.vue"),
        meta: {
          pageTitle: "Thank You",
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
      {
        path: "/srf/:company/:customer",
        name: "srf-add",
        beforeEnter: async (to, from, next) => {

          const companyID = to.params.company;
          const customerID = to.params.customer;
          const data = {
            company_id: companyID,
            customer_id: customerID,
          }
          try {
            const response = await validateUser(data);
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
          import("@/views/apps/srf/ServiceRequestAdd.vue"),
        meta: {
          pageTitle: "Service Request Form",
        },
      },
      {
        path: "/feedbacks/:company/:customer",
        name: "feedbacks-add",
        beforeEnter: async (to, from, next) => {

          const companyID = to.params.company;
          const customerID = to.params.customer;
          const data = {
            company_id: companyID,
            customer_id: customerID,
          }
          try {
            const response = await validateFeedback(data);
            console.log(response);
            if (response.success == false || response.is_active == 0) {
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
          import("@/views/apps/customerfeedback/feedback/FeedbackFormAdd.vue"),
        meta: {
          pageTitle: "Customer Feedback",
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
