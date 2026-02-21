import { productClientService } from "@/services/product.service";

export async function generateBarcodeCatalogPDF() {
  const barcodes = await productClientService.getCatalog();

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const cols = 3;
  const labelWidth = (pageWidth - margin * (cols + 1)) / cols;
  const labelHeight = 35;
  const spacing = 5;

  let col = 0;
  let row = 0;

  for (const item of barcodes) {
    const x = margin + col * (labelWidth + spacing);
    const y = margin + row * (labelHeight + spacing);

    if (y + labelHeight > pageHeight - margin) {
      doc.addPage();
      row = 0;
      col = 0;
      continue;
    }

    doc.setFontSize(9);
    const lines = doc.splitTextToSize(item.name, labelWidth - 4);
    doc.text(lines, x + labelWidth / 2, y + 4, { align: "center" });

    const textHeight = lines.length * 4;
    doc.addImage(item.image, "PNG", x + 2, y + textHeight + 2, labelWidth - 4, 20);

    col++;
    if (col >= cols) {
      col = 0;
      row++;
    }
  }

  doc.save("catalogo-codigos-barra.pdf");
}
