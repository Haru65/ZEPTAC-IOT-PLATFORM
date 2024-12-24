export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
  }
  
  const ExecutiveMenuConfig: Array<MenuItem> = [
    {
      pages: [
        {
          heading: "Dashboard",
          route: "dashboard",
          keenthemesIcon: "element-11",
          bootstrapIcon: "bi-app-indicator",
        },
      ],
    },
    {
        heading: "CleanRoom Validation",
        route: "cleanroom",
        pages: [
    
          {
            sectionTitle: "Non-NABL Report",
            route: "/",
            keenthemesIcon: "tablet-text-up",
            bootstrapIcon: "bi-archive",
    
            sub: [
              {
                heading: "Add Non-NABL Report",
                route: "/validationreports/add",
              },
              {
                heading: "List Non-NABL Report",
                route: "/validationreports/list",
              },
            ],
          },
    
          {
            sectionTitle: "NABL Report",
            route: "/",
            keenthemesIcon: "tablet-text-up",
            bootstrapIcon: "bi-archive",
    
            sub: [
              {
                heading: "LAF",
                route: "/laf/list",
              },
              {
                heading: "BSC",
                route: "/bsc/list",
              },
            ],
          },
    
          /*
    
          {
            sectionTitle: "External Audit",
            route: "/",
            keenthemesIcon: "tablet-ok",
            bootstrapIcon: "bi-archive",
    
            sub: [
              {
                heading: "Validation Procedure",
                route: "/validation",
              },
              {
                heading: "Quality Procedure",
                route: "/quality",
              },
            ],
          }
    
          */
    
        ],
      },
      /*
    
      {
        heading: "Thermal Mapping",
        route: "thermal",
        pages: [
          {
            sectionTitle: "Thermal Report",
            route: "/thermalreport",
            keenthemesIcon: "chart-pie-4",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Add Thermal Report",
                route: "/thermalreport/add",
              },
              {
                heading: "List Thermal Report",
                route: "/thermalreport/list",
              },
            ],
          },
          {
            sectionTitle: "Thermal Instrument",
            route: "/thermalinstrument",
            keenthemesIcon: "thermometer",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Add Thermal Instrument",
                route: "/thermalinstrument/add",
              },
              {
                heading: "List Thermal Instrument",
                route: "/thermalinstrument/list",
              },
            ],
          },
        ],
      },
    
      */

      
      {
        heading: "Quality Work",
        route: "quality-work",
        pages: [
    
          {
            sectionTitle: "Master List",
            keenthemesIcon: "text-circle",
            route: "/masterlist",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "QMS Procedure",
                route: "/qms_procedures",
              },
              {
                heading: "Work Instruction",
                route: "/work_instructions",
              },
              {
                heading: "Forms & Formats",
                route: "/forms_and_formats",
              },
              {
                heading: "NABL Document",
                route: "/nabl_documents",
              },
              {
                heading: "National-International Document",
                route: "/ni_documents",
              },
              {
                heading: "Records",
                route: "/records",
              },
            ],
          },
    
    
          {
            sectionTitle: "Instrument Management",
            keenthemesIcon: "switch",
            route: "/",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Instrument Add",
                route: "/instruments/add",
              },
              {
                heading: "Instrument List",
                route: "/instruments/list",
              },
              {
                heading: "Intermediate Check",
                route: "/intermediate_check_records",
              },
              {
                heading: "Inspection Records",
                route: "/inspection_records",
              },
            ],
          },
    
    
          {
            sectionTitle: "Internal Audit",
            route: "/internalaudit",
            keenthemesIcon: "share",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Internal Audit Schedule",
                route: "/auditschedule",
              },
              {
                heading: "Internal Audit Observation",
                route: "/auditobservations",
              },
            ],
          },
    
    
          {
            sectionTitle: "Management Review",
            route: "/",
            keenthemesIcon: "file-sheet",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Schedule Meeting",
                route: "/mrm_schedule",
              },
              {
                heading: "Minutes of Meeting",
                route: "/mrm_minutes",
              },
            ],
          },
    
    
          {
            sectionTitle: "Quality Documentation",
            route: "/",
            keenthemesIcon: "wallet",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                heading: "Internal Document",
                route: "/internaldocuments",
              },
              {
                heading: "External Document",
                route: "/externaldocuments",
              },
              {
                heading: "Non Conformance Record",
                route: "/ncrs",
              },
              {
                heading: "Risk Register",
                route: "/risks",
              },
              {
                heading: "Document Change",
                route: "/document_change_request",
              },
              {
                heading: "Improvement Plan",
                route: "/improvements",
              },
              {
                heading: "Complaint Register",
                route: "/complaint",
              },
              {
                heading: "Customer Feedbacks",
                route: "/feedbacks/list",
              },
    
            ],
          },
    
    
          {
            heading: "Planner",
            route: "/plan",
            keenthemesIcon: "calendar-tick",
            bootstrapIcon: "bi-archive",
          },
    
    
          {
            heading: "CheckList",
            route: "/checklist",
            keenthemesIcon: "questionnaire-tablet",
            bootstrapIcon: "bi-archive",
          },
    
    
          {
            heading: "Suppliers",
            route: "/suppliers",
            keenthemesIcon: "delivery-3",
            bootstrapIcon: "bi-archive",
          },
    
    
          {
            sectionTitle: "Quality Assurance",
            route: "/",
            keenthemesIcon: "award",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                sectionTitle: "Method Validation",
                route: "/",
                sub: [
                  {
                    heading: "Add Method Validation",
                    route: "/method_validation/add",
                  },
                  {
                    heading: "List Method Validation",
                    route: "/method_validation/list",
                  },
                ],
              },
              {
                sectionTitle: "InterLaboratory",
                route: "/",
                sub: [
                  {
                    heading: "Add InterLaboratory",
                    route: "/interlaboratory/add",
                  },
                  {
                    heading: "List InterLaboratory",
                    route: "/interlaboratory/list",
                  },
                ],
              },
              {
                sectionTitle: "Replicate Report",
                route: "/",
                sub: [
                  {
                    heading: "Add Replicate Report",
                    route: "/replicate_report/add",
                  },
                  {
                    heading: "List Replicate Report",
                    route: "/replicate_report/list",
                  },
                ],
              },
    
            ],
          },
    
    
        ],
      },
      {
        heading: "HR",
        route: "hr",
        pages: [
    
          {
            sectionTitle: "Employees Management",
            route: "/",
            keenthemesIcon: "faceid",
            bootstrapIcon: "bi-archive",
            sub: [
              {
                sectionTitle: "Employees",
                route: "/",
                sub: [
                  {
                    heading: "Add Employee",
                    route: "/employee/add",
                  },
                  {
                    heading: "List Employees",
                    route: "/employee/list",
                  },
                ],
              },
    
              {
                sectionTitle: "Trainings",
                route: "/",
                keenthemesIcon: "educare",
                bootstrapIcon: "bi-archive",
                sub: [
                  {
                    heading: "Add Training",
                    route: "/training/add",
                  },
                  {
                    heading: "List Training",
                    route: "/training/list",
                  },
                ],
              },
    
              {
                sectionTitle: "Skill Matrix",
                route: "/",
                keenthemesIcon: "educare",
                bootstrapIcon: "bi-archive",
                sub: [
                  {
                    heading: "Add Skill Matrix",
                    route: "/skill_matrix/add",
                  },
                  {
                    heading: "List Skill Matrix",
                    route: "/skill_matrix/list",
                  },
                ],
              },
    
    
            ],
          },
    
    
        ],
      },

  ];
  
  export default ExecutiveMenuConfig;
  