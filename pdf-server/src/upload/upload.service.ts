// src/upload/upload.service.ts

import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { NodeCanvasFactory } from './node-canvas-factory';

// 使用 require 语句导入 pdfjs-dist
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");

@Injectable()
export class UploadService {

    async convertPdfToImages(pdfPath: string, outputDir: string): Promise<string[]> {
        const pdfBuffer = await fs.readFile(pdfPath);
        const pdfDocument = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
        const numPages = pdfDocument.numPages;
        const imageUrls = [];
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const imageUrl = await this.processPage(pdfDocument, pageNum, outputDir);
            imageUrls.push(imageUrl);
        }
        return imageUrls;
    }

    private async processPage(pdfDocument, pageNumber: number, outputDir: string): Promise<string> {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.8 });
        const canvasFactory = new NodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

        const renderContext = {
            canvasContext: canvasAndContext.context,
            viewport: viewport,
            canvasFactory: canvasFactory,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;

        const imageBuffer = canvasAndContext.canvas.toBuffer();
        const outputFileName = path.join(outputDir, `output_page_${pageNumber}.png`);
        await fs.writeFile(outputFileName, imageBuffer);

        return `http://localhost:3000/uploads/images/output_page_${pageNumber}.png`;
    }
}
