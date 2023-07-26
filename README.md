# exif-cleaner

A package that removes EXIF data from images to protect user privacy.

## Usage

First, install the `exif-cleaner` package using NPM:

```
npm install exif-cleaner
```

Then, in your JavaScript code, use the `stripJPG` function to remove the Exif metadata from a JPEG file:

```js
const { stripJPG } = require("exif-cleaner");
const fs = require("fs");

// Define the input and output file paths
const inputFile = "./path/to/input/file.jpg";
const outputFile = "./path/to/output/file.jpg";

// Read the input file into a Buffer object
const inputBuffer = fs.readFileSync(inputFile);

// Strip the Exif metadata from the input buffer
const outputBuffer = stripJPG(inputBuffer);

// Write the modified buffer to the output file
fs.writeFileSync(outputFile, outputBuffer);
```

Note that the `stripJPG` function is specifically designed for use with JPEG files, and will not work with other file formats such as PNG or GIF (I'm working on those functions). Additionally, modifying binary data in this way can be error-prone, particularly if the file format is complex or poorly documented.
