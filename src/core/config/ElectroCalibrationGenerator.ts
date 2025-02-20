
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
 * @param instrumentDetails obj | any
 * @param companyDetails obj | any
 */


const ElectroCalibrationGen = async (
    id: any,
    pdfName: string,
    instrumentDetails: any,
    companyDetails: any
) => {
  
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "a4",
        compress: true
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
  
        // console.log(doc.internal.pageSize.width)

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

    console.log("-> ", instrumentDetails.value.parameter)
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
            title: `${instrumentDetails.value.parameter}` 
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
              title: `${instrumentDetails.value.serial_no}` 
            },
            {
              title: `Resolution :`,
            },
            {
              title: `${instrumentDetails.value.resolution}` 
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
          title: "MASTER / STANDARD EQUIPMENT USED FOR CALIBRATION",
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

    // Check if electro_readings exist
    if (!instrumentDetails?.value?.electro_readings) {
      // If there are no electro readings, do nothing
    } else {
      // Iterate through electro readings
      instrumentDetails.value.electro_readings.forEach((group, index) => {
        const { parameter_id, parameter_name, parameter_unit, readings } = group;
      
        // Header row for each parameter
        const SubParameterHeader = [
          [
            { title: `${parameter_id}. ${parameter_name}`, colSpan: 5, halign: "left" },
          ],
          [
            { title: "Calibration Results", colSpan: 5 },
          ],
          [
            { title: "#" },
            { title: `Standard Equipment (${parameter_unit})` },
            { title: `UUC Equipment (${parameter_unit})` },
            { title: `Error in ${parameter_unit}` },
            { title: "Expanded Uncertainty (±) % of Reading" },
          ],
        ];
      
        // Data rows - Loop through readings
        const SubParameterData = readings.map((reading, readingIndex) => [
          `${readingIndex + 1}`,
          `${reading.standard_reading || ""}`,
          `${reading.average_reading || ""}`,
          `${reading.error_reading || ""}`,
          `${reading.uncertainity_percentage || ""}`,
        ]);
      
        // Generate table using jsPDF autoTable
        autoTable(doc, {
          theme: "plain",
          head: SubParameterHeader,
          body: SubParameterData,
          headStyles: { fillColor: [90, 90, 90], textColor: [255, 255, 255] },
          bodyStyles: { halign: "center", valign: "middle", fontSize: 10, fillColor: [255, 255, 255] },
          columnStyles: {
            0: { cellWidth: 0.4, halign: "left" },
            1: { cellWidth: 1.8, halign: "left" },
            2: { cellWidth: 1.8, halign: "left" },
            3: { cellWidth: 1.8, halign: "left" },
            4: { cellWidth: "auto", halign: "left" },
          },
          showHead: "firstPage",
          didDrawCell: (data) => {
            const { cell } = data;
            doc.rect(cell.x, cell.y, cell.width, cell.height, "S");
          },
        });
      });
      
    }
    
    const Note = [ 
      [
        {
          title: `Note :`,
        }
      ]
    ]
      
    const NoteData = [
      [{ title: "UNCERTAINTY IN MEASUREMENT (AT APPROXIMATELY 95% CONFIDENCE LEVEL WITH COVERAGE FACTOR K=2)" }],
      [{ title: "Disclaimer:" }],
      [{ title: "* The laboratory used only verified method and it should be verified by lab." }],
      [{ title: "* Lab only accepts information from customer on calibration certificate which does not affect the result." }],
      [{ title: "* The result in certificate is without any adjustment/repair." }],
      [{ title: "* This certificate is issued in the field of calibration and provides traceability of measurement results to international systems of units (SI)." }],
      [{ title: "* The lab using calibration standards are traceable to national / international standard." }],
      [{ title: "* Calibration done for scientific and industrial purpose only." }]
    ];

    autoTable(doc, {
      theme: "plain",
      head:Note,
      body: NoteData,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "left"},
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [240, 240, 240]},
    });

    const aprrovalHeaderMain = [ 
      [
        {
          title: `Calibrated By :`,
        },
        {
          title: `Approved By :`,
        }
      ]
    ]

    const aprrovalDataMain = [
      [
        { title: `${instrumentDetails.value.srf.engineer ? instrumentDetails.value.srf.engineer.first_name : ""} ${instrumentDetails.value.srf.engineer ? instrumentDetails.value.srf.engineer.last_name : ""}` },
        { title: `${instrumentDetails.value.srf.approved_by ? instrumentDetails.value.srf.approved_by.first_name : ""} ${instrumentDetails.value.srf.approved_by ? instrumentDetails.value.srf.approved_by.last_name : ""}` },
      ],
    ];

    autoTable(doc, {
      theme: "plain",
      head:aprrovalHeaderMain,
      body: aprrovalDataMain,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "left"},
      columnStyles: {
        '0': { cellWidth: 3.63},
        '1': { cellWidth: "auto" },
      },
      bodyStyles: { halign: "left",fontSize: 10, fillColor: [240, 240, 240]},
    });

    doc.addPage();

    // LAB Details
    const companyLabHeader:any = [
      [
        { 
          title: `${companyDetails.value.company_name || ""} Calbration Laboratory`,
          styles: {
            fontSize: 15,
            fontStyle: "bold"
          }
        }
      ],
      [
        { 
          title: "Calbration Observation Sheet", 
          styles: {
            fontSize: 12,
            fontStyle: "normal"
          }
        }
      ],

    ];

    autoTable(doc, {
      body: companyLabHeader,
      margin: { left: 0.5, top: 1.25 },
      bodyStyles: { lineColor: [0, 0, 0], textColor: [0, 0, 0], halign: "center", valign: "middle"},
      tableLineColor: [0, 0, 0],
    });

    instrumentDetails.value.electro_readings.forEach((group, index) => { 
      const { parameter_id, parameter_name, parameter_unit, readings } = group;
    
      // Header row for each parameter
      const SubParameterHeader = [
        [
          { title: `${parameter_id}. ${parameter_name} (${parameter_unit})`, colSpan: 9, halign: "left" },
        ],
        [
          { title: "#", rowSpan: 2, halign: "center" },
          { title: `Standard Reading (${parameter_unit})`, rowSpan: 2, halign: "center" },
          { title: `UUC Readings (${parameter_unit})`, colSpan: 5, halign: "center" },
          { title: "Average", rowSpan: 2, halign: "center" },
          { title: "Error", rowSpan: 2, halign: "center" },
        ],
        [
          { title: "1", halign: "center" },
          { title: "2", halign: "center" },
          { title: "3", halign: "center" },
          { title: "4", halign: "center" },
          { title: "5", halign: "center" },
        ],
      ];
    
      // Data rows - Loop through readings
      const SubParameterData = readings.flatMap((reading, readingIndex) => {
        const uucReadings = reading.uuc_readings || [];
    
        // Ensure at least 10 values (fill missing values with empty string)
        while (uucReadings.length < 10) {
          uucReadings.push("");
        }
    
        return [
          // First row (Serial, Standard, First 5 UUC, Average, Error)
          [
            { content: `${readingIndex + 1}`, rowSpan: 2, halign: "center" }, // Sr. No.
            { content: `${reading.standard_reading || ""}`, rowSpan: 2, halign: "center" }, // Standard Reading
            `${uucReadings[0]}`, 
            `${uucReadings[1]}`, 
            `${uucReadings[2]}`, 
            `${uucReadings[3]}`, 
            `${uucReadings[4]}`, 
            { content: `${reading.average_reading || ""}`, rowSpan: 2, halign: "center" }, // Average
            { content: `${reading.error_reading || ""}`, rowSpan: 2, halign: "center" }  // Error
          ],
          // Second row (Remaining 5 UUC Readings)
          [
            `${uucReadings[5]}`, 
            `${uucReadings[6]}`, 
            `${uucReadings[7]}`, 
            `${uucReadings[8]}`, 
            `${uucReadings[9]}`, 
          ]
        ];
      });
    
      // Generate table using jsPDF autoTable
      autoTable(doc, {
        theme: "plain",
        head: SubParameterHeader,
        body: SubParameterData,
        headStyles: { 
          fillColor: [90, 90, 90], 
          textColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 0.4, halign: "center" }, // Serial No.
          1: { cellWidth: 0.85, halign: "center" },  // Standard Reading
          2: { cellWidth: 0.85, halign: "center" }, // UUC 1
          3: { cellWidth: 0.85, halign: "center" }, // UUC 2
          4: { cellWidth: 0.85, halign: "center" }, // UUC 3
          5: { cellWidth: 0.85, halign: "center" }, // UUC 4
          6: { cellWidth: 0.85, halign: "center" }, // UUC 5
          7: { cellWidth: 0.85, halign: "center" },  // Average
          8: { cellWidth: "auto", halign: "center" },  // Error
        },
        showHead: "firstPage",
        didDrawCell: (data) => {
          const { cell } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, "S");
        },
      });
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

    addFooters(doc)

    doc.save(`${pdfName}.pdf`);
};

export { ElectroCalibrationGen }