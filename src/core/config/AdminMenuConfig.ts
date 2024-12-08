export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const AdminMenuConfig: Array<MenuItem> = [
  {
    heading: "Dashboard",
    route: "dashboard",
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "CleanRoom Validation",
    route: "cleanroom",
    pages: [
      {
        sectionTitle: "Validation Service",
        route: "/",
        keenthemesIcon: "abstract-35",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Returnable Gate Pass",
            route: "/returnablegatepasses",
          },
          {
            heading: "Daily Worksheet",
            route: "/dailyworksheets",
          },
          {
            heading: "Expense Sheet",
            route: "/expensesheets",
          },
        ],
      },

      {
        sectionTitle: "Non-NABL Report",
        route: "/",
        keenthemesIcon: "tablet-text-up",
        bootstrapIcon: "bi-archive",

        sub: [
          {
            heading: "Add Non-NABL Report",
            route: "/validationreports/add",
          },
          {
            heading: "List Non-NABL Report",
            route: "/validationreports/list",
          },
        ],
      },

      {
        sectionTitle: "NABL Report",
        route: "/",
        keenthemesIcon: "file-added",
        bootstrapIcon: "bi-archive",

        sub: [
          {
            heading: "LAF",
            route: "/laf/list",
          },
          {
            heading: "BSC",
            route: "/bsc/list",
          },
        ],
      },

      {
        sectionTitle: "External Audit",
        route: "/",
        keenthemesIcon: "tablet-ok",
        bootstrapIcon: "bi-archive",

        sub: [
          {
            heading: "Validation Procedure",
            route: "/validation",
          },
          {
            heading: "Quality Procedure",
            route: "/quality",
          },
        ],
      },

      {
        heading: "Service Request Form",
        route: "/srf/list",
        keenthemesIcon: "abstract-26",
        bootstrapIcon: "bi-archive",
      },

    ],
  },
  {
    heading: "Thermal Mapping",
    route: "thermal",
    pages: [
      {
        sectionTitle: "Thermal Report",
        route: "/thermalreport",
        keenthemesIcon: "chart-pie-4",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Thermal Report",
            route: "/thermalreport/add",
          },
          {
            heading: "List Thermal Report",
            route: "/thermalreport/list",
          },
        ],
      },
      {
        sectionTitle: "Thermal Instrument",
        route: "/thermalinstrument",
        keenthemesIcon: "thermometer",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Thermal Instrument",
            route: "/thermalinstrument/add",
          },
          {
            heading: "List Thermal Instrument",
            route: "/thermalinstrument/list",
          },
        ],
      },
    ],
  },

  {
    heading: "Calibration",
    route: "calibration",
    pages: [
      {
        sectionTitle: "Calibration",
        route: "/calibration",
        keenthemesIcon: "chart-pie-4",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Calibration Procedure",
            route: "/calibration-procedure/list",
          },
          {
            heading: "Calibration Records",
            route: "/calibration-srf/list",
          },
          {
            heading: "Reference Instrument",
            route: "/reference-instrument/list",
          },
        ],
      },
    ],
  },


  {
    heading: "Sales",
    route: "sales",
    pages: [
      {
        sectionTitle: "Leads",
        route: "/sales/leads",
        keenthemesIcon: "user-tick",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Leads",
            route: "/leads/add",
          },
          {
            heading: "List Leads",
            route: "/leads/list",
          },
          {
            heading: "Exists Leads",
            route: "/temp_leads/list",
          },
        ],
      },
      {
        sectionTitle: "Customers",
        route: "/customers",
        keenthemesIcon: "user-edit",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Customers",
            route: "/customers/add",
          },
          {
            heading: "List Customers",
            route: "/customers/list",
          },
        ],
      },
      {
        sectionTitle: "Clients",
        route: "/clients",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Clients",
            route: "/clients/add",
          },
          {
            heading: "List Clients",
            route: "/clients/list",
          },
        ],
      },
      {
        sectionTitle: "Price List Items",
        route: "/pricelist",
        keenthemesIcon: "notification-status",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Items",
            route: "/pricelist/add",
          },
          {
            heading: "List Items",
            route: "/pricelist/list",
          },
        ],
      },
      {
        sectionTitle: "Quotations",
        route: "/quotations",
        keenthemesIcon: "note-2",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Quotations",
            route: "/quotations/add",
          },
          {
            heading: "List Quotations",
            route: "/quotations/list",
          },
        ],
      },
      {
        sectionTitle: "Invoices",
        route: "/invoices",
        keenthemesIcon: "menu",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Invoices",
            route: "/invoices/add",
          },
          {
            heading: "List Invoices",
            route: "/invoices/list",
          },
        ],
      },
      {
        heading: "Purchase Orders",
        route: "/purchase-order/list",
        keenthemesIcon: "cheque",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Payments",
        route: "/po-payment/list",
        keenthemesIcon: "cheque",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
  {
    heading: "Quality Work",
    route: "quality-work",
    pages: [

      {
        sectionTitle: "Master List",
        keenthemesIcon: "text-circle",
        route: "/masterlist",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "QMS Procedure",
            route: "/qms_procedures",
          },
          {
            heading: "Work Instruction",
            route: "/work_instructions",
          },
          {
            heading: "Forms & Formats",
            route: "/forms_and_formats",
          },
          {
            heading: "NABL Document",
            route: "/nabl_documents",
          },
          {
            heading: "National-International Document",
            route: "/ni_documents",
          },
          {
            heading: "Records",
            route: "/records",
          },
        ],
      },


      {
        sectionTitle: "Instrument Management",
        keenthemesIcon: "switch",
        route: "/",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Instrument Add",
            route: "/instruments/add",
          },
          {
            heading: "Instrument List",
            route: "/instruments/list",
          },
          {
            heading: "Intermediate Check",
            route: "/intermediate_check_records",
          },
          {
            heading: "Inspection Records",
            route: "/inspection_records",
          },
        ],
      },


      {
        sectionTitle: "Internal Audit",
        route: "/internalaudit",
        keenthemesIcon: "share",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Internal Audit Observation",
            route: "/auditobservations",
          },
          {
            heading: "Internal Audit Schedule",
            route: "/auditschedule",
          },
        ],
      },


      {
        sectionTitle: "Management Review",
        route: "/",
        keenthemesIcon: "file-sheet",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Schedule Meeting",
            route: "/mrm_schedule",
          },
          {
            heading: "Minutes of Meeting",
            route: "/mrm_minutes",
          },
        ],
      },


      {
        sectionTitle: "Quality Documentation",
        route: "/",
        keenthemesIcon: "wallet",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Internal Document",
            route: "/internaldocuments",
          },
          {
            heading: "External Document",
            route: "/externaldocuments",
          },
          {
            heading: "Non Conformance Record",
            route: "/ncrs",
          },
          {
            heading: "Risk Register",
            route: "/risks",
          },
          {
            heading: "Document Change",
            route: "/document_change_request",
          },
          {
            heading: "Improvement Plan",
            route: "/improvements",
          },
          {
            heading: "Complaint Register",
            route: "/complaint",
          },
          {
            heading: "Customer Feedbacks",
            route: "/feedbacks/list",
          },

        ],
      },


      {
        heading: "Planner",
        route: "/plan",
        keenthemesIcon: "calendar-tick",
        bootstrapIcon: "bi-archive",
      },


      {
        heading: "CheckList",
        route: "/checklist",
        keenthemesIcon: "questionnaire-tablet",
        bootstrapIcon: "bi-archive",
      },


      {
        heading: "Suppliers",
        route: "/suppliers",
        keenthemesIcon: "delivery-3",
        bootstrapIcon: "bi-archive",
      },


      {
        sectionTitle: "Quality Assurance",
        route: "/",
        keenthemesIcon: "award",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Method Validation",
            route: "/",
            sub: [
              {
                heading: "Add Method Validation",
                route: "/method_validation/add",
              },
              {
                heading: "List Method Validation",
                route: "/method_validation/list",
              },
            ],
          },
          {
            sectionTitle: "InterLaboratory",
            route: "/",
            sub: [
              {
                heading: "Add InterLaboratory",
                route: "/interlaboratory/add",
              },
              {
                heading: "List InterLaboratory",
                route: "/interlaboratory/list",
              },
            ],
          },
          {
            sectionTitle: "Replicate Report",
            route: "/",
            sub: [
              {
                heading: "Add Replicate Report",
                route: "/replicate_report/add",
              },
              {
                heading: "List Replicate Report",
                route: "/replicate_report/list",
              },
            ],
          },

        ],
      },


    ],
  },
  {
    heading: "HR",
    route: "hr",
    pages: [

      {
        sectionTitle: "Employees Management",
        route: "/",
        keenthemesIcon: "faceid",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Employees",
            route: "/",
            sub: [
              {
                heading: "Add Employee",
                route: "/employee/add",
              },
              {
                heading: "List Employees",
                route: "/employee/list",
              },
            ],
          },

          {
            sectionTitle: "Trainings",
            route: "/",
            keenthemesIcon: "educare",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Add Training",
                route: "/training/add",
              },
              {
                heading: "List Training",
                route: "/training/list",
              },
            ],
          },

          {
            sectionTitle: "Skill Matrix",
            route: "/",
            keenthemesIcon: "educare",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Add Skill Matrix",
                route: "/skill_matrix/add",
              },
              {
                heading: "List Skill Matrix",
                route: "/skill_matrix/list",
              },
            ],
          },


        ],
      },


    ],
  },
  {
    heading: "Super Admin",
    route: "superadmin",
    pages: [
      {
        sectionTitle: "Company",
        route: "/",
        keenthemesIcon: "office-bag",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Company",
            route: "/company/add",
          },
          {
            heading: "List Company",
            route: "/company/list",
          },
        ],
      },
      {
        sectionTitle: "Users",
        route: "/users",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add User",
            route: "/users/add",
          },
          {
            heading: "List Users",
            route: "/users/list",
          },
        ],
      },
      {
        sectionTitle: "Modules",
        route: "/module_manager",
        keenthemesIcon: "data",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Modules Manager",
            route: "/module_manager/list",
          },
        ],
      },
      {
        sectionTitle: "Permission",
        route: "/permission_manager",
        keenthemesIcon: "check-square",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Permission Manager",
            route: "/permission_manager/list",
          },
        ],
      },
      {
        sectionTitle: "Activity Logger",
        route: "/activity_logger",
        keenthemesIcon: "notepad-edit",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Activity Logger",
            route: "/activity_logger/list",
          },
        ],
      },
      {
        sectionTitle: "ISO Rules",
        route: "/iso",
        keenthemesIcon: "setting-3",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "ISO Rules Add",
            route: "/iso/add",
          },
          {
            heading: "ISO Rules List",
            route: "/iso/list",
          },
        ],
      },
    ],
  },
];

export default AdminMenuConfig;
