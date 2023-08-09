const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// fs.unlinkSync(path.join(__dirname, '../../dist.zip'))
const outputFilePath = path.join(__dirname, '../../dist.zip');
const sourceFolderPath = path.join(__dirname, '../../dist');

// 创建一个可写流，用于写入 ZIP 文件
const output = fs.createWriteStream(outputFilePath);

// 创建一个 archiver 对象
const archive = archiver('zip', {
  zlib: { level: 9 } // 设置压缩级别
});

// 将可写流与 archiver 对象关联
archive.pipe(output);

// 添加要压缩的文件或文件夹到 ZIP 中
archive.directory(sourceFolderPath, false);

// 完成压缩并关闭可写流
archive.finalize();

// 监听压缩完成事件
output.on('close', () => {
  console.log('ZIP 文件已创建');
});

// 监听错误事件
archive.on('error', (err) => {
  console.error('压缩过程出错:', err);
});