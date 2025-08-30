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

    ],
  },
];

export default CompanyAdminMenuConfig;
