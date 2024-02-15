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
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-1",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Modules",
    route: "/modules",
    pages: [
      {
        sectionTitle: "CleanRoom Validation",
        route: "/modules/cleanroom",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Validation Service",
            route: "/modules/validation",
            keenthemesIcon: "office-bag",
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
            sectionTitle: "Validation Report",
            route: "/modules/validationreports",
            sub: [
              {
                heading: "Add Reports",
                route: "/validationreports/add",
              },
              {
                heading: "List Reports",
                route: "/validationreports/list",
              },
            ],
          },
          {
            sectionTitle: "Instruments",
            route: "/modules/instruments",
            keenthemesIcon: "office-bag",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Add Instruments",
                route: "/instruments/add",
              },
              {
                heading: "List Instruments",
                route: "/instruments/list",
              },
            ],
          },
          {
            sectionTitle: "External Audit",
            route: "/modules/externalaudit",
            keenthemesIcon: "office-bag",
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
        ],
      },
    ],
  },
  {
    heading: "Thermal Mapping",
    route: "/thermalmapping",
    pages: [
      {
        sectionTitle: "Thermal Report",
        route: "/thermalreport",
        keenthemesIcon: "wrench",
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
        keenthemesIcon: "office-bag",
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
    heading: "Feedback",
    route: "/feedback",
    pages: [
      {
        heading: "Customer Complaint",
        route: "/complaint",
        keenthemesIcon: "educare",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
  {
    heading: "Sales",
    route: "/sales",
    pages: [
      {
        sectionTitle: "Leads",
        route: "/sales/leads",
        keenthemesIcon: "people",
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
        keenthemesIcon: "user-edit",
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
        keenthemesIcon: "bill",
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
        keenthemesIcon: "message-programming",
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
    ],
  },
  {
    heading: "Hr",
    route: "/hr",
    pages: [
      {
        sectionTitle: "Employees",
        route: "/employee",
        keenthemesIcon: "office-bag",
        bootstrapIcon: "bi-archive",
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
        heading: "Trainings",
        route: "/training",
        keenthemesIcon: "educare",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
  {
    heading: "Super Admin",
    route: "/company",
    pages: [
      {
        sectionTitle: "Company",
        route: "/company",
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
        keenthemesIcon: "profile-user",
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
        sectionTitle: "Permission",
        route: "/permission_manager",
        keenthemesIcon: "setting-4",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Permission Manager",
            route: "/permission_manager/list",
          },
        ],
      },
    ],
  },
];

export default AdminMenuConfig;
