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
                heading: "Report List",
                route: "/modules/validationreport/list",
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
                route: "/modules/instruments/add",
              },
              {
                heading: "List Instruments",
                route: "/modules/instruments/list",
              },
            ],
          },
          {
            sectionTitle: "Validation Service",
            route: "/moudules/validation",
            keenthemesIcon: "office-bag",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Daily Worksheet",
                route: "/moudules/validation/dailyworksheet",
              },
              {
                heading: "Task Allocation",
                route: "/moudules/validation/taskallocation",
              },
              {
                heading: "Expense Sheet",
                route: "/moudules/validation/expensesheet",
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
];

export default AdminMenuConfig;
