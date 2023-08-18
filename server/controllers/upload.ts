import type { Context } from 'koa'
import path from 'path';
import fs from 'fs';

export default async (ctx: Context) => {

  const files = ctx.request.files?.file
  if (Array.isArray(files)) {
    files.forEach(file => {
      console.log(file.originalFilename);
    })
  } else {
    saveFile(files)
  }

  ctx.body = "done"
}

/**
 * Save the upload file
 * @param {file} file: the file to be saved
 */
function saveFile(file: any) {
  const reader = fs.createReadStream(file.filepath)
  const filePath = path.join(__dirname, 'upload/') + `/${file.originalFilename}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
}
