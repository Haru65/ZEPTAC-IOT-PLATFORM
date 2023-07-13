/* eslint-disable prettier/prettier */

// This file is used to generate invoice pdf
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getAssetPath } from "../helpers/assets";

const InvoiceGen = (
    quotationid: string,
    pdfName: string,
    invoiceDetials: any
) => {
    pdfName += "_" + quotationid + "_quotation";
    const columns = [
        { title: "Id", dataKey: "id" },
        { title: "Name", dataKey: "name" },
        { title: "Price", dataKey: "price" },
    ];
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
    });
    // img
    const img = new Image()
    img.src = getAssetPath('media/patterns/vector-1.png')
    doc.addImage(img, 'JPEG', 0.5, 2.0, 2, 3);
    // text is placed using x, y coordinates
    doc
        .setFontSize(16)
        .text("# quotation-invoice " + invoiceDetials.value.quotation_no, 0.5, 1.0);
    // create a line under heading
    doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);

    // Using autoTable plugin
    const invoice_items = invoiceDetials.value.items.map(
        ({ name, desc, price, ...rest }) => ({
            ...rest,
            price: "Rs " + price.substring(1),
            name: name + "\nNotes: " + desc,
        })
    );
    doc
        .setFont("helvetica")
        .setFontSize(8)
        .text(new Date().toDateString(), doc.internal.pageSize.width - 0.5, 1.5, {
            align: "right",
            maxWidth: 7.5,
        });
    doc
        .setFont("helvetica")
        .setFontSize(8)
        .text(
            `
        To
        ${invoiceDetials.value.meta.first_name} ${invoiceDetials.value.meta.last_name}
        ${invoiceDetials.value.meta.company_name},
        ${invoiceDetials.value.meta.address1}
        ${invoiceDetials.value.meta.address2}
        ${invoiceDetials.value.meta.city},${invoiceDetials.value.meta.pincode}
        ${invoiceDetials.value.meta.state},${invoiceDetials.value.meta.country}
        `,
            0.25,
            1.5,
            {
                align: "left",
                maxWidth: 7.5,
            }
        );
    // fixed by autotable
    console.log(invoice_items);
    doc.autoTable({
        columns,
        startY: 3,
        body: invoice_items,
        margin: { left: 0.5, top: 1.25 },
        align: {
            header: "center",
            body: "right",
        },
    });
    // Using array of sentences
    doc
        .setFont("helvetica")
        .setFontSize(12)
        .text(
            "Total: Rs " + invoiceDetials.value.total,
            doc.internal.pageSize.width - 0.5,
            doc.internal.pageSize.height - 1.5,
            {
                align: "right",
                maxWidth: 7.5,
            }
        );
    // Creating footer and saving file
    doc
        .setFont("times")
        .setFontSize(11)
        .setTextColor(0, 0, 255)
        .text("Zeptac.co", 0.5, doc.internal.pageSize.height - 0.5)
        .save(`${pdfName}.pdf`);
};

export { InvoiceGen }