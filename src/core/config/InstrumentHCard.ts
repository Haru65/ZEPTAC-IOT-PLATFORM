// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

const instrumentGen = async (id, pdfName, instrumentInfo) => {
  pdfName += `_${id}`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  // Instrument Heading
  doc
    .setFontSize(12)
    .setTextColor(0, 0, 0)
    .text("Instrument History Card", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

  // Company Logo Img
  const img = new Image()
  img.src = instrumentInfo.value.company_details.company_logo;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  // const date = moment(instrumentInfo.date, "YYYY-MM-DD").format("LL");

  const company_address = `${instrumentInfo.value.company_details.address} ${instrumentInfo.value.company_details.city} ${instrumentInfo.value.company_details.pincode} ${instrumentInfo.value.company_details.state} ${instrumentInfo.value.company_details.country} `

  const Info = [
    ['Company Name', `${instrumentInfo.value.company_details.company_name}`],
    ['Company Address', `${company_address}`],
  ];

  autoTable(doc, {
    body: Info,
    startY:1.6,
    columnStyles: {
      '0': { cellWidth: 2 },
      '1': { cellWidth: "auto" },
    },
    margin: { left: 0.5, top: 1.25 },
    bodyStyles: { fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },
  });

  const details = [
    ['Instrument Name', `${instrumentInfo.value.name}`],
    ['Model No.', instrumentInfo.value.model_no],
    ['Serial No.', `${instrumentInfo.value.serial_no}`],
    ['Make By', `${instrumentInfo.value.make}`],
  ];


  const InstrumentData = [
    [
      {
        content: "INSTRUMENT DETAILS",
        colSpan: 2,
      },
    ],
    ...details
  ];

  autoTable(doc, {
    body: InstrumentData,
    columnStyles: {
      '0': { cellWidth: 2},
      '1': { cellWidth: "auto" },
    },
    margin: { left: 0.5, top: 1.25 },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },
  });


  const length = instrumentInfo.value.accessories_list.length + 1;

  const accessoryArray = instrumentInfo.value.accessories_list.map((acc, index) => {
    return [ index + 1, `${acc}`];
  });

  const Accessories = [
    [
      {
        content: "Accessories List",
        rowSpan: length
      },
      {
        content: "Sr.No",
        colSpan: 1,
      },
      {
        content: "Accessory Name",
        colSpan: 1,
      },
    ],
    ...accessoryArray,
  ];


  autoTable(doc, {
    body: Accessories,
    columnStyles: {
      '0': { cellWidth: 2, halign: "center", valign: "middle" },
      '1': { cellWidth: "auto" },
    },
    margin: { left: 0.5, top: 1.25 },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },
  });



  const CalibrationData = [
    [
      { title: 'CALIBRATION DETAILS', colSpan: 3},
    ],
    ['Calibration Date','Calibration Due Date', 'Vendor Name'],
    [instrumentInfo.value.calibration_date,instrumentInfo.value.calibration_due_date, instrumentInfo.value.vendor_name],
  ];
  

  autoTable(doc, {
    body: CalibrationData,
    columnStyles: {
      '0': { cellWidth: 2},
      '1': { cellWidth: "auto" },
    },
    margin: { left: 0.5, top: 1.25 },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },
  });

  const{ periodicity, m_date1, m_date2, m_date3, m_details, any_repair_detail, maintenance_done_by } = instrumentInfo.value.maintenance_details;

  const MaintenanceData = [
    [
      { title: 'MAINTENANCE DETAILS', colSpan:2 },
    ],
    [
      { title: 'Dates *(maintenance has to be done on the following dates)', rowSpan: 3 },
      { title: m_date1},
    ],
    [
      { title: m_date2},
    ],
    [
      { title: m_date3},
    ],
    ['Maintenance Details', `${m_details}`],
    ['Frequency', `${periodicity} months`],
    ['Any Repair/Damage/Adjustment', `${any_repair_detail ? any_repair_detail : "NA"}`],
    ['Maintenance Done By', `${instrumentInfo.value.make}`],
  ];

  autoTable(doc, {
    body: MaintenanceData,
    columnStyles: {
      '0': { cellWidth: 2 },
      '1': { cellWidth: "auto" },
    },
    margin: { left: 0.5, top: 1.25 },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },
  });


  const signatureDetails = [
    [
      { title: 'Employee Signature :\n\n\n', rowSpan:1},
      { title: 'Digital Signature :\n\n\n', rowSpan:1},
    ]
  ];

  autoTable(doc, {
    body: signatureDetails,
    margin: { left: 0.5, top: 1.25 },
    columnStyles: {
      '0': { cellWidth: 3.63},
      '1': { cellWidth: "auto" },
    },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },

  });

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

export { instrumentGen };
