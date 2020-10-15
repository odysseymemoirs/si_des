
const { stb, permutation, shiftLeft } = require("./helpers");

const { PC1, PC2, leftShiftSchedule } = require("./tables");



function generateKey(key) {


  if (!/(1|0)+/i.test(key)) {

    key = stb(key);

    if (key.length != 64)
      throw "Данный ключ нельзя перевести в 64 битное значение";

  } else if (key.length != 64) throw "Ключ не является 64 битным бинарным значением";



  const pc1Key = permutation(key, PC1);

  let firstHalf = pc1Key.slice(0, pc1Key.length / 2);

  let secondHalf = pc1Key.slice(pc1Key.length / 2, pc1Key.length);

  let subKeys = [];

  for (let round = 0; round < leftShiftSchedule.length; round++) {

    firstHalf = shiftLeft(firstHalf, leftShiftSchedule[round]);

    secondHalf = shiftLeft(secondHalf, leftShiftSchedule[round]);

    let combinedHalves = firstHalf + secondHalf;

    const subKey = permutation(combinedHalves, PC2);

    subKeys.push(subKey);
  }
  return subKeys;
}

module.exports = generateKey;
