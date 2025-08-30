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
          keenthemesIcon: "element-11",
          bootstrapIcon: "bi-app-indicator",
        },
      ],
    },

  ];
  
  export default ServiceEngMenuConfig;
  