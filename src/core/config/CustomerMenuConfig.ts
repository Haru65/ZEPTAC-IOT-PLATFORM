export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }
  
  const CustomerMenuConfig: Array<MenuItem> = [
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
        {
          heading: "Planner",
          route: "/customer/planner",
          keenthemesIcon: "receipt-square",
          bootstrapIcon: "bi-receipt",
        },
        {
          heading: "My Activites",
          route: "/customer/activities",
          keenthemesIcon: "courier-express",
          bootstrapIcon: "bi-activity",
        },
        {
          heading: "My Reports",
          route: "/customer/reports",
          keenthemesIcon: "tablet-text-up",
          bootstrapIcon: "bi-archive",
        },
        {
          heading: "My Equipments",
          route: "/customer/equipments",
          keenthemesIcon: "ocean",
          bootstrapIcon: "bi-tools",
        },
        {
          heading: "Invoices",
          route: "/customer/invoices",
          keenthemesIcon: "menu",
          bootstrapIcon: "bi-menu-button",
        },
        {
          heading: "Purchase Orders",
          route: "/customer/orders",
          keenthemesIcon: "wallet",
          bootstrapIcon: "bi-archive",
        },
        {
          heading: "Feedback Form",
          route: "/customer/feedbacks",
          keenthemesIcon: "delivery-24",
          bootstrapIcon: "bi-archive",
        },
        {
          heading: "Contact Support",
          route: "/contactus",
          keenthemesIcon: "delivery-24",
          bootstrapIcon: "bi-archive",
        },
      ],
    },
  ];
  
  export default CustomerMenuConfig;
  