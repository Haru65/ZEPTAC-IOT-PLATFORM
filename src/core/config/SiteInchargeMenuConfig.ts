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
      heading: "Dashboard",
      route: "dashboard",
      pages: [
        {
          heading: "Dashboard",
          route: "/",
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
              heading: "Expense Sheet",
              route: "/expensesheets",
            },
          ],
        },
  
        /*
  
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
        }
  
        */
  
      ],
    },

  ];
  
  export default SiteInchargeMenuConfig;
  