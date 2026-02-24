<template>
  <div>
    <!-- Search & Filters Row -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
      <!-- Search Input -->
      <div class="position-relative w-100 w-sm-auto">
        <KTIcon
          icon-name="magnifier"
          icon-class="fs-1 position-absolute top-50 translate-middle-y ms-3"
        />
        <input
          type="text"
          v-model="searchQuery"
          @input="searchItems"
          class="form-control form-control ps-10 w-100 w-sm-250px text-gray-800"
          :placeholder="showZoneView ? 'Search zones...' : 'Search devices by name...'"
        />
      </div>

      <!-- Buttons Group -->
      <div class="d-flex gap-2 flex-wrap">
        <!-- Add Zone Button (Zone View Only) -->
        <button 
          v-show="showZoneView"
          type="button"
          class="btn btn-success"
          @click="showAddZoneModal = true"
        >
          <i class="bi bi-plus-circle me-2"></i>Add Zone
        </button>

        <!-- Remove Zone Button (Zone View Only) -->
        <button 
          v-show="showZoneView"
          type="button"
          class="btn btn-danger"
          @click="showRemoveZoneModal = true"
        >
          <i class="bi bi-trash me-2"></i>Remove Zone
        </button>

        <!-- Add Cluster Button (Zone View Only) -->
        <button 
          v-show="showZoneView"
          type="button"
          class="btn btn-warning"
          @click="showAddClusterModal = true"
        >
          <i class="bi bi-plus-circle me-2"></i>Add Cluster
        </button>

        <!-- Show/Hide Clusters Button -->
        <button 
          type="button"
          class="btn"
          :class="showClusterView ? 'btn-info' : 'btn-outline-info'"
          @click="showClusterView = !showClusterView"
        >
          <i class="bi bi-diagram-2 me-2"></i>{{ showClusterView ? 'Hide' : 'Show' }} Clusters
        </button>
      </div>
    </div>

    <!-- Breadcrumb Navigation -->
    <nav v-if="!showZoneView" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">
          <a href="#" @click.prevent="goBackToZones" class="text-decoration-none">
            <i class="bi bi-house me-2"></i>Zones
          </a>
        </li>
        <li class="breadcrumb-item active">{{ selectedZone?.name }}</li>
      </ol>
    </nav>

    <!-- Zone View - Overlay Style -->
    <div v-if="showZoneView" class="zones-container">
      <div class="row g-4">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12"
          v-for="zone in filteredZones"
          :key="zone.id"
        >
          <div 
            class="zone-card card h-100 shadow-sm cursor-pointer transition-all"
            @click="selectZone(zone)"
            style="cursor: pointer; transition: all 0.3s ease;"
            @mouseover="cardHovered = zone.id"
            @mouseout="cardHovered = null"
            :style="{
              transform: cardHovered === zone.id ? 'translateY(-5px)' : 'translateY(0)',
              boxShadow: cardHovered === zone.id ? '0 10px 25px rgba(0,0,0,0.1)' : ''
            }"
          >
            <div class="card-body text-center">
              <!-- Zone Icon -->
              <div class="mb-3">
                <i class="bi bi-diagram-2 fs-1" :style="{ color: zone.color || '#007bff' }"></i>
              </div>
              
              <!-- Zone Name -->
              <h5 class="card-title fw-bold mb-2">{{ zone.name }}</h5>
              
              <!-- Device Count Badge -->
              <div class="mb-3">
                <span class="badge bg-primary">{{ zone.deviceCount }} Devices</span>
              </div>
              
              <!-- Zone Description -->
              <p class="card-text text-muted small">{{ zone.description }}</p>
              
              <!-- Click to View Arrow -->
              <div class="mt-3 text-primary">
                <i class="bi bi-chevron-right"></i> View Devices
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Zones Message -->
      <div v-if="filteredZones.length === 0" class="text-center text-muted py-10">
        <i class="bi bi-search fs-1 mb-3"></i>
        <p class="fs-5 fw-semibold mb-1">No zones found</p>
        <p class="small">Try adjusting your search criteria.</p>
      </div>
    </div>

    <!-- Device View - After Zone Selected -->
    <div v-else>
      <!-- Nav Tabs (Filters) -->
      <ul class="nav nav-tabs mb-5 cursor-pointer">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentFilter === 'all' }"
            @click="applyFilter('all')"
          >
            All
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentFilter === 'online' }"
            @click="applyFilter('online')"
          >
            Online
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentFilter === 'offline' }"
            @click="applyFilter('offline')"
          >
            Offline
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentFilter === 'warning' }"
            @click="applyFilter('warning')"
          >
            Warning
          </a>
        </li>
      </ul>

      <!-- Broadcast Message Button -->
      <div class="mb-5 d-flex gap-2">
        <button 
          type="button" 
          class="btn btn-primary"
          @click="openAddDeviceModal"
        >
          <i class="bi bi-plus-circle me-2"></i>Add Device
        </button>
        <button 
          type="button" 
          class="btn btn-info"
          @click="showBroadcast = !showBroadcast"
        >
          <i class="bi bi-broadcast me-2"></i>
          {{ showBroadcast ? 'Hide Broadcast' : 'Broadcast Message' }}
        </button>
      </div>

      <!-- Broadcast Message Component -->
      <div v-if="showBroadcast" class="mb-6">
        <BroadcastMessage />
      </div>

      <!-- Devices Grid -->
      <div v-if="filteredDevices.length > 0" class="row g-4">
        <div
          class="col-lg-4 col-md-6 col-sm-12"
          v-for="device in filteredDevices"
          :key="device.id"
        >
          <DeviceCardWidget v-bind="device" @deviceRemoved="handleDeviceRemoved" />
        </div>
      </div>

      <!-- No Devices Found Message -->
      <div v-else class="text-center text-muted py-10">
        <i class="bi bi-search fs-1 mb-3"></i>
        <p class="fs-5 fw-semibold mb-1">No devices found in {{ selectedZone?.name }}</p>
        <p class="small">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Zone Cluster Overlay Component - Only rendered and computed when active -->
    <div v-if="showClusterView && !selectedZone && allDevices.length > 0" class="mb-6">
      <ZoneClusterOverlay 
        :key="'cluster-' + allDevices.length"
        :devices="allDevices" 
        @clusterSelected="handleClusterSelected"
      />
    </div>

    <!-- Add Zone Modal -->
    <div v-if="showAddZoneModal" class="modal-backdrop"></div>
    <div v-if="showAddZoneModal" class="modal d-block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Zone</h5>
            <button type="button" class="btn-close" @click="showAddZoneModal = false" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addNewZone">
            <div class="modal-body">
              <!-- Zone Name -->
              <div class="mb-3">
                <label for="zoneName" class="form-label fw-bold">Zone Name <span class="text-danger">*</span></label>
                <input 
                  v-model="newZoneForm.name"
                  type="text" 
                  class="form-control" 
                  id="zoneName"
                  placeholder="e.g., Building A, Floor 2"
                  required
                />
              </div>

              <!-- Zone Description -->
              <div class="mb-3">
                <label for="zoneDescription" class="form-label fw-bold">Description</label>
                <textarea 
                  v-model="newZoneForm.description"
                  class="form-control" 
                  id="zoneDescription"
                  rows="3"
                  placeholder="Enter zone description..."
                ></textarea>
              </div>

              <!-- Zone Color -->
              <div class="mb-3">
                <label class="form-label fw-bold">Zone Color</label>
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <button 
                    v-for="color in availableColors"
                    :key="color"
                    type="button"
                    class="color-picker"
                    :style="{ 
                      backgroundColor: color, 
                      border: newZoneForm.color === color ? '3px solid #333' : '2px solid #dee2e6',
                      boxShadow: newZoneForm.color === color ? '0 0 8px rgba(0,0,0,0.3)' : 'none'
                    }"
                    @click="newZoneForm.color = color"
                    title="Select this color"
                  ></button>
                </div>
                <input 
                  v-model="newZoneForm.color"
                  type="text" 
                  class="form-control" 
                  id="zoneColor"
                  placeholder="#007bff"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showAddZoneModal = false">Cancel</button>
              <button type="submit" class="btn btn-success">
                <i class="bi bi-plus-circle me-2"></i>Add Zone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Cluster Modal -->
    <div v-if="showAddClusterModal" class="modal-backdrop"></div>
    <div v-if="showAddClusterModal" class="modal d-block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Cluster</h5>
            <button type="button" class="btn-close" @click="showAddClusterModal = false" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addNewCluster">
            <div class="modal-body">
              <!-- Cluster Name -->
              <div class="mb-3">
                <label for="clusterName" class="form-label fw-bold">Cluster Name <span class="text-danger">*</span></label>
                <input 
                  v-model="newClusterForm.name"
                  type="text" 
                  class="form-control" 
                  id="clusterName"
                  placeholder="e.g., Main Hall Cluster, Office Zone"
                  required
                />
              </div>

              <!-- Cluster Description -->
              <div class="mb-3">
                <label for="clusterDescription" class="form-label fw-bold">Description</label>
                <textarea 
                  v-model="newClusterForm.description"
                  class="form-control" 
                  id="clusterDescription"
                  rows="3"
                  placeholder="Enter cluster description..."
                ></textarea>
              </div>

              <!-- Cluster Color -->
              <div class="mb-3">
                <label class="form-label fw-bold">Cluster Color</label>
                <div class="d-flex gap-2 flex-wrap mb-2">
                  <button 
                    v-for="color in availableColors"
                    :key="color"
                    type="button"
                    class="color-picker"
                    :style="{ 
                      backgroundColor: color, 
                      border: newClusterForm.color === color ? '3px solid #333' : '2px solid #dee2e6',
                      boxShadow: newClusterForm.color === color ? '0 0 8px rgba(0,0,0,0.3)' : 'none'
                    }"
                    @click="newClusterForm.color = color"
                    title="Select this color"
                  ></button>
                </div>
                <input 
                  v-model="newClusterForm.color"
                  type="text" 
                  class="form-control" 
                  id="clusterColor"
                  placeholder="#fd7e14"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showAddClusterModal = false">Cancel</button>
              <button type="submit" class="btn btn-warning">
                <i class="bi bi-plus-circle me-2"></i>Add Cluster
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Remove Zone Modal -->
    <div v-if="showRemoveZoneModal" class="modal-backdrop"></div>
    <div v-if="showRemoveZoneModal" class="modal d-block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Remove Zone</h5>
            <button type="button" class="btn-close" @click="showRemoveZoneModal = false" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="zoneToRemove" class="form-label fw-bold">Select Zone to Remove <span class="text-danger">*</span></label>
              <select 
                v-model="zoneToDelete"
                @change="(e) => { console.log('🔄 Zone selected:', zoneToDelete); }"
                class="form-control" 
                id="zoneToRemove"
              >
                <option :value="null">-- Select a zone to remove --</option>
                <option v-for="zone in zones" :key="zone.id || zone._id" :value="zone">
                  {{ zone.name }} ({{ zone.deviceCount }} devices)
                </option>
              </select>
              <small class="text-muted d-block mt-2">
                <strong>Warning:</strong> This will delete the selected zone and cannot be undone.
              </small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showRemoveZoneModal = false">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger"
              @click="() => { console.log('🔴 REMOVE BUTTON CLICKED'); removeZone(); }"
              :disabled="!zoneToDelete"
            >
              <i class="bi bi-trash me-2"></i>Remove Zone
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Device Modal -->
    <AddDeviceModal ref="addDeviceModalRef" :zones="zones" @deviceCreated="handleDeviceCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import DeviceCardWidget from "@/components/iot/component/dashboard/DeviceCardWidget.vue";
