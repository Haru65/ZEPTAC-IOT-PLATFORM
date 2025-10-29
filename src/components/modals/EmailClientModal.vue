<template>
  <div class="modal fade" id="email_client_modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="fw-bold">Email Client</h2>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-sm btn-outline-primary" :class="{ active: activeTab === 'compose' }" @click="activeTab = 'compose'">
              <i class="bi bi-envelope"></i> Compose
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary" :class="{ active: activeTab === 'templates' }" @click="activeTab = 'templates'">
              <i class="bi bi-file-text"></i> Templates
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary" :class="{ active: activeTab === 'bulk' }" @click="activeTab = 'bulk'">
              <i class="bi bi-people"></i> Bulk Email
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary" :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">
              <i class="bi bi-gear"></i> Settings
            </button>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <!-- Compose Email Tab -->
          <div v-if="activeTab === 'compose'" class="tab-content">
            <form @submit.prevent="sendEmail">
              <div class="row g-3">
                <!-- Email Provider Selection -->
                <div class="col-md-3">
                  <label class="form-label">Email Provider</label>
                  <select v-model="emailForm.provider" class="form-select">
                    <option value="gmail">Gmail</option>
                    <option value="outlook">Outlook</option>
                    <option value="smtp">SMTP</option>
                  </select>
                </div>

                <!-- Template Selection -->
                <div class="col-md-3">
                  <label class="form-label">Template</label>
                  <select v-model="emailForm.template" class="form-select" @change="loadTemplate">
                    <option value="custom">Custom</option>
                    <option value="alarm">Alarm Notification</option>
                    <option value="maintenance">Maintenance Alert</option>
                    <option value="report">System Report</option>
                  </select>
                </div>

                <!-- Send Test Email -->
                <div class="col-md-3">
                  <label class="form-label">Test Email</label>
                  <button type="button" @click="sendTestEmail" class="btn btn-outline-secondary d-block" :disabled="sending">
                    <i class="bi bi-send-check"></i> Send Test
                  </button>
                </div>

                <!-- Quick Add Recipients -->
                <div class="col-md-3">
                  <label class="form-label">Quick Add</label>
                  <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle d-block" type="button" data-bs-toggle="dropdown">
                      <i class="bi bi-person-plus"></i> Add Recipients
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="addAlarmContacts">Alarm Contacts</a></li>
                      <li><a class="dropdown-item" @click="addMaintenanceTeam">Maintenance Team</a></li>
                      <li><a class="dropdown-item" @click="addManagement">Management</a></li>
                    </ul>
                  </div>
                </div>

                <!-- Recipients -->
                <div class="col-12">
                  <label class="form-label">To</label>
                  <div class="input-group">
                    <input
                      v-model="newRecipient"
                      @keyup.enter="addRecipient"
                      type="email"
                      class="form-control"
                      placeholder="Enter email address and press Enter"
                    />
                    <button type="button" @click="addRecipient" class="btn btn-outline-secondary">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="mt-2">
                    <span
                      v-for="(recipient, index) in emailForm.recipients"
                      :key="index"
                      class="badge badge-light-primary me-2 mb-2"
                    >
                      {{ recipient }}
                      <i class="bi bi-x-circle ms-1" style="cursor: pointer;" @click="removeRecipient(index)"></i>
                    </span>
                  </div>
                </div>

                <!-- Subject -->
                <div class="col-12">
                  <label class="form-label">Subject</label>
                  <input v-model="emailForm.subject" type="text" class="form-control" placeholder="Enter email subject" />
                </div>

                <!-- Content Editor -->
                <div class="col-12">
                  <label class="form-label">Message</label>
                  <div class="border rounded">
                    <!-- Toolbar -->
                    <div class="border-bottom p-2 bg-light">
                      <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('bold')">
                          <i class="bi bi-type-bold"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('italic')">
                          <i class="bi bi-type-italic"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="formatText('underline')">
                          <i class="bi bi-type-underline"></i>
                        </button>
                      </div>
                      <div class="btn-group btn-group-sm ms-2" role="group">
                        <button type="button" class="btn btn-outline-secondary" @click="insertVariable('deviceName')">
                          Device Name
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="insertVariable('timestamp')">
                          Timestamp
                        </button>
                        <button type="button" class="btn btn-outline-secondary" @click="insertVariable('location')">
                          Location
                        </button>
                      </div>
                    </div>
                    <!-- Editor -->
                    <div
                      ref="contentEditor"
                      @input="updateContent"
                      contenteditable="true"
                      class="p-3"
                      style="min-height: 200px;"
                      v-html="emailForm.content"
                    ></div>
                  </div>
                </div>

                <!-- Attachments -->
                <div class="col-12">
                  <label class="form-label">Attachments</label>
                  <input
                    ref="fileInput"
                    @change="handleFileUpload"
                    type="file"
                    class="form-control"
                    multiple
                    accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.jpeg"
                  />
                  <div v-if="emailForm.attachments.length > 0" class="mt-2">
                    <div
                      v-for="(file, index) in emailForm.attachments"
                      :key="index"
                      class="d-flex align-items-center justify-content-between p-2 border rounded mb-2"
                    >
                      <span><i class="bi bi-paperclip"></i> {{ file.name }} ({{ formatFileSize(file.size) }})</span>
                      <button type="button" @click="removeAttachment(index)" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <span v-if="emailForm.recipients.length > 0" class="text-muted">
                    {{ emailForm.recipients.length }} recipient(s)
                  </span>
                </div>
                <div>
                  <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary" :disabled="sending || emailForm.recipients.length === 0">
                    <span v-if="sending" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-send me-2"></i>
                    {{ sending ? 'Sending...' : 'Send Email' }}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Templates Tab -->
          <div v-if="activeTab === 'templates'" class="tab-content">
            <div class="row g-4">
              <div v-for="template in emailTemplates" :key="template.id" class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">{{ template.name }}</h5>
                    <p class="card-text text-muted">{{ template.description }}</p>
                    <div class="mb-3">
                      <h6>Available Variables:</h6>
                      <span
                        v-for="variable in template.variables"
                        :key="variable"
                        class="badge badge-light-info me-1 mb-1"
                      >
                        {{ variable }}
                      </span>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button @click="useTemplate(template)" class="btn btn-sm btn-primary">
                      <i class="bi bi-arrow-right"></i> Use Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bulk Email Tab -->
          <div v-if="activeTab === 'bulk'" class="tab-content">
            <form @submit.prevent="sendBulkEmail">
              <div class="row g-3">
                <div class="col-12">
                  <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i>
                    Bulk email allows you to send the same message to multiple recipients efficiently.
                    Emails are sent in batches to avoid rate limiting.
                  </div>
                </div>

                <!-- Bulk Recipients -->
                <div class="col-12">
                  <label class="form-label">Recipients</label>
                  <textarea
                    v-model="bulkForm.recipientsList"
                    class="form-control"
                    rows="6"
                    placeholder="Enter email addresses, one per line or separated by commas"
                  ></textarea>
                  <div class="form-text">
                    Parsed {{ bulkRecipients.length }} valid email addresses
                  </div>
                </div>

                <!-- Bulk Settings -->
                <div class="col-md-6">
                  <label class="form-label">Batch Size</label>
                  <select v-model="bulkForm.batchSize" class="form-select">
                    <option value="25">25 emails per batch</option>
                    <option value="50">50 emails per batch</option>
                    <option value="100">100 emails per batch</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Delay Between Batches</label>
                  <select v-model="bulkForm.delay" class="form-select">
                    <option value="1000">1 second</option>
                    <option value="2000">2 seconds</option>
                    <option value="5000">5 seconds</option>
                  </select>
                </div>

                <!-- Subject and Content -->
                <div class="col-12">
                  <label class="form-label">Subject</label>
                  <input v-model="bulkForm.subject" type="text" class="form-control" />
                </div>

                <div class="col-12">
                  <label class="form-label">Message</label>
                  <textarea v-model="bulkForm.content" class="form-control" rows="8"></textarea>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-4">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-warning" :disabled="sendingBulk || bulkRecipients.length === 0">
                  <span v-if="sendingBulk" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-broadcast me-2"></i>
                  {{ sendingBulk ? 'Sending...' : `Send to ${bulkRecipients.length} Recipients` }}
                </button>
              </div>
            </form>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="tab-content">
            <div class="row g-4">
              <!-- Provider Status -->
              <div class="col-12">
                <h4>Email Provider Status</h4>
                <div class="row g-3">
                  <div v-for="(status, provider) in providerStatus" :key="provider" class="col-md-4">
                    <div class="card">
                      <div class="card-body text-center">
                        <h5 class="text-capitalize">{{ provider }}</h5>
                        <div class="mb-2">
                          <span
                            :class="status.configured ? 'badge badge-light-success' : 'badge badge-light-danger'"
                          >
                            {{ status.configured ? 'Configured' : 'Not Configured' }}
                          </span>
                        </div>
                        <button
                          @click="testProvider(provider)"
                          :disabled="!status.configured || testingProvider"
                          class="btn btn-sm btn-outline-primary"
                        >
                          <span v-if="testingProvider" class="spinner-border spinner-border-sm me-1"></span>
                          Test Connection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Email Statistics -->
              <div class="col-12">
                <h4>Email Statistics</h4>
                <div class="row g-3">
                  <div class="col-md-3">
                    <div class="card bg-light-primary">
                      <div class="card-body text-center">
                        <h3 class="text-primary">{{ emailStats.totalSent || 0 }}</h3>
                        <p class="mb-0">Total Sent</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="card bg-light-danger">
                      <div class="card-body text-center">
                        <h3 class="text-danger">{{ emailStats.totalFailed || 0 }}</h3>
                        <p class="mb-0">Failed</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="card bg-light-success">
                      <div class="card-body text-center">
                        <h3 class="text-success">{{ emailStats.successRate || 0 }}%</h3>
                        <p class="mb-0">Success Rate</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="card bg-light-info">
                      <div class="card-body text-center">
                        <h3 class="text-info">{{ formatDate(emailStats.lastSent) }}</h3>
                        <p class="mb-0">Last Sent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Groups -->
              <div class="col-12">
                <h4>Contact Groups</h4>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-header">
                        <h5>Alarm Contacts</h5>
                      </div>
                      <div class="card-body">
                        <div class="mb-2">
                          <input v-model="newAlarmContact" type="email" class="form-control form-control-sm" placeholder="Add email" />
                        </div>
                        <button @click="addToGroup('alarm')" class="btn btn-sm btn-primary mb-2">Add</button>
                        <div>
                          <span
                            v-for="(email, index) in contactGroups.alarm"
                            :key="index"
                            class="badge badge-light-primary me-1 mb-1"
                          >
                            {{ email }}
                            <i class="bi bi-x-circle ms-1" @click="removeFromGroup('alarm', index)"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-header">
                        <h5>Maintenance Team</h5>
                      </div>
                      <div class="card-body">
                        <div class="mb-2">
                          <input v-model="newMaintenanceContact" type="email" class="form-control form-control-sm" placeholder="Add email" />
                        </div>
                        <button @click="addToGroup('maintenance')" class="btn btn-sm btn-primary mb-2">Add</button>
                        <div>
                          <span
                            v-for="(email, index) in contactGroups.maintenance"
                            :key="index"
                            class="badge badge-light-warning me-1 mb-1"
                          >
                            {{ email }}
                            <i class="bi bi-x-circle ms-1" @click="removeFromGroup('maintenance', index)"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-header">
                        <h5>Management</h5>
                      </div>
                      <div class="card-body">
                        <div class="mb-2">
                          <input v-model="newManagementContact" type="email" class="form-control form-control-sm" placeholder="Add email" />
                        </div>
                        <button @click="addToGroup('management')" class="btn btn-sm btn-primary mb-2">Add</button>
                        <div>
                          <span
                            v-for="(email, index) in contactGroups.management"
                            :key="index"
                            class="badge badge-light-info me-1 mb-1"
                          >
                            {{ email }}
                            <i class="bi bi-x-circle ms-1" @click="removeFromGroup('management', index)"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import ApiService from '@/core/services/ApiService';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'EmailClientModal',
  setup() {
    const activeTab = ref('compose');
    const sending = ref(false);
    const sendingBulk = ref(false);
    const testingProvider = ref(false);

    // Email form
    const emailForm = ref({
      provider: 'gmail',
      template: 'custom',
      recipients: [],
      subject: '',
      content: '',
      attachments: []
    });

    // Bulk email form
    const bulkForm = ref({
      recipientsList: '',
      batchSize: 50,
      delay: 2000,
      subject: '',
      content: ''
    });

    // Data
    const newRecipient = ref('');
    const emailTemplates = ref([]);
    const providerStatus = ref({});
    const emailStats = ref({});
    const contactGroups = ref({
      alarm: ['admin@company.com', 'alerts@company.com'],
      maintenance: ['maintenance@company.com', 'tech@company.com'],
      management: ['manager@company.com', 'director@company.com']
    });

    // Contact inputs
    const newAlarmContact = ref('');
    const newMaintenanceContact = ref('');
    const newManagementContact = ref('');

    // Computed
    const bulkRecipients = computed(() => {
      if (!bulkForm.value.recipientsList) return [];
      
      const emails = bulkForm.value.recipientsList
        .split(/[,\n]/)
        .map(email => email.trim())
        .filter(email => email && isValidEmail(email));
      
      return [...new Set(emails)]; // Remove duplicates
    });

    // Methods
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const addRecipient = () => {
      if (newRecipient.value && isValidEmail(newRecipient.value)) {
        if (!emailForm.value.recipients.includes(newRecipient.value)) {
          emailForm.value.recipients.push(newRecipient.value);
        }
        newRecipient.value = '';
      }
    };

    const removeRecipient = (index: number) => {
      emailForm.value.recipients.splice(index, 1);
    };

    const addAlarmContacts = () => {
      contactGroups.value.alarm.forEach(email => {
        if (!emailForm.value.recipients.includes(email)) {
          emailForm.value.recipients.push(email);
        }
      });
    };

    const addMaintenanceTeam = () => {
      contactGroups.value.maintenance.forEach(email => {
        if (!emailForm.value.recipients.includes(email)) {
          emailForm.value.recipients.push(email);
        }
      });
    };

    const addManagement = () => {
      contactGroups.value.management.forEach(email => {
        if (!emailForm.value.recipients.includes(email)) {
          emailForm.value.recipients.push(email);
        }
      });
    };

    const loadTemplate = () => {
      const templates = {
        alarm: {
          subject: '🚨 ALARM NOTIFICATION - {{deviceName}}',
          content: `
            <h2>Alarm Alert</h2>
            <p><strong>Device:</strong> {{deviceName}}</p>
            <p><strong>Location:</strong> {{location}}</p>
            <p><strong>Time:</strong> {{timestamp}}</p>
            <p><strong>Severity:</strong> {{severity}}</p>
            <p>Please check the device immediately.</p>
          `
        },
        maintenance: {
          subject: '🔧 Maintenance Notification - {{deviceName}}',
          content: `
            <h2>Scheduled Maintenance</h2>
            <p><strong>Device:</strong> {{deviceName}}</p>
            <p><strong>Scheduled Date:</strong> {{scheduledDate}}</p>
            <p><strong>Type:</strong> {{maintenanceType}}</p>
            <p>Please prepare for the scheduled maintenance.</p>
          `
        },
        report: {
          subject: '📊 System Report - {{period}}',
          content: `
            <h2>System Report</h2>
            <p><strong>Period:</strong> {{period}}</p>
            <p><strong>Generated:</strong> {{timestamp}}</p>
            <p>{{reportData}}</p>
          `
        }
      };

      const template = templates[emailForm.value.template];
      if (template) {
        emailForm.value.subject = template.subject;
        emailForm.value.content = template.content;
      }
    };

    const formatText = (command: string) => {
      document.execCommand(command, false, '');
    };

    const insertVariable = (variable: string) => {
      const variables = {
        deviceName: '{{deviceName}}',
        timestamp: '{{timestamp}}',
        location: '{{location}}'
      };
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(variables[variable]));
      }
    };

    const updateContent = (event: Event) => {
      emailForm.value.content = (event.target as HTMLElement).innerHTML;
    };

    const handleFileUpload = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          emailForm.value.attachments.push(file);
        });
      }
    };

    const removeAttachment = (index: number) => {
      emailForm.value.attachments.splice(index, 1);
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const sendEmail = async () => {
      try {
        sending.value = true;

        const response = await ApiService.post('/api/email/custom', {
          recipients: emailForm.value.recipients,
          subject: emailForm.value.subject,
          content: emailForm.value.content,
          template: emailForm.value.template,
          provider: emailForm.value.provider,
          attachments: emailForm.value.attachments
        });

        if (response.data.success) {
          await Swal.fire({
            title: 'Success!',
            text: 'Email sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Reset form
          emailForm.value.recipients = [];
          emailForm.value.subject = '';
          emailForm.value.content = '';
          emailForm.value.attachments = [];
        }

      } catch (error) {
        console.error('Error sending email:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to send email',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        sending.value = false;
      }
    };

    const sendBulkEmail = async () => {
      try {
        sendingBulk.value = true;

        const response = await ApiService.post('/api/email/bulk', {
          recipients: bulkRecipients.value,
          subject: bulkForm.value.subject,
          content: bulkForm.value.content,
          batchSize: bulkForm.value.batchSize,
          delay: bulkForm.value.delay,
          provider: emailForm.value.provider
        });

        if (response.data.success) {
          await Swal.fire({
            title: 'Bulk Email Complete!',
            html: `
              <p><strong>Total Sent:</strong> ${response.data.data.totalSent}</p>
              <p><strong>Failed:</strong> ${response.data.data.totalFailed}</p>
            `,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Reset form
          bulkForm.value.recipientsList = '';
          bulkForm.value.subject = '';
          bulkForm.value.content = '';
        }

      } catch (error) {
        console.error('Error sending bulk email:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to send bulk email',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        sendingBulk.value = false;
      }
    };

    const sendTestEmail = async () => {
      try {
        const { value: email } = await Swal.fire({
          title: 'Send Test Email',
          input: 'email',
          inputLabel: 'Your email address',
          inputPlaceholder: 'Enter your email',
          showCancelButton: true
        });

        if (email) {
          const response = await ApiService.post('/api/email/test', {
            recipient: email,
            provider: emailForm.value.provider
          });

          if (response.data.success) {
            await Swal.fire({
              title: 'Test Email Sent!',
              text: `Check your inbox at ${email}`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
        }
      } catch (error) {
        console.error('Error sending test email:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to send test email',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    const testProvider = async (provider: string) => {
      try {
        testingProvider.value = true;
        
        const response = await ApiService.post('/api/email/test-config', {
          provider
        });

        if (response.data.success) {
          await Swal.fire({
            title: 'Success!',
            text: `${provider} configuration is working`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          await Swal.fire({
            title: 'Configuration Issue',
            text: response.data.message,
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        await Swal.fire({
          title: 'Test Failed',
          text: `Failed to test ${provider} configuration`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        testingProvider.value = false;
      }
    };

    const useTemplate = (template: any) => {
      emailForm.value.template = template.id;
      loadTemplate();
      activeTab.value = 'compose';
    };

    const addToGroup = (group: string) => {
      const contactInputs = {
        alarm: newAlarmContact,
        maintenance: newMaintenanceContact,
        management: newManagementContact
      };

      const input = contactInputs[group];
      if (input.value && isValidEmail(input.value)) {
        if (!contactGroups.value[group].includes(input.value)) {
          contactGroups.value[group].push(input.value);
        }
        input.value = '';
      }
    };

    const removeFromGroup = (group: string, index: number) => {
      contactGroups.value[group].splice(index, 1);
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return 'Never';
      return new Date(dateString).toLocaleDateString();
    };

    const loadData = async () => {
      try {
        // Load templates
        const templatesResponse = await ApiService.get('/api/email/templates');
        if (templatesResponse.data.success) {
          emailTemplates.value = templatesResponse.data.data;
        }

        // Load provider status
        const statusResponse = await ApiService.get('/api/email/provider-status');
        if (statusResponse.data.success) {
          providerStatus.value = statusResponse.data.data;
        }

        // Load email stats
        const statsResponse = await ApiService.get('/api/email/stats');
        if (statsResponse.data.success) {
          emailStats.value = statsResponse.data.data;
        }

      } catch (error) {
        console.error('Error loading email data:', error);
      }
    };

    onMounted(() => {
      loadData();
      
      // Listen for pre-fill events from alarm system
      window.addEventListener('fillEmailForm', (event: any) => {
        const data = event.detail;
        if (data) {
          emailForm.value.subject = data.subject || '';
          emailForm.value.content = data.content || '';
          emailForm.value.template = data.template || 'custom';
          emailForm.value.recipients = data.recipients || [];
          
          // Switch to compose tab
          activeTab.value = 'compose';
          
          // Update the content editor
          setTimeout(() => {
            const editor = document.querySelector('[contenteditable="true"]') as HTMLElement;
            if (editor) {
              editor.innerHTML = data.content || '';
            }
          }, 100);
        }
      });
    });

    return {
      activeTab,
      sending,
      sendingBulk,
      testingProvider,
      emailForm,
      bulkForm,
      newRecipient,
      emailTemplates,
      providerStatus,
      emailStats,
      contactGroups,
      newAlarmContact,
      newMaintenanceContact,
      newManagementContact,
      bulkRecipients,
      addRecipient,
      removeRecipient,
      addAlarmContacts,
      addMaintenanceTeam,
      addManagement,
      loadTemplate,
      formatText,
      insertVariable,
      updateContent,
      handleFileUpload,
      removeAttachment,
      formatFileSize,
      sendEmail,
      sendBulkEmail,
      sendTestEmail,
      testProvider,
      useTemplate,
      addToGroup,
      removeFromGroup,
      formatDate
    };
  }
});
</script>

<style scoped>
.tab-content {
  min-height: 500px;
}

.btn-group .btn.active {
  background-color: var(--bs-primary);
  color: white;
}

.badge {
  font-size: 0.75em;
}

.badge i {
  cursor: pointer;
}

.badge i:hover {
  opacity: 0.7;
}

[contenteditable="true"] {
  outline: none;
}

[contenteditable="true"]:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
}
</style>