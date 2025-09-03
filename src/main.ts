import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";
// main.js - Add this BEFORE creating the Vue app
const originalJSONParse = JSON.parse;
JSON.parse = function(text) {
  try {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      console.warn('Empty or invalid JSON data, returning empty object');
      return {};
    }
    return originalJSONParse.call(this, text);
  } catch (error) {
    console.error('JSON Parse Error:', error, 'Input:', text);
    return {};
  }
};

// Your Vue app creation code continues here...

/*
Using the main router without auth checks
 */
import router from "./router";
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
    // Ensure GA config uses cookie_domain: 'auto'
    window.gtag('config', 'G-XXXXXXX', { cookie_domain: `zeptac-iot-platform-vp3h.vercel.app` }); // Replace G-XXXXXXX with your GA ID
    window.gtag('event', eventName, {
      'event_category': eventCategory,  
      'event_label': eventLabel
    });
  }
  // If you do NOT want GA, comment out or remove the above block safely.
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
