import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFHandler = () => {
  const [pdfText, setPdfText] = useState([]);

  const handlePDF = async (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdfDoc = await PDFDocument.load(typedArray);
      const pages = pdfDoc.getPages();
      const allText = pages.map((page) => page.getTextContent().items.map((item) => item.str).join(' '));

      setPdfText(allText);
      console.log(allText);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={(e) => handlePDF(e.target.files[0])} accept="application/pdf" />
      <div>{pdfText.map((text, index) => <p key={index}>{text}</p>)}</div>
    </div>
  );
};

export default PDFHandler;