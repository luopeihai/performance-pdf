# pdf 切片加载 - 全栈方案（源码）

[English](./README_en.md) | [中文](./README.md)

## 前言

高性能加载 pdf 全栈方案，本文通过 node nestjs 服务端上传 pdf 文件同时切片 pdf 为图片，再到移动端 h5 优先加载切片图直至原 pdf 文件资源加载完成后显示 pdf 源文件，加载 pdf 源文件后支持用户手势缩放，复制。

## pdf 分片切图方案效果对比

运行环境：在 Chrome 浏览器，模拟移动端加载 pdf，`network`设置为 4G

加载的 pdf 文件：[NVIDIA2024 第一季度财报](https://s201.q4cdn.com/141608511/files/doc_financials/2024/ar/NVIDIA-2024-Annual-Report.pdf)pdf 文件，页数在 183，文件大小：34.8MB

左图为原 pdf 加载效果，右图为分片方案加载效果

 <div style="display: flex;flex-direction:row, justify-content: space-between; align-items: center; width: 100%;">
        <img src="./docs/1.gif" alt="7.gif" style="width: 45%;" />
        <img src="./docs/2.gif" alt="9.gif" style="width: 45%;" />
 </div>

## 环境与使用到的技术点

1. 服务端： node，[nestjs](https://nestjs.com/)，MulterModule，ServeStaticModule，FileInterceptor,postman 工具
2. 前端：http-server（全局安装），[pdfjs](https://mozilla.github.io/pdf.js/)，[pdfh5](https://github.com/gjTool/pdfh5)

## 目录

- pdf-server 为`nestjs`服务端 主要负责 pdf 切成图片 和 请求 pdf 图片接口
- web 为前端项目用于显示 pdf 切片图片

## 服务端

1. 切换到项目安装项目依赖

```shell
cd pdf-server
npm install
```

2. 启动服务

```shell
npm run start:dev
```

3. 接口说明：

上传 pdf 并生成切图：方法 `POST` `localhost:3000/upload/uploadPdf`

可以通过 postman 进行上传调试，[具体步骤](https://juejin.cn/post/7380171682953592832#heading-5)

访问 pdf 和切图资源：方法`GET` `localhost:3000/upload`

其中为了方便展示 demo，访问 pdf 和切图资源接口返回的资源为代码固定资源地址

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

其中的`1718981063461.pdf` 为上传生成的时间戳文件名，这里需要读者根据自己上传后生成的 pdf 名称进行修改

## 前端

1. 安装全局 web 服务`http-server`

```
npm i http-server -g
```

2. 切换到 web 目录，运行 web 服务，指定 8080 端口

```
 cd web
 http-server ./ -p 8080
```

3. 访问 `http://127.0.0.1:8080`查看效果

## [具体代码步骤详解](https://juejin.cn/spost/7380292749179879439)
