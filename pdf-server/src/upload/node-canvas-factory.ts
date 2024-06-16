// src/upload/node-canvas-factory.ts

import { Canvas, createCanvas, CanvasRenderingContext2D } from 'canvas';

export class NodeCanvasFactory {
    create(width: number, height: number) {
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        return {
            canvas,
            context,
        };
    }

    reset(canvasAndContext: { canvas: Canvas; context: CanvasRenderingContext2D }, width: number, height: number) {
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext: { canvas: Canvas; context: CanvasRenderingContext2D }) {
        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    }
}
