function stripJPG(jpgbuffer) {
  const buffer = jpgbuffer;

  // Check if APP! Marker exists
  const app1Marker = Buffer.from([0xff, 0xe1]);
  const app1Index = buffer.indexOf(app1Marker);
  if (app1Index === -1) {
    return "The file does not contain EXIF metadata";
  }

  const app1Length = buffer.readUInt16BE(app1Index + 2);

  //Check if EXIF Identifier exists
  const exifIdentifier = buffer.slice(app1Index + 4, app1Index + 10).toString();
  if (exifIdentifier !== "Exif\0\0") {
    return "The APP1 segment does not contain valid EXIF data";
  }

  //Create new APP1 marker and return
  const newBuffer = Buffer.alloc(buffer.length - app1Length);
  buffer.copy(newBuffer, 0, 0, app1Index);
  buffer.copy(newBuffer, app1Index, app1Index + app1Length + 2);
  return Buffer.concat([newBuffer, Buffer.from([0xff, 0xd9])]);
}

module.exports = stripJPG;