import BroadcastMessage from "@/components/iot/BroadcastMessage.vue";
import AddDeviceModal from "@/components/iot/AddDeviceModal.vue";
import ZoneClusterOverlay from "@/components/iot/component/ZoneClusterOverlay.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";

// Interfaces
interface Zone {
  id: string;
  name: string;
  description: string;
  color: string;
  deviceCount: number;
}

type DeviceStatus = "online" | "offline" | "warning" | "critical";

interface Metric {
  type: string;
  value: number;
  icon: string;
}

interface Device {
  id: string;
  name: string;
  icon: string;
  type: string;
  location: string;
  status: DeviceStatus;
  lastSeen: string;
  metrics: Metric[];
  zoneId?: string;
}

export default defineComponent({
  name: "DevicesWithZones",
  components: {
    DeviceCardWidget,
    BroadcastMessage,
    AddDeviceModal,
    ZoneClusterOverlay,
    KTIcon,
  },
  setup() {
    // State Management
    const showZoneView = ref(true);
    const showClusterView = ref(false);
    const showAddZoneModal = ref(false);
    const showAddClusterModal = ref(false);
    const showRemoveZoneModal = ref(false);
    const zoneToDelete = ref<Zone | null>(null);
    const addDeviceModalRef = ref<any>(null);
    const selectedZone = ref<Zone | null>(null);
    const selectedCluster = ref<any>(null);
    const cardHovered = ref<string | null>(null);
    
    // Search and filter state
    const searchQuery = ref("");
    const currentFilter = ref("all");
    const showBroadcast = ref(false);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const locationCache = ref<Map<string, string>>(new Map());

    // Zone form state
    const newZoneForm = ref({
      name: "",
      description: "",
      color: "#007bff"
    });

    // Cluster form state
    const newClusterForm = ref({
      name: "",
      description: "",
      color: "#fd7e14"
    });

    // Available colors for zone selection
    const availableColors = [
      "#007bff", // Blue
      "#28a745", // Green
      "#ffc107", // Yellow
      "#dc3545", // Red
      "#20c997", // Teal
      "#e83e8c", // Pink
      "#fd7e14", // Orange
      "#6f42c1"  // Purple
    ];

    // Data
    const zones = ref<Zone[]>([]);
    const devices = ref<Device[]>([]);
    const allDevices = ref<Device[]>([]); // Store all devices, we'll filter by zone
    const clusters = ref<any[]>([]); // Cluster list

    // Fetch zones from backend or generate mock data
    const fetchZones = async () => {
      try {
        loading.value = true;
        console.log('🔍 Fetching zones from API...');
        
        try {
          // Try to fetch zones from API
          const response = await ApiService.query('/api/zones', {});
          console.log('📦 Received zones from API:', response.data);
          
          if (response.data.zones && Array.isArray(response.data.zones) && response.data.zones.length > 0) {
            zones.value = response.data.zones;
            console.log('✅ Zones loaded from API:', zones.value.length);
          } else {
            // Initialize default zones if none exist
            console.log('⚠️ No zones found, initializing defaults...');
            const initResponse = await ApiService.query('/api/zones/init/defaults', {});
            if (initResponse.data.zones) {
              zones.value = initResponse.data.zones;
              console.log('✅ Default zones initialized:', zones.value.length);
            }
          }
        } catch (apiError) {
          // Fallback to mock zones if API is not available
          console.warn('⚠️ API unavailable, using fallback zones:', apiError.message);
          const mockZones: Zone[] = [
            {
              id: 'zone-1',
              name: 'Zone 1',
              description: 'Primary monitoring zone',
              color: '#007bff',
              deviceCount: 0
            },
            {
              id: 'zone-2',
              name: 'Zone 2',
              description: 'Secondary monitoring zone',
              color: '#28a745',
              deviceCount: 0
            },
            {
              id: 'zone-3',
              name: 'Zone 3',
              description: 'Tertiary monitoring zone',
              color: '#ffc107',
              deviceCount: 0
            },
            {
              id: 'zone-4',
              name: 'Zone 4',
              description: 'Backup monitoring zone',
              color: '#dc3545',
              deviceCount: 0
            }
          ];
          zones.value = mockZones;
        }
        
        // Auto-select the first zone for initial display
        if (zones.value.length > 0 && !selectedZone.value) {
          selectedZone.value = zones.value[0];
          console.log('✅ Auto-selected first zone:', selectedZone.value.name);
        }
      } catch (err: any) {
        console.error('❌ Error fetching zones:', err);
        error.value = err.message || 'Failed to load zones';
      } finally {
        loading.value = false;
      }
    };

    // Fetch devices from backend
    const fetchDevices = async () => {
      try {
        loading.value = true;
        console.log('🔍 Fetching devices from API...');
        
        const response = await ApiService.query("/api/devices", {});
        console.log('📦 Received from API:', response.data);
        
        // Transform API response
        const result = response.data;
        let transformedDevices: Device[] = [];
        
        if (result.devices && Array.isArray(result.devices)) {
          transformedDevices = result.devices.map((device: any, index: number) => {
            // Assign devices to zones in round-robin fashion
            const zoneIndex = index % zones.value.length;
            const assignedZone = zones.value[zoneIndex]?.id || "zone-1";
            
            return {
              id: device.deviceId || device.id,
              name: device.name,
              icon: device.icon || 'bi-device',
              type: 'IoT Sensor',
              location: device.location,
              displayLocation: device.location,
              status: device.status,
              lastSeen: device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Never',
              metrics: [],
              zoneId: assignedZone,
              deviceId: device.deviceId || device.id
            };
          });
        }
        
        allDevices.value = transformedDevices;
        console.log('✅ Transformed devices:', allDevices.value.length, 'devices');
        
        // Update device counts in zones
        zones.value = zones.value.map(zone => ({
          ...zone,
          deviceCount: transformedDevices.filter(d => d.zoneId === zone.id).length
        }));
        
        console.log('✅ Updated zones with device counts');
        console.log('✅ Updated devices.value:', allDevices.value.length, 'devices');
      } catch (err: any) {
        console.error('❌ Error fetching devices:', err);
        error.value = err.message || 'Failed to load devices from backend';
      } finally {
        loading.value = false;
      }
    };

    // Reverse geocoding is now handled by backend to avoid CORS issues
    // Location data comes from server with coordinates already converted to location names
    const processDeviceLocations = async () => {
      // Backend provides location data, no frontend processing needed
      return;
    };

    // Load data on mount
    onMounted(async () => {
      await fetchZones();
      await fetchDevices();
    });

    // Computed property for filtered zones
    const filteredZones = computed(() => {
      const query = searchQuery.value.toLowerCase().trim();
      return zones.value.filter(zone => 
        zone.name.toLowerCase().includes(query) ||
        zone.description.toLowerCase().includes(query)
      );
    });

    // Computed property for devices in selected zone
    const zoneDevices = computed(() => {
      if (!selectedZone.value) return [];
      return allDevices.value.filter(device => device.zoneId === selectedZone.value?.id);
    });

    // Computed property for filtered devices in selected zone
    const filteredDevices = computed(() => {
      const query = searchQuery.value.toLowerCase().trim();
      const filter = currentFilter.value;
      
      return zoneDevices.value.filter((device) => {
        const matchesSearch = 
          device.name.toLowerCase().includes(query) ||
          device.type.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query);
          
        const matchesFilter = 
          filter === "all" || device.status === filter;
          
        return matchesSearch && matchesFilter;
      });
    });

    // Methods
    const selectZone = (zone: Zone) => {
      selectedZone.value = zone;
      showZoneView.value = false;
      searchQuery.value = ""; // Reset search when entering device view
    };

    const goBackToZones = () => {
      showZoneView.value = true;
      selectedZone.value = null;
      searchQuery.value = ""; // Reset search when going back to zones
    };

    const handleClusterSelected = (cluster: any) => {
      selectedCluster.value = cluster;
      console.log('✅ Cluster selected:', cluster);
    };

    const searchItems = () => {
      // Computed properties handle filtering
    };

    const applyFilter = (filter: string) => {
      currentFilter.value = filter;
    };

    const handleDeviceCreated = async (newDevice: any) => {
      console.log('✅ New device created:', newDevice);
      
      // Add device to the list optimistically (no API call needed)
      const deviceToAdd = {
        id: newDevice.deviceId || newDevice.id,
        name: newDevice.name || newDevice.deviceName,
        icon: newDevice.icon || 'bi-device',
        type: 'IoT Sensor',
        location: newDevice.location || 'Unknown Location',
        displayLocation: newDevice.location || 'Unknown Location',
        status: newDevice.status || 'offline',
        lastSeen: 'Just now',
        metrics: [],
        zoneId: selectedZone.value?.id || zones.value[0]?.id || 'zone-1',
        deviceId: newDevice.deviceId || newDevice.id
      };
      
      // Add to local list immediately (optimistic update)
      allDevices.value.push(deviceToAdd);
      
      // Update zone device count
      zones.value = zones.value.map(zone => {
        if (zone.id === deviceToAdd.zoneId) {
          return { ...zone, deviceCount: zone.deviceCount + 1 };
        }
        return zone;
      });
      
      console.log('✅ Device added optimistically to zone:', deviceToAdd.zoneId);
    };
    
    const handleDeviceRemoved = async (removedDevice: { id: string; name: string }) => {
      console.log('✅ Device removed:', removedDevice);
      allDevices.value = allDevices.value.filter(device => device.id !== removedDevice.id);
      
      // Update zone device count
      if (selectedZone.value) {
        const zone = zones.value.find(z => z.id === selectedZone.value?.id);
        if (zone) {
          zone.deviceCount = zoneDevices.value.length;
        }
      }
      
      console.log(`🔄 Device "${removedDevice.name}" removed from list`);
    };

    const addNewZone = async () => {
      if (!newZoneForm.value.name.trim()) {
        console.warn('⚠️ Zone name is required');
        alert('Please enter a zone name');
        return;
      }

      try {
        loading.value = true;
        console.log('🔷 Creating new zone...');

        const zoneData = {
          name: newZoneForm.value.name.trim(),
          description: newZoneForm.value.description.trim(),
          color: newZoneForm.value.color,
          deviceCount: 0
        };

        // Save to backend
        const response = await ApiService.post('/api/zones', zoneData);
        console.log('✅ Zone created successfully:', response.data);

        const newZone = response.data.zone;

        // Add to local list
        zones.value.push(newZone);
        console.log('📊 Total zones now:', zones.value.length);

        // Reset form
        newZoneForm.value = {
          name: "",
          description: "",
          color: "#007bff"
        };

        // Close modal
        showAddZoneModal.value = false;
        console.log('🔄 Zone modal closed');

        // Return to zone view to show new zone
        showZoneView.value = true;
        selectedZone.value = null;
        console.log('🔄 Returned to zone view');

        // Show success message
        setTimeout(() => {
          alert(`Zone "${newZone.name}" created successfully!`);
        }, 300);
      } catch (err: any) {
        console.error('❌ Error creating zone:', err);
        alert(`Failed to create zone: ${err.response?.data?.error || err.message}`);
      } finally {
        loading.value = false;
      }
    };
    const addNewCluster = async () => {
      if (!newClusterForm.value.name.trim()) {
        console.warn('⚠️ Cluster name is required');
        alert('Please enter a cluster name');
        return;
      }

      try {
        loading.value = true;
        console.log('🟠 Creating new cluster...');

        const clusterData = {
          name: newClusterForm.value.name.trim(),
          description: newClusterForm.value.description.trim(),
          color: newClusterForm.value.color,
          zoneId: selectedZone.value?.id,
          devices: []
        };

        // Add to local list immediately (optimistic update)
        const newCluster = {
          id: `cluster-${Date.now()}`,
          ...clusterData
        };

        clusters.value.push(newCluster);
        console.log('📊 Total clusters now:', clusters.value.length);

        // Reset form
        newClusterForm.value = {
          name: "",
          description: "",
          color: "#fd7e14"
        };

        // Close modal
        showAddClusterModal.value = false;
        console.log('🔄 Cluster modal closed');

        // Show success message
        setTimeout(() => {
          alert(`Cluster "${newCluster.name}" created successfully!`);
        }, 300);
      } catch (err: any) {
        console.error('❌ Error creating cluster:', err);
        alert(`Failed to create cluster: ${err.message}`);
      } finally {
        loading.value = false;
      }
    };

    const removeZone = async () => {
      console.log('🔴 removeZone function called');
      console.log('zoneToDelete.value:', zoneToDelete.value);
      
      if (!zoneToDelete.value) {
        console.log('❌ zoneToDelete is null or undefined!');
        Swal.fire({
          icon: 'warning',
          title: 'No Selection',
          text: 'Please select a zone to remove'
        });
        return;
      }

      console.log('✅ Zone is selected, proceeding with deletion');
      
      const confirmed = await Swal.fire({
        icon: 'warning',
        title: 'Delete Zone?',
        html: `<p>Are you sure you want to delete the zone <strong>"${zoneToDelete.value.name}"</strong>?</p><p class="text-danger">This action cannot be undone.</p>`,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      });

      console.log('⚠️ User confirmation:', confirmed.isConfirmed);

      if (!confirmed.isConfirmed) {
        console.log('❌ User cancelled deletion');
        return;
      }

      try {
        loading.value = true;
        console.log('🗑️ Deleting zone:', zoneToDelete.value);
        console.log('🗑️ Zone ID:', zoneToDelete.value.id);
        console.log('🗑️ Zone _id:', zoneToDelete.value._id);

        // Call API to delete zone - try both id and _id
        const apiUrl = (import.meta.env.VITE_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '');
        const zoneIdToUse = zoneToDelete.value.id || zoneToDelete.value._id;
        const deleteUrl = `${apiUrl}/api/zones/${zoneIdToUse}`;
        
        console.log('🔗 Delete URL:', deleteUrl);
        
        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('📦 Response status:', response.status);
        console.log('📦 Response ok:', response.ok);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ API Error:', errorData);
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ API Response:', result);

        // Remove from local list
        zones.value = zones.value.filter(z => z.id !== zoneToDelete.value?.id && z._id !== zoneToDelete.value?._id);
        console.log(`✅ Zone "${zoneToDelete.value.name}" deleted successfully`);
        console.log(`📋 Total zones now: ${zones.value.length}`);

        // Reset form and close modal
        zoneToDelete.value = null;
        showRemoveZoneModal.value = false;

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Zone has been deleted successfully.',
          timer: 2000
        });
      } catch (err: any) {
        console.error('❌ Error deleting zone:', err);
        console.error('❌ Error stack:', err.stack);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to delete zone: ${err.message}`
        });
      } finally {
        loading.value = false;
      }
    };

    const openAddDeviceModal = () => {
      console.log('� BUTTON CLICKED');
      console.log('🟢 Modal ref exists:', !!addDeviceModalRef.value);
      console.log('🟢 Modal ref:', addDeviceModalRef.value);
      
      if (addDeviceModalRef.value) {
        console.log('🟢 Calling openModal()...');
        try {
          addDeviceModalRef.value.openModal();
          console.log('🟢 openModal() called successfully');
        } catch (err) {
          console.error('🔴 Error calling openModal:', err);
        }
      } else {
        console.error('🔴 Modal ref is null/undefined!');
      }
    };

    return {
      showZoneView,
      showClusterView,
      showAddZoneModal,
      showAddClusterModal,
      showRemoveZoneModal,
      addDeviceModalRef,
      selectedZone,
      selectedCluster,
      zoneToDelete,
      zones,
      devices,
      allDevices,
      clusters,
      zoneDevices,
      searchQuery,
      currentFilter,
      showBroadcast,
      loading,
      error,
      cardHovered,
      newZoneForm,
      newClusterForm,
      availableColors,
      filteredZones,
      filteredDevices,
      selectZone,
      goBackToZones,
      searchItems,
      applyFilter,
      openAddDeviceModal,
      handleDeviceCreated,
      handleDeviceRemoved,
      handleClusterSelected,
      addNewZone,
      addNewCluster,
      removeZone,
    };
  },
});
</script>

<style scoped>
.zones-container {
  animation: fadeIn 0.3s ease-in;
}

.zone-card {
  border: 2px solid transparent;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.zone-card:hover {
  border-color: #007bff;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
}

/* Increase zone name text size by 2px and style for dark theme */
.zone-card .card-title {
  font-size: 1.375rem; /* Increased from 1.25rem by 2px */
}

html[data-bs-theme="dark"] .zone-card .card-title {
  color: #000;
}

.cursor-pointer {
  cursor: pointer;
}

.transition-all {
  transition: all 0.3s ease;
}

.color-picker {
  width: 45px;
  height: 45px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.color-picker:hover {
  transform: scale(1.1);
  border-color: #0d6efd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal Styling */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal.d-block {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal-dialog {
  position: relative;
  margin: auto;
  z-index: 1060;
  max-width: 500px;
  width: 90%;
  pointer-events: auto;
}

.modal-dialog-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header .btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #000;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Form styling in modal */
.modal-body .form-control,
.modal-body .form-label {
  font-size: 0.95rem;
}

.modal-body .form-label {
  margin-bottom: 0.5rem;
  color: #333;
}

.modal-body .form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
