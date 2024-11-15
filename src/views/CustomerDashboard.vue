<template>
    <div class="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      
      <div class="card-container">
        <div class="card" v-for="(item, index) in dashboardStats" :key="index">
          <h3>{{ item.title }}</h3>
          <p>{{ item.value }}</p>
        </div>
      </div>
  
      <button @click="handleRefresh">Refresh Data</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  interface DashboardItem {
    title: string;
    value: string | number;
  }
  
  export default defineComponent({
    name: 'customer-dashboard',
    setup() {
      // Sample dashboard statistics
      const dashboardStats = ref<DashboardItem[]>([
        { title: 'Total Orders', value: 120 },
        { title: 'Pending Orders', value: 5 },
        { title: 'Total Spend', value: '$1,250' },
        { title: 'Loyalty Points', value: 1500 },
      ]);
  
      // Method to simulate a data refresh
      const handleRefresh = () => {
        console.log('Refreshing dashboard data...');
        // Simulate new data coming in
        dashboardStats.value = [
          { title: 'Total Orders', value: 125 },
          { title: 'Pending Orders', value: 3 },
          { title: 'Total Spend', value: '$1,350' },
          { title: 'Loyalty Points', value: 1550 },
        ];
      };
  
      return {
        dashboardStats,
        handleRefresh,
      };
    },
  });
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .card-container {
    display: flex;
    gap: 20px;
  }
  
  .card {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  