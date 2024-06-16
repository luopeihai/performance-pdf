# 高性能加载 pdf 全栈方案（源码）

## 前言

高性能加载 pdf 全栈方案，本文通过 node nestjs 服务端上传 pdf 文件同时切片 pdf 为图片，再到移动端 h5 优先加载切片图直至原 pdf 文件资源加载完成后显示 pdf 源文件，加载 pdf 源文件后支持用户手势缩放，复制。

## 环境与使用到的技术点

1. 服务端： node，[nestjs](https://nestjs.com/)，MulterModule，ServeStaticModule，FileInterceptor,postman 工具
2. 前端：http-server（全局安装），[pdfjs](https://mozilla.github.io/pdf.js/)，[pdfh5](https://github.com/gjTool/pdfh5)

## 目录

- pdf-server 为`nestjs`主要负责 pdf 切图
- web 为前端项目用于显示 pdf 图片加载方案

## 步骤和代码说明

[请点击我的 blog 有具体的步骤和说明](https://juejin.cn/spost/7380292749179879439)
