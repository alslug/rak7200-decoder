function Decoder(bytes, port) {
  var retValue =   { 
    bytes: bytes
  };
  var start = 0;
  while (start < bytes.length) {
    lpp = (bytes[start] << 8) | bytes[start+1];
    start += 2;

    if (lpp == 0x0188) {
      retValue.gps = {};
      retValue.gps.latitude   = ((bytes[start] << 16) | (bytes[start+1] << 8) | bytes[start+2] ) / 10000;  start += 3;
      retValue.gps.longitude  = ((bytes[start] << 16) | (bytes[start+1] << 8) | bytes[start+2] ) / 10000;  start += 3;
      retValue.gps.altitude   = ((bytes[start] << 16) | (bytes[start+1] << 8) | bytes[start+2] ) / 100;    start += 3;
      retValue.start = start;
    } else if (lpp == 0x0802) {
      retValue.batt  = ( (bytes[start+1] << 8) | bytes[start+2] ) / 100;  start += 2;
    } else if (lpp == 0x0371) {
      retValue.acceleration = {};
      retValue.acceleration.x = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
      retValue.acceleration.y = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
      retValue.acceleration.z = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
    } else if (lpp == 0x0586) {
      retValue.gyroscope = {};
      retValue.gyroscope.x    = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
      retValue.gyroscope.y    = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
      retValue.gyroscope.z    = ((bytes[start] << 8) | bytes[start+1]) / 100;   start += 2;
    } else if (lpp == 0x0902) {
      retValue.magnetometer_x = ((bytes[start] << 8) | bytes[start+1]) / 100;  start += 2;
    } else if (lpp == 0x0a02) {
      retValue.magnetometer_y = ((bytes[start] << 8) | bytes[start+1]) / 10;   start += 2;
    } else if (lpp == 0x0b02) {
      retValue.magnetometer_z = ((bytes[start] << 8) | bytes[start+1]) / 10;   start += 2;
    } else if (lpp == 0x0673) {
      retValue.pressure       = ((bytes[start] << 8) | bytes[start+1]) / 10;   start += 2;
    } else if (lpp == 0x0267) {
      retValue.thermometer    = ((bytes[start] << 8) | bytes[start+1]) / 10;   start += 2;
    } else {
      retValue.start = start;
      retValue.end_of_searcc = bytes.length;
      return retValue; 
    }
  }
  return retValue; 
}
