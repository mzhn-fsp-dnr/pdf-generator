import express from "express";
import moment from "moment";
import cors from "cors";
import PDFDocument from "pdfkit";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// @ts-ignore
app.post("/generate-ticket", (req, res) => {
  const { date, queueNumber } = req.body;

  if (!date || !queueNumber) {
    return res
      .status(400)
      .json({ error: "Необходимо указать имя и номер очереди." });
  }

  const dateObj = new Date(date);
  const formattedDate = moment(dateObj).format("HH:mm:ss DD.MM.YYYY");

  const doc = new PDFDocument();
  doc.font("fonts/arial.ttf");

  let filename = `ticket_${queueNumber}.pdf`;
  res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-type", "application/pdf");

  doc.moveDown(9);
  doc.fontSize(24);
  doc.text("---------- Почта Донбасса ----------", { align: "center" });
  doc.moveDown();
  doc.fontSize(16);
  doc.fillColor([0.5, 0.5, 0.5]);
  doc.text(`Номер очереди:`, { align: "center" });
  doc.moveDown();
  doc.fontSize(80).text(`${queueNumber}`, { align: "center" });
  doc.fontSize(16).text(`Дата талона: ${formattedDate}`, { align: "center" });
  doc.moveDown();
  doc.fontSize(32).text("Спасибо за ожидание!", { align: "center" });
  doc.fontSize(24);
  doc.text("------------------------------------", { align: "center" });

  doc.pipe(res);
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
