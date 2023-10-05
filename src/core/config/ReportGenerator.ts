// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ConductedTests } from "@/core/model/conductedtests";
import moment from "moment";

interface TestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
  };
  area_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;
  details: [
  ];
  room_volume: string;
  total_cfm: string;
  acph: string;

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}


const reportGen = async (id, pdfName, reportInfo) => {
  pdfName += `_${id}_validation_report`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  // Quotation Heading
  doc
    .setFontSize(14)
    .setTextColor(0, 0, 0)
    .setFont('helvetica', "bold")
    .text("Validation Report", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

  // Company Logo Img
  const img = new Image()
  img.src = reportInfo.value.company_details.company_logo;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  // Site Address - To
  const clientAddress = reportInfo.value.client_address;


  const start = [
    { title: "All TEST REPORTS", styles: { halign: 'center' } }
  ]

  autoTable(doc, {
    columns: start,
    startY: 1.7,
    body: [],
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: 'center'},
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },

  });
  

  // functions
  
    function generate_airVelocityTest(testData){
        
      const upper = [
        [
          { title: 'Supply Code', rowSpan:2},
          { title: 'Velocity Reading', colSpan: 5},
          { title: 'Average', rowSpan:2},
          { title: 'Supply Filter Size', rowSpan:2 },
          { title: 'CFM', rowSpan:2}
        ],
        ['1', '2', '3', '4', '5','','','']
      ];

      const body = testData.details.map((detail) => [
        detail.supply_code,
        detail.velocity_readings.reading_1,
        detail.velocity_readings.reading_2,
        detail.velocity_readings.reading_3,
        detail.velocity_readings.reading_4,
        detail.velocity_readings.reading_5,
        detail.average_reading,
        detail.supply_filter_size,
        detail.cfm,
      ]);

      autoTable(doc, {
        head: upper,
        body: body,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center", valign: "middle"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });

      const lower = [
        [
          { title: 'Total CFM' },
          { title: 'Room Volume'},
          { title: 'ACPH'}
        ]
      ];

      const airVelocityTestCaldetails = [{
        total_cfm: testData.total_cfm,
        room_volume: testData.room_volume,
        acph: testData.acph,
      }]

      const airVelocityTestCalData = airVelocityTestCaldetails.map((data) => [
        data.total_cfm,
        data.room_volume,
        data.acph
      ]);
      
      autoTable(doc, {
        head: lower,
        body: airVelocityTestCalData,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;

          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });


    }

    function generate_filterIntegrityTest(testData){
      
      const upper = [
        [
          { title: 'Supply Code'},
          { title: 'Upstream Conc. (mg/m³)'},
          { title: 'Leakage (%)'},
          { title: 'Test Results of POV' },
          { title: 'Remark'}
        ]
      ];

      const body = testData.details.map((detail) => [
        detail.supply_code,
        detail.up_stream_conc,
        detail.leakage,
        detail.test_result_of_pov,
        detail.remark
      ]);

      autoTable(doc, {
        head: upper,
        body: body,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });

    }

    function generate_particleCountTest(testData){
        
      const upper = [
        [
          { title: 'Location', rowSpan:2},
          { title: 'Particle Size (m³)', colSpan: 2},
          { title: 'Remarks', rowSpan:2}
        ],
        ["0.5 µm", "0.5 µm", " "]
      ];

      const body = testData.details.map((detail) => [
        detail.location_no,
        detail.particle_readings.reading_1,
        detail.particle_readings.reading_2,
        detail.remark,
      ]);

      autoTable(doc, {
        head: upper,
        body: body,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center", valign: "middle"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

    }

    function generate_recoveryTest(testData){

      const upper = [
        [
          { title: 'AHU Condition', rowSpan:2},
          { title: 'Time', rowSpan:2},
          { title: 'Particle Size (m³)', colSpan: 2},
          { title: 'Remarks', rowSpan:2}
        ],
        ["0.5 µm", "0.5 µm", " "]
      ];

      const body = testData.details.map((detail) => [
        detail.ahu_condition,
        moment(detail.time).format("YYYY-MM-DD HH:mm:ss"),
        detail.particle_readings.reading_1,
        detail.particle_readings.reading_2,
        detail.remark,
      ]);

      autoTable(doc, {
        head: upper,
        body: body,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center", valign:"middle"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

    }

    function default_test(){

      const upper = [
        { title: "Sorry! No such Test / Report Exist"}
      ]

      autoTable(doc, {
        head: upper,
        body: [],
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left"},
        tableLineColor: [0, 0, 0],
      });

    }

    let isFirstReport = true;

    for (const [testIndex, test] of ConductedTests.entries()) {
      const testDataArray: Array<TestReport> = Object.values(reportInfo.value.tests[test.id])[0] as Array<TestReport>;
  
      if (testDataArray.length > 0) {
        if (!isFirstReport) {
          doc.addPage();
        }
  
        isFirstReport = true;
      }
  
      for (let i = 0; i < testDataArray.length; i++) {
        const reportIndex = i + 1;
        const totalReports = testDataArray.length;
  
        const testData = testDataArray[i];
  
        if (!isFirstReport) {
          doc.addPage();
        }
  
        isFirstReport = false;
  
      const testMainHeading = [
        [
          { content: `TEST CERTIFICATE - ${test.test.toUpperCase()}`},
        ]      
      ];

      const SiteInfo = [
        [`Company Name : ${reportInfo.value.client_company.company_name}`],
        [`ADD : ${clientAddress.address1 || ""} ${clientAddress.address2 || ""} ${clientAddress.city || ""} ${clientAddress.pincode || ""} ${clientAddress.states || ""} ${clientAddress.country || ""}`]
      ];
  
      autoTable(doc, {
        head: testMainHeading,
        body: SiteInfo,
        columns: [
          { header: 'Heading', dataKey: '0' }
        ],
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center" },
        bodyStyles: { halign: "left"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });



      const testHeading = [
        [
          { content: `TEST : ${test.test.toUpperCase()} (Report ${reportIndex} of ${totalReports})`, colSpan: 2 },
        ]      
      ];


      const validation_date = moment(testData.validation_date, "YYYY-MM-DD").format("LL");
      const validation_due_date = moment(testData.due_date, "YYYY-MM-DD").format("LL");

      const data = [
        ['Report No', `${testData.report_name}_${reportIndex}`],
        ['Test Name', testData.test_name],
        ['Test Carried Out by', `${testData.test_carried_by.first_name} ${testData.test_carried_by.last_name}`],
        ['Test Witnessed By', testData.test_witnessed_by],
        ['Validation Date', validation_date],
        ['Validation Due Date', validation_due_date],
        ['Room Name / No', testData.room_name],
        ['Area Name', testData.area_name],
        ['AHU No', testData.ahu_no],
        ['Acceptance Criteria', testData.acceptance_criteria.certified],
      ];
  
      autoTable(doc, {
        head: testHeading,
        body: data,
        columns: [
          { header: 'Heading', dataKey: '0'},
          { header: 'Value', dataKey: '1' }
        ],
        columnStyles: {
          '0': { cellWidth: 2 },
          '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0] },
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });


      const instrumentHead = [
        [
          { title: 'Instrument Used', colSpan: 2},
          { title: 'Calibration Date', rowSpan:2},
          { title: 'Calibration Due Date', rowSpan:2},
        ],
        ['Model No.','Serial No.']
      ];

      const instrumentUsedData = [{
        model_no: testData.instrument_used.model_no,
        serial_no: testData.instrument_used.serial_no,
      }]

      const instrumentUsedBody = instrumentUsedData.map((data) => [
        data.model_no,
        data.serial_no
      ]);

      autoTable(doc, {
        head: instrumentHead,
        body: instrumentUsedBody,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center", valign: "middle"},
        bodyStyles: { halign: "center"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });

      if(test.id === 0){
        generate_airVelocityTest(testData);
      }
      else if(test.id === 1){
          generate_filterIntegrityTest(testData);
      }else if(test.id === 2){
          generate_particleCountTest(testData);
      }else if(test.id === 3){
          generate_recoveryTest(testData);
      }
      else{
        default_test();
      }

      const signatureDetails = [
        [
          { title: 'TEST CARRIED OUT BY', rowSpan:2},
          { title: 'TEST WITNESSED BY', colSpan: 2},
        ],
        ["Sign of Engg.","Sign of Q.A."]
      ];

      const emptyRows = [[
        `\n\n`,`\n\n`,`\n\n`
      ]
    ];
      autoTable(doc, {
        head: signatureDetails,
        body: emptyRows,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "center", valign: "middle"},
        bodyStyles: { halign: "left"},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });


      // if (hasReportsForTests) {
      //   doc.addPage();
      //   hasReportsForTests = false;
      // }

    }
  }

  // Creating footer and saving file
  doc
    .setFontSize(9)
    .setTextColor(0, 0, 255)
    .textWithLink("Zeptac.com", 0.5, doc.internal.pageSize.height - 0.5, { url: 'https://zeptac.com' });

  const printed_date = new Date();
  const printed_on_date = moment(printed_date).format("YYYY-MM-DD HH:mm:ss");
  
  doc
    .setFontSize(8)
    .setTextColor(0, 0, 0)
    .setFont('helvetica', "italic")
    .text(("printed on " + printed_on_date), doc.internal.pageSize.width - 2, doc.internal.pageSize.height - 0.5);

  doc.save(`${pdfName}.pdf`);
};

export { reportGen };
