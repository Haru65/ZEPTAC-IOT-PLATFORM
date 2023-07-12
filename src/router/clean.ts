import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  type RouteRecordRaw,
} from "vue-router";
import {
  getCompany,
  getInvoice,
  getPriceList,
  getPriceListItem,
  getQuotation,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Welcome Admin",
          breadcrumbs: ["Dashboard"],
        },
      },
      {
        path: "/company/list",
        name: "company-list",
        component: () =>
          import("@/views/apps/admin/companies/CompanyListing.vue"),
        meta: {
          pageTitle: "Company List",
          breadcrumbs: ["Company List"],
        },
      },
      {
        path: "/company/add",
        name: "company-add",
        component: () => import("@/views/apps/admin/companies/CompanyAdd.vue"),
        meta: {
          pageTitle: "Company Add",
          breadcrumbs: ["Company Add"],
        },
      },
      {
        path: "/company/edit/:id",
        name: "company-edit",
        beforeEnter: async (to, from, next) => {
          const companyId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getCompany(companyId);
            // //console.log(response);
            if (response.error) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/admin/companies/CompanyEdit.vue"),
        meta: {
          pageTitle: "Company Edit",
          breadcrumbs: ["Company Edit"],
        },
      },
      {
        path: "/users/list",
        name: "users-list",
        component: () => import("@/views/apps/admin/users/UserListing.vue"),
        meta: {
          pageTitle: "User List",
          breadcrumbs: ["User List"],
        },
      },
      {
        path: "/users/add",
        name: "users-add",
        component: () => import("@/views/apps/admin/users/UserAdd.vue"),
        meta: {
          pageTitle: "User Add",
          breadcrumbs: ["User Add"],
        },
      },
      {
        path: "/users/edit/:id",
        name: "users-edit",
        component: () => import("@/views/apps/admin/users/UserEdit.vue"),
        meta: {
          pageTitle: "User Edit",
          breadcrumbs: ["User Edit"],
        },
      },
      {
        path: "/employee/list",
        name: "employee-list",
        component: () =>
          import("@/views/apps/hr/employees/EmployeeListing.vue"),
        meta: {
          pageTitle: "Employee List",
          breadcrumbs: ["Employee List"],
        },
      },
      {
        path: "/leads/list",
        name: "leads-list",
        component: () => import("@/views/apps/sales/leads/LeadsListing.vue"),
        meta: {
          pageTitle: "Leads List",
          breadcrumbs: ["Leads List"],
        },
      },
      {
        path: "/leads/add",
        name: "leads-add",
        component: () => import("@/views/apps/sales/leads/LeadsAdd.vue"),
        meta: {
          pageTitle: "Leads Add",
          breadcrumbs: ["Leads Add"],
        },
      },
      {
        path: "/customers/list",
        name: "customers-list",
        component: () =>
          import("@/views/apps/sales/customers/CustomersListing.vue"),
        meta: {
          pageTitle: "Customers List",
          breadcrumbs: ["Customers List"],
        },
      },
      {
        path: "/customers/add",
        name: "customers-add",
        component: () =>
          import("@/views/apps/sales/customers/CustomersAdd.vue"),
        meta: {
          pageTitle: "Customers Add",
          breadcrumbs: ["Customers Add"],
        },
      },
      {
        path: "/pricelist/list",
        name: "price-list",
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListListing.vue"),
        meta: {
          pageTitle: "Price List",
          breadcrumbs: ["Price List"],
        },
      },
      {
        path: "/pricelist/add",
        name: "price-list-add",
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListAdd.vue"),
        meta: {
          pageTitle: "Price List Item Add",
          breadcrumbs: ["Price List Item Add"],
        },
      },
      {
        path: "/pricelist/edit/:id",
        name: "pricelist-edit",
        beforeEnter: async (to, from, next) => {
          const priceItemId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getPriceListItem(priceItemId.toString());
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/sales/pricelist/PriceListEdit.vue"),
        meta: {
          pageTitle: "Quotation Edit",
          breadcrumbs: ["Quotation Edit"],
        },
      },
      {
        path: "/quotations/list",
        name: "quotation-list",
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsListing.vue"),
        meta: {
          pageTitle: "Quotation List",
          breadcrumbs: ["Quotation List"],
        },
      },
      {
        path: "/quotations/add",
        name: "quotation-add",
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsAdd.vue"),
        meta: {
          pageTitle: "Quotation Add",
          breadcrumbs: ["Quotation Add"],
        },
      },
      {
        path: "/quotations/edit/:id",
        name: "quotation-edit",
        beforeEnter: async (to, from, next) => {
          const quotationId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getQuotation(quotationId);
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () =>
          import("@/views/apps/sales/quotations/QuotationsEdit.vue"),
        meta: {
          pageTitle: "Quotation Edit",
          breadcrumbs: ["Quotation Edit"],
        },
      },
      {
        path: "/invoices/list",
        name: "invoices-list",
        component: () =>
          import("@/views/apps/sales/invoices/InvoicesListing.vue"),
        meta: {
          pageTitle: "Invoices List",
          breadcrumbs: ["Invoices List"],
        },
      },
      {
        path: "/invoices/add",
        name: "invoices-add",
        component: () => import("@/views/apps/sales/invoices/InvoicesAdd.vue"),
        meta: {
          pageTitle: "Invoices Add",
          breadcrumbs: ["Invoices Add"],
        },
      },
      {
        path: "/invoices/edit/:id",
        name: "invoice-edit",
        beforeEnter: async (to, from, next) => {
          const invoiceId = to.params.id;
          //console.log(companyId);
          try {
            const response = await getInvoice(invoiceId);
            console.log(response);
            if (response.error || response.is_active == 0) {
              next("/404"); // Redirect to the fallback route
            } else {
              next(); // Continue to the desired route
            }
          } catch (error) {
            console.error(error);
            next("/404"); // Redirect to the fallback route
          }
        },
        component: () => import("@/views/apps/sales/invoices/InvoicesEdit.vue"),
        meta: {
          pageTitle: "Invoice Edit",
          breadcrumbs: ["Invoice Edit"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Login",
        },
        beforeEnter: async (to, from, next) => {
          const auth = useAuthStore();
          if (auth.isAuthenticated) {
            return next("/dashboard");
          } else {
            return next();
          }
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // theterms route
        path: "/terms",
        name: "terms",
        component: () => import("@/views/crafted/pricing/Terms.vue"),
        meta: {
          pageTitle: "Terms",
        },
      },
      {
        path: "/plans",
        name: "plans",
        component: () => import("@/views/crafted/pricing/Plans.vue"),
        meta: {
          pageTitle: "Plans",
        },
      },
      {
        path: "/contactus",
        name: "contactus",
        component: () => import("@/views/crafted/pricing/ContactUs.vue"),
        meta: {
          pageTitle: "Contact Us",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated !== null) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
