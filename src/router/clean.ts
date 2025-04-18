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
  getReferenceInstrument,
  getCalibrationSrf,
  getCalibrationInstrument,
  getCalibrationProcedure,
  validateUserNSrf,
  getUser,
  getTempLead,
  getPurchaseOrder,
  getPoPayment,
  check_po_created,
  purchaseOrderEditable,

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
        path: "/company-tax",
        name: "company-tax",
        component: () => import("@/views/apps/taxes/CompanyTaxListing.vue"),
        meta: {
          pageTitle: "Taxes",
          breadcrumbs: ["Taxes"],
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
          pageTitle: "Add ISO Clauses",
          breadcrumbs: ["Add ISO Clauses"],
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
            if (response.error || response.result.is_active == 0) {
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
          pageTitle: "Edit ISO Clauses",
          breadcrumbs: ["Edit ISO Clauses"],
        },
      },

      {
        path: "/company/list",
        name: "company-list",
        component: () =>
          import("@/views/apps/admin/companies/CompanyListing.vue"),
        meta: {
          pageTitle: "Company",
          breadcrumbs: ["Company"],
        },
      },
      {
        path: "/company/add",
        name: "company-add",
        component: () => import("@/views/apps/admin/companies/CompanyAdd.vue"),
        meta: {
          pageTitle: "Add Company",
          breadcrumbs: ["Add Company"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Company",
          breadcrumbs: ["Edit Company"],
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
          pageTitle: "Users",
          breadcrumbs: ["Users"],
        },
      },
      {
        path: "/users/add",
        name: "users-add",
        component: () => import("@/views/apps/admin/users/UserAdd.vue"),
        meta: {
          pageTitle: "Add User",
          breadcrumbs: ["Add User"],
        },
      },
      {
        path: "/users/edit/:id",
        name: "users-edit",
        beforeEnter: async (to, from, next) => {
          const userId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getUser(userId);
            if (response.success == false || response.result.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/admin/users/UserEdit.vue"),
        meta: {
          pageTitle: "Edit User",
          breadcrumbs: ["Edit User"],
        },
      },
      {
        path: "/employee/list",
        name: "employee-list",
        component: () =>
          import("@/views/apps/hr/employees/EmployeeListing.vue"),
        meta: {
          pageTitle: "Employees",
          breadcrumbs: ["Employees"],
        },
      },
      {
        path: "/employee/add",
        name: "employee-add",
        component: () =>
          import("@/views/apps/hr/employees/EmployeeAdd.vue"),
        meta: {
          pageTitle: "Add Employee",
          breadcrumbs: ["Add Employee"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Employee",
          breadcrumbs: ["Edit Employee"],
        },
      },
      {
        path: "/temp_leads/list",
        name: "temp-leads-list",
        component: () => import("@/views/apps/sales/existsLeads/ExistsLeadsListing.vue"),
        meta: {
          pageTitle: "Exists Leads",
          breadcrumbs: ["Exists Leads"],
        },
      },

      {
        path: "/temp_leads/edit/:ogLeadId/:tempLeadId",
        name: "temp-leads-edit",
        component: () => import("@/views/apps/sales/existsLeads/ExistsLeadsEdit.vue"),
        beforeEnter: async (to, from, next) => {
          const tempLeadId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getTempLead(tempLeadId);
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "View Lead",
          breadcrumbs: ["View Lead"],
        },
      },

      {
        path: "/leads/list",
        name: "leads-list",
        component: () => import("@/views/apps/sales/leads/LeadsListing.vue"),
        meta: {
          pageTitle: "Leads",
          breadcrumbs: ["Leads"],
        },
      },
      {
        path: "/leads/add",
        name: "leads-add",
        component: () => import("@/views/apps/sales/leads/LeadsAdd.vue"),
        meta: {
          pageTitle: "Add Lead",
          breadcrumbs: ["Add Lead"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Lead",
          breadcrumbs: ["Edit Lead"],
        },
      },

      // customers front-end routes
      {
        path: "/customers/list",
        name: "customers-list",
        component: () =>
          import("@/views/apps/sales/customers/CustomersListing.vue"),
        meta: {
          pageTitle: "Customers",
          breadcrumbs: ["Customers"],
        },
      },
      {
        path: "/customers/add",
        name: "customers-add",
        component: () =>
          import("@/views/apps/sales/customers/CustomersAdd.vue"),
        meta: {
          pageTitle: "Add Customer",
          breadcrumbs: ["Add Customer"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Customer",
          breadcrumbs: ["Edit Customer"],
        },
      },
      {
        path: "/customers/login/:id",
        name: "customers-login",
        component: () =>
          import("@/views/apps/sales/customers/CustomersLogin.vue"),
        beforeEnter: async (to, from, next) => {
          const customerId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getCustomer(customerId);
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Customers Accessibility",
          breadcrumbs: ["Customers Accessibility"],
        },
      },

      // Clients front-end routes
      {
        path: "/clients/list",
        name: "clients-list",
        component: () =>
          import("@/views/apps/sales/clients/ClientsListing.vue"),
        meta: {
          pageTitle: "Clients",
          breadcrumbs: ["Clients"],
        },
      },
      {
        path: "/clients/add",
        name: "clients-add",
        component: () =>
          import("@/views/apps/sales/clients/ClientsAdd.vue"),
        meta: {
          pageTitle: "Add Client",
          breadcrumbs: ["Add Client"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Client",
          breadcrumbs: ["Edit Client"],
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
          pageTitle: "Add Price List",
          breadcrumbs: ["Add Price List"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Price List",
          breadcrumbs: ["Edit Price List"],
        },
      },
      {
        path: "/quotations/list",
        name: "quotation-list",
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsListing.vue"),
        meta: {
          pageTitle: "Quotations",
          breadcrumbs: ["Quotations"],
        },
      },
      {
        path: "/quotations/add",
        name: "quotation-wrapper",
        component: () => import("@/views/apps/sales/quotations/QuotationWrapper.vue"),
        meta: {
          pageTitle: "Add Quotation",
          breadcrumbs: ["Add Quotation"],
        },
      },
      {
        path: "/quotations/edit/:id",
        name: "quotation-edit-wrapper",
        beforeEnter: async (to, from, next) => {
          const quotationId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getQuotation(quotationId);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/sales/quotations/QuotationEditWrapper.vue"),
        meta: {
          pageTitle: "Edit Quotation",
          breadcrumbs: ["Edit Quotation"],
        },
      },
      {
        path: "/invoices/list",
        name: "invoices-list",
        component: () =>
          import("@/views/apps/sales/invoices/InvoicesListing.vue"),
        meta: {
          pageTitle: "Invoices",
          breadcrumbs: ["Invoices"],
        },
      },
      {
        path: "/invoices/add",
        name: "invoices-wrapper",
        component: () => import("@/views/apps/sales/invoices/InvoiceWrapper.vue"),
        meta: {
          pageTitle: "Add Invoice",
          breadcrumbs: ["Add Invoice"],
        },
      },
      {
        path: "/invoices/edit/:id",
        name: "invoice-edit-wrapper",
        beforeEnter: async (to, from, next) => {
          const invoiceId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getInvoice(invoiceId);
            if (response.success == false || response.result.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/sales/invoices/InvoiceEditWrapper.vue"),
        meta: {
          pageTitle: "Edit Invoice",
          breadcrumbs: ["Edit Invoice"],
        },
      },

      // Service Request Form
      {
        path: "/srf/list",
        name: "srf-list",
        component: () =>
          import("@/views/apps/srf/ServiceRequestListing.vue"),
        meta: {
          pageTitle: "Service Requests",
          breadcrumbs: ["Service Requests"],
        },
      },


      // Instruments Front End Routes
      {
        path: "/instruments/list",
        name: "instrument-list",
        component: () =>
          import("@/views/apps/modules/instruments/InstrumentsListing.vue"),
        meta: {
          pageTitle: "Instruments",
          breadcrumbs: ["Instruments"],
        },
      },
      {
        path: "/instruments/add",
        name: "instrument-add",
        component: () =>
          import("@/views/apps/modules/instruments/InstrumentsAdd.vue"),
        meta: {
          pageTitle: "Add Instrument",
          breadcrumbs: ["Add Instrument"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Instrument",
          breadcrumbs: ["Edit Instrument"],
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
          pageTitle: "Returnable Gate Pass",
          breadcrumbs: ["Returnable Gate Pass"],
        },
      },
      {
        path: "/returnablegatepasses/add",
        name: "rgp-add",
        component: () =>
          import("@/views/apps/modules/services/rgp/RGatePassAdd.vue"),
        meta: {
          pageTitle: "Add Returnable Gate Pass",
          breadcrumbs: ["Add Returnable Gate Pass"],
        },
      },

      // Daily Work Sheet Routes
      {
        path: "/dailyworksheets",
        name: "dailyworksheet-list",
        component: () =>
          import("@/views/apps/modules/services/dailyworksheet/DWorksheetListing.vue"),
        meta: {
          pageTitle: "Daily Worksheets",
          breadcrumbs: ["Daily Worksheets"],
        },
      },
      {
        path: "/dailyworksheets/add",
        name: "dailyworksheet-add",
        component: () =>
          import("@/views/apps/modules/services/dailyworksheet/DWorksheetAdd.vue"),
        meta: {
          pageTitle: "Add Daily Worksheet",
          breadcrumbs: ["Add Daily Worksheet"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Daily Worksheet",
          breadcrumbs: ["Edit Daily Worksheet"],
        },
      },

      // Expense Sheet Routes
      {
        path: "/expensesheets",
        name: "expensesheet-list",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetListing.vue"),
        meta: {
          pageTitle: "Expense Sheets",
          breadcrumbs: ["Expense Sheets"],
        },
      },
      {
        path: "/expensesheets/add",
        name: "expensesheet-add",
        component: () =>
          import("@/views/apps/modules/services/expense/ExpenseSheetAdd.vue"),
        meta: {
          pageTitle: "Add Expense Sheet",
          breadcrumbs: ["Add Expense Sheet"],
        },
      },
      {
        path: "/expensesheets/edit/:id",
        name: "expensesheet-edit",
        beforeEnter: async (to, from, next) => {
          const itemID = to.params.id;
          //console.log(companyId);
          try {
            const response = await getExpenseSheet(itemID.toString());
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/modules/services/expense/ExpenseSheetEdit.vue"),
        meta: {
          pageTitle: "Edit Expense Sheet",
          breadcrumbs: ["Edit Expense Sheet"],
        },
      },

      // Validation Report Routes
      {
        path: "/validationreports/list",
        name: "validationreport-list",
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportListing.vue"),
        meta: {
          pageTitle: "Non-NABL Report",
          breadcrumbs: ["Non-NABL Report"],
        },
      },
      {
        path: "/validationreports/add",
        name: "validationreport-add",
        component: () =>
          import("@/views/apps/modules/validationreport/ValidationReportAdd.vue"),
        meta: {
          pageTitle: "Add Non-NABL Report",
          breadcrumbs: ["Non-NABL Report"],
        },
      },
      {
        path: "/validationreports/edit/:id",
        name: "validationreport-edit",
        beforeEnter: async (to, from, next) => {
          const itemID = to.params.id;
          //console.log(companyId);
          try {
            const response = await getValidationReport(itemID.toString());
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Laminar Air Flow",
          breadcrumbs: ["Laminar Air Flow"],
        },
      },
      {
        path: "/laf/add",
        name: "laf-add",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LaminarAirFlowAdd.vue"),
        meta: {
          pageTitle: "Add Laminar Air Flow",
          breadcrumbs: ["Add Laminar Air Flow"],
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
          pageTitle: "Add Laminar Air Flow Report",
          breadcrumbs: ["Add Laminar Air Flow Report"],
        },
      },
      {
        path: "/laf_reports/edit/:id",
        name: "laf-report-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/LAF/LAFComponents/LAFEdit.vue"),
        meta: {
          pageTitle: "Edit Laminar Air Flow Report",
          breadcrumbs: ["Edit Laminar Air Flow Report"],
        },
      },


      // NABL Reports - BioSafety Cabinets
      {
        path: "/bsc/list",
        name: "bsc-list",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BioSafetyCabinetListing.vue"),
        meta: {
          pageTitle: "BioSafety Cabinet",
          breadcrumbs: ["BioSafety Cabinet"],
        },
      },
      {
        path: "/bsc/add",
        name: "bsc-add",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BioSafetyCabinetAdd.vue"),
        meta: {
          pageTitle: "Add BioSafety Cabinet",
          breadcrumbs: ["Add BioSafety Cabinet"],
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
          pageTitle: "Add BioSafety Cabinet Report",
          breadcrumbs: ["Add BioSafety Cabinet Report"],
        },
      },
      {
        path: "/bsc_reports/edit/:id",
        name: "bsc-report-edit",
        component: () =>
          import("@/views/apps/modules/nablreport/BSC/BSCComponents/BSCEdit.vue"),
        meta: {
          pageTitle: "Edit BioSafety Cabinet Report",
          breadcrumbs: ["Edit BioSafety Cabinet Report"],
        },
      },


      // Validation Procedure Routes
      {
        path: "/validation",
        name: "validation-list",
        component: () =>
          import("@/views/apps/modules/externalaudit/validationprocedure/ValProcedureListing.vue"),
        meta: {
          pageTitle: "Validation Procedure",
          breadcrumbs: ["Validation Procedure"],
        },
      },
      {
        path: "/validation/add",
        name: "validation-add",
        component: () =>
          import("@/views/apps/modules/externalaudit/validationprocedure/ValProcedureAdd.vue"),
        meta: {
          pageTitle: "Add Validation Procedure",
          breadcrumbs: ["Add Validation Procedure"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Validation Procedure",
          breadcrumbs: ["Edit Validation Procedure"],
        },
      },

      // Quality Procedure Routes
      {
        path: "/quality",
        name: "quality-list",
        component: () =>
          import("@/views/apps/modules/externalaudit/qualityprocedure/QualityProcedureListing.vue"),
        meta: {
          pageTitle: "Quality Procedure",
          breadcrumbs: ["Quality Procedure"],
        },
      },
      {
        path: "/quality/add",
        name: "quality-add",
        component: () =>
          import("@/views/apps/modules/externalaudit/qualityprocedure/QualityProcedureAdd.vue"),
        meta: {
          pageTitle: "Add Quality Procedure",
          breadcrumbs: ["Add Quality Procedure"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Quality Procedure",
          breadcrumbs: ["Edit Quality Procedure"],
        },
      },


      // Complaint Register Routes
      {
        path: "/complaint",
        name: "complaint-list",
        component: () =>
          import("@/views/apps/customerfeedback/complaint/ComplaintListing.vue"),
        meta: {
          pageTitle: "Customer Complaints",
          breadcrumbs: ["Customer Complaints"],
        },
      },
      {
        path: "/complaint/add",
        name: "complaint-add",
        component: () =>
          import("@/views/apps/customerfeedback/complaint/ComplaintAdd.vue"),
        meta: {
          pageTitle: "Add Customer Complaint",
          breadcrumbs: ["Add Customer Complaint"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Customer Complaint",
          breadcrumbs: ["Edit Customer Complaint"],
        },
      },

      // Customer Feeback Routes
      {
        path: "/feedbacks/list",
        name: "feedbacks-list",
        component: () =>
          import("@/views/apps/customerfeedback/feedback/FeedbackFormListing.vue"),
        meta: {
          pageTitle: "Customer Feedbacks",
          breadcrumbs: ["Customer Feedbacks"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Customer Feedback",
          breadcrumbs: ["Edit Customer Feedback"],
        },
      },

      // Training Routes
      {
        path: "/training/list",
        name: "training-list",
        component: () =>
          import("@/views/apps/hr/training/TrainingListing.vue"),
        meta: {
          pageTitle: "Trainings",
          breadcrumbs: ["Trainings"],
        },
      },
      {
        path: "/training/add",
        name: "training-add",
        component: () =>
          import("@/views/apps/hr/training/TrainingAdd.vue"),
        meta: {
          pageTitle: "Add Training",
          breadcrumbs: ["Add Training"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Training",
          breadcrumbs: ["Edit Training"],
        },
      },

      // Skill Matrix Routes
      {
        path: "/skill_matrix/list",
        name: "skill-matrix-list",
        component: () =>
          import("@/views/apps/hr/skillmatrix/SkillMatrixListing.vue"),
        meta: {
          pageTitle: "Skill Matrix",
          breadcrumbs: ["Skill Matrix"],
        },
      },
      {
        path: "/skill_matrix/add",
        name: "skill-matrix-add",
        component: () =>
          import("@/views/apps/hr/skillmatrix/SkillMatrixAdd.vue"),
        meta: {
          pageTitle: "Add Skill Matrix",
          breadcrumbs: ["Add Skill Matrix"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Skill Matrix",
          breadcrumbs: ["Edit Skill Matrix"],
        },
      },

      // Purchase Order Payments
      {
        path: "/purchase-order/list",
        name: "purchase-order-list",
        component: () =>
          import("@/views/apps/po/purchaseorder/PurchaseOrderListing.vue"),
        meta: {
          pageTitle: "Purchase Orders",
          breadcrumbs: ["Purchase Orders"],
        },
      },
      {
        path: "/purchase-order/edit/:id",
        name: "purchase-order-view",
        beforeEnter: async (to, from, next) => {
          const poId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getPurchaseOrder(poId);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/po/purchaseorder/PurchaseOrderView.vue"),
        meta: {
          pageTitle: "View Purchase Order",
          breadcrumbs: ["View Purchase Order"],
        },
      },
      
      // Purchase Order Payments 
      {
        path: "/po-payment/list",
        name: "po-payment-list",
        component: () =>
          import("@/views/apps/po/payment/PoPaymentListing.vue"),
        meta: {
          pageTitle: "Purchase Order Payments",
          breadcrumbs: ["Purchase Order Payments"],
        },
      },
      {
        path: "/po-payment/add",
        name: "po-payment-add",
        component: () =>
          import("@/views/apps/po/payment/PoPaymentAdd.vue"),
        meta: {
          pageTitle: "Add Purchase Order Payment",
          breadcrumbs: ["Add Purchase Order Payment"],
        },
      },
      {
        path: "/po-payment/direct/:id",
        name: "po-payment-direct-add",
        component: () =>
          import("@/views/apps/po/payment/PoPaymentDirectAdd.vue"),
        meta: {
          pageTitle: "Add Purchase Order Payment",
          breadcrumbs: ["Add Purchase Order Payment"],
        },
      },
      {
        path: "/po-payment/edit/:id",
        name: "po-payment-edit",
        beforeEnter: async (to, from, next) => {
          const poPaymentID = to.params.id;
          try {
            const response = await getPoPayment(poPaymentID.toString());
            if (response.success == false || response.result.is_active == 0 || response.result.status == 1 || response.result.status == 2) {
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
          import("@/views/apps/po/payment/PoPaymentEdit.vue"),
        meta: {
          pageTitle: "Edit Purchase Order Payment",
          breadcrumbs: ["Edit Purchase Order Payment"],
        },
      },

      
      // Reports - Thermal Mapping
      {
        path: "/thermalreport/list",
        name: "thermal-report-list",
        component: () =>
          import("@/views/apps/thermal/thermalreports/ThermalReportListing.vue"),
        meta: {
          pageTitle: "Thermal Reports",
          breadcrumbs: ["Thermal Reports"],
        },
      },
      {
        path: "/thermalreport/add",
        name: "thermal-report-add",
        component: () =>
          import("@/views/apps/thermal/thermalreports/ThermalReportAdd.vue"),
        meta: {
          pageTitle: "Add Thermal Report",
          breadcrumbs: ["Add Thermal Report"],
        },
      },
      {
        path: "/thermalreport/edit/:id",
        name: "thermal-report-edit",
        beforeEnter: async (to, from, next) => {
          const reportID = to.params.id;
          try {
            const response = await getThermalReport(reportID.toString());
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Thermal Instruments",
          breadcrumbs: ["Thermal Instruments"],
        },
      },
      {
        path: "/thermalinstrument/add",
        name: "thermal-instrument-add",
        component: () =>
          import("@/views/apps/thermal/instruments/ThermalInstrumentAdd.vue"),
        meta: {
          pageTitle: "Add Thermal Instrument",
          breadcrumbs: ["Add Thermal Instrument"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Thermal Instrument",
          breadcrumbs: ["Edit Thermal Instrument"],
        },
      },
      {
        path: "/cloneinstrument/:id",
        name: "thermal-instrument-clone",
        beforeEnter: async (to, from, next) => {
          const instrumentId = to.params.id;
          try {
            const response = await getThermalInstrument(instrumentId.toString());
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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

      // Calibration Records - Reference Instrument
      {
        path: "/reference-instrument/list",
        name: "reference-instrument-list",
        component: () =>
          import("@/views/apps/calibration/RefInstrument/RefInstrumentListing.vue"),
        meta: {
          pageTitle: "Reference Instrument",
          breadcrumbs: ["Reference Instrument"],
        },
      },
      {
        path: "/reference-instrument/add",
        name: "reference-instrument-add",
        component: () =>
          import("@/views/apps/calibration/RefInstrument/RefInstrumentAdd.vue"),
        meta: {
          pageTitle: "Add Reference Instrument",
          breadcrumbs: ["Add Reference Instrument"],
        },
      },
      {
        path: "/reference-instrument/edit/:id",
        name: "reference-instrument-edit",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await getReferenceInstrument(itemId.toString());
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/RefInstrument/RefInstrumentEdit.vue"),
        meta: {
          pageTitle: "Edit Reference Instrument",
          breadcrumbs: ["Edit Reference Instrument"],
        },
      },

      // Calibration Records - Service Request
      {
        path: "/calibration-srf/list",
        name: "calibration-srf-list",
        component: () =>
          import("@/views/apps/calibration/SrfCalibration/SrfCalibrationListing.vue"),
        meta: {
          pageTitle: "Calibration Records",
          breadcrumbs: ["Calibration Records"],
        },
      },
      {
        path: "/calibration-srf/edit/:id/:company_id",
        name: "calibration-srf-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationSrf(itemId.toString());
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/SrfCalibration/SrfCalibrationEdit.vue"),
        meta: {
          pageTitle: "Calibration Records View",
          breadcrumbs: ["Calibration Records View"],
        },
      },
      // Calibration Records - Calibration Instruments
      {
        path: "/calibration-instrument/edit/:id",
        name: "calibration-instrument-edit",
        beforeEnter: async (to, from, next) => {

          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrument(itemId.toString());
            console.log(response);
            if (response.success==false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/SrfCalibration/CalibrationInstrument/CalibrationInstrumentEdit.vue"),
        meta: {
          pageTitle: "Edit Calibration Instrument",
          breadcrumbs: ["Edit Calibration Instrument"],
        },
      },

      // Modified
      // Calibration Records - Dynamic Calibration Instruments
      {
        path: "/calibration-instrument/:type/edit/:id",
        name: "calibration-instrument-edit-wrapper",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await getCalibrationInstrument(itemId.toString());
            console.log(response);
            if (response.success==false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/SrfCalibration/CalZeptac/calibrationInstrumentWrapper/CalibrationInstrumentEditWrapper.vue"),
        meta: {
          pageTitle: "View Calibration Instrument",
          breadcrumbs: ["View Calibration Instrument"],
        },
      },

      // Calibration Procedure Routes
      {
        path: "/calibration-procedure/list",
        name: "calibration-procedure-list",
        component: () =>
          import("@/views/apps/calibration/procedure/CalibrationProcedureListing.vue"),
        meta: {
          pageTitle: "Calibration Procedure",
          breadcrumbs: ["Calibration Procedure"],
        },
      },
      {
        path: "/calibration-procedure/add",
        name: "calibration-procedure-add",
        component: () =>
          import("@/views/apps/calibration/procedure/CalibrationProcedureAdd.vue"),
        meta: {
          pageTitle: "Add Calibration Procedure",
          breadcrumbs: ["Add Calibration Procedure"],
        },
      },
      {
        path: "/calibration-procedure/edit/:id",
        name: "calibration-procedure-edit",
        beforeEnter: async (to, from, next) => {
          const valProcedureID = to.params.id;
          try {
            const response = await getCalibrationProcedure(valProcedureID.toString());
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/procedure/CalibrationProcedureEdit.vue"),
        meta: {
          pageTitle: "Edit Calibration Procedure",
          breadcrumbs: ["Edit Calibration Procedure"],
        },
      },

      // Supplier
      {
        path: "/suppliers",
        name: "supplier-list",
        component: () =>
          import("@/views/apps/supplier/Supplier/SupplierListing.vue"),
        meta: {
          pageTitle: "Suppliers",
          breadcrumbs: ["Suppliers"],
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
            if (response.error || response.result.is_active == 0) {
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
            if (response.error || response.result.is_active == 0) {
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
          pageTitle: "Edit Supplier",
          breadcrumbs: ["Edit Supplier"],
        },
      },

      // Quality Assurance - Method Validation
      {
        path: "/method_validation/list",
        name: "method-validation-list",
        component: () =>
          import("@/views/apps/qualityassurance/MethodValidation/MethodValidationListing.vue"),
        meta: {
          pageTitle: "Method Validation",
          breadcrumbs: ["Method Validation"],
        },
      },
      {
        path: "/method_validation/add",
        name: "method-validation-add",
        component: () =>
        import("@/views/apps/qualityassurance/MethodValidation/MethodValidationAdd.vue"),
        meta: {
          pageTitle: "Add Method Validation",
          breadcrumbs: ["Add Method Validation"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Method Validation",
          breadcrumbs: ["Edit Method Validation"],
        },
      },

      // Quality Assurance - InterLaboratory Comparison
      {
        path: "/interlaboratory/list",
        name: "interlaboratory-list",
        component: () =>
          import("@/views/apps/qualityassurance/InterLabComparison/InterLabComparisonListing.vue"),
        meta: {
          pageTitle: "InterLaboratory Comparison",
          breadcrumbs: ["InterLaboratory Comparison"],
        },
      },
      {
        path: "/interlaboratory/add",
        name: "interlaboratory-add",
        component: () =>
        import("@/views/apps/qualityassurance/InterLabComparison/InterLabComparisonAdd.vue"),
        meta: {
          pageTitle: "Add InterLaboratory Comparison",
          breadcrumbs: ["Add InterLaboratory Comparison"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit InterLaboratory Comparison",
          breadcrumbs: ["Edit InterLaboratory Comparison"],
        },
      },

      // Quality Assurance - Replicate Report
      {
        path: "/replicate_report/list",
        name: "replicate-report-list",
        component: () =>
          import("@/views/apps/qualityassurance/ReplicateReport/ReplicateReportListing.vue"),
        meta: {
          pageTitle: "Replicate Report",
          breadcrumbs: ["Replicate Report"],
        },
      },
      {
        path: "/replicate_report/add",
        name: "replicate-report-add",
        component: () =>
        import("@/views/apps/qualityassurance/ReplicateReport/ReplicateReportAdd.vue"),
        meta: {
          pageTitle: "Add Replicate Report",
          breadcrumbs: ["Add Replicate Report"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Replicate Report",
          breadcrumbs: ["Edit Replicate Report"],
        },
      },



      // Quality Work - Quality Documentation
      {
        path: "/internaldocuments",
        name: "internal-documents",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/internal/InternalDocListing.vue"),
        meta: {
          pageTitle: "Internal Documents",
          breadcrumbs: ["Internal Documents"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Internal Document",
          breadcrumbs: ["Edit Internal Document"],
        },
      },

      {
        path: "/externaldocuments",
        name: "external-documents",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/external/ExternalDocListing.vue"),
        meta: {
          pageTitle: "External Documents",
          breadcrumbs: ["External Documents"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit External Document",
          breadcrumbs: ["Edit External Document Edit"],
        },
      },

      {
        path: "/ncrs",
        name: "non-conformance-records",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/ncr/NCRListing.vue"),
        meta: {
          pageTitle: "Non Conformance Records",
          breadcrumbs: ["Non Conformance Record"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Non Conformance Record",
          breadcrumbs: ["Edit Non Conformance Record"],
        },
      },
      
      {
        path: "/risks",
        name: "risk-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/risk/RiskListing.vue"),
        meta: {
          pageTitle: "Risk Registers",
          breadcrumbs: ["Risk Registers"],
        },
      },
      {
        path: "/risks/add",
        name: "risk-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/risk/RiskAdd.vue"),
        meta: {
          pageTitle: "Add Risk Register",
          breadcrumbs: ["Add Risk Register"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Risk Register",
          breadcrumbs: ["Edit Risk Register"],
        },
      },

      {
        path: "/document_change_request",
        name: "document-change-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/DocumentChange/DocumentChangeListing.vue"),
        meta: {
          pageTitle: "Document Change Request",
          breadcrumbs: ["Document Change Request"],
        },
      },
      {
        path: "/document_change_request/add",
        name: "document-change-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/DocumentChange/DocumentChangeAdd.vue"),
        meta: {
          pageTitle: "Add Document Change Request",
          breadcrumbs: ["Add Document Change Request"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Document Change Request",
          breadcrumbs: ["Edit Document Change Request"],
        },
      },


      {
        path: "/improvements",
        name: "improvements-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/qualitywork/improvement/ImprovementListing.vue"),
        meta: {
          pageTitle: "Improvement Action Plan",
          breadcrumbs: ["Improvement Action Plan"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Improvement Action Plan",
          breadcrumbs: ["Edit Improvement Action Plan"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Add Internal Audit Observation",
          breadcrumbs: ["Add Internal Audit Observation"],
        },
      },
      {
        path: "/auditobservations",
        name: "auditobservations-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/auditobservation/IAObservationListing.vue"),
        meta: {
          pageTitle: "Internal Audit Observation",
          breadcrumbs: ["Internal Audit Observation"],
        },
      },
      {
        path: "/auditobservations/edit/:id",
        name: "auditobservation-edit",
        
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/auditobservation/IAObservationEdit.vue"),
        meta: {
          pageTitle: "Edit Internal Audit Observation",
          breadcrumbs: ["Edit Internal Audit Observation"],
        },
      },
      {
        path: "/non_conformance/list/:id",
        name: "non-conformance-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/CorrectiveAction/CorrectiveActionListing.vue"),
        meta: {
          pageTitle: "Non-Conformances",
          breadcrumbs: ["Non-Conformances"],
        },
      },

      // Internal Audit - Audit Schedule - Quality Documentation
      {
        path: "/auditschedule/add",
        name: "auditschedule-add",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/IAuditSchedule/IAuditScheduleAdd.vue"),
        meta: {
          pageTitle: "Add Internal Audit Schedule",
          breadcrumbs: ["Add Internal Audit Schedule"],
        },
      },
      {
        path: "/auditschedule",
        name: "auditschedule-list",
        component: () =>
          import("@/views/apps/qualitydocumentation/internalaudit/IAuditSchedule/IAuditScheduleListing.vue"),
        meta: {
          pageTitle: "Internal Audit Schedule",
          breadcrumbs: ["Internal Audit Schedule"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Internal Audit Schedule",
          breadcrumbs: ["Edit Internal Audit Schedule"],
        },
      },
      
      
      // MRM - MRM Schedule Meeting
      {
        path: "/mrm_schedule/add",
        name: "mrm-schedule-add",
        component: () =>
          import("@/views/apps/MRM/ScheduleMRM/ScheduleMRMAdd.vue"),
        meta: {
          pageTitle: "Add MRM Schedule",
          breadcrumbs: ["Add MRM Schedule"],
        },
      },
      {
        path: "/mrm_schedule",
        name: "mrm-schedule-list",
        component: () =>
          import("@/views/apps/MRM/ScheduleMRM/ScheduleMRMListing.vue"),
        meta: {
          pageTitle: "MRM Scheduled",
          breadcrumbs: ["MRM Scheduled"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit MRM Schedule",
          breadcrumbs: ["Edit MRM Schedule"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Add MOM",
          breadcrumbs: ["Add MOM"],
        },
      },
      {
        path: "/mrm_minutes",
        name: "mrm-minutes-list",
        component: () =>
          import("@/views/apps/MRM/MinutesMRM/MinutesMRMListing.vue"),
        meta: {
          pageTitle: "Minutes Of MRM",
          breadcrumbs: ["Minutes Of MRM"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Minutes Of MRM",
          breadcrumbs: ["Edit Minutes Of MRM"],
        },
      },


      // Master List - QMS Procedure
      {
        path: "/qms_procedures",
        name: "qms-procedures",
        component: () =>
          import("@/views/apps/master/QMSProcedure/QMSProcedureListing.vue"),
        meta: {
          pageTitle: "QMS Procedures",
          breadcrumbs: ["QMS Procedures"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit QMS Procedure",
          breadcrumbs: ["Edit QMS Procedure"],
        },
      },

      // Master List - Work Instruction
      {
        path: "/work_instructions",
        name: "work-instructions",
        component: () =>
          import("@/views/apps/master/WorkInstruction/WorkInstructionListing.vue"),
        meta: {
          pageTitle: "Work Instructions",
          breadcrumbs: ["Work Instructions"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Work Instruction",
          breadcrumbs: ["Edit Work Instruction"],
        },
      },

      // Master List - Forms and Formats
      {
        path: "/forms_and_formats",
        name: "forms-formats",
        component: () =>
          import("@/views/apps/master/FormsAndFormats/FormsAndFormatsListing.vue"),
        meta: {
          pageTitle: "Forms & Formats",
          breadcrumbs: ["Forms & Formats"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Forms & Formats",
          breadcrumbs: ["Edit Forms & Formats"],
        },
      },

      // Master List - NABL Document
      {
        path: "/nabl_documents",
        name: "nabl-documents",
        component: () =>
          import("@/views/apps/master/NABLDocument/NABLDocumentListing.vue"),
        meta: {
          pageTitle: "NABL Documents",
          breadcrumbs: ["NABL Documents"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit NABL Document",
          breadcrumbs: ["Edit NABL Document"],
        },
      },

      // Master List - NI Document
      {
        path: "/ni_documents",
        name: "ni-documents",
        component: () =>
          import("@/views/apps/master/NIDocument/NIDocumentListing.vue"),
        meta: {
          pageTitle: "National-International Documents",
          breadcrumbs: ["National-International Documents"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit National-International Document",
          breadcrumbs: ["Edit National-International Document"],
        },
      },

      // Master List - Records
      {
        path: "/records",
        name: "records",
        component: () =>
          import("@/views/apps/master/Records/RecordsListing.vue"),
        meta: {
          pageTitle: "Records",
          breadcrumbs: ["Records"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Record",
          breadcrumbs: ["Edit Record"],
        },
      },


      // Instrument Management - Intermedidate Check Records
      {
        path: "/intermediate_check_records",
        name: "intermediate-check-records-list",
        component: () =>
          import("@/views/apps/instrument/IntermediateCheckRecords/IntermediateCheckRecordListing.vue"),
        meta: {
          pageTitle: "Intermediate Check Records",
          breadcrumbs: ["Intermediate Check Records"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Add Intermediate Check Record",
          breadcrumbs: ["Add Intermediate Check Record"],
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
            if (response.success == false || response.result.is_active == 0) {
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Intermediate Check Record",
          breadcrumbs: ["Edit Intermediate Check Record"],
        },
      },

      // Instrument Management - Inspection Records
      {
        path: "/inspection_records",
        name: "inspection-records-list",
        component: () =>
          import("@/views/apps/instrument/InspectionRecords/InspectionRecordsListing.vue"),
        meta: {
          pageTitle: "Inspection Records",
          breadcrumbs: ["Inspection Records"],
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Add Inspection Record",
          breadcrumbs: ["Add Inspection Record"],
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
            if (response.success == false || response.result.is_active == 0) {
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
            if (response.success == false || response.result.is_active == 0) {
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
          pageTitle: "Edit Inspection Record",
          breadcrumbs: ["Edit Inspection Record"],
        },
      },


      // Planner And CheckList Management - Planner
      {
        path: "/plan",
        name: "plan-list",
        component: () =>
          import("@/views/apps/Planner/PlannerListing.vue"),
        meta: {
          pageTitle: "Planners",
          breadcrumbs: ["Planners"],
        },
      },
      {
        path: "/plan/add",
        name: "plan-add",
        component: () =>
          import("@/views/apps/Planner/PlannerAdd.vue"),
        meta: {
          pageTitle: "Add Plan",
          breadcrumbs: ["Add Plan"],
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
            if (response.success == false) {
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
          pageTitle: "Edit Planner",
          breadcrumbs: ["Edit Planner"],
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

      // Notifications
      {
        path: "/notifications/list",
        name: "notifications-list",
        component: () => import("@/views/apps/notification/NotificationListing.vue"),
        meta: {
          pageTitle: "Notifications",
          breadcrumbs: ["Notifications"],
        },
      },

      // Logged In Customers Routes/Pages
      {
        path: "/customer/planner",
        name: "customer-planner-list",
        component: () => import("@/views/apps/customers/planners/CustomerPlanners.vue"),
        meta: {
          pageTitle: "Planner",
          breadcrumbs: ["Planner"],
        },
      },
      {
        path: "/customer/activities",
        name: "customer-activities-list",
        component: () => import("@/views/apps/customers/activities/CustomerActivities.vue"),
        meta: {
          pageTitle: "Activities",
          breadcrumbs: ["Activities"],
        },
      },
      {
        path: "/customer/reports",
        name: "customer-reports-page",
        component: () => import("@/views/apps/customers/reports/CustomerReports.vue"),
        meta: {
          pageTitle: "Reports",
          breadcrumbs: ["Reports"],
        },
      },
      {
        path: "/customer/validation-reports",
        name: "customer-validation-reports",
        component: () => import("@/views/apps/customers/reports/ValidationReports.vue"),
        meta: {
          pageTitle: "Validation Reports",
          breadcrumbs: ["Validation Reports"],
        },
      },
      {
        path: "/customer/thermal-reports",
        name: "customer-thermal-reports",
        component: () => import("@/views/apps/customers/reports/ThermalReports.vue"),
        meta: {
          pageTitle: "Thermal Reports",
          breadcrumbs: ["Thermal Reports"],
        },
      },
      {
        path: "/customer/equipments",
        name: "customer-equipments-list",
        component: () => import("@/views/apps/customers/equipments/CustomerEquipments.vue"),
        meta: {
          pageTitle: "Equipments",
          breadcrumbs: ["Equipments"],
        },
      },
      {
        path: "/customer/invoices",
        name: "customer-invoices-list",
        component: () => import("@/views/apps/customers/billings/CustomerInvoices.vue"),
        meta: {
          pageTitle: "Invoices",
          breadcrumbs: ["Invoices"],
        },
      },
      {
        path: "/customer/orders",
        name: "customer-purchase-order-list",
        component: () => import("@/views/apps/customers/po/CustomerPurchaseOrders.vue"),
        meta: {
          pageTitle: "Purchase Orders",
          breadcrumbs: ["Purchase Orders"],
        },
      },
      {
        path: "/customer/orders/add/:id/:quotation_no",
        name: "customer-purchase-order-add",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await check_po_created(itemId.toString());
            if (response.success == false || response.result.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/customers/po/CustomerPurchaseOrderAdd.vue"),
        meta: {
          pageTitle: "Add Purchase Order",
          breadcrumbs: ["Add Purchase Order"],
        },
      },
      {
        path: "/customer/orders/edit/:id",
        name: "customer-purchase-order-edit",
        beforeEnter: async (to, from, next) => {
          const itemId = to.params.id;
          try {
            const response = await purchaseOrderEditable(itemId.toString());
            if (response.success == false || response.result.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/customers/po/CustomerPurchaseOrderEdit.vue"),
        meta: {
          pageTitle: "Edit Purchase Order",
          breadcrumbs: ["Edit Purchase Order"],
        },
      },
      {
        path: "/customer/feedbacks/add",
        name: "customer-feedbacks-add",
        component: () => import("@/views/apps/customers/feedbacks/CustomerFeedbackAdd.vue"),
        meta: {
          pageTitle: "Feedback Form Add",
          breadcrumbs: ["Feedback Form Add"],
        },
      },
      {
        path: "/customer/feedbacks",
        name: "customer-feedbacks-list",
        component: () => import("@/views/apps/customers/feedbacks/CustomerFeedbackListing.vue"),
        meta: {
          pageTitle: "Feedback Forms",
          breadcrumbs: ["Feedback Forms"],
        },
      },
      {
        path: "customer/feedbacks/view/:id",
        name: "customer-feedbacks-view",
        beforeEnter: async (to, from, next) => {
          const itemID = to.params.id;
          try {
            const response = await getFeedback(itemID.toString());
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/customers/feedbacks/CustomerFeedbackView.vue"),
        meta: {
          pageTitle: "View Customer Feedback",
          breadcrumbs: ["View Customer Feedback"],
        },
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
        path: "/icons-page",
        name: "icons-page",
        component: () => import("@/views/crafted/pages/IconsPage.vue"),
        meta: {
          pageTitle: "Icons",
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
            if (response.success == false || response.result.is_active == 0) {
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
        path: "/srf_calibration/:company/:customer/:srf/:token",
        name: "srf-calibration-add",
        beforeEnter: async (to, from, next) => {

          const companyID = to.params.company;
          const customerID = to.params.customer;
          const srfID = to.params.srf;
          const token = to.params.token;
          const data = {
            company_id: companyID,
            customer_id: customerID,
            service_request_id: srfID,
            token: token,
          }
          try {
            const response = await validateUserNSrf(data);
            console.log(response);
            if (response.success == false || response.result.is_active == 0) {
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
          import("@/views/apps/calibration/SrfCalibration/SrfCalibrationAdd.vue"),
        meta: {
          pageTitle: "Calibration SRF",
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
            if (response.success == false || response.result.is_active == 0) {
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
      {
        path: "/pressure-calibration/edit/:id",
        name: "pressure-calibration-edit",
        component: () => import("@/views/apps/calibration/SrfCalibration/CalZeptac/calibrationInstrumentWrapper/pressure/PressureReadingEdit.vue"),
        meta: {
          pageTitle: "Uncertainty Calculation",
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
