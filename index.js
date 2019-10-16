const docx    = require("docx");
const express = require('express');
const app     = express();
const fs      = require('fs');

const { Document, Packer, Paragraph, TextRun } = docx;

app.get('/', function (req, res) {
    const doc = new Document();
    doc.addSection({
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                    new TextRun({
                        text: "Foo Bar",
                        bold: true,
                    }),
                    new TextRun({
                        text: "Github is the best",
                        bold: true,
                    }).tab(),
                ],
            }),
        ],
    });
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("My Document.docx", buffer);
    });
});

app.listen(3000, () => console.log('Server running on port : 3000'));