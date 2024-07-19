
/* eslint-disable prettier/prettier */
// * This file is used to generate invoice pdf

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ! depretaited import
import { ToWords } from 'to-words';

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
    
      // Heading
      doc
        .setFontSize(12)
        .setTextColor(0, 0, 0)
        .text(titleForPdf, doc.internal.pageSize.width / 2, 0.5, {
            align: "center",
        });
    
      // Company Logo Img
      const img = new Image()
      img.src = companyDetails.value.logo_base64;
      doc.addImage(img, 'JPEG', 0.5, 0.7, 0.7, 0.7);
    
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

      
    const creationDate = new Date(invoiceDetials.value.date).toDateString();
    const validationDate = new Date(invoiceDetials.value.duedate).toDateString();

    const uniqueNumber = (pdftype == "quotation" ? invoiceDetials.value.quotation_no : invoiceDetials.value.invoice_no)

      const Info = [
        [`${titleForPdf} Date : ${creationDate}`, `#${titleForPdf} No. : ${uniqueNumber}`],
        [`${titleForPdf} Due Date : ${validationDate}`, `Enquiry No. : ${invoiceDetials.value.enquiry_no}`],
      ];
    
      autoTable(doc, {
        body: Info,
        startY:1.6,
        columnStyles: {
            '0': { cellWidth: 3.63},
            '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      const LocationData = [
        [
          `Customer Name : ${invoiceDetials.value.customer.company_name} \nContact Person : ${invoiceDetials.value.customer.name} \n\nBilling Address : ${invoiceDetials.value.customer.address1 || ""} \n${invoiceDetials.value.customer.address2 || ""} \n${invoiceDetials.value.customer.city || ""} ${invoiceDetials.value.customer.pincode || ""} \n${invoiceDetials.value.customer.state || ""} ${invoiceDetials.value.customer.country || ""}`,
          `Client Name : ${invoiceDetials.value.clientx.company_name} \nContact Person : ${invoiceDetials.value.clientx.name} \n\nSite Address : ${invoiceDetials.value.clientx.address1 || ""} \n${invoiceDetials.value.clientx.address2 || ""} \n${invoiceDetials.value.clientx.city || ""} ${invoiceDetials.value.clientx.pincode || ""} \n${invoiceDetials.value.clientx.state || ""} ${invoiceDetials.value.clientx.country || ""}`
        ]
      ];

      autoTable(doc, {
        body: LocationData,
        columnStyles: {
            '0': { cellWidth: 3.63},
            '1': { cellWidth: "auto" },
        },
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      const ChargesItems = [

        [
            {
                title: "",
              },
              {
                title: `Site Location : ${invoiceDetials.value.items.site_location} \n${invoiceDetials.value.items.per_day_charge} /- PER DAY`,
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.per_day_charge} x ${invoiceDetials.value.items.number_of_days}` 
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.per_day_charge * invoiceDetials.value.items.number_of_days}`
              }
        ],
        [],
        [
            {
                title: "",
              },
              {
                title: `Other Charges`,
              }
        ],
        [
            {
            title: "",
            },
            {
            title: `Accommodation`,
            },
            {
            title: ""
            },
            {
            title: `${invoiceDetials.value.items.accommodation}` 
            },
            {
            title: ""
            },
            {
            title: `${invoiceDetials.value.items.accommodation}`
            }
        ],
        [
            {
                title: "",
              },
              {
                title: `Travelling`,
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.travelling}` 
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.travelling}` 
              }
        ],
        [
            {
                title: "",
              },
              {
                title: `Training`,
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.training}` 
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.training}` 
              }
        ],
        [
            {
                title: "",
              },
              {
                title: `Pickup & Delivery`,
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.pickup}`
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.pickup}`
              }
        ],
        [
            {
                title: "",
              },
              {
                title: `Boarding & Lodging`,
              },
              {
                title: ""
              },
              {
                title: `${invoiceDetials.value.items.boarding}`
              },
              {
                title: ""
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
                title: "",
              },
              {
                title: ""
              },
              {
                title: ""
              },
              {
                title: "Subtotal"
              },
              {
                title: `${invoiceDetials.value.total}`
              }
        ],
        [
            {
                title: "",
              },
              {
                title: "",
              },
              {
                title: ""
              },
              {
                title: ""
              },
              {
                title: "Tax 0%"
              },
              {
                title: ""
              }
        ],
        [
            {
                title: "",
              },
              {
                title: "",
              },
              {
                title: ""
              },
              {
                title: ""
              },
              {
                title: "Tax Amount"
              },
              {
                title: `${0}`
              }
        ],
        [
            {
                title: "",
              },
              {
                title: "",
              },
              {
                title: ""
              },
              {
                title: ""
              },
            {
                title: `Total Amount`,
            },
            {
                title: `Rs.${invoiceDetials.value.total}`,
            },
        ],
      ]

      const Data = [
        [
          {
            title: "Sr.No"
          },
          {
            title: "Scope of Work"
          },
          {
            title: "Quantity"
          },
          {
            title: "Unit Price"
          },
          {
            title: "Discount %"
          },
          {
            title: "Amount"
          }
        ],
        [
          {
            title: "",
          },
          {
            title: `${invoiceDetials.value.scope_of_work}`,
          },
          {
            title: ""
          },
          {
            title: `No. of days ${invoiceDetials.value.items.number_of_days}` 
          },
          {
            title: ""
          },
          {
            title: ""
          }
        ],
        ...ChargesItems,
        ...Footer,
        [
          {
            title: `Amount in words : ${numbersToWords}`,
            colSpan: 6
          }
        ]
      ];

      
      autoTable(doc, {
        body: Data,
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
        didDrawCell: (data) => {
          const { cell, row, column } = data;
          doc.rect(cell.x, cell.y, cell.width, cell.height, 'S');
        },
      });

      const termsAndConditions = [
        [
          {
            title: `Terms & Conditions : \n${invoiceDetials.value.terms_and_conditions}`,
          }
        ]
      ]

      autoTable(doc, {
        body: termsAndConditions,
        margin: { left: 0.5, top: 1.25 },
        bodyStyles: { halign: "left",fontSize: 9, textColor: [0, 0, 0]},
        tableLineColor: [0, 0, 0],
      });

    // Creating footer and saving file
    doc
        .setFontSize(9)
        .setTextColor(0, 0, 255)
        .textWithLink("Zeptac.com", 0.5, doc.internal.pageSize.height - 0.5, { url: 'https://zeptac.com' });

    doc.save(`${pdfName}.pdf`);
};

export { Gen }