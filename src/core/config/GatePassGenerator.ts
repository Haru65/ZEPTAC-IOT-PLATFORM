// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const rgpGen = async (id, pdfName, rgpDetails, companyDetails) => {
  pdfName += `_${id}_returnable_gate_pass`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  doc
  .setFontSize(12)
  .setTextColor(0, 0, 0)
  .text("Returnable Gate Pass", doc.internal.pageSize.width / 2, 0.5, {
    align: "center",
  });

  // Company Logo Img
  const img = new Image()
  img.src = companyDetails.value.logo_base64;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  const Info = [
    [`RGP Date : ${rgpDetails.value.date || ""}`, `#RGP No. : ${rgpDetails.value.rgp_no || ""}`],
    [`RGP Due Date : ${rgpDetails.value.duedate || ""}`, `#Quotation No. : ${rgpDetails.value.quotation.quotation_no || ""}`],
  ];

  autoTable(doc, {
    body: Info,
    startY:1.6,
    columnStyles: {
        '0': { cellWidth: 3.63},
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

  const LocationData = [
    [
      `Customer Name : ${rgpDetails.value.quotation.customer.company_name || ''} \nContact Person : ${rgpDetails.value.quotation.customer.name || ''} \n\nBilling Address : ${rgpDetails.value.quotation.customer.address1 || ""} \n${rgpDetails.value.quotation.customer.address2 || ""} \n${rgpDetails.value.quotation.customer.city || ""} ${rgpDetails.value.quotation.customer.pincode || ""} \n${rgpDetails.value.quotation.customer.state || ""} ${rgpDetails.value.quotation.customer.country || ""}`,
      `Client Name : ${rgpDetails.value.quotation.clientx.company_name || ''} \nContact Person : ${rgpDetails.value.quotation.clientx.name || ''} \n\nSite Address : ${rgpDetails.value.quotation.clientx.address1 || ""} \n${rgpDetails.value.quotation.clientx.address2 || ""} \n${rgpDetails.value.quotation.clientx.city || ""} ${rgpDetails.value.quotation.clientx.pincode || ""} \n${rgpDetails.value.quotation.clientx.state || ""} ${rgpDetails.value.quotation.clientx.country || ""}`
    ]
  ];

  autoTable(doc, {
    body: LocationData,
    columnStyles: {
        '0': { cellWidth: 3.63},
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

  const service_engineers = await rgpDetails.value.Engineers.map(({ first_name, last_name, mobile }, index) => ({
    index: index + 1,
    first_name: first_name,
    last_name: last_name,
    mobile: mobile
  }));

  const engData = await service_engineers.map(engineer => [engineer.index, engineer.first_name, engineer.last_name, engineer.mobile]);

  const engineerData = [
    [
      "Sr. No",
      "First Name",
      "Last Name",
      "Mobile No.",
    ],
    ...engData,
  ];

  autoTable(doc, {
    body: engineerData,
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [199, 199, 199], halign: "left",fontSize: 9},
    columnStyles: {
      '0': { cellWidth: 0.5},
      '1': { cellWidth: "auto" },
      '2': { cellWidth: "auto" },
    },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },

  });

  const instruments = rgpDetails.value.Instruments.map(({name , instrument_id, model_no, serial_no, make, accessories_list }, index) => ({
    index: index+1,
    name,
    instrument_id,
    model_no,
    serial_no,
    make,
    accessories_list,
  }));

  const instData = instruments.map(instrument => [instrument.index, instrument.name + "\n\nAccessories : " + JSON.parse(instrument.accessories_list), instrument.instrument_id, instrument.model_no, instrument.serial_no, instrument.make]);
  
  const instrumentData = [
    [
      { title: 'Sr. No'},
      { title: 'Instrument Name'},
      { title: 'Instrument ID'},
      { title: 'Model No.'},
      { title: 'Serial No.'},
      { title: 'Make By'},
    ],
    ...instData
  ];

  autoTable(doc, {
    body: instrumentData,
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [199, 199, 199], halign: "left",fontSize: 9},
    columnStyles: {
      '0': { cellWidth: 0.5},
      '1': { cellWidth: 3.13 },
      '2': { cellWidth: "auto" },
    },
    bodyStyles: { halign: "left",fontSize: 9},
    tableLineColor: [0, 0, 0],
    didDrawCell: (data) => {
      const { cell, row, column } = data;
      doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
    },

  });

  const signatureDetails = [
    [
      { title: 'Prepared By,\nSign :\n\n', rowSpan:1},
      { title: 'Recieved By / Witnessed By,\nSign :\n\n', rowSpan:1},
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

  doc.save(`${pdfName}.pdf`);
};

export { rgpGen };
