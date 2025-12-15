<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!-- Card title -->
      <div class="card-title">
        <!-- Search -->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input
            type="text"
            v-model="search"
            @input="searchItems"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Alarms"
          />
        </div>
      </div>
      <!-- Card toolbar -->
      <div class="card-toolbar">
        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-danger"
            @click="clearAllAlarms"
            :disabled="tableData.length === 0"
          >
            <KTIcon icon-name="trash" icon-class="fs-2" />
            Clear All Alarms
          </button>
          <button
            type="button"
            class="btn btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#email_client_modal"
          >
            <KTIcon icon-name="sms" icon-class="fs-2" />
            Email Client
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_alarm_modal"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Alarm
          </button>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- Add Alarm Modal -->
      <AlarmAddModal @add-alarm="addAlarm" />
      
      <!-- Email Client Modal -->
      <EmailClientModal />

      <!-- Datatable -->
      <Datatable
        checkbox-label="id"
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <template v-slot:id="{ row: alarm }">
          {{ alarm.id }}
        </template>
        <template v-slot:unit_no="{ row: alarm }">
          <span class="fw-bold text-gray-800">{{ alarm.unit_no }}</span>
        </template>
        <template v-slot:name="{ row: alarm }">
          <a :href="alarm.link" class="text-gray-800 text-hover-primary fw-bolder">
            {{ alarm.name }}
          </a>
        </template>
        <template v-slot:device_name="{ row: alarm }">
          {{ alarm.device_name }}
        </template>
        <template v-slot:location="{ row: alarm }">
          <span class="text-muted">{{ alarm.location }}</span>
        </template>
        <template v-slot:alarm_type="{ row: alarm }">
          {{ alarm.alarm_type }}
        </template>
        <template v-slot:severity="{ row: alarm }">
          <span
            :class="{
              'badge py-2 px-3 fs-7 badge-danger': alarm.severity === 'critical',
              'badge py-2 px-3 fs-7 badge-warning': alarm.severity === 'warning',
              'badge py-2 px-3 fs-7 badge-info': alarm.severity === 'info',
              'badge py-2 px-3 fs-7 badge-success': alarm.severity === 'ok',
              'badge py-2 px-3 fs-7 badge-primary': alarm.severity === 'battery',
            }"
          >
            <i 
              :class="{
                'bi bi-exclamation-triangle me-1': alarm.severity === 'critical',
                'bi bi-exclamation-circle me-1': alarm.severity === 'warning',
                'bi bi-info-circle me-1': alarm.severity === 'info',
                'bi bi-check-circle me-1': alarm.severity === 'ok',
                'bi bi-battery me-1': alarm.severity === 'battery',
              }"
            ></i>
            {{ alarm.severity.toUpperCase() }}
          </span>
        </template>
        <template v-slot:status="{ row: alarm }">
          <span
            :class="{
              'badge py-2 px-3 fs-7 badge-light-success': alarm.status === 'Active',
              'badge py-2 px-3 fs-7 badge-light-danger': alarm.status === 'Inactive',
            }"
          >
            {{ alarm.status }}
          </span>
        </template>
        <template v-slot:pv_values="{ row: alarm }">
          <div class="d-flex flex-wrap gap-1">
            <small class="badge badge-light-primary">PV1: {{ alarm.pv_values.pv1 }}</small>
            <small class="badge badge-light-primary">PV2: {{ alarm.pv_values.pv2 }}</small>
            <small class="badge badge-light-primary">PV3: {{ alarm.pv_values.pv3 }}</small>
            <small class="badge badge-light-primary">PV4: {{ alarm.pv_values.pv4 }}</small>
            <small class="badge badge-light-primary">PV5: {{ alarm.pv_values.pv5 }}</small>
            <small class="badge badge-light-primary">PV6: {{ alarm.pv_values.pv6 }}</small>
          </div>
        </template>
        <template v-slot:actions="{ row: alarm }">
          <div class="dropdown">
            <a
              href="#"
              class="text-gray-700 hover:text-gray-700 cursor-pointer transition-colors"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click.prevent
            >
              <KTIcon icon-name="dots-circle-vertical" icon-class="fs-2x" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end min-w-200px py-2 shadow-sm">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-primary cursor-pointer"
                  @click.prevent="viewAlarmDetails(alarm)"
                >
                  <KTIcon icon-name="eye" icon-class="fs-3 text-primary" />
                  <span class="text-primary">View Details</span>
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-info cursor-pointer"
                  @click.prevent="sendSMSAlert(alarm)"
                >
                  <KTIcon icon-name="sms" icon-class="fs-3 text-info" />
                  <span class="text-info">Send SMS</span>
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-warning cursor-pointer"
                  @click.prevent="sendEmailAlert(alarm)"
                >
                  <KTIcon icon-name="sms" icon-class="fs-3 text-warning" />
                  <span class="text-warning">Send Email</span>
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-success cursor-pointer"
                  @click.prevent="composeCustomEmail(alarm)"
                >
                  <KTIcon icon-name="message-text-2" icon-class="fs-3 text-success" />
                  <span class="text-success">Compose Email</span>
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-danger cursor-pointer"
                  @click.prevent="deleteItem(alarm.id)"
                >
                  <KTIcon icon-name="trash" icon-class="fs-3 text-danger" />
                  <span class="text-danger">Delete</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </Datatable>
      <div class="d-flex justify-content-between p-2">
        <div>
          <el-select
            class="w-100px rounded-2"
            v-model="limit"
            filterable
            @change="updateLimit"
          >
            <el-option
              v-for="item in limits"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <ul class="pagination">
          <li class="paginate_button page-item" style="cursor: auto">
            <span @click="prevPage" class="paginate_button page-link">
              <i class="ki-duotone ki-left fs-2"></i>
            </span>
          </li>
          <li class="paginate_button disabled">
            <span class="paginate_button page-link"> Page - {{ page }} </span>
          </li>
          <li class="paginate_button page-item" style="cursor: pointer">
            <span @click="nextPage" class="paginate_button page-link">
              <i class="ki-duotone ki-right fs-2"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AlarmAddModal from "./AlarmAddModal.vue";
