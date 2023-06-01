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
        heading: "Admin Dashboard",
        route: "/admindashboard",
        keenthemesIcon: "element-1",
        bootstrapIcon: "bi-app-indicator",
      }
    ],
  },
  {
    heading: "Admin",
    route: "/admin",
    pages: [
      {
        sectionTitle: "Company",
        route: "/admin/company",
        keenthemesIcon: "office-bag",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Company",
            route: "/admin/company/add",
          },
          {
           heading: "List Company",
           route: "/admin/company/List",
          },
        ],
      }
    ,{
      sectionTitle: "Users",
      route: "/users",
      keenthemesIcon: "profile-user",
      bootstrapIcon: "bi-archive",
      sub: [
        {
          heading: "Add User",
          route: "/admin/users/add",
        },
        {
         heading: "List Users",
         route: "/admin/users/List",
        },
      ],
    }]
  },
  // {
  //   heading: "apps",
  //   route: "/apps",
  //   pages: [
  //     {
  //       sectionTitle: "customers",
  //       route: "/customers",
  //       keenthemesIcon: "abstract-38",
  //       bootstrapIcon: "bi-printer",
  //       sub: [
  //         {
  //           heading: "gettingStarted",
  //           route: "/apps/customers/getting-started",
  //         },
  //         {
  //           heading: "customersListing",
  //           route: "/apps/customers/customers-listing",
  //         },
  //         {
  //           heading: "customerDetails",
  //           route: "/apps/customers/customer-details",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "subscriptions",
  //       route: "/subscriptions",
  //       keenthemesIcon: "basket",
  //       bootstrapIcon: "bi-cart",
  //       sub: [
  //         {
  //           heading: "getStarted",
  //           route: "/apps/subscriptions/getting-started",
  //         },
  //         {
  //           heading: "subscriptionList",
  //           route: "/apps/subscriptions/subscription-list",
  //         },
  //         {
  //           heading: "addSubscription",
  //           route: "/apps/subscriptions/add-subscription",
  //         },
  //         {
  //           heading: "viewSubscription",
  //           route: "/apps/subscriptions/view-subscription",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "calendarApp",
  //       route: "/apps/calendar",
  //       keenthemesIcon: "calendar-8",
  //       bootstrapIcon: "bi-calendar3-event",
  //     },
  //     {
  //       sectionTitle: "chat",
  //       route: "/chat",
  //       keenthemesIcon: "message-text-2",
  //       bootstrapIcon: "bi-chat-left",
  //       sub: [
  //         {
  //           heading: "privateChat",
  //           route: "/apps/chat/private-chat",
  //         },
  //         {
  //           heading: "groupChat",
  //           route: "/apps/chat/group-chat",
  //         },
  //         {
  //           heading: "drawerChat",
  //           route: "/apps/chat/drawer-chat",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    heading: "HR",
    route: "/hr",
    pages: [
      {
        sectionTitle: "Employees",
        route: "/hr/employees",
        keenthemesIcon: "office-bag",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Employee",
            route: "/hr/employees/add",
          },
          {
           heading: "List Employees",
           route: "/hr/employees/list",
          },
        ],
      }
    ,{
      heading: "Trainings",
      route: "/hr/trainings",
      keenthemesIcon: "educare",
      bootstrapIcon: "bi-archive",
    }]
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
            route: "/sales/leads/add",
          },
          {
           heading: "List Leads",
           route: "/sales/leads/list",
          },
        ],
      },
      {
        sectionTitle: "Customers",
        route: "/sales/customers",
        keenthemesIcon: "user-edit",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Customers",
            route: "/sales/customers/add",
          },
          {
           heading: "List Customers",
           route: "/sales/customers/list",
          },
        ],
      },
      {
        sectionTitle: "Price List Items",
        route: "/sales/pricelist",
        keenthemesIcon: "bill",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Items",
            route: "/sales/pricelist/add",
          },
          {
           heading: "List Items",
           route: "/sales/pricelist/list",
          },
        ],
      },
      {
        sectionTitle: "Quotations",
        route: "/sales/quotations",
        keenthemesIcon: "note-2",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Quotations",
            route: "/sales/quotations/add",
          },
          {
           heading: "List Quotations",
           route: "/sales/quotations/list",
          },
        ],
      },
      {
        sectionTitle: "Invoices",
        route: "/sales/invoices",
        keenthemesIcon: "message-programming",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "Add Invoices",
            route: "/sales/invoices/add",
          },
          {
           heading: "List Invoices",
           route: "/sales/invoices/list",
          },
        ],
      }
    ]
  },
  {
    heading: "Modules",
    route: "/modules",
    pages:[
      {
      sectionTitle:"CleanRoom",
      route: "/modules/cleanroom",
      keenthemesIcon: "element-plus",
      bootstrapIcon: "bi-archive",
      sub:[
          {
            sectionTitle: "Validation Report",
            route: "/modules/validationreport",
            sub: [
              {
                heading: "Report List",
                route: "/modules/validationreport/list",
              }
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
              }
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
          }
      ]
    }
  ]}
];

export default AdminMenuConfig;
