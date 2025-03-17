// * This file is used to generate LAF Report pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAssetPath } from "@/core/helpers/assets";
import moment from "moment";

const LAFReportGen = async (id, pdfName, reportInfo) => {
  pdfName += `_${id}_laminar_air_flow_report`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
    
  });

  
    // Heading
    doc
    .setFontSize(20)
    .setTextColor(0, 0, 0)
    .text("TEST CERTIFICATE", doc.internal.pageSize.width / 2, 0.5, {
      align: "center",
    });

    // URL of the brand logo
    const brandLogo = new Image();
    brandLogo.src = getAssetPath('media/logos/zeptac_logo_footer.png');
    brandLogo.alt = "zeptac_logo_footer";

    // Function that will add footer to each page
    const addFooters = (doc) => {
      const pageCount = doc.internal.getNumberOfPages();
  
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
  
        // Header

        // Footer

        // powered by with logo
        
        doc.setFontSize(8);
        doc.text("powered by", 3.80, doc.internal.pageSize.height - 0.3, { align: 'center' });
        doc.addImage(brandLogo, "PNG", 4.13, doc.internal.pageSize.height - 0.42, 1.2, 0.2, "zeptac_logo_footer");
        
        // page number on each page
        const pageStr = `Page ${i} of ${pageCount}`;
        doc.setFontSize(8);
        doc.text(pageStr, doc.internal.pageSize.width - 0.7, doc.internal.pageSize.height - 0.3, { align: 'right' });
  
        // console.log(doc.internal.pageSize.width)

        // doc.setTextColor(0, 0, 255);
        // doc.textWithLink("Zeptac.com", 0.6, doc.internal.pageSize.height - 0.4, { url: 'https://zeptac.com', color: 'black' });
        doc.setFontSize(9);
      }
    };
        
    const customerAddress = `${reportInfo.value.customer.address1 || ""} ${reportInfo.value.customer.address2 || ""} ${reportInfo.value.customer.city || ""} ${reportInfo.value.customer.pincode || ""} ${reportInfo.value.customer.state || ""} ${reportInfo.value.customer.country || ""}`;
    
    const CustomerDetails = [
      [
        {
          title: `Customer Details\n\n${reportInfo.value.customer.company_name || ""}\n${customerAddress}`,
          rowSpan: 7,
        },
        { title: "Certificate Number" },
        { title: reportInfo.value.certificate_number || "" }
      ],
      [{ title: "ULR Number" }, { title: reportInfo.value.ulr_number || "" }],
      [{ title: "SRF Number" }, { title: reportInfo.value.service.srf_no || "" }],
      [{ title: "Date of Receipt" }, { title: reportInfo.value.d_receipt || "" }],
      [{ title: "Date of Testing" }, { title: reportInfo.value.d_testing || "" }],
      [{ title: "Recommended Due Date" }, { title: reportInfo.value.r_due_date || "" }],
      [{ title: "Date of Issue" }, { title: reportInfo.value.d_issue || "" }]
    ];
    
    autoTable(doc, {
      body: CustomerDetails,
      startY:0.7,
      columnStyles: {
        '0': { cellWidth: 3.3 , halign: "left"},
        '1': { cellWidth: 2.15 , halign: "left"},
        '2': { cellWidth: "auto", halign: "left" },
      },
      theme: 'plain',
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
    });

    // Details of Unit Under Testing
    const UUTHeader = [
      [{title: `Details of Unit Under Testing`, colSpan:4 }]
    ];

    const UUTBody = [
      [
        { title: "Description" }, { title: reportInfo.value.description || "" },
        { title: "Make" }, { title: reportInfo.value.make || "" }
      ],
      [
        { title: "Identification Number" }, { title: reportInfo.value.id_no || "" },
        { title: "Model No." }, { title: reportInfo.value.model_no || "" }
      ],
      [
        { title: "Testing At" }, { title: reportInfo.value.testing_at || "" },
        { title: "Serial No." }, { title: reportInfo.value.serial_no || "" }
      ],
      [
        { title: "Room Name" }, { title: reportInfo.value.room_name || "" },
        { title: "Room ID" }, { title: reportInfo.value.room_id || "" }
      ]
    ];

    autoTable(doc, {
      head: UUTHeader,
      body: UUTBody,
      columnStyles: {
        '0': { cellWidth: 1.65 , halign: "left"},
        '1': { cellWidth: 1.65 , halign: "left"},
        '2': { cellWidth: 2.1 , halign: "left"},
        '3': { cellWidth: "auto", halign: "left" },
      },
      theme: 'plain',
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
    });


    
    // Details of Reference Standard
    const instrumentHeader = [
      [
        { title: 'Sr.No.', cellWidth: 0.3},
        { title: 'Instrument Name', cellWidth: 2.3},
        { title: 'ID No', cellWidth: 1.2},
        { title: 'Serial No', cellWidth: 1.2},
        { title: 'Done Date', cellWidth: 1.2},
        { title: 'End Date', cellWidth: "auto"}
      ],
    ];

    const instrumentBody = reportInfo.value.cleanroom_instruments.map((instrument, i) => [
      (i + 1),
      instrument.name,
      instrument.instrument_id,
      instrument.serial_no,
      instrument.calibration_date,
      instrument.calibration_due_date,
    ]);
    
    autoTable(doc, {
      head: instrumentHeader,
      body: instrumentBody,
      theme: "plain",
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
      [{title: `Environmental Condition`, colSpan:4 }]
    ];
    const environmentBody = [
      [
        { title: "Temperature (°C)" }, { title: `${reportInfo.value.temperature || ""} °C` },
        { title: "DownFlow Velocity Test Work #" }, { title: "AME-L03-W13" }
      ],
      [
        { title: "Humidity (%RH)" }, { title: `${reportInfo.value.humidity || ""} %` },
        { title: "Filter Integrity Test Work #" }, { title: "AME-L03-W13" }
      ],
      [
        { title: "LAF Differential Pressure (P)" }, { title: reportInfo.value.differential_pressure || "" },
        { title: "Particle Count Work #" }, { title: "AME-L03-W13" }
      ]
    ];
    
    autoTable(doc, {
      head: environmentHeader,
      body: environmentBody,
      columnStyles: {
        '0': { cellWidth: 1.65 , halign: "left"},
        '1': { cellWidth: 1.65 , halign: "left"},
        '2': { cellWidth: 2.1 , halign: "left"},
        '3': { cellWidth: "auto", halign: "left" },
      },
      theme: 'plain',
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],

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
      theme: "plain",
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
        '4': { cellWidth: 1.4},
        '5': { cellWidth: "auto"},
      },
      theme: "plain",
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
      theme: "plain",
      margin: { left: 0.5, top: 1.25 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: "left", valign: "middle", fontSize: 9, lineColor: [0, 0, 0]},
      bodyStyles: { halign: "left", fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    const Note = [ 
      [
        {
          title: `Note :`,
        }
      ]
    ]
      
    const NoteData = [
      [{ title: "1. This Testing Certificate relates only to the above UUT & Reported results are valid at the time of and under the stated conditions of measurements." }],
      [{ title: "2. This report shall not be reproduced in full/ part without prior permission of Aeromech Equipments Private Limited." }],
      [{ title: "3. The ReTesting interval shall be determined on the user requirements." }],
      [{ title: "4. The Measurement uncertainty is expressed at 95.45% confidence level with coverage factor k =2." }],
      [{ title: "5. Testing of the UUT are traceable to National / International Standards." }],
      [{ title: "6. The above points are Tested as per customer requirements." }],
    ];

    autoTable(doc, {
      theme: "plain",
      head:Note,
      body: NoteData,
      headStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      bodyStyles: { halign: "left",fontSize: 9, lineColor: [0, 0, 0], textColor: [0, 0, 0]},
      tableLineColor: [0, 0, 0],
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
      theme: "plain",
      columnStyles: {
        '0': { cellWidth: 3.635, halign: "left"},
        '1': { cellWidth: "auto", halign: "right"},
      },
      bodyStyles: { fontSize: 9, textColor: [0, 0, 0], lineColor: [0, 0, 0], },
      tableLineColor: [0, 0, 0],
    });

    
    // Creating footer and saving file      
    addFooters(doc)
    
    doc.save(`${pdfName}.pdf`);

};

export { LAFReportGen };
