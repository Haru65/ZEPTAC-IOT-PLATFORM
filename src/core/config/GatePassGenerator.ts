// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const rgpGen = async (id, pdfName, rgpDetails) => {
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
  img.src = rgpDetails.value.company_details.company_logo;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  
  const rgpDate = new Date(rgpDetails.value.date).toDateString();
  const rgpDueDate = new Date(rgpDetails.value.duedate).toDateString();

  const Info = [
    [`RGP Date : ${rgpDate}`, `#RGP No. : ${rgpDetails.value.rgp_no}`],
    [`RGP Due Date : ${rgpDueDate}`, `Quotation No. : ${rgpDetails.value.quotation_no}`],
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
      `Customer Name : ${rgpDetails.value.client_company.company_name} \nContact Person : ${rgpDetails.value.customer_data.first_name} ${rgpDetails.value.customer_data.last_name} \n\nBilling Address : ${rgpDetails.value.customer_address.address1 ? rgpDetails.value.customer_address.address1 : ""} ${rgpDetails.value.customer_address.address2 ? rgpDetails.value.customer_address.address2 : ""} ${rgpDetails.value.customer_address.city ? rgpDetails.value.customer_address.city : ""} - ${rgpDetails.value.customer_address.pincode ? rgpDetails.value.customer_address.pincode : ""}, ${rgpDetails.value.customer_address.states ? rgpDetails.value.customer_address.states : ""}, ${rgpDetails.value.customer_address.country ? rgpDetails.value.customer_address.country : ""}`,
      `Client Name : ${rgpDetails.value.client_company.company_name} \nContact Person : ${rgpDetails.value.client_data.first_name} ${rgpDetails.value.client_data.last_name} \n\nSite Address : ${rgpDetails.value.client_address.address1 ? rgpDetails.value.client_address.address1 : ""} ${rgpDetails.value.client_address.address2 ? rgpDetails.value.client_address.address2 : ""} ${rgpDetails.value.client_address.city ? rgpDetails.value.client_address.city : ""} - ${rgpDetails.value.client_address.pincode ? rgpDetails.value.client_address.pincode : ""}, ${rgpDetails.value.client_address.states ? rgpDetails.value.client_address.states : ""}, ${rgpDetails.value.client_address.country ? rgpDetails.value.client_address.country : ""}`
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

  const service_engineers = await rgpDetails.value.engineers.map(({ first_name, last_name, mobile }, index) => ({
    index: index + 1,
    name: `${first_name} ${last_name}`,
    mobile: mobile
  }));

  console.log("->", service_engineers)
  
  const engData = await service_engineers.map(engineer => [engineer.index, engineer.name, engineer.mobile]);
  
  
  console.log("->", engData)

  const engineerData = [
    [
      "Sr. No",
      "Service Engineer Name",
      "Mobile No.",
    ],
    ...engData,
  ];

  autoTable(doc, {
    body: engineerData,
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "left",fontSize: 9},
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

  const instruments = rgpDetails.value.instruments.map(({name , instrument_id, model_no, serial_no, make, accessories_list }, index) => ({
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
    headStyles: { fillColor: [191, 191, 191], textColor: [0, 0, 0], halign: "left",fontSize: 9},
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