import EmailClientModal from "@/components/modals/EmailClientModal.vue";
import Swal from "sweetalert2";
import arraySort from "array-sort";

interface IAlarm {
  id: number;
  name: string;
  device_name: string;
  unit_no: string;
  location: string;
  parameter: string;
  alarm_type: string;
  status: string;
  severity: 'critical' | 'warning' | 'info' | 'ok' | 'battery';
  pv_values: {
    pv1: number;
    pv2: number;
    pv3: number;
    pv4: number;
    pv5: number;
    pv6: number;
  };
  notification_config: {
    sms_numbers: string[];
    email_ids: string[];
  };
  link: string;
  created_at: string;
  last_modified: string;
}

export default defineComponent({
  name: "alarm-listing",
  components: {
    Datatable,
    AlarmAddModal,
    EmailClientModal,
  },
  setup() {
    const tableHeader = ref([
      { columnName: "ID", columnLabel: "id", sortEnabled: true, columnWidth: 50 },
      { columnName: "Unit No", columnLabel: "unit_no", sortEnabled: true, columnWidth: 100 },
      { columnName: "Alarm Name", columnLabel: "name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Device", columnLabel: "device_name", sortEnabled: true, columnWidth: 120 },
      { columnName: "Location", columnLabel: "location", sortEnabled: true, columnWidth: 120 },
      { columnName: "Type", columnLabel: "alarm_type", sortEnabled: true, columnWidth: 100 },
      { columnName: "Severity", columnLabel: "severity", sortEnabled: true, columnWidth: 100 },
      { columnName: "Status", columnLabel: "status", sortEnabled: true, columnWidth: 80 },
      { columnName: "PV Values", columnLabel: "pv_values", sortEnabled: false, columnWidth: 200 },
      { columnName: "Actions", columnLabel: "actions", sortEnabled: false, columnWidth: 100 },
    ]);

    const dummyData: IAlarm[] = [];

    const tableData = ref<IAlarm[]>([...dummyData]);
    const initValues = ref<IAlarm[]>([...dummyData]);
    const search = ref<string>("");
    const loading = ref(false);
    const page = ref(1);
    const limit = ref(10);
    const limits = ref([10, 25, 50]);
    const selectedIds = ref<number[]>([]);
    const more = ref(true);

    const addAlarm = (newAlarm: IAlarm) => {
      tableData.value.push(newAlarm);
      initValues.value.push(newAlarm);
      Swal.fire({
        title: "Success",
        text: "Alarm added successfully!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: { confirmButton: "btn btn-primary" },
      });
    };

    const deleteItem = async (id: number) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this alarm!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        tableData.value = tableData.value.filter((item) => item.id !== id);
        initValues.value = initValues.value.filter((item) => item.id !== id);
        Swal.fire({
          title: "Deleted!",
          text: "Alarm has been deleted.",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
      }
    };

    const clearAllAlarms = async () => {
      if (tableData.value.length === 0) {
        Swal.fire({
          title: "No Alarms",
          text: "There are no alarms to clear.",
          icon: "info",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
        return;
      }

      const result = await Swal.fire({
        title: "Clear All Alarms?",
        text: `This will permanently delete all ${tableData.value.length} alarm(s). This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, clear all!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        const alarmsCount = tableData.value.length;
        tableData.value = [];
        initValues.value = [];
        
        Swal.fire({
          title: "Cleared!",
          text: `All ${alarmsCount} alarm(s) have been cleared successfully.`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
        
        // Reset pagination
        page.value = 1;
        updateTableData();
      }
    };

    const searchItems = () => {
      tableData.value = [...initValues.value];
      if (search.value) {
        tableData.value = tableData.value.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(search.value.toLowerCase())
          )
        );
      }
    };

    const sort = (sort: { label: string; order: string }) => {
      const reverse = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: number[]) => {
      selectedIds.value = selectedItems;
    };

    const updateLimit = (newLimit: number) => {
      limit.value = newLimit;
      page.value = 1;
      updateTableData();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        updateTableData();
      }
    };

    const nextPage = () => {
      if (more.value) {
        page.value++;
        updateTableData();
      }
    };

    const updateTableData = () => {
      loading.value = true;
      const start = (page.value - 1) * limit.value;
      const end = start + limit.value;
      tableData.value = initValues.value.slice(start, end);
      more.value = end < initValues.value.length;
      setTimeout(() => {
        loading.value = false;
      }, 250);
    };

    // New enhanced methods
    const viewAlarmDetails = (alarm: IAlarm) => {
      // Navigate to alarm details or show modal
      window.open(alarm.link, '_blank');
    };

    const sendSMSAlert = async (alarm: IAlarm) => {
      if (alarm.notification_config.sms_numbers.length === 0) {
        Swal.fire({
          title: "No SMS Numbers",
          text: "No SMS numbers configured for this alarm.",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary" },
        });
        return;
      }

      const result = await Swal.fire({
        title: "Send SMS Alert",
        html: `
          <div class="text-start">
            <p><strong>Alarm:</strong> ${alarm.name}</p>
            <p><strong>Unit:</strong> ${alarm.unit_no}</p>
            <p><strong>Location:</strong> ${alarm.location}</p>
            <p><strong>Type:</strong> ${alarm.alarm_type}</p>
            <p><strong>SMS Numbers:</strong> ${alarm.notification_config.sms_numbers.join(', ')}</p>
            <p><strong>PV Values:</strong> PV1=${alarm.pv_values.pv1}, PV2=${alarm.pv_values.pv2}, PV3=${alarm.pv_values.pv3}</p>
          </div>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Send SMS",
        cancelButtonText: "Cancel",
        customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-secondary" },
      });

      if (result.isConfirmed) {
        // Here you would integrate with your SMS service
        Swal.fire({
          title: "SMS Sent!",
          text: `SMS alert sent to ${alarm.notification_config.sms_numbers.length} numbers.`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary" },
        });
      }
    };

    const sendEmailAlert = async (alarm: IAlarm) => {
      if (alarm.notification_config.email_ids.length === 0) {
        Swal.fire({
          title: "No Email IDs",
          text: "No email addresses configured for this alarm.",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary" },
        });
        return;
      }

      const result = await Swal.fire({
        title: "Send Email Alert",
        html: `
          <div class="text-start">
            <p><strong>Alarm:</strong> ${alarm.name}</p>
            <p><strong>Unit:</strong> ${alarm.unit_no}</p>
            <p><strong>Location:</strong> ${alarm.location}</p>
            <p><strong>Type:</strong> ${alarm.alarm_type}</p>
            <p><strong>Email IDs:</strong> ${alarm.notification_config.email_ids.join(', ')}</p>
            <p><strong>PV Values:</strong> PV1=${alarm.pv_values.pv1}, PV2=${alarm.pv_values.pv2}, PV3=${alarm.pv_values.pv3}</p>
            <p><strong>Link:</strong> <a href="${alarm.link}" target="_blank">View Device</a></p>
          </div>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Send Email",
        cancelButtonText: "Cancel",
        customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-secondary" },
      });

      if (result.isConfirmed) {
        // Here you would integrate with your email service
        Swal.fire({
          title: "Email Sent!",
          text: `Email alert sent to ${alarm.notification_config.email_ids.length} recipients.`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary" },
        });
      }
    };

    const composeCustomEmail = (alarm: IAlarm) => {
      // Pre-fill email client with alarm details
      const emailSubject = `🚨 ALARM: ${alarm.name} - ${alarm.unit_no}`;
      const emailContent = `
        <h2>Alarm Notification</h2>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Alarm Name:</strong> ${alarm.name}</p>
          <p><strong>Unit Number:</strong> ${alarm.unit_no}</p>
          <p><strong>Location:</strong> ${alarm.location}</p>
          <p><strong>Device:</strong> ${alarm.device_name}</p>
          <p><strong>Parameter:</strong> ${alarm.parameter}</p>
          <p><strong>Alarm Type:</strong> ${alarm.alarm_type}</p>
          <p><strong>Severity:</strong> <span style="color: ${getSeverityColor(alarm.severity)}; font-weight: bold;">${alarm.severity.toUpperCase()}</span></p>
          <p><strong>Status:</strong> ${alarm.status}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <h3>Process Variable Values:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV1: ${alarm.pv_values.pv1}</span>
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV2: ${alarm.pv_values.pv2}</span>
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV3: ${alarm.pv_values.pv3}</span>
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV4: ${alarm.pv_values.pv4}</span>
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV5: ${alarm.pv_values.pv5}</span>
          <span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">PV6: ${alarm.pv_values.pv6}</span>
        </div>
        
        <p><strong>Device Link:</strong> <a href="${window.location.origin}${alarm.link}" target="_blank">View Device Details</a></p>
        
        <hr>
        <p><small>This alarm notification was generated automatically by the ZEPTAC IoT Platform.</small></p>
      `;

      // Open email client modal with pre-filled data
      const emailModal = document.getElementById('email_client_modal');
      if (emailModal) {
        const modal = new (window as any).bootstrap.Modal(emailModal);
        modal.show();
        
        // Dispatch custom event to pre-fill email form
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('fillEmailForm', {
            detail: {
              subject: emailSubject,
              content: emailContent,
              recipients: alarm.notification_config.email_ids,
              template: 'alarm'
            }
          }));
        }, 500);
      }
    };

    const getSeverityColor = (severity: string) => {
      const colors = {
        critical: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        ok: '#28a745',
        battery: '#007bff'
      };
      return colors[severity] || '#6c757d';
    };

    return {
      tableData,
      tableHeader,
      search,
      searchItems,
      selectedIds,
      sort,
      onItemSelect,
      loading,
      limit,
      limits,
      prevPage,
      nextPage,
      page,
      addAlarm,
      deleteItem,
      clearAllAlarms,
      updateLimit,
      viewAlarmDetails,
      sendSMSAlert,
      sendEmailAlert,
      composeCustomEmail,
      getSeverityColor,
    };
  },
});
</script>