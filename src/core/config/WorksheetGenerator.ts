// * This file is used to generate GatePass pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ConductedTests, AcceptanceCriteria } from "@/core/model/conductedtests";
import moment from "moment";

const worksheetGen = async (id, pdfName, worksheetInfo) => {
  pdfName += `_${id}_daily_worksheet`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  // Worksheet Heading
  doc
    .setFontSize(12)
    .setTextColor(0, 0, 0)
    .text("Daily Worksheet", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

  // Company Logo Img
  const img = new Image()
  img.src = worksheetInfo.value.company_details.company_logo;
  doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);

  // create a line under heading
  doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

  // const date = moment(worksheetInfo.date, "YYYY-MM-DD").format("LL");

  const Info = [
    [`Customer ID : ${worksheetInfo.value.customer_data.id}`,{ title: "", rowSpan:2}],
    [`Quotation No. : ${worksheetInfo.value.quotation_details.quotation_no}`]
  ];

  autoTable(doc, {
    body: Info,
    startY:1.6,
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

  const workingDate = moment(worksheetInfo.value.work_date, "YYYY-MM-DD").format("YYYY-MM-DD");
  const startTime = moment(worksheetInfo.value.start_time).format("YYYY-MM-DD HH:mm:ss")
  const EndTime = moment(worksheetInfo.value.end_time).format("YYYY-MM-DD HH:mm:ss")

  const customer_address = `${worksheetInfo.value.customer_address.address1} ${worksheetInfo.value.customer_address.address2} ${worksheetInfo.value.customer_address.city} ${worksheetInfo.value.customer_address.pincode} ${worksheetInfo.value.customer_address.states} ${worksheetInfo.value.customer_address.country}`
  const data = [
    ['Customer Name', `${worksheetInfo.value.customer_data.first_name} ${worksheetInfo.value.customer_data.last_name}`],
    ['Address', customer_address],
    ['Phone / Mobile No.', `${worksheetInfo.value.customer_data.mobile}`],
    ['Contact Person', `COMING SOON`],
    ['Witnessed By', worksheetInfo.value.witnessed_by],
    ['Actual Working Date', workingDate],
    ['Work Start Time', startTime],
    ['Work Finished Time', EndTime],
  ];

  data.push([{
    title: `Scope of Work :\n${worksheetInfo.value.scope_of_work}`,
    colSpan: 2
  }])

  autoTable(doc, {
    body: data,
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

  // For sr.no, test_code + test_name , status requires one extra row
  const length = ConductedTests.length + 1;

  const customArray = ConductedTests.map((testObj, index) => {
    const conducted = worksheetInfo.value.tests.some(test => test.id === testObj.id.toString());
    return [ index + 1, `(${testObj.code}) ${testObj.test}`, conducted ? `( YES )` : `( NO )`];
  });

  // console.log(customArray)

  const TestData = [
    [
      {
        content: "Test Conducted",
        rowSpan: length
      },
      {
        content: "Sr.No"
      },
      {
        content: "Test Name",
      },
      {
        content: "Conducted"
      }
    ],
    ...customArray,
    [
      {
        title: `Any Other Test`,
      },
      {
      title: `${worksheetInfo.value.other_test}`,
      colSpan: 3,
    }]
  ];

  autoTable(doc, {
    body: TestData,
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

  const standardLength = AcceptanceCriteria.length + 1;

  const standardCustomArray = AcceptanceCriteria.map((standardObj, index) => {
    return [ index + 1, `${standardObj.certified}`, "( NA )"];
  });

  const StandardData = [
    [
      {
        content: "Standard Used",
        rowSpan: standardLength
      },
      {
        content: "Sr.No"
      },
      {
        content: "Standard Name",
      },
      {
        content: "Standard Used"
      }
    ],
    ...standardCustomArray,
    [
      {
        title: `Problem Faced If Any`,
      },
      {
        title: `${worksheetInfo.value.problem}`,
        colSpan: 3,
      }
    ]
  ];

  autoTable(doc, {
    body: StandardData,
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

  const signatureDetails = [
    [
      { title: 'Test Carried Out By,\nSign :\n\n', rowSpan:1},
      { title: 'Authorised Person / Test Witnessed By,\nSign :\n\n', rowSpan:1},
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

export { worksheetGen };
