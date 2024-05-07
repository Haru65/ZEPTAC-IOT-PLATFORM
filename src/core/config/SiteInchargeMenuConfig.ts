export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }
  
  const SiteInchargeMenuConfig: Array<MenuItem> = [
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
      heading: "CleanRoom Validation",
      route: "/",
      pages: [
        {
          sectionTitle: "Validation Service",
          route: "/",
          keenthemesIcon: "element-plus",
          bootstrapIcon: "bi-archive",
          sub: [
            {
              heading: "Expense Sheet",
              route: "/expensesheets",
            },
          ],
        },
  
        /*
  
        {
          sectionTitle: "External Audit",
          route: "/",
          keenthemesIcon: "element-plus",
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
        }
  
        */
  
      ],
    },

  ];
  
  export default SiteInchargeMenuConfig;
  