// import { Controller } from '@nestjs/common';

// @Controller('upload')
// export class UploadController {}
import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('/uploadPdf')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPdf(@UploadedFile() file) {
        const outputDir = join(process.cwd(), 'uploads/images');
        const filePath = join(process.cwd(), 'uploads', file.filename);
        const imageUrls = await this.uploadService.convertPdfToImages(filePath, outputDir);
        return { urls: imageUrls };
    }


    @Get()
    async getPdf() {
        // 这里根据自身上传的资源路径指定
        const baseUrl = 'http://localhost:3000/uploads/'
        const pdf = `${baseUrl}1718437748872.pdf`;
        // 存储切片图
        const images = []
        // 有187张图片
        for (let i = 0; i < 187; i++) {
            images.push(`${baseUrl}images/output_page_${i}.png`)
        }
        return { pdf, images };
    }
}


