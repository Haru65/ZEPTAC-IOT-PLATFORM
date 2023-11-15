export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }
  
  const ServiceEngMenuConfig: Array<MenuItem> = [
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
          ],
        },
      ],
    },

  ];
  
  export default ServiceEngMenuConfig;
  