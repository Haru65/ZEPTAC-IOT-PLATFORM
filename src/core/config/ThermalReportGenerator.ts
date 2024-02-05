// * This file is used to generate Thermal Report pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAssetPath } from "@/core/helpers/assets";
import moment from "moment";

const imgData = getAssetPath(
  "media/avatars/blank.png"
);

const thermalReportGen = async (id, pdfName, reportInfo) => {
  pdfName += `_${id}_thermal_report`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
    
  });

  // HEADER // Depend on company
  function addHeader() {
    
  }

  // functions
  function drawHeader(titleName){

    const customerAddress = `${reportInfo.value.customer_address.address1} ${reportInfo.value.customer_address.address2} ${reportInfo.value.customer_address.city} ${reportInfo.value.customer_address.pincode} ${reportInfo.value.customer_address.states} ${reportInfo.value.customer_address.country}`;

    const Info = [
      [{ title: "TEMPERATURE & RH MAPPING REPORT", colSpan:2, halign: "center"}],
      [{ title: `${titleName}`, colSpan:2, halign: "center"}],
      [{ title: "Customer Name & Address", rowSpan:2}, { title:`${reportInfo.value.customer_name}`}],
      [`${customerAddress}`]
    ];

    return Info;

  }

  function drawIndexPage(){

      // INDEX PAGE TITLE
      const indexPageTitle = drawHeader("INDEX");

      autoTable(doc, {
        body: indexPageTitle,
        startY:0.7,
        columnStyles: {
          '0': { cellWidth: 2 , halign: "center"},
          '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });
      
      const validation_start_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");
      const validation_start_time = moment(reportInfo.value.start_time, "HH:mm:ss").format("hh:mm A");

      const end_date = reportInfo.value.dates[reportInfo.value.dates.length - 1];
      const validation_end_date = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");
      const validation_end_time = moment(end_date, "YYYY-MM-DD HH:mm:ss").format("hh:mm A");

      // Basic Details of Room Information
      const roomData = [
        [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
        [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
        [`Validation Start Date`, `${validation_start_date}`,`Validation End Date`, `${validation_end_date}`],
        [`Validation Start Time`, `${validation_start_time}`, `Validation End Time`, `${validation_end_time}`],
      ];

      autoTable(doc, {
        body: roomData,
        columnStyles: {
          '0': { cellWidth: 2 },
          '1': { cellWidth: 2 },
          '2': { cellWidth: 2 },
          '3': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      // Table of Content
      const tableContentData = [
        ["Sr.No.", "Content"],
        ["1", "Index"],
        ["2", "Calibration Certificate With Traceability Of Instrument Use"],
        ["3", "Summary Report (°C  & %RH)"],
        ["4", "Sensor Location Diagram"],
        ["5", "Graphical Representation"],
        ["6", 'Final Observation & Conclusion'],
      ];

      autoTable(doc, {
        body: tableContentData,
        columnStyles: {
          '0': { cellWidth: 1 },
          '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });


      // E-Signatures
      const signatureData = [
        [
          { title: 'Done By'},
          { title: 'Checked By'},
          { title: 'Reviewed By'},
          { title: 'Approved By'},
        ],
        [
          `\n`,`\n`,`\n`
        ],
        [
          { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
          { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
        ],
      ];

      autoTable(doc, {
        body: signatureData,
        startY: 10,
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      doc.addPage();
  }

  function drawInstrumentPage(pageNumber){

      // INSTRUMENT PAGE TITLE
      const instrumentPageTitle = drawHeader('CALIBRATION CERTIFICATE WITH TRACEABILITY OF INSTRUMENT USE');

      autoTable(doc, {
        body: instrumentPageTitle,
        startY:0.5,
        columnStyles: {
          '0': { cellWidth: 2 , halign: "center"},
          '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });
      
      const mapping_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");

      // Basic Details of Room Information
      const roomData = [
        [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
        [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
        [`Number of Data logger used`, `${reportInfo.value.logger_used}`,`Mapping Date`, `${mapping_date}`],
        [`Frequency of Reading`, `${reportInfo.value.logging_interval} Min.`, `Maping Duration`, `${reportInfo.value.mapping_duration} Hr.`],
      ];

      autoTable(doc, {
        body: roomData,
        columnStyles: {
          '0': { cellWidth: 2 },
          '1': { cellWidth: 2 },
          '2': { cellWidth: 2 },
          '3': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });


    // Instrument Listing
      const instrumentHeader = [
        [
          { title: 'Sr.No.', cellWidth: 0.5},{ title: 'Instrument Name', cellWidth: 1.5},{ title: 'Serial No', cellWidth: 1},{ title: 'Done Date', cellWidth: 1},{ title: 'End Date', cellWidth: 1}
        ],
      ];

      // Calculate start and end index for instruments on the current page
      
      const startIndex = (pageNumber - 1) * instrumentsPerPage;
      const endIndex = Math.min(pageNumber * instrumentsPerPage, instrumentLength);
      
      // Add body content for instruments on the current page
      const instrumentBody = reportInfo.value.instruments.slice(startIndex, endIndex)
      .map((instrument, i) => [
        i + 1,
        instrument.instrument_name,
        instrument.serial_no,
        instrument.calibration_date,
        instrument.calibration_due_date,
      ]);


      autoTable(doc, {
        head: instrumentHeader,
        body: instrumentBody,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
        bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },

      });

      // E-Signatures
      const signatureData = [
        [
          { title: 'Done By'},
          { title: 'Checked By'},
          { title: 'Reviewed By'},
          { title: 'Approved By'},
        ],
        [
          `\n`,`\n`,`\n`
        ],
        [
          { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
          { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
        ],
      ];

      autoTable(doc, {
        body: signatureData,
        startY: 10,
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      // Add a new page if there are more instruments
      if (currentPage <= instrumentPages) {
        doc.addPage();
      }
    
  }

  function drawSummaryPage(){

    // SUMMARY PAGE TITLE
    const summaryPageTitle = drawHeader("SUMMARY REPORT (°C  & %RH)");

    autoTable(doc, {
      body: summaryPageTitle,
      startY:0.5,
      columnStyles: {
        '0': { cellWidth: 2 , halign: "center"},
        '1': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    const mapping_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");

    // Basic Details of Room Information
    const roomData = [
      [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
      [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
      [`Number of Data logger used`, `${reportInfo.value.logger_used}`,`Mapping Date`, `${mapping_date}`],
      [`Frequency of Reading`, `${reportInfo.value.logging_interval} Min.`, `Maping Duration`, `${reportInfo.value.mapping_duration} Hr.`],
    ];

    autoTable(doc, {
      body: roomData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: 2 },
        '3': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

  // MAX MIN TEMP
    const tempSummaryData = [
      [{title: `Minimum.Maximum & Average Temperature Table`, colSpan:3, halign: "center"}],
      [{title: `Sensor Location`}, {title: `Minimum (°C)`}, { title: "Average (°C)"}],
      [{title: `${minTempLocation}`}, {title: `${reportInfo.value.min_temp.reading}`}, {title: `${reportInfo.value.avg_temp}`, rowSpan: 3}],
      [{title: `Sensor Location`}, {title: `Maximum (°C)`}],
      [{title: `${maxTempLocation}`}, {title: `${reportInfo.value.max_temp.reading}`}],
    ];

    autoTable(doc, {
      body: tempSummaryData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

  // MAX MIN ARH
    const rhSummaryData = [
      [{title: `Minimum.Maximum & Average RH Table`, colSpan:3, halign: "center"}],
      [{title: `Sensor Location`}, {title: `Minimum (% RH)`}, { title: "Average (% RH)"}],
      [{title: `${minRhLocation}`}, {title: `${reportInfo.value.min_rh.reading}`}, {title: `${reportInfo.value.avg_rh}`, rowSpan: 3}],
      [{title: `Sensor Location`}, {title: `Maximum (% RH)`}],
      [{title: `${maxRhLocation}`}, {title: `${reportInfo.value.max_rh.reading}`}],
    ];

    autoTable(doc, {
      body: rhSummaryData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // E-Signatures
    const signatureData = [
      [
        { title: 'Done By'},
        { title: 'Checked By'},
        { title: 'Reviewed By'},
        { title: 'Approved By'},
      ],
      [
        `\n`,`\n`,`\n`
      ],
      [
        { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
        { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
      ],
    ];

    autoTable(doc, {
      body: signatureData,
      startY: 10,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    doc.addPage();
  
  }

  async function drawLocationPage(){

    // LOCATION PAGE TITLE
    const locationPageTitle = drawHeader("SENSOR LOCATION DIAGRAM");

    autoTable(doc, {
      body: locationPageTitle,
      startY:0.5,
      columnStyles: {
        '0': { cellWidth: 2 , halign: "center"},
        '1': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    const validation_start_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const end_date = reportInfo.value.dates[reportInfo.value.dates.length - 1];
    const validation_end_date = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");

    // Basic Details of Room Information
    const roomData = [
      [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
      [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
      [`Validation Start Date`, `${validation_start_date}`,`Validation End Date`, `${validation_end_date}`],
    ];

    autoTable(doc, {
      body: roomData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: 2 },
        '3': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // URL of the diagram
    const img = new Image()
    img.src = reportInfo.value.sensor_location_diagram_data;

    // Fixed height for the diagram
    const imgHeight = 4;
    
    // Diagram Table
    const reportDiagramData = [
      [{title: `Area Diagram` }],
      [{title: "", minCellHeight: imgHeight}],
    ];

    autoTable(doc, {
      body: reportDiagramData,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        if (data.row.index === 1 && data.row.section === 'body') {
          // Add the image to the cell with full width and fixed height
          doc.addImage(img, 'JPEG', cell.x, cell.y, 7.20, imgHeight);
          doc.rect(cell.x, cell.y, 7.20, imgHeight, 'S');
        }
        else{
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        }
      },
      
    });

    // HOT AND COLD SPOT
    const colorData = [
      [{title: `Hot & Cold Spot`, colSpan: 3 }],
      [{title: "Temperature Min"}, {title: `${minTempLocation}`}, {title: ""}],
      [{title: "Temperature Max"}, `${maxTempLocation}`,  {title: ""}],
    ];

    autoTable(doc, {
      startY: 7.66,
      body: colorData,
      margin: { left: 0.5, top: 1.25 },
      columnStyles: {
        '0': { cellWidth: 2},
        '1': { cellWidth: 2},
        '2': { cellWidth: "auto" }
      },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
    
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');

        if (row.index === 1 && column.index === 2) {
          doc.setFillColor(102, 187, 106);
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
        } else if (row.index === 2 && column.index === 2) {
          doc.setFillColor(244, 67, 54);
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
        }
      },
    });

    // E-Signatures
    const signatureData = [
      [
        { title: 'Done By'},
        { title: 'Checked By'},
        { title: 'Reviewed By'},
        { title: 'Approved By'},
      ],
      [
        `\n`,`\n`,`\n`
      ],
      [
        { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
        { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
      ],
    ];

    autoTable(doc, {
      body: signatureData,
      startY: 10,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    doc.addPage();

  }

  function locationPageExtended(){

    // LOCATION PAGE TITLE
    const locationPageTitle = drawHeader("SENSOR LOCATION DIAGRAM");

    autoTable(doc, {
      body: locationPageTitle,
      startY:0.5,
      columnStyles: {
        '0': { cellWidth: 2 , halign: "center"},
        '1': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    const validation_start_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const end_date = reportInfo.value.dates[reportInfo.value.dates.length - 1];
    const validation_end_date = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");

    // Basic Details of Room Information
    const roomData = [
      [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
      [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
      [`Validation Start Date`, `${validation_start_date}`,`Validation End Date`, `${validation_end_date}`],
    ];

    autoTable(doc, {
      body: roomData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: 2 },
        '3': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    // logger Details with location
    const instrumentsData = [
      [{ title: "Data Logger Location", colSpan: 2 }],
    ];
    
    for (let i = 0; i < reportInfo.value.excel_data.length; i += 2) {
      const excel_data1 = reportInfo.value.excel_data[i];
      const excel_data2 = reportInfo.value.excel_data[i + 1];
    
      const x = excel_data1
        ? {
            title: `Location: L${i + 1}, LoggerID: ${excel_data1["logger_id"]}`,
            colSpan: 1
          }
        : null;
    
      const y = excel_data2
        ? {
            title: `Location: L${i + 2}, LoggerID: ${excel_data2["logger_id"]}`,
            colSpan: 1
          }
        : null;
    
      const row = [x, y].filter(Boolean) as { title: string; colSpan: number }[]; // Assert type
      instrumentsData.push(row);
    }
    
    autoTable(doc, {
      body: instrumentsData,
      margin: { left: 0.5, top: 1.25 },
      columnStyles: {
        '0': { cellWidth: 3.635},
        '1': { cellWidth: "auto"},
      },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
    
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');

        if (row.index === 1 && column.index === 2) {
          doc.setFillColor(102, 187, 106);
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
        } else if (row.index === 2 && column.index === 2) {
          doc.setFillColor(244, 67, 54);
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
        }
      },
    });

    // E-Signatures
    const signatureData = [
      [
        { title: 'Done By'},
        { title: 'Checked By'},
        { title: 'Reviewed By'},
        { title: 'Approved By'},
      ],
      [
        `\n`,`\n`,`\n`
      ],
      [
        { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
        { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
      ],
    ];

    autoTable(doc, {
      body: signatureData,
      startY: 10,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    doc.addPage();

  }

  async function drawGraphicalPage(){

    // GRAPHICAL PAGE TITLE
    const graphicalPageTitle = drawHeader("GRAPHICAL REPRESENTATION");

    autoTable(doc, {
      body: graphicalPageTitle,
      startY:0.5,
      columnStyles: {
        '0': { cellWidth: 2 , halign: "center"},
        '1': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    const validation_start_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const end_date = reportInfo.value.dates[reportInfo.value.dates.length - 1];
    const validation_end_date = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");

    // Basic Details of Room Information
    const roomData = [
      [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
      [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
      [`Validation Start Date`, `${validation_start_date}`,`Validation End Date`, `${validation_end_date}`],
    ];

    autoTable(doc, {
      body: roomData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: 2 },
        '3': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // URL of the diagram
    const img = new Image()
    img.src = reportInfo.value.sensor_location_chart_data;

    // Fixed height for the diagram
    const imgHeight = 5;
    
    // Chart Table
    const reportChartData = [
      [{title: `Area Diagram` }],
      [{title: "", minCellHeight: imgHeight}],
    ];

    autoTable(doc, {
      body: reportChartData,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        if (data.row.index === 1 && data.row.section === 'body') {
          // Add the image to the cell with full width and fixed height
          doc.addImage(img, 'JPEG', cell.x, cell.y, 7.20, imgHeight);
          doc.rect(cell.x, cell.y, 7.20, imgHeight, 'S');
        }
        else{
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        }
      },
      
    });

    // E-Signatures
    const signatureData = [
      [
        { title: 'Done By'},
        { title: 'Checked By'},
        { title: 'Reviewed By'},
        { title: 'Approved By'},
      ],
      [
        `\n`,`\n`,`\n`
      ],
      [
        { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
        { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
      ],
    ];

    autoTable(doc, {
      body: signatureData,
      startY: 10,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    doc.addPage();

  }

  function drawConclusionPage(){

    // CONCLUSION PAGE TITLE
    const conclusionPageTitle = drawHeader("FINAL OBSERVATION & CONCLUSION");

    autoTable(doc, {
      body: conclusionPageTitle,
      startY:0.5,
      columnStyles: {
        '0': { cellWidth: 2 , halign: "center"},
        '1': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });
    
    const validation_start_date = moment(reportInfo.value.val_start_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const validation_start_time = moment(reportInfo.value.start_time, "HH:mm:ss").format("hh:mm A");

    const end_date = reportInfo.value.dates[reportInfo.value.dates.length - 1];
    const validation_end_date = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    const validation_end_time = moment(end_date, "YYYY-MM-DD HH:mm:ss").format("hh:mm A");

    // Basic Details of Room Information
    const roomData = [
      [{title: `Name of Room : ${reportInfo.value.room_name}`, colSpan:4}],
      [{title: `Criteria for Temperature : ${reportInfo.value.acc_for_temp}`, colSpan:2}, {title: `Criteria for Humidity : ${reportInfo.value.acc_for_rh}`, colSpan:2}],
      [`Validation Start Date`, `${validation_start_date}`,`Validation End Date`, `${validation_end_date}`],
      [`Validation Start Time`, `${validation_start_time}`, `Validation End Time`, `${validation_end_time}`],
    ];

    autoTable(doc, {
      body: roomData,
      columnStyles: {
        '0': { cellWidth: 2 },
        '1': { cellWidth: 2 },
        '2': { cellWidth: 2 },
        '3': { cellWidth: "auto" },
      },
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // Conclusion
    const conclusionData = [
      [{ title: "Conclusion:"}],
      [{ title: "\u2022 The above mentioned Temperature & RH Readings for FINISHED STORAGE Distribution Study & result found as per the acceptance criteria." }],
      [{ title: "\u2022 This room is in compliance with the defined criteria of Temperature NMT 40°C & RH NMT 60%." }],
      [{ title: "\u2022 Qualified for its further use." }],
    ];

    // Configure styles for the table
    const styles = {
      styles: { halign: 'left' }, // Left-align text
      columnStyles: { 0: { columnWidth: 'auto' } }, // Adjust column width for the bullet points
    };

    autoTable(doc, {
      body: conclusionData,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },

    });


    // E-Signatures
    const signatureData = [
      [
        { title: 'Done By'},
        { title: 'Checked By'},
        { title: 'Reviewed By'},
        { title: 'Approved By'},
      ],
      [
        `\n`,`\n`,`\n`
      ],
      [
        { title: `For, ${reportInfo.value.client_name}`, colSpan:2},
        { title: `For,${reportInfo.value.customer_name}`, colSpan: 2},
      ],
    ];

    autoTable(doc, {
      body: signatureData,
      startY: 10,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

  }

    // Heading
    doc
    .setFontSize(12)
    .setTextColor(0, 0, 0)
    .text("Thermal Report", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

    // Global Variables

    // Min Temp Location
    const findMinTempIndex = () => {
      const index = reportInfo.value.excel_data.findIndex((data) => data["instrument_id"] == reportInfo.value.min_temp.instrument_id);
      return index !== -1 ? index + 1 : null;
    };
    const minTempLocation = `L${findMinTempIndex()}`;

    // Max Temp Location
    const findMaxTempIndex = () => {
      const index = reportInfo.value.excel_data.findIndex((data) => data["instrument_id"] == reportInfo.value.max_temp.instrument_id);
      return index !== -1 ? index + 1 : null;
    };
    const maxTempLocation = `L${findMaxTempIndex()}`;

    // Min RH Location
    const findMinRhIndex = () => {
      const index = reportInfo.value.excel_data.findIndex((data) => data["instrument_id"] == reportInfo.value.min_rh.instrument_id);
      return index !== -1 ? index + 1 : null;
    };
    const minRhLocation = `L${findMinRhIndex()}`;

    // Max RH Location
    const findMaxRhIndex = () => {
      const index = reportInfo.value.excel_data.findIndex((data) => data["instrument_id"] == reportInfo.value.max_rh.instrument_id);
      return index !== -1 ? index + 1 : null;
    };
    const maxRhLocation = `L${findMaxRhIndex()}`;


    // Index Page Logic
    drawIndexPage()

    
    // Instruments Page Logic
    const instrumentLength = reportInfo.value.instruments.length;
    // const instrumentLength = reportInfo.value.excel_data.length;
    const instrumentsPerPage = 10;
    const instrumentPages = Math.ceil(instrumentLength / instrumentsPerPage);
    
    let currentPage = 1;
    
    while (currentPage <= instrumentPages) {
      drawInstrumentPage(currentPage);
      currentPage++;
    }

    // Summary Page Logic
    drawSummaryPage();


    // Location Page Logic
    drawLocationPage();
    locationPageExtended();

    // Graphical Page Logic
    drawGraphicalPage();

    // Conclusion Page Logic
    drawConclusionPage();

    // Creating footer and saving file
    doc
      .setFontSize(9)
      .setTextColor(0, 0, 255)
      .textWithLink("Zeptac", 0.5, doc.internal.pageSize.height - 0.5, { url: 'https://app.zeptac.com' });

    const printed_date = new Date();
    const printed_on_date = moment(printed_date).format("YYYY-MM-DD HH:mm:ss");
    
    doc
      .setFontSize(8)
      .setTextColor(0, 0, 0)
      .setFont('helvetica', "italic")
      .text(("printed on " + printed_on_date), doc.internal.pageSize.width - 2, doc.internal.pageSize.height - 0.5);

    doc.save(`${pdfName}.pdf`);

};

export { thermalReportGen };
