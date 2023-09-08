// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const rgpGen = async (id, pdfName, rgpDetails) => {
  pdfName += `_${id}_returnable_gate_pass`;

  const engineerColumns = [
    { title: "Id", dataKey: "id" },
    { title: "Engineer Name", dataKey: "name" }
  ];

  const instrumentColumns = [
    { title: "Model No", dataKey: "model_no" },
    { title: "Serial No", dataKey: "serial_no" },
    { title: "Instrument Name", dataKey: "name" },
    { title: "Make By", dataKey: "make" }
  ];


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
    .text("Returnable Gate Pass", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

  // Company Logo Img
  const img = new Image()
  img.src = rgpDetails.value.company_details.company_logo;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // RGP number
  doc
    .setFontSize(10)
    .setFont('helvetica', "normal")
    .text("RGP# : " + rgpDetails.value.rgp_no, doc.internal.pageSize.width - 2.8, 0.8);

  // Quotation Creation Date
  const creationDate = new Date(rgpDetails.value.date).toDateString();
  doc
    .setFontSize(10)
    .setFont('helvetica', "normal")
    .text("RGP Date : " + creationDate, doc.internal.pageSize.width - 2.8, 1.0);

  // Quotation Due Date
  const dueDateText = new Date(rgpDetails.value.duedate).toDateString();
  doc
    .setFontSize(10)
    .setFont('helvetica', "normal")
    .text("RGP Due Date : " + dueDateText, doc.internal.pageSize.width - 2.8, 1.2);

  // Quotation number
  doc
  .setFontSize(10)
  .setFont('helvetica', "normal")
  .text("Quotation# : " + rgpDetails.value.quotation_no, doc.internal.pageSize.width - 2.8, 1.4);


  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  // Billing Address - From
  const customerAddress = rgpDetails.value.customer_address;
  const customerAddressText = `
      Billing Address,
      ${rgpDetails.value.customer_data.first_name} ${rgpDetails.value.customer_data.last_name}
      ${rgpDetails.value.customer_company.company_name ? rgpDetails.value.customer_company.company_name : ""},
      ${customerAddress.address1 || ""}
      ${customerAddress.address2 || ""}
      ${customerAddress.city || ""} ${customerAddress.pincode || ""}
      ${customerAddress.states || ""} ${customerAddress.country || ""}
  `;
  doc.setFontSize(10).setFont('helvetica', "normal").text(customerAddressText, 0.25, 1.7, {
    align: "left",
    maxWidth: 7.5,
  });

  // Site Address - To
  const clientAddress = rgpDetails.value.client_address;
  const clientAddressText = `
      Site Address,
      ${rgpDetails.value.client_data.first_name} ${rgpDetails.value.client_data.last_name}
      ${rgpDetails.value.client_company.company_name ? rgpDetails.value.client_company.company_name : ""},
      ${clientAddress.address1 || ""}
      ${clientAddress.address2 || ""}
      ${clientAddress.city || ""} ${clientAddress.pincode || ""}
      ${clientAddress.states || ""} ${clientAddress.country || ""}
  `;
  doc.setFontSize(10).setFont('helvetica', "normal").text(clientAddressText, doc.internal.pageSize.width - 3.0, 1.7, {
    align: "left",
    maxWidth: 7.5,
  });

  // Using autoTable plugin
  const service_engineers = rgpDetails.value.engineers.map(({ id, first_name, last_name }) => ({
    id,
    name: `${first_name} ${last_name}`
  }));

  //adding the last row [Total] in the table
  const engineerData = [...service_engineers]

  // main Content in the table
  autoTable(doc,{
    columns: engineerColumns,
    body: engineerData,
    startY: 3,
    margin: { left: 0.5, top: 1.25 },
    headStyles: { fillColor: [124, 95, 240] },
    didDrawCell: (data) => {
      if (data.column.index === 0 || data.column.index === 1) {
        data.cell.styles.halign = 'center';
      } else {
        data.cell.styles.halign = 'right';
      }
    },
  });


const instruments = rgpDetails.value.instruments.map(({ model_no, serial_no, name, make }) => ({
  model_no,
  serial_no,
  name,
  make,
}));
  

const instrumentData = [...instruments]

autoTable(doc, {
  columns: instrumentColumns,
  body: instrumentData,
  margin: { left: 0.5 },
  headStyles: { fillColor: [124, 95, 240] },
  didDrawCell: (data) => {
    if (data.column.index === 0 || data.column.index === 1) {
      data.cell.styles.halign = 'center';
    } else {
      data.cell.styles.halign = 'right';
    }
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
