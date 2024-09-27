
/* eslint-disable prettier/prettier */
// * This file is used to generate invoice pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ! depretaited import
import { ToWords } from 'to-words';
import { getAssetPath } from "../helpers/assets";

/**
 * Gen Method to print calibration record of instrument
 * @param id  string
 * @param pdfName  string
 * @param invoiceDetails obj | any
 * @param companyDetails obj | any
 */


const CalibrationRecordGen = async (
    id: any,
    pdfName: string,
    instrumentDetails: any,
    companyDetails: any
) => {
  
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "a4",
    });

    // URL of company logo
    const img = new Image();
    img.src = companyDetails.value.logo_base64;
    img.alt = "company logo";

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
  
        console.log(doc.internal.pageSize.width)

        // doc.setTextColor(0, 0, 255);
        // doc.textWithLink("Zeptac.com", 0.6, doc.internal.pageSize.height - 0.4, { url: 'https://zeptac.com', color: 'black' });
        doc.setFontSize(9);
      }
    };

    // Function that add header

    // Fixed height for the diagram
    const imgHeight = 1.7;

    // Heading Name
    const pdfHeading = "CALIBRATION CERTIFICATE";

    const generateHeader = (doc) => {

      // Diagram Table
      const HeaderData:any = [
        [
          {
            title: "",
            rowSpan: 3,
          },
          {
            title: `${pdfHeading}`,
            styles: { 
              fontSize: 20,
            },
          }
        ],
        [
          {
            title: `${companyDetails.value.company_name || ""}`,
            styles: { 
              fontSize: 10,
              fontStyle: "bold"
            }
          }
        ],
        [
          {
            title: `${companyDetails.value.address || ""} \n${companyDetails.value.city || ""} ${companyDetails.value.pincode || ""} ${companyDetails.value.state || ""} ${companyDetails.value.country || ""}`,
            styles: { 
              fontSize: 9,
            }
          }
        ]
      ];

      // doc.setFillColor(240, 240, 240); // Light gray color
      // doc.rect(0, 0, doc.internal.pageSize.width, 1.7, 'F' );

      autoTable(doc, {
        body: HeaderData,
        theme: "plain",
        startY: 0.2,
        columnStyles: {
          '0': { cellWidth: 4, minCellHeight: imgHeight, halign: "left", },
          '1': { cellWidth: "auto", halign: "right"},
        },
        bodyStyles: { 
          
        },
        didDrawCell: (data) => {
          const { cell, row, column } = data;

          if (data.row.index === 0 && data.column.index === 0) {
            // Add the image to the cell with full width and fixed height
            doc.addImage(img, 'JPEG', cell.x, cell.y, 2.3, imgHeight, "company logo");
          }

        },
      });

      // Set the color to a light gray
      doc.setDrawColor(200, 200, 200); // RGB for light gray

      // Draw the line
      doc.setLineWidth(0.01).line(0, doc.autoTable.previous.finalY, doc.internal.pageSize.getWidth(), doc.autoTable.previous.finalY);

    }
    
    // generateHeader
    generateHeader(doc);

    // Bill To
    const MainData:any = [
      [
        {
          title: "Customer",
          styles :{
            fontSize: 10,
          }
        },
        {
          title: "",
        },
      ],
      [
        {
          title: `${instrumentDetails.value.srf.customer_name || ""}`,
          styles: { 
            fontSize: 10,
            fontStyle: "bold"
          }
        },
        {
          title: `SRF No. : ${instrumentDetails.value.srf.srf_no || "" || ""}`,
          styles: {
            fontSize : 10,
            fontStyle: "normal"
          }
        }
      ],
      [
        {
          title: `${instrumentDetails.value.srf.customer_name || instrumentDetails.value.srf.customer.company_name || ""}\n${instrumentDetails.value.srf.customer.address1 || ""} \n${instrumentDetails.value.srf.customer.address2 || ""} \n${instrumentDetails.value.srf.customer.city || ""} ${instrumentDetails.value.srf.customer.pincode || ""} \n${instrumentDetails.value.srf.customer.state || ""} ${instrumentDetails.value.srf.customer.country || ""}`,
          styles: { 
            fontSize: 10,
            fontStyle: "normal"
          }
        },
        {
          title: `PO No. : ${instrumentDetails.value.srf.purchase_order_no || ""}\n\nCertificate No. : ${"CAL/MA/21-22/001-001"}\n\nRequest Date : ${instrumentDetails.value.srf.request_date || ""}`,
          styles: {
            fontSize : 10,
            fontStyle: "normal",
          }
        }
      ],
    ];

    autoTable(doc, {
      body: MainData,
      theme: 'plain',
      // startY: 2.2,
      margin: {top: 0.5},
      columnStyles: {
        '0': { cellWidth: 3.63, halign: "left", },
        '1': { cellWidth: "auto", halign: "right"},
      },
      bodyStyles: {
      }
    });


    // Details of Item header
    const CalibrationInstrumentHeader = [
      [
        {
          title: "Details of Item",
          colSpan: 4,
        }
      ],
    ];

    // calibration instrument details
    const CalibrationInstrumentData = [
      [
          {
            title: `Name :`,
          },
          {
            title: `${instrumentDetails.value.name}` 
          },
          {
            title: `Type :`,
          },
          {
            title: `${instrumentDetails.value.paramter}` 
          }
      ],
      [
            {
              title: `ID No. :`,
            },
            {
              title: `${instrumentDetails.value.instrument_id}` 
            },
            {
              title: `Range :`,
            },
            {
              title: `${instrumentDetails.value.ranges_from || ""} to ${instrumentDetails.value.ranges_to || ""}`
            },
      ],
      [
            {
              title: `Serial No. :`,
            },
            {
              title: `${instrumentDetails.value.serial_no} psi` 
            },
            {
              title: `Resolution :`,
            },
            {
              title: `${instrumentDetails.value.resolution} psi` 
            },
      ],
      [
            {
              title: `Make :`,
            },
            {
              title: `${instrumentDetails.value.make}` 
            },
            {
              title: `Accuracy :`,
            },
            {
              title: `${instrumentDetails.value.accuracy}` 
            },
      ],
      [
            {
              title: `Model :`,
            },
            {
              title: `${instrumentDetails.value.model_no}` 
            },
            {
              title: `Location :`,
            },
            {
              // need to change
              title: `${instrumentDetails.value.location}` 
            },
      ],
      [
            {
              title: `Calibration Date :`,
            },
            {
              title: `${instrumentDetails.value.calibration_date}` 
            },
            {
              title: `Calibration Due On :`,
            },
            {
              // need to change
              title: `${instrumentDetails.value.calibration_due_date}` 
            },
      ],
      [
            {
              title: `Condition of Item :`,
            },
            {
              title: `${instrumentDetails.value.instrument_condition}`
            },
            {
              title: `Any Remark :`,
            },
            {
              // need to change
              title: `${instrumentDetails.value.remark || "NA"}` 
            },
      ],
    ];

    autoTable(doc, {
      theme: "plain",
      head: CalibrationInstrumentHeader,
      body: CalibrationInstrumentData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center"},
      columnStyles: {
        '0': { cellWidth: 1.8, halign: "left", },
        '1': { cellWidth: 1.8, halign: "left"},
        '2': { cellWidth: 1.8, halign: "left"},
        '3': { cellWidth: "auto", halign: "left"},
      },
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    // Details of Item Used for Calibration header
    const ReferenceInstrumentHeader = [
      [
        {
          title: "Details of Equipment Used for Calibration",
          colSpan: 4,
        }
      ],
    ];

    // Reference instrument details
    const ReferenceInstrumentData = [
      [
          {
            title: `Name :`,
          },
          {
            title: `${instrumentDetails.value.reference_instrument.name}` 
          },
          {
            title: `Certificate No. :`,
          },
          {
            title: `${instrumentDetails.value.reference_instrument.certificate_no}` 
          }
      ],
      [
            {
              title: `ID No. :`,
            },
            {
              title: `${instrumentDetails.value.instrument_id}` 
            },
            {
              title: `Certified By :`,
            },
            {
              title: `${instrumentDetails.value.reference_instrument.vendor_name}` 
            },
      ],
      [
            {
              title: `Make :`,
            },
            {
              title: `${instrumentDetails.value.reference_instrument.make}` 
            },
            {
              title: `Calibration Validity :`,
            },
            {
              title: `${instrumentDetails.value.reference_instrument.calibration_due_date}` 
            },
      ],
    ];

    autoTable(doc, {
      theme: "plain",
      head: ReferenceInstrumentHeader,
      body: ReferenceInstrumentData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center"},
      columnStyles: {
        '0': { cellWidth: 1.8, halign: "left", },
        '1': { cellWidth: 1.8, halign: "left"},
        '2': { cellWidth: 1.8, halign: "left"},
        '3': { cellWidth: "auto", halign: "left"},
      },
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });


    // Details of UUC Reading
    const UUCHeader = [
      [
        {
          title: "Calibration Results",
          colSpan: 8,
        }
      ],
      [
        {
          title: "#",
          rowSpan: 3,
        },
        {
          title: "Range",
          rowSpan: 3,
        },
        {
          title: "UUC Reading",
          rowSpan: 3,
        },
        {
          title: "Standard Reading",
          colSpan: 5,
        },
      ],
      [
        {
          title: "I1",
        },
        {
          title: "D1",
        },
        {
          title: "I2",
        },
        {
          title: "D2",
        },
        {
          title: "Mean",
          rowSpan: 2,
        },
      ],
      [
        {
          title: "psi",
        },
        {
          title: "psi",
        },
        {
          title: "psi",
        },
        {
          title: "psi",
        },
      ],
    ];


    // uuc_readings data
    const UUCData = instrumentDetails.value.readings && instrumentDetails.value.readings.map((item, index) => [
      { title: `${index+1}` },
      { title: `${instrumentDetails.value.reference_instrument.ranges_from || ""} to ${instrumentDetails.value.reference_instrument.ranges_to || ""}` },
      { title: item.uuc_reading },
      { title: item.i1_up },
      { title: item.d1_down },
      { title: item.i2_up },
      { title: item.d2_down },
      { title: item.mean_value }
    ]);


    autoTable(doc, {
      theme: "plain",
      head: UUCHeader,
      body: UUCData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center", valign: "middle"},
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
      showHead: 'firstPage',
      didDrawCell: (data) => {
        const { cell, row, column } = data;
        doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
      },
    });

    // Details Uncertainty Calculations
    const UncertaintyCalculationHeader = [
      [
        {
          title: "#",
        },
        {
          title: "Range",
        },
        {
          title: "UUC Reading",
        },
        {
          title: "Standard Deviation",
        },
        {
          title: "Hysteris",
        },
        {
          title: "Zero Deviation",
        },
        {
          title: "Expanded Uncertainty",
        },
      ]
    ];

    // uncertainty value data
    const UncertaintyCalculationData = instrumentDetails.value.readings?.map((item, index) => [
      { title: `${index + 1}` },
      { title: `${instrumentDetails.value.reference_instrument.ranges_from || ""} to ${instrumentDetails.value.reference_instrument.ranges_to || ""}` },
      { title: item.uuc_reading || "" },
      { title: item.uncertainty?.standard_deviation || "" },  // Optional chaining to handle missing uncertainty data
      { title: item.uncertainty?.hysteresis || "" },
      { title: item.uncertainty?.max_zero_reading || "" },
      { title: item.uncertainty?.expanded_uncertainty || "" },
    ]);

    autoTable(doc, {
      theme: "plain",
      head: UncertaintyCalculationHeader,
      body: UncertaintyCalculationData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center", valign: "middle"},
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
      showHead: 'firstPage',
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
      [{ title: "1. UUC stands for Unit Under Calibration." }],
      [{ title: "2. This certificate refers only to the particular item submitted for calibration." }],
      [{ title: "3. This certificate shall not be reproduced, except in full, unless written permission for the publication of an approved abstract has been obtained from the Technical Manager of 'Aimtech Solutions, Navi Mumbai'." }],
      [{ title: "4. The calibration results reported in the certificate are valid at the time of and under the stated conditions of measurement." }],
      [{ title: "5. Standards used for calibration were traceable to National/International standards." }],
      [{ title: "6. Standard reading is the mean of five readings." }]
    ];

    autoTable(doc, {
      theme: "plain",
      head:Note,
      body: NoteData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "left"},
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [240, 240, 240]},
    });

    const aprrovalHeader = [ 
      [
        {
          title: `Calibrated By :`,
        },
        {
          title: `Approved By :`,
        }
      ]
    ]

    const aprrovalData = [
      [
        { title: `${instrumentDetails.value.srf.engineer ? instrumentDetails.value.srf.engineer.first_name : ""} ${instrumentDetails.value.srf.engineer ? instrumentDetails.value.srf.engineer.last_name : ""}` },
        { title: `${instrumentDetails.value.srf.approved_by ? instrumentDetails.value.srf.approved_by.first_name : ""} ${instrumentDetails.value.srf.approved_by ? instrumentDetails.value.srf.approved_by.last_name : ""}` },
      ],
    ];

    autoTable(doc, {
      theme: "plain",
      head:aprrovalHeader,
      body: aprrovalData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "left"},
      columnStyles: {
        '0': { cellWidth: 3.63},
        '1': { cellWidth: "auto" },
      },
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [240, 240, 240]},
    });


    // // Creating footer and saving file
    // doc
    //     .setFontSize(9)
    //     .setTextColor(0, 0, 255)
    //     .textWithLink("Zeptac.com", 0.5, doc.internal.pageSize.height - 0.5, { url: 'https://zeptac.com' });

    addFooters(doc)

    doc.save(`${pdfName}.pdf`);
};

export { CalibrationRecordGen }