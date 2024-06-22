# PDF Chunk Loading - Full Stack Solution (Source Code)

[English](./README_en.md) | [中文](./README.md)

## Introduction

This article describes a high-performance full-stack solution for loading PDFs. The process involves uploading a PDF file on the server-side using Node.js and NestJS, slicing the PDF into images, and then displaying these images on a mobile web page. Initially, the sliced images are loaded, and once the original PDF is fully loaded, it is displayed. Users can then zoom and copy text from the PDF.

## Comparison of PDF Slicing and Loading Performance

Test Environment:

- Browser: Chrome (simulated mobile device)
- Network: 4G

The PDF file used for testing is the [NVIDIA 2024 Q1 Financial Report](https://s201.q4cdn.com/141608511/files/doc_financials/2024/ar/NVIDIA-2024-Annual-Report.pdf),with 183 pages and a file size of 34.8MB.

Below is a comparison of the original PDF loading effect (left) and the chunked loading solution (right):

 <div style="display: flex;flex-direction:row, justify-content: space-between; align-items: center; width: 100%;">
        <img src="./docs/1.gif" alt="7.gif" style="width: 45%;" />
        <img src="./docs/2.gif" alt="9.gif" style="width: 45%;" />
 </div>

## Environment and Technologies Used

1. Server-side： node，[nestjs](https://nestjs.com/)，MulterModule，ServeStaticModule，FileInterceptor,postman
2. Client-side: http-server (global installation)，[pdfjs](https://mozilla.github.io/pdf.js/)，[pdfh5](https://github.com/gjTool/pdfh5)

## Directory Structure

- pdf-server: NestJS server responsible for slicing the PDF into images and handling PDF image requests.
- web: Frontend project for displaying the sliced PDF images.

## Server-side

1. Install Project Dependencies

```shell
cd pdf-server
npm install
```

2. Start the Server

```shell
npm run start:dev
```

3. API Endpoints：

Upload PDF and Generate Slices: Method `POST` `localhost:3000/upload/uploadPdf`

You can use Postman for uploading and debugging. [Detailed Steps](https://medium.com/p/8f25f84ad31e)

Access PDF and Slice Resources: Method GET at localhost:3000/upload

Example endpoint to return fixed demo resources:

```ts
@Get()
    async getPdf() {
        const baseUrl = 'http://localhost:3000/uploads/'
        const pdf = `${baseUrl}1718981063461.pdf`;
        const images = []
        for (let i = 0; i < 187; i++) {
            images.push(`${baseUrl}images/output_page_${i}.png`)
        }
        return { pdf, images };
    }
```

Here, 1718981063461.pdf is the timestamped filename generated upon upload. Modify this according to the actual filename generated.

## Client-side

1. Install Global Web Server http-server

```
npm i http-server -g
```

2. Run Web Server on Port 8080

```
 cd web
 http-server ./ -p 8080
```

3. View the Result
   Open http://127.0.0.1:8080 in your browser to see the effect.

## [Detailed Code Steps Explanation](https://medium.com/@ggluopeihai/pdf-slice-loading-full-stack-solution-89c12d92a2a4)
