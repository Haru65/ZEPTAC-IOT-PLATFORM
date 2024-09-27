export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }
  
  const SalesPersonMenuConfig: Array<MenuItem> = [
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
      heading: "Sales",
      route: "sales",
      pages: [
        {
          sectionTitle: "Leads",
          route: "/sales/leads",
          keenthemesIcon: "user-tick",
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
          keenthemesIcon: "profile-user",
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
          keenthemesIcon: "notification-status",
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
          keenthemesIcon: "menu",
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
  ];
  
  export default SalesPersonMenuConfig;
  