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
      heading: "Dashboard",
      route: "dashboard",
      pages: [
        {
          heading: "Dashboard",
          route: "/",
          keenthemesIcon: "element-1",
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
          keenthemesIcon: "element-plus",
          bootstrapIcon: "bi-archive",
          sub: [
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


    {
      heading: "Quality Work",
      route: "quality-work",
      pages: [

        {
          sectionTitle: "Instrument Management",
          keenthemesIcon: "document",
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

      ],
    },
    

  ];
  
  export default ServiceEngMenuConfig;
  