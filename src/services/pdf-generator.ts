const wkhtmltopdf: any = require('wkhtmltopdf');
import ejs from 'ejs';
import { Stream } from 'stream';
import fs from 'fs';

export class PdfGenerator {
    public generate(templatePath: string, model: any): Promise<Stream> {
        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, model, { cache: true }, (ejsError: Error, html?: string) => {
                if (ejsError || !html) {
                    reject(ejsError || new Error('No result returned from the template engine.'));
                } else {
                    wkhtmltopdf(html, (wkError: Error, pdfStream: Stream) => {
                        if (wkError) {
                            reject(wkError);
                        } else {
                            //TODO: what to return?
                            // resolve(pdfStream);
                            pdfStream.pipe(fs.createWriteStream('out.pdf'));
                        }
                    });
                }
            });
        });
    }
}

let invoice = {
    sum: 2100,
    client: 'some client',
    test: 'ahoj'
};
new PdfGenerator().generate('templates/template.html', invoice).then(stream => {
    //  stream.pipe(fs.createWriteStream('out2.pdf'));
}).catch(console.error);