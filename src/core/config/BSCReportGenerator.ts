// * This file is used to generate BSC Report pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAssetPath } from "@/core/helpers/assets";
import moment from "moment";
import { ref } from "vue";

const imgData = getAssetPath(
  "media/avatars/blank.png"
);

const BSCReportGen = async (id, pdfName, reportInfo) => {
  pdfName += `_${id}_biosafety_cabinet_report`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
    
  });

  
    // Heading
    doc
    .setFontSize(12)
    .setTextColor(0, 0, 0)
    .text("Test Certificate", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

    const customerAddress = `${reportInfo.value.meta.address1} ${reportInfo.value.meta.address2} ${reportInfo.value.meta.city} ${reportInfo.value.meta.pincode} ${reportInfo.value.meta.state} ${reportInfo.value.meta.country}`;

    const CustomerDetails = [
      [{ title: `Customer Name & Address\n\n${reportInfo.value.meta.company_name}\n${customerAddress}`, rowSpan: 7}, { title:`Certificate Number : ${reportInfo.value.certificate_number}`}],
      [{ title:`ULR Number : ${reportInfo.value.ulr_number}`}],
      [{ title:`SRF Number : ${reportInfo.value.service.srf_no}`}],
      [{ title:`Date of Receipt : ${reportInfo.value.d_receipt}`}],
      [{ title:`Date of Testing : ${reportInfo.value.d_testing}`}],
      [{ title:`Recommended Due Date : ${reportInfo.value.r_due_date}`}],
      [{ title:`Date of Issue : ${reportInfo.value.d_issue}`}],
    ];
    
    autoTable(doc, {
      body: CustomerDetails,
      startY:0.7,
      columnStyles: {
        '0': { cellWidth: 3.635 , halign: "left"},
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

    // Details of Unit Under Testing
    const UUTHeader = [
      [{title: `Details of Unit Under Testing`, colSpan:2 }]
    ];
    const UUTBody = [
      [{title: `Description : ${reportInfo.value.description}`}, {title: `Make : ${reportInfo.value.make}`}],
      [{title: `Identification Number : ${reportInfo.value.id_no}`}, {title: `Model No. : ${reportInfo.value.model_no}`}],
      [{title: `Testing At : ${reportInfo.value.testing_at}`}, {title: `Serial No. : ${reportInfo.value.serial_no}`}],
      [{title: `Room Name : ${reportInfo.value.room_name}`}, {title: `Room ID : ${reportInfo.value.room_id}`}],
    ]
    autoTable(doc, {
      head: UUTHeader,
      body: UUTBody,
      columnStyles: {
        '0': { cellWidth: 3.635},
        '1': { cellWidth: "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    
    // Details of Reference Standard
    const instrumentHeader = [
      [
        { title: 'Sr.No.', cellWidth: 0.5},{ title: 'Instrument Name', cellWidth: 1.5},{ title: 'Serial No', cellWidth: 1},{ title: 'Done Date', cellWidth: 1},{ title: 'End Date', cellWidth: 1}
      ],
    ];

    const instrumentBody = reportInfo.value.cleanroom_instruments.map((instrument, i) => [
      (i + 1),
      instrument.name,
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


    // Environmental Condition
    const environmentHeader = [
      [{title: `Environmental Condition`, colSpan:2 }]
    ];
    const environmentBody = [
      [{title: `Temperature °C : ${reportInfo.value.temperature} °C`}, {title: `InFlow Velocity Test Work Instruction# : AME-L03-W13`}],
      [{title: `Humidity %RH : ${reportInfo.value.humidity} %`}, {title: `DownFlow Velocity Test Work Instruction# : AME-L03-W13`}],
      [{title: `BSC Differential Pressure (P): ${reportInfo.value.differential_pressure}`}, {title: `Filter Integrity Test Work Instruction# : AME-L03-W13`}],
      [{title: ``}, {title: `Particle Count Work Instruction#  : AME-L03-W13`}],
    ]
    autoTable(doc, {
      head: environmentHeader,
      body: environmentBody,
      columnStyles: {
        '0': { cellWidth: 3.635},
        '1': { cellWidth: "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    // InFlow Table
    
    const inFlowHeader = [
      [
        { title: 'InFlow Air Velocity Measurement in m/s', colSpan: 10},
      ],
      [
        { title: 'Sr.No'},
        { title: 'Filter ID'},
        { title: 'L1'},
        { title: 'L2'},
        { title: 'L3'},
        { title: 'L4'},
        { title: 'L5'},
        { title: 'Mean'},
        { title: 'Acceptance Limit'},
        { title: 'Compilance as per EN 12469:2000'},
      ]
    ];

    const inFlowBody = reportInfo.value.inFlow.map((item, i) => [
      i + 1,
      item.filter_id,
      item.l1,
      item.l2,
      item.l3,
      item.l4,
      item.l5,
      item.mean,
      item.acceptance_limit + " m/s",
      item.output,
    ]);

    autoTable(doc, {
      head: inFlowHeader,
      body: inFlowBody,
      columnStyles: {
        '0': { cellWidth: 0.3},
        '1': { cellWidth: 0.7},
        '2': { cellWidth: 0.7},
        '3': { cellWidth: 0.7},
        '4': { cellWidth: 0.7},
        '5': { cellWidth: 0.7},
        '6': { cellWidth: 0.7},
        '7': { cellWidth: 0.7},
        '8': { cellWidth: 1},
        '9': { cellWidth:  "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // DownFlow Table
    
    const downFlowHeader = [
      [
        { title: 'DownFlow Air Velocity Measurement in m/sec', colSpan: 10},
      ],
      [
        { title: 'Sr.No'},
        { title: 'Filter ID'},
        { title: 'L1'},
        { title: 'L2'},
        { title: 'L3'},
        { title: 'L4'},
        { title: 'L5'},
        { title: 'Mean'},
        { title: 'Acceptance Limit (m/sec)'},
        { title: 'Compilance as per EN 12469:2000'},
      ]
    ];

    const downFlowBody = reportInfo.value.downFlow.map((item, i) => [
      i + 1,
      item.filter_id,
      item.l1,
      item.l2,
      item.l3,
      item.l4,
      item.l5,
      item.mean,
      item.acceptance_limit + " m/s",
      item.output,
    ]);

    autoTable(doc, {
      head: downFlowHeader,
      body: downFlowBody,
      columnStyles: {
        '0': { cellWidth: 0.3},
        '1': { cellWidth: 0.7},
        '2': { cellWidth: 0.7},
        '3': { cellWidth: 0.7},
        '4': { cellWidth: 0.7},
        '5': { cellWidth: 0.7},
        '6': { cellWidth: 0.7},
        '7': { cellWidth: 0.7},
        '8': { cellWidth: 1},
        '9': { cellWidth:  "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // Filter Table
    const filterHeader = [
      [
        { title: 'HEPA Filter Leakage Measurement in %', colSpan: 6},
      ],
      [
        { title: 'Sr.No'},
        { title: 'filter ID'},
        { title: 'Upstream Concentration %', cellWidth: 1.4},
        { title: 'Downstream Concentration %', cellWidth: 1.4},
        { title: 'Acceptance Limit', cellWidth: 2},
        { title: 'Compilance as per ISO 14644-3', cellWidth: 2},
      ]
    ];

    const filterBody = reportInfo.value.filter.map((item, i) => [
      i + 1,
      item.filter_id,
      item.upstream,
      item.downstream,
      item.acceptance_limit + " %",
      item.output,
    ]);

    autoTable(doc, {
      head: filterHeader,
      body: filterBody,
      columnStyles: {
        '0': { cellWidth: 0.3},
        '1': { cellWidth: 0.7},
        '2': { cellWidth: 1.4},
        '3': { cellWidth: 1.4},
        '4': { cellWidth: 1},
        '5': { cellWidth: "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    // Particle Table
    const particleHeader = [
      [
        { title: 'Particle Concentration / Cu.Meter', colSpan: 10},
      ],
      [
        { title: 'Sr.No'},
        { title: 'particle Size'},
        { title: 'L1'},
        { title: 'L2'},
        { title: 'L3'},
        { title: 'L4'},
        { title: 'L5'},
        { title: 'Mean'},
        { title: 'Acceptance Limit', cellWidth: 1},
        { title: 'Compilance as per ISO 14644-3', cellWidth: 1},
      ]
    ];

    const particleBody = reportInfo.value.particle.map((item, i) => [
      i + 1,
      item.particle_size + " µ",
      item.l1,
      item.l2,
      item.l3,
      item.l4,
      item.l5,
      item.mean,
      item.acceptance_limit + " / Cub.Meter",
      item.output,
    ]);

    autoTable(doc, {
      head: particleHeader,
      body: particleBody,
      columnStyles: {
        '0': { cellWidth: 0.3},
        '1': { cellWidth: 0.7},
        '2': { cellWidth: 0.7},
        '3': { cellWidth: 0.7},
        '4': { cellWidth: 0.7},
        '5': { cellWidth: 0.7},
        '6': { cellWidth: 0.7},
        '7': { cellWidth: 0.7},
        '8': { cellWidth: 1},
        '9': { cellWidth: "auto"},
      },
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    const NotesData = [
      [{ title: "\u2022 This Testing Certificate relates only to the above UUT & Reported results are valid at the time of and under the stated conditions of measurements." }],
      [{ title: "\u2022 This report shall not be reproduced in full/ part without prior permission of Aeromech Equipments Private Limited." }],
      [{ title: "\u2022 The ReTesting interval shall be determined on the user requirements." }],
      [{ title: "\u2022 The Measurement uncertainty is expressed at 95.45% confidence level with coverage factor k =2." }],
      [{ title: "\u2022 Testing of the UUT are traceable to National / International Standards." }],
      [{ title: "\u2022 The above points are Tested as per customer requirements." }],
    ];
    
    const styles = {
      styles: { halign: 'left' }, // Left-align text
      columnStyles: { 0: { columnWidth: 'auto' } }, // Adjust column width for the bullet points
    };
    autoTable(doc, {
      body: NotesData,
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
        { title: 'Prepared By'},
        { title: 'Authorised By'},
      ],
      [
        `\n`,`\n`,`\n`
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



    // Creating footer and saving file
    doc
      .setFontSize(9)
      .setTextColor(0, 0, 255)
      .textWithLink("Zeptac", 0.5, doc.internal.pageSize.height - 0.4, { url: 'https://app.zeptac.com' });

    const printed_date = new Date();
    const printed_on_date = moment(printed_date).format("YYYY-MM-DD HH:mm:ss");
    
    doc
      .setFontSize(8)
      .setTextColor(0, 0, 0)
      .setFont('helvetica', "italic")
      .text(("printed on " + printed_on_date), doc.internal.pageSize.width - 2, doc.internal.pageSize.height - 0.4);

    doc.save(`${pdfName}.pdf`);

};

export { BSCReportGen };
