// * This file is used to generate Validation Report pdf

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
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
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


const reportGen = async (id, pdfName, reportInfo, companyDetails) => {
  pdfName += `_${id}_validation_report`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  // Quotation Heading
  doc
    .setFontSize(12)
    .setTextColor(0, 0, 0)
    .text("Validation Report", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

  // Company Logo Img
  const img = new Image()
  img.src = companyDetails.value.logo_base64;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  const header = [];
  const body = [];

  autoTable(doc, {
    head: header,
    startY: 1.4,
    body: body,
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: 'center'},
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },

  });
  

  // functions

  function generate_airVelocityTest(testData){
      
    const length = testData.details.length;
          
    const header = [
      [
        { title: 'Supply Code', rowSpan:2},
        { title: 'Velocity Reading', colSpan: 5},
        { title: 'Average', rowSpan:2},
        { title: 'Supply Filter Size', rowSpan:2 },
        { title: 'CFM', rowSpan:2},
        { title: 'Total CFM', rowSpan:2 },
        { title: 'Room Volume', rowSpan:2 },
        { title: 'ACPH', rowSpan:2 }
      ],
      ['1', '2', '3', '4', '5','','','','','',''],
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
      {
        title: testData.total_cfm,
        rowSpan: length,
        styles: { valign: 'middle' }
      },
      {
        title: testData.room_volume,
        rowSpan: length,
        styles: { valign: 'middle' }
      },
      {
        title: testData.acph,
        rowSpan: length,
        styles: { valign: 'middle' }
      }
    ]);

    autoTable(doc, {
      head: header,
      body: body,
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },

    });

    const acceptanceCriteria = [
      ['ACCEPTANCE CRITERIA : AS PER SCHEDULE ACPH SHOULD NOT BE LESS THAN 20 PER HOUR']
    ];

    autoTable(doc, {
      head: acceptanceCriteria,
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center",fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });

      const acceptanceCriteria = [
        ['ACCEPTANCE CRITERIA :  PERCENTAGE LEAKAGE FOR PAO LEAK TEST SHOULD BE LESS THAN 0.01%']
      ];
  
      autoTable(doc, {
        head: acceptanceCriteria,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle",fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });


      const acceptanceCriteria = [
        [
          { title: 'ACCEPTANCE CRITERIA : AS PER ISO - 14644-1', colSpan: 3}
        ],
        [
          { title: 'At Rest', rowSpan:2},
          { title: 'Maximum concentration limits for particles/m3 of air', colSpan:2},
        ],
        ["0.5µ particles/m³","5.0µ particles/m³"]
      ];
  
      const acceptanceCriteriaData = [
        ["ISO CLASS 5", "3,520", "29" ],
        ["ISO CLASS 6", "35,200", "293" ],
        ["ISO CLASS 7", "3,52,000", "2,930" ],
        ["ISO CLASS 8", "35,20,200", "29,300" ],
      ]

      autoTable(doc, {
        head: acceptanceCriteria,
        body: acceptanceCriteriaData,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign:"middle",fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      const acceptanceCriteria = [
        [
          { title: 'ACCEPTANCE CRITERIA : AS PER ISO - 14644-1', colSpan: 3}
        ],
        [
          { title: 'At Rest', rowSpan:2},
          { title: 'Maximum concentration limits for particles/m3 of air', colSpan:2},
        ],
        ["0.5µ particles/m³","5.0µ particles/m³"]
      ];
  
      const acceptanceCriteriaData = [
        ["ISO CLASS 5", "3,520", "29" ],
        ["ISO CLASS 6", "35,200", "293" ],
        ["ISO CLASS 7", "3,52,000", "2,930" ],
        ["ISO CLASS 8", "35,20,200", "29,300" ],
      ]

      autoTable(doc, {
        head: acceptanceCriteria,
        body: acceptanceCriteriaData,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left",fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
          { content: `TEST CERTIFICATE - ${test.test.toUpperCase()}` + (test.id == 0 ? " & ACPH CALCULATION" : "")},
        ]      
      ];

      const SiteInfo = [
        [`Company Name : ${reportInfo.value.rgp.quotation.clientx.company_name || ""}`],
        [`ADD : ${reportInfo.value.rgp.quotation.clientx.address1 || ""} ${reportInfo.value.rgp.quotation.clientx.address2 || ""} ${reportInfo.value.rgp.quotation.clientx.city || ""} ${reportInfo.value.rgp.quotation.clientx.pincode || ""} ${reportInfo.value.rgp.quotation.clientx.state || ""} ${reportInfo.value.rgp.quotation.clientx.country || ""}`]
      ];
  
      autoTable(doc, {
        head: testMainHeading,
        body: SiteInfo,
        columns: [
          { header: 'Heading', dataKey: '0' }
        ],
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center",fontSize: 9 , lineColor: [0, 0, 0]},
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        ['Acceptance Criteria', testData.acceptance_criteria.certified],
      ];

      const areaWise = [
        ['Room Name / No', testData.room_name],
        ['Area Name', testData.area_name],
        ['AHU No', testData.ahu_no],
      ];
      const equipmentWise = [
        ['Equipment ID', testData.equipment_id],
        ['Equipment Name', testData.equipment_name],
      ];

      if(testData.room_name){
        data.push(...areaWise)
      }

      if(testData.equipment_id){
        data.push(...equipmentWise)
      }
  
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
        headStyles: {  fillColor: [199, 199, 199], textColor: [0, 0, 0] ,fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });


      const instrumentHead = [
        [
          { title: 'Instrument Used', colSpan: 3},
          { title: 'Calibration Date', rowSpan:2},
          { title: 'Calibration Due Date', rowSpan:2},
        ],
        ['Instrument Name','Model No.','Serial No.']
      ];

      const instrumentUsedData = [{
        name: testData.instrument_used.name,
        model_no: testData.instrument_used.model_no,
        serial_no: testData.instrument_used.serial_no,
        calibration_date: testData.instrument_used.calibration_date,
        calibration_due_date: testData.instrument_used.calibration_due_date,
      }]

      const instrumentUsedBody = instrumentUsedData.map((data) => [
        data.name,
        data.model_no,
        data.serial_no,
        data.calibration_date,
        data.calibration_due_date,
      ]);

      autoTable(doc, {
        head: instrumentHead,
        body: instrumentUsedBody,
        margin: { left: 0.5, top: 1.25 },
        headStyles: {  fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "center", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
        `\n`,`\n`,`\n`
      ]
    ];
      autoTable(doc, {
        head: signatureDetails,
        body: emptyRows,
        margin: { left: 0.5, top: 1.25 },
        headStyles: {  fillColor: [199, 199, 199], textColor: [0, 0, 0], halign: "center", valign: "middle",fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
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
