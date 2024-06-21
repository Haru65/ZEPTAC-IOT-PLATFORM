import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router/clean";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";

import "@/core/plugins/prismjs";

const app = createApp(App);

// Define a function to track route changes
function trackRouteChange(toRoute, fromRoute) {
  const eventName = 'Route Change';
  const eventCategory = 'Navigation';
  const eventLabel = `From: ${fromRoute.fullPath} - To: ${toRoute.fullPath}`;
  
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel
    });
  }
}

// Add a router guard to track page views
// router.afterEach((to, from) => {
//   // Track route change event
//   trackRouteChange(to, from);
// });

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
