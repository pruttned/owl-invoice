const wkhtmltopdf: any = require('wkhtmltopdf');
import ejs from 'ejs';
import { Stream } from 'stream';
import fs from 'fs';
import path from 'path';

class PdfGenerator {
    private templatesDir = 'templates';

    public generate(templatePath: string, model: any, pdfPath: string): Promise<object> {
        return new Promise((resolve, reject) => {
            ejs.renderFile(path.join(this.templatesDir, templatePath), model, { cache: true }, (ejsError: Error, html?: string) => {
                if (ejsError || !html) {
                    reject(ejsError || new Error('No result returned from the template engine.'));
                } else {
                    wkhtmltopdf(html, { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }, (wkError: Error, pdfStream: Stream) => {
                        if (wkError) {
                            reject(wkError);
                        } else {
                            this.ensureDir(pdfPath);
                            pdfStream.pipe(fs.createWriteStream(pdfPath)).on('close', () => {
                                resolve();
                            });
                        }
                    });
                }
            });
        });
    }

    private ensureDir(pdfPath: string) {
        let pdfDir = path.dirname(pdfPath);
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir);
        }
    }
}

export const pdfGenerator = new PdfGenerator();