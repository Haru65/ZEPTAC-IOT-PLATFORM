export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const CompanyAdminMenuConfig: Array<MenuItem> = [
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
        sectionTitle: "CleanRoom",
        route: "/modules/cleanroom",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Validation Report",
            route: "/modules/validationreport",
            sub: [
              {
                heading: "Add Reports",
                route: "/validationreport/add",
              },
              {
                heading: "List Reports",
                route: "/validationreport/list",
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
            sectionTitle: "External Audit",
            route: "/modules/externalaudit",
            keenthemesIcon: "office-bag",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Validation Procedure",
                route: "/modules/externalaudit/validation",
              },
              {
                heading: "Quality Procedure",
                route: "/modules/externalaudit/quality",
              },
            ],
          },
        ],
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
    heading: "HR",
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
            route: "employee/add",
          },
          {
            heading: "List Employees",
            route: "/employee/list",
          },
        ],
      },
      {
        heading: "Trainings",
        route: "/trainings",
        keenthemesIcon: "educare",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
  {
    heading: "Admin",
    route: "/company",
    pages: [
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
    ],
  },
];

export default CompanyAdminMenuConfig;
