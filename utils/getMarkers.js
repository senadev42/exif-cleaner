// A function that accepts a buffer and returns an array of what markers exist
function getMarkers(buffer) {
  let markers = [];
  let position = 0;

  while (position < buffer.length && buffer[position] !== 0xd9) {
    // Check if the current byte is a marker prefix (0xff)
    if (buffer[position] === 0xff) {
      // Get the marker code from the next byte
      let marker = buffer[position + 1];
      // Push the marker code to the array
      markers.push("0x" + marker.toString(16));
      // Skip the marker bytes
      position += 2;
      // If the marker has a segment with a length, read the length and skip the segment bytes
      if (marker >= 0xe0 && marker <= 0xfe) {
        let length = buffer.readUInt16BE(position);
        position += length;
      }
    } else {
      // If the current byte is not a marker prefix, skip it
      position++;
    }
  }

  // Return the array of markers
  return markers;
}

// A function that accepts an array of marker codes and returns the actual codes
function getCodes(markers) {
  // An object to store the mapping of marker codes to actual codes
  let codes = {
    "0xd8": "SOI",
    "0xe0": "APP0",
    "0xe1": "APP1",
    "0xe2": "APP2",
    "0xe3": "APP3",
    "0xe4": "APP4",
    "0xe5": "APP5",
    "0xe6": "APP6",
    "0xe7": "APP7",
    "0xe8": "APP8",
    "0xe9": "APP9",
    "0xea": "APP10",
    "0xeb": "APP11",
    "0xec": "APP12",
    "0xed": "APP13",
    "0xee": "APP14",
    "0xef": "APP15",
    "0xdb": "DQT",
    "0xc4": "DHT",
    "0xda": "SOS",
    "0xd9": "EOI",
  };

  // An array to store the actual codes
  let actualCodes = [];

  // A loop to iterate over the markers array
  for (let marker of markers) {
    // Check if the marker code is in the codes object
    if (codes[marker]) {
      // Push the actual code to the array
      actualCodes.push(codes[marker]);
    } else {
      // Push an unknown code to the array
      actualCodes.push("UNKNOWN");
    }
  }

  // Return the array of actual codes
  return actualCodes;
}

module.exports = { getMarkers, getCodes };
