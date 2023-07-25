/* eslint-disable prettier/prettier */

// This file is used to generate invoice pdf
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAssetPath } from "../helpers/assets";

const Gen = async (
    pdftype: string,
    id: string,
    pdfName: string,
    invoiceDetials: any
) => {
    pdfName += "_" + id + (pdftype == "quotation" ? "_quotation" : "_invoice");
    const columns = [
        { title: "Id", dataKey: "id" },
        { title: "Item Name", dataKey: "name" },
        { title: "Price", dataKey: "price" },
    ];
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "a4",
    });

    // Quotation Heading
    doc
        .setFontSize(16)
        .setTextColor(0, 0, 0)
        .setFont('helvetica', "bold")
        .text(pdftype == "quotation" ? "Quotation" : "Invoice", doc.internal.pageSize.width / 2, 0.5, {
            align: "center",
        });

    // Company Logo Img
    const img = new Image()
    img.src = getAssetPath('media/patterns/sample.png')
    doc.addImage(img, 'JPEG', 0.5, 0.6, 1, 0.8);

    // Quotation number
    doc
        .setFontSize(10)
        .text((pdftype == "quotation" ? "Quotation" : "Invoice") + "# : " + (pdftype == "quotation" ?  invoiceDetials.value.quotation_no : invoiceDetials.value.invoice_no), doc.internal.pageSize.width - 2.8, 0.8);

    // Quotation Creation Date
    const creationDate = new Date(invoiceDetials.value.date).toDateString();
    doc
        .setFontSize(10)
        .text((pdftype == "quotation" ? "Quotation" : "Invoice") + " Date : " + creationDate, doc.internal.pageSize.width - 2.8, 1.0);

    // Quotation Due Date
    const dueDateText = new Date(invoiceDetials.value.duedate).toDateString();
    doc
        .setFontSize(10)
        .text( (pdftype == "quotation" ? "Quotation" : "Invoice") + " Due Date : " + dueDateText, doc.internal.pageSize.width - 2.8, 1.2);

    // create a line under heading
    doc.setLineWidth(0.01).line(0.5, 1.5, 7.75, 1.5);

    // Billing Address
    doc
        .setFontSize(9)
        .text(
            `
        To
        ${invoiceDetials.value.meta.first_name} ${invoiceDetials.value.meta.last_name}
        ${invoiceDetials.value.meta.company_name},
        ${invoiceDetials.value.meta.address1 ? invoiceDetials.value.meta.address1 : ""}
        ${invoiceDetials.value.meta.address2 ? invoiceDetials.value.meta.address2 : ""}
        ${invoiceDetials.value.meta.city ? invoiceDetials.value.meta.city : ""},${invoiceDetials.value.meta.city ? invoiceDetials.value.meta.city : ""}
        ${invoiceDetials.value.meta.states ? invoiceDetials.value.meta.states : ""},${invoiceDetials.value.meta.country ? invoiceDetials.value.meta.country : ""}
        `,
            0.25,
            1.7,
            {
                align: "left",
                maxWidth: 7.5,
            }
        );

    // Using autoTable plugin
    const invoice_items = invoiceDetials.value.items.map(
        ({ name, desc, price, ...rest }) => ({
            ...rest,
            price: "Rs " + price.substring(1),
            name: name + "\n" + desc,
        })
    );

    // fixed by autotable
    console.log(invoice_items);

    //adding the last row [Total] in the table
    const body = [...invoice_items,
    [
        {
            content: `Total`, colSpan: 2,
            styles: {
                fillColor: [124, 95, 240],
                textColor: [255, 255, 255],
                halign: 'right',
                fontStyle: "bold"
            }
        },
        {
            content: `Rs. ${invoiceDetials.value.total.toFixed(2)}`,
            styles: {
                fillColor: [124, 95, 240],
                textColor: [255, 255, 255],
                halign: 'left',
                fontStyle: "bold"
            }
        }
    ],
    [{
        content: `\n\nNotes : ${invoiceDetials.value.notes}`, colSpan: 3,
        styles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            halign: 'left',
            maxWidth: 7.5,
            fontSize: 9
        }
    }]
    ]

    // main Content in the table
    doc.autoTable({
        columns,
        startY: 3,
        body: body,
        margin: { left: 0.5, top: 1.25 },
        headStyles: { fillColor: [124, 95, 240] },
        align: {
            header: "center",
            body: "right",
        },
    });

    // Creating footer and saving file
    doc
        .setFontSize(9)
        .setTextColor(0, 0, 255)
        .textWithLink("Zeptac.com", 0.5, doc.internal.pageSize.height - 0.5, { url: 'https://zeptac.com' });

    doc.save(`${pdfName}.pdf`);
};

export { Gen }