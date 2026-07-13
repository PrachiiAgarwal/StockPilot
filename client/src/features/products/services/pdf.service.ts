import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Product } from "../types/product.types";

export const downloadInventoryPDF = (
  products: Product[]
) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("StockPilot", 14, 20);

  doc.setFontSize(12);
  doc.text(
    "Inventory Report",
    14,
    28
  );

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    36
  );

  autoTable(doc, {
    startY: 45,

    head: [[
      "Product",
      "SKU",
      "Category",
      "Qty",
      "Price",
      "Status",
    ]],

    body: products.map(
      (product) => [
        product.productName,
        product.sku,
        product.category,
        product.quantity,
        `₹${product.unitPrice}`,
        product.status,
      ]
    ),

    styles: {
      fontSize: 10,
    },

    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  const inventoryValue =
    products.reduce(
      (sum, product) =>
        sum +
        product.quantity *
          product.unitPrice,
      0
    );

  const finalY =
    (doc as any).lastAutoTable
      .finalY + 15;

  doc.setFontSize(12);

  doc.text(
    `Total Products: ${products.length}`,
    14,
    finalY
  );

  doc.text(
    `Inventory Value: ₹${inventoryValue}`,
    14,
    finalY + 8
  );

  doc.save("StockPilot-Inventory.pdf");
};