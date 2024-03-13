<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        Import CSV File
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <div class="row mb-6">
      <div class="form-group col-md-12 mb-8 mb-sd-8">
        <label
          class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
          >Upload File
        </label>
        <label
          class="btn btn-outline btn-outline-dashed btn-outline-default p-10 d-flex align-items-center position-relative"
        >
          <i
            class="bi bi-upload position-absolute fs-1 top-50 start-50 translate-middle"
          ></i>
          <input
            type="file"
            accept=".xls"
            @change="handleChange"
            class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
          />
        </label>
      </div>
    </div>
    <ExcelFiles
      v-bind:filesData="$props.allFilesData"
      v-on:deleteFile="deleteTheFile"
    />
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import * as xlsx from "xlsx";
import ExcelFiles from "./ExcelFiles.vue";
import Swal from "sweetalert2";

interface readingsData {
  id: string;
  temp: number;
  rh: number;
}

interface Logger {
  id: string;
  file_name: string;
  file_size: number;
  instrument_name: string;
  logger_id: string;
  data: Array<readingsData>;
  instrument_id: string;
  MAX_TEMP: number;
  MIN_TEMP: number;
  MAX_RH: number;
  MIN_RH: number;
  AVG_TEMP: number;
  AVG_RH: number;
}

export default defineComponent({
  name: "step-3",
  components: {
    Field,
    ErrorMessage,
    ExcelFiles,
  },

  props: ["allFilesData"],
  emits: ["store-excel-file", "deleteExcel"],
  setup(props, { emit }) {
    // Global attributes
    // 432 records are present in the excel
    const range = "A12:D455";
    const instrumentNameCell = "A1";
    const loggerIdCell = "A6";

    onMounted(async () => {});

    const exportToExcel = () => {
      // const worksheet = xlsx.utils.json_to_sheet(ReadingsData.value);
      // const workbook = xlsx.utils.book_new();
      // xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // xlsx.writeFile(workbook, "exported_data.xlsx");
    };

    const handleChange = async (e) => {

      let fileInput = e.target;
      const file = e.target.files[0];

      try {
        if (file && file.type == "application/vnd.ms-excel") {
          const rows = ref([]);
          const ReadingsData = ref<readingsData[]>([]);

          const tempData = ref<Logger>({
            id: "",
            file_name: "",
            instrument_name: "",
            instrument_id: "",
            logger_id: "",
            file_size: 0,
            data: [],
            MAX_TEMP: 0,
            MIN_TEMP: 0,
            MAX_RH: 0,
            MIN_RH: 0,
            AVG_TEMP: 0,
            AVG_RH: 0,
          });

          // Read the file as an ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();

          // Parse the workbook using xlsx.read
          const wb = xlsx.read(arrayBuffer, { type: "array" });

          console.log(wb);

          /* Update data with records from the specified range */
          rows.value = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            range,
          });

          // store instrument name
          const instrumentName =
            wb.Sheets[wb.SheetNames[0]][instrumentNameCell]?.v;
          console.log(instrumentName);

          // store Logger ID
          let loggerId = wb.Sheets[wb.SheetNames[0]][loggerIdCell]?.v;
          console.log(loggerId);

          // store file name
          const fileName = file.name;

          // store file size
          const fileSize = file.size;

          // maaping the data in particular format
          ReadingsData.value = rows.value.map(
            (item: { [key: string]: any }) => {
              return {
                id: item["id"],
                temp: parseFloat(item["CH 1[°C]"]),
                rh: parseFloat(item["CH 2[%rH]"]),
              };
            }
          );

          // finally push this data

          tempData.value.file_name = fileName;
          tempData.value.file_size = fileSize;
          tempData.value.instrument_name = instrumentName;
          tempData.value.logger_id = Number(loggerId).toString();
          tempData.value.data = ReadingsData.value;

          // calculate MAX, MIN of TEMP/RH
          const tempValues = ReadingsData.value.map((data) => data.temp);
          const rhValues = ReadingsData.value.map((data) => data.rh);

          tempData.value.MAX_TEMP = Math.max(...tempValues);
          tempData.value.MIN_TEMP = Math.min(...tempValues);

          tempData.value.MAX_RH = Math.max(...rhValues);
          tempData.value.MIN_RH = Math.min(...rhValues);

          // Calculate average temperature
          const sumTemp = tempValues.reduce((acc, currentValue) => acc + currentValue, 0);
          tempData.value.AVG_TEMP = Number((sumTemp / tempValues.length).toFixed(2));

          // Calculate average relative humidity
          const sumRH = rhValues.reduce((acc, currentValue) => acc + currentValue, 0);
          tempData.value.AVG_RH = Number((sumRH / rhValues.length).toFixed(2));
          
          console.log(tempData.value);

          await emit("store-excel-file", tempData);

          fileInput.value = '';
        } else {
          alert("Please select .xls file");
        }
      } catch (error) {
        console.error("Error reading the file:", error);
        alert(
          "Error occured during api call. Please reload the page and try again."
        );
      }
    };

    const showSuccessAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const deleteTheFile = async (index) => {
      await emit("deleteExcel", index);
    };

    return {
      handleChange,
      allFilesData: props.allFilesData,
      exportToExcel,
      deleteTheFile,
    };
  },
});
</script>

<style>
.el-input__inner, .el-select__inner {
  font-weight: 500;
}
.el-input__wrapper, .el-select__wrapper {
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
  color: var(--bs-gray-700);
  transition: color 0.2s ease;
  appearance: none;
  line-height: 1.5;
  border: none !important;
  padding-top: 0.825rem;
  padding-bottom: 0.825rem;
  padding-left: 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  box-shadow: none !important;
}
</style>