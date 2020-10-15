/**
 * Returns the S-Box output of a certain block
 * @param {String} block block to calculate the S-Box output of
 * @returns S-Box output
 */
module.exports = block => {

  if (block.length != 48) throw "Block length is not 48bits.";

  const { SBOX } = require("./tables");

 
/** [
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ]
*/
  const blocks = block.match(/\d{1,6}/g);

  if (blocks.length != 8)
    throw "Blocks of 6bits did not generate 8 blocks of data.";

  for (let i = 0; i < blocks.length; i++) {

    let row = parseInt(blocks[i][0] + blocks[i][5], 2);

    let column = parseInt(blocks[i].slice(1, 5), 2);

    let value = SBOX[i][row][column];

    let binValue = (value >>> 0).toString(2);

    while (binValue.length < 4) binValue = "0" + binValue;

    blocks[i] = binValue;
  }
  return blocks.join("");
};
