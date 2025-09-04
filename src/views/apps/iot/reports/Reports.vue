<template>
  <div class="w-100">
    <div class="d-flex justify-content-end align-items-center mb-3" style="min-height:48px;">
      <button
        class="btn btn-primary"
        @click="exportPDF"
        style="min-width:120px;"
      >
        Export
      </button>
    </div>
    <div id="report-content" class="row g-4">
      <div class="col-lg-12">
        <TemperatureHumidityChart
          widget-classes="card-xl-stretch mb-4"
          :height="300"
        />
      </div>
      <div class="col-lg-12">
        <EnergyConsumption
          widget-classes="card-xl-stretch mb-4"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>
    
  <script lang="ts">
import { defineComponent, ref } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TemperatureHumidityChart from "./TemperatureHumidityChart.vue";
import EnergyConsumption from "./EnergyConsumption.vue";
export default defineComponent({
  name: "devices",
  components: {
    TemperatureHumidityChart,
    EnergyConsumption,
  },
  setup() {
    const exportPDF = async () => {
      const reportElement = document.getElementById("report-content");
      if (!reportElement) return;
      const canvas = await html2canvas(reportElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save("report.pdf");
    };
    return {
      exportPDF
    };
  },
});
</script>
  