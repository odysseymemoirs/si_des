module.exports = {

  stb: (str, spaceSeparatedOctets = 0) => {
    function zeroPad(num) {
      return "00000000".slice(String(num).length) + num;
    }

    return str.replace(/[\s\S]/g, function(str) {
      str = zeroPad(str.charCodeAt().toString(2));
      return !1 == spaceSeparatedOctets ? str : str + " ";
    });
  },
 

  bts: str => {
    str = str.replace(/\s+/g, "");
    str = str.match(/.{1,8}/g).join(" ");

    var newBinary = str.split(" ");
    var binaryCode = [];

    for (i = 0; i < newBinary.length; i++) {
      binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }

    return binaryCode.join("");
  },
 

  permutation: (inputKey, pcTable) => {
    let permutedKey = "";
    for (let i = 0; i < pcTable.length; i++) {
      permutedKey += inputKey.charAt(pcTable[i] - 1);
    }
    return permutedKey;
  },
  
  
  shiftLeft: (key, n = 1) => {
    for (let i = 0; i < n; i++) {
      const bit = key.charAt(0);
      key = key.slice(1) + bit;
    }
    return key;
  },
  
  
  xor: (in1, in2) => {
    if (in1.length < in2.length) {
      while (in1.length < in2.length) in1 = "0" + in1;
    } else if (in2.length < in1.length) {
      while (in2.length < in1.length) in2 = "0" + in2;
    }
    let result = "";
    for (let i = 0; i < in1.length; i++) {
      const in1Bit = in1[i];
      const in2Bit = in2[i];
      let resultBit = parseInt(in1Bit) + parseInt(in2Bit);
      resultBit = resultBit <= 1 ? resultBit : "0";
      result += resultBit;
    }
    return result;
  }
};
