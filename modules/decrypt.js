
module.exports = (key, content) => {

  const { IP, EBIT, P, INVRSIP } = require("./tables");

  const { stb, bts, permutation, xor } = require("./helpers");

  const generateKey = require("./generateSubKeys");

  const sBoxPermutation = require("./sTransform");

  const subKeys = generateKey(key).reverse();



  // 1.
  let dataBlocks = stb(content).match(/\d{1,64}/g).map(element => {
    if (element.length < 64) {
      while (element.length < 64) element += "0";
    }
    return element;
  });

  let decryptedBlocks = [];

  // 2.
  for (let i = 0; i < dataBlocks.length; i++) {

    let permutedBlock = permutation(dataBlocks[i], IP);

    let splitBlock = permutedBlock.match(/\d{1,32}/g);

    let leftPart = [splitBlock[0]];

    let rightPart = [splitBlock[1]];


    for (let j = 1; j <= 16; j++) {

      leftPart.push(rightPart[j - 1]);

      let rightPartPermutated = permutation(rightPart[j - 1], EBIT);

      let rightPartXOR = xor(subKeys[j - 1], rightPartPermutated);

      let sboxOutput = sBoxPermutation(rightPartXOR);

      rightPart.push(xor(leftPart[j - 1], permutation(sboxOutput, P)));
    }

    let combined = permutation(rightPart[16] + leftPart[16], INVRSIP);

    decryptedBlocks.push(combined);
  }


  return bts(decryptedBlocks.join(""));
};
