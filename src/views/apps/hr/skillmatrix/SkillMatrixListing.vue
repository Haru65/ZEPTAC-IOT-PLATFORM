<template>
    <div class="card">
            <!--begin::Add customer-->
            <router-link to="/skill_matrix/add" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Add Skill Matrix
            </router-link>
            <!--end::Add customer-->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import {
    getTrainings,
    deleteTraining,
    TrainingSearch,
  } from "@/stores/api";
  import arraySort from "array-sort";
  import moment from "moment";
  import Swal from "sweetalert2";
  
  export default defineComponent({
    name: "training-list",
    components: {
    },
    setup() {

      return {  
      };
    },
  });
  </script>
  
  