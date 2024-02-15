<template>
  <div class="card-body border-top px-9 pt-3 pb-4">
    <!--begin::Table-->
    <div class="table-responsive">
      <table class="table table-row-dashed border-gray-300 align-middle gy-6">
        <thead class="fs-4 fw-bold">
          <tr>
            <th class="min-w-250px">Permission Group</th>
            <th>Create</th>
            <th>Update</th>
            <th>View</th>
            <th>Delete</th>
            <th>List</th>
          </tr>
        </thead>
        <tbody class="fs-6 fw-semobold">
          <tr v-for="(row, index) in chunkedPermissions" :key="index">
            <td class="min-w-250px">
              <span class="fs-4 fw-semibold">
                {{ row[0] ? row[0].name.toUpperCase().split(" ")[1] : "" }}
              </span>
            </td>
            <template
              v-for="(permission, columnIndex) in row"
              :key="permission.id"
            >
              <td>
                <div class="form-check form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="permission.name"
                    :checked="permission.isPresent"
                    :id="'kt_settings_notification_' + permission.name"
                    @click="TogglePermission"
                  />
                  <label
                    class="form-check-label ps-2 text-gray-700"
                    :for="'kt_settings_notification_' + permission.name"
                    >{{ permission.name }}</label
                  >
                </div>
              </td>
              <!-- Add empty cells if the row doesn't have enough permissions -->
              <template
                v-if="columnIndex === row.length - 1 && columnIndex < 4"
              >
                <td v-for="i in 4 - columnIndex" :key="'empty-' + i"></td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <!--end::Table-->
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";

interface Permission {
  id: number;
  name: string;
  isPresent: boolean;
}

export default {
  props: {
    permissionsWithStatus: {
      type: Array as () => Permission[],
      required: true,
    },
  },

  emit: ["appendPermission"],

  setup(props: { permissionsWithStatus: Permission[] }, { emit }) {
    const chunkedPermissions = computed(() => {
      const chunkSize = 5;
      const permissions = props.permissionsWithStatus;
      const chunks: Permission[][] = [];
      for (let i = 0; i < permissions.length; i += chunkSize) {
        chunks.push(permissions.slice(i, i + chunkSize));
      }
      return chunks;
    });

    const TogglePermission = async (e) => {
      console.log(e.target.checked);
      console.log(e.target.value);
      await emit("appendPermission", e);
    };

    return {
      chunkedPermissions,
      TogglePermission,
      permissionsWithStatus: props.permissionsWithStatus,
    };
  },
};
</script>