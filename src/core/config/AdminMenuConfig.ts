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
      {
        heading: "Devices",
        route: "/devices",
        keenthemesIcon: "router",
        bootstrapIcon: "bi-phone",
      },
      {
        heading: "Reports",
        route: "/reports",
        keenthemesIcon: "chart",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Alarms",
        route: "/alarms",
        keenthemesIcon: "timer",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Location",
        route: "/locations",
        keenthemesIcon: "route",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },

  /*

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
        heading: "Non-NABL",
        route: "/validationreports/list",
        keenthemesIcon: "tablet-text-up",
        bootstrapIcon: "bi-archive",
      },

      {
        sectionTitle: "NABL",
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
        heading: "Service Request",
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
        heading: "Thermal Reports",
        route: "/thermalreport/list",
        keenthemesIcon: "chart-pie-4",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Thermal Instruments",
        route: "/thermalinstrument/list",
        keenthemesIcon: "thermometer",
        bootstrapIcon: "bi-archive",
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
        heading: "Leads",
        route: "/leads/list",
        keenthemesIcon: "user-tick",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Exists Leads",
        route: "/temp_leads/list",
        keenthemesIcon: "people",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Customers",
        route: "/customers/list",
        keenthemesIcon: "user-edit",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Clients",
        route: "/clients/list",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Price List",
        route: "/pricelist/list",
        keenthemesIcon: "notification-status",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Quotations",
        route: "/quotations/list",
        keenthemesIcon: "note-2",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Invoices",
        route: "/invoices/list",
        keenthemesIcon: "menu",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Purchase Orders",
        route: "/purchase-order/list",
        keenthemesIcon: "wallet",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Payments",
        route: "/po-payment/list",
        keenthemesIcon: "bank",
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
            heading: "Internal Audit Schedule",
            route: "/auditschedule",
          },
          {
            heading: "Internal Audit Observation",
            route: "/auditobservations",
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
            heading: "Method Validation",
            route: "/method_validation/list",
          },
          {
            heading: "InterLaboratory",
            route: "/interlaboratory/list",
          },
          {
            heading: "Replicate Report",
            route: "/replicate_report/list",
          },

        ],
      },


    ],
  },
  
  */

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
            heading: "Employees",
            route: "/employee/list",
          },
          {
            heading: "Training",
            route: "/training/list",
          },
          {
            heading: "Skill Matrix",
            route: "/skill_matrix/list",
          },

        ],
      },

      // {
      //   heading: "Taxes",
      //   route: "/company-tax",
      //   keenthemesIcon: "abstract-26",
      //   bootstrapIcon: "bi-archive",
      // },

    ],
  },
  {
    heading: "Super Admin",
    route: "superadmin",
    pages: [
      {
        heading: "Company",
        route: "/company/list",
        keenthemesIcon: "office-bag",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Users",
        route: "/users/list",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Modules",
        route: "/module_manager/list",
        keenthemesIcon: "data",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Permission",
        route: "/permission_manager/list",
        keenthemesIcon: "check-square",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "Activity Logger",
        route: "/activity_logger/list",
        keenthemesIcon: "notepad-edit",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
];

export default AdminMenuConfig;
