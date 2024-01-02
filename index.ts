import axios from "axios";
import * as pdfParse from "pdf-parse";

async function getPdfText(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = new Uint8Array(response.data);
    const pdf = await pdfParse(data);
    return pdf.text;
  } catch (error) {
    throw error;
  }
}

async function comparePDFs(url1: string, url2: string): Promise<void> {
  try {
    const text1 = await getPdfText(url1);
    const text2 = await getPdfText(url2);

    if (text1 === text2) {
      console.log("Files are identical");
    } else {
      console.log("Files are different");
      // Output the difference of lines (you might want to use a more advanced diff library)
      const lines1 = text1.split("\n");
      const lines2 = text2.split("\n");

      for (let i = 0; i < lines1.length || i < lines2.length; i++) {
        if (lines1[i].trim() !== lines2[i].trim()) {
          console.log(
            `Difference in line ${i + 1}:\nFile 1: ${lines1[i]}\nFile 2: ${
              lines2[i]
            }`
          );
        }
      }
    }
  } catch (error: any) {
    console.error("Error comparing PDFs:", error.message);
  }
}

// Provide the URLs of the PDF files
const pdfUrl1 =
  "https://drive.google.com/uc?id=1n6_U5qB3P52qctWX4pMJgnjSyquEIcar";
const pdfUrl2 =
  "https://drive.google.com/uc?id=1k4Oso_aULBRMRTXRVwqU_Bk3K4P7c_u1";

// Compare the PDF files
comparePDFs(pdfUrl1, pdfUrl2);
