
/* eslint-disable prettier/prettier */
// * This file is used to generate invoice pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ! depretaited import
import { ToWords } from 'to-words';
import { getAssetPath } from "../helpers/assets";

/**
 * Gen Method to print invoice or quotation reciept
 * @param pdftype string
 * @param id  string
 * @param pdfName  string
 * @param invoiceDetials obj | any
 */


const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: { // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});

const Gen = async (
    pdftype: string,
    id: any,
    pdfName: string,
    invoiceDetials: any,
    companyDetails: any
) => {
    pdfName += "_" + id + (pdftype == "quotation" ? "_quotation" : "_invoice");

    const titleForPdf = pdftype == "quotation" ? "Quotation" : "Invoice";
    
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
    const logoWidth = 2.3;
    const logoHeight = 1.7;
    let headerEnd = 0;

    // Heading Name
    const pdfHeading = (pdftype == "quotation" ? 'QUOTATION' : 'INVOICE');

    const generateHeader = (doc) => {

      // Diagram Table
      const HeaderData:any = [
        [
          {
            title: "",
            styles: { 
              minCellHeight: 1.7,
            },
          },
          {
            title: "",
            styles: { 
            },
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
          '0': { cellWidth: 4, halign: "left", },
          '1': { cellWidth: "auto", halign: "right"},
        },
        bodyStyles: { 
          
        },

        willDrawCell: (data) => {
          if (data.row.index === 0 && data.column.index === 1) {

            doc.autoTable({
                body: [
                    [
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
                        },
                      }
                    ],
                    [
                      {
                        title: `${companyDetails.value.address || ""} \n${companyDetails.value.city || ""} ${companyDetails.value.pincode || ""} ${companyDetails.value.state || ""} ${companyDetails.value.country || ""}`,
                        styles: { 
                          fontSize: 9,
                          fontStyle: "normal"
                        },
                      }
                    ],
                ],
                theme: "plain",
                startY: data.cell.y,
                margin: {left: data.cell.x},
                tableWidth: 'auto',
                columnStyles: {
                  '0': { cellWidth: "auto", halign: "right"},
                },
                
            });
            
          }
        },


        didDrawCell: (data) => {
          const { cell, row, column } = data;

          if (data.row.index === 0 && data.column.index === 0) {
            // Add the image to the cell with full width and fixed height
            doc.addImage(img, 'JPEG', cell.x, cell.y, logoWidth, logoHeight, "company logo");
          }

        },
      });

      // Set the color to a light gray
      doc.setDrawColor(200, 200, 200); // RGB for light gray

      // Draw the line
      doc.setLineWidth(0.01).line(0, doc.autoTable.previous.finalY, doc.internal.pageSize.getWidth(), doc.autoTable.previous.finalY);

    }


    // condition to check whether the quotation/invoice if daywise or equipmentwise
    let pdfWiseType = "";
    if(invoiceDetials.value.items.equipment_wise && invoiceDetials.value.items.equipment_wise.length == 0){
      pdfWiseType = "DayWise";
    }
    else{
      pdfWiseType = "EquipmentWise";
    }
    
    // generateHeader
    generateHeader(doc);

    // Bill To
    const uniqueNumber = (pdftype == "quotation" ? invoiceDetials.value.quotation_no : invoiceDetials.value.invoice_no)

    const MainData:any = [
      [
        {
          title: "Bill To",
          styles :{
            fontSize: 10,
          }
        },
        {
          title: `${titleForPdf} No. : ${uniqueNumber || ""}`,
          styles: {
            fontSize : 10,
          }
        },
      ],
      [
        {
          title: `${invoiceDetials.value.customer.company_name || ""}`,
          styles: { 
            fontSize: 10,
            fontStyle: "bold"
          }
        },
        {
          title: `${titleForPdf} Date : ${invoiceDetials.value.date || ""}`,
          styles: {
            fontSize : 10,
            fontStyle: "normal"
          }
        }
      ],
      [
        {
          title: `${invoiceDetials.value.clientx.name || ""}\n${invoiceDetials.value.clientx.address1 || ""} \n${invoiceDetials.value.clientx.address2 || ""} \n${invoiceDetials.value.clientx.city || ""} ${invoiceDetials.value.clientx.pincode || ""} \n${invoiceDetials.value.clientx.state || ""} ${invoiceDetials.value.clientx.country || ""}`,
          styles: { 
            fontSize: 10,
            fontStyle: "normal"
          }
        },
        {
          title: `Enquiry No : ${invoiceDetials.value.enquiry_no || ""}`,
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
        '0': { cellWidth: 4, halign: "left", },
        '1': { cellWidth: "auto", halign: "right"},
      },
      bodyStyles: {
      }
    });


    // Items table header
    const tableHeader = [
      [
        {
          title: "Description"
        },
        {
          title: `${pdfWiseType == 'DayWise' ? 'No. of Days' : 'Qty'}`
        },
        {
          title: "Price (INR)"
        },
        {
          title: "Total Amount (INR)"
        }
      ],
    ];

    // day wise items
    const ChargesItems = [

      [
            {
              title: `Site Location : ${invoiceDetials.value.items.site_location || "NA"} \n\n${invoiceDetials.value.items.per_day_charge || "0"} /- Per Day`,
            },
            {
              title: `${(invoiceDetials.value.items.number_of_days || 0)}`
            },
            {
              title: `${invoiceDetials.value.items.per_day_charge || "0"}` 
            },
            {
              title: `${(invoiceDetials.value.items.per_day_charge || 0) * (invoiceDetials.value.items.number_of_days || 0)}`
            }
      ],
      [],
      [
            {
              title: `Other Charges`,
            }
      ],
      [
          {
          title: `Accommodation`,
          },
          {
          title: "-"
          },
          {
          title: `${invoiceDetials.value.items.accommodation}` 
          },
          {
          title: `${invoiceDetials.value.items.accommodation}`
          }
      ],
      [
            {
              title: `Travelling`,
            },
            {
              title: "-"
            },
            {
              title: `${invoiceDetials.value.items.travelling}` 
            },
            {
              title: `${invoiceDetials.value.items.travelling}` 
            }
      ],
      [
            {
              title: `Training`,
            },
            {
              title: "-"
            },
            {
              title: `${invoiceDetials.value.items.training}` 
            },
            {
              title: `${invoiceDetials.value.items.training}` 
            }
      ],
      [
            {
              title: `Pickup & Delivery`,
            },
            {
              title: "-"
            },
            {
              title: `${invoiceDetials.value.items.pickup}`
            },
            {
              title: `${invoiceDetials.value.items.pickup}`
            }
      ],
      [
            {
              title: `Boarding & Lodging`,
            },
            {
              title: "-"
            },
            {
              title: `${invoiceDetials.value.items.boarding}`
            },
            {
              title: `${invoiceDetials.value.items.boarding}`
            }
      ],

    ]

    let numbersToWords = toWords.convert(invoiceDetials.value.total, { currency: true });
    const Footer = [
      [],
      [
            {
              title: "",
            },
            {
              title: ""
            },
            {
              title: "SUBTOTAL",
              styles: {
                fontStyle: "bold",
              }
            },
            {
              title: `${invoiceDetials.value.sub_total}`
            }
      ],
      ...(invoiceDetials.value.tax_type === '(CGST + SGST)'
        ? [
            [
              { title: "" },
              { title: "" },
              { title: `CGST ${invoiceDetials.value.tax_rate / 2} %` },
              { title: `${invoiceDetials.value.tax_amount / 2}` },
            ],
            [
              { title: "" },
              { title: "" },
              { title: `SGST ${invoiceDetials.value.tax_rate / 2} %` },
              { title: `${invoiceDetials.value.tax_amount / 2}` },
            ],
          ]
        : [
            [
              { title: "" },
              { title: "" },
              { title: `TAX : ${invoiceDetials.value.tax_type} ${invoiceDetials.value.tax_rate} %` },
              { title: `${invoiceDetials.value.tax_amount}` },
            ],
      ]),
      [],
      [
            {
              title: "",
            },
            {
              title: ""
            },
          {
              title: `TOTAL AMOUNT`,
              styles: {
                fontStyle: "bold",
              }
          },
          {
              title: `Rs.${invoiceDetials.value.total}`,
          },
      ],
    ];

    // equipement wise items
    const equipments = invoiceDetials.value.items.equipment_wise && invoiceDetials.value.items.equipment_wise.map(item => [
      { title: item.name },
      { title: item.quantity },
      { title: item.charge },
      { title: item.charge * item.quantity }
    ]);

    if(pdfWiseType == "DayWise"){

      // Day Wise Data
      const DayWiseData:any = [
        [
          {
            title: `${invoiceDetials.value.scope_of_work}`,
          },
          {
            title: "",
          },
          {
            title: "",
          },
          {
            title: "",
          },
        ],
        ...ChargesItems,
        ...Footer,
        [
          {
            title: `Amount in words : ${numbersToWords}`,
            colSpan: 4,
            styles: {
              fontStyle: "bold",
            }
          }
        ]
      ];

      autoTable(doc, {
        theme: "plain",
        head: tableHeader,
        body: DayWiseData,
        headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center"},
        columnStyles: {
          '0': { cellWidth: 3.3, halign: "left", },
          '1': { cellWidth: 1.2, halign: "center"},
          '2': { cellWidth: 1.3, halign: "center"},
          '3': { cellWidth: "auto", halign: "center"},
        },
        bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

    }
    else{

      // Equipment Wise Data
      const EquipmentWiseData = [
        [
          {
            title: `${invoiceDetials.value.scope_of_work}`,
          },
          {
            title: "",
          },
          {
            title: "",
          },
          {
            title: "",
          },
        ],
        ...equipments,
        ...Footer,
        [
          {
            title: `Amount in words : ${numbersToWords}`,
            colSpan: 4,
            styles: {
              fontStyle: "bold",
            }
          }
        ]
      ];

      autoTable(doc, {
        theme: "plain",
        head: tableHeader,
        body: EquipmentWiseData,
        headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "center"},
        columnStyles: {
          '0': { cellWidth: 3.3, halign: "left", },
          '1': { cellWidth: 1.2, halign: "center"},
          '2': { cellWidth: 1.3, halign: "center"},
          '3': { cellWidth: "auto", halign: "center"},
        },
        bodyStyles: { halign: "left",fontSize: 10, fillColor: [255, 255, 255]},
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });
      
    }


    const termsAndConditionsHeader = [ 
      [
        {
          title: `Terms & Conditions :`,
        }
      ]
    ]
      
    const termsAndConditions = [
      [
        {
          title: `${invoiceDetials.value.terms_and_conditions}`,
        }
      ]
    ]

    autoTable(doc, {
      theme: "plain",
      head:termsAndConditionsHeader,
      body: termsAndConditions,
      headStyles: {  fillColor: [90,90,90], textColor: [255, 255, 255],halign: "left"},
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

export { Gen }