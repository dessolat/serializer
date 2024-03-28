const serialize = arr =>
  arr.reduce((result, number) => {
    const tensNumber = Math.floor(number / 10);
    const remainingNumber = number - tensNumber * 10;

    let curNumber = '';

    if (tensNumber > 0) curNumber += String.fromCharCode(tensNumber + 31);

    curNumber += String.fromCharCode(62 + remainingNumber);

    return result + curNumber;
  }, '[') + ']';

const deserialize = str => {
  const slicedStr = str.slice(1, -1);

  const result = [];

  for (let i = 0; i < slicedStr.length; i++) {
    const curNumber = slicedStr[i].charCodeAt(0);

    if (curNumber >= 32 && curNumber <= 61) continue;

    const prevNumber = slicedStr[i - 1]?.charCodeAt(0);

    let sum = 0;

    if (i > 0 && prevNumber >= 32 && prevNumber <= 61) sum += 10 * (prevNumber - 31);

    sum += curNumber - 62;

    result.push(sum);
  }

  return result;
};

const getRandomArray = (arrLength, minNumber, maxNumber) => {
  const arr = [];
  for (let i = 0; i < arrLength; i++) {
    arr.push(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);
  }
  return arr;
};

const getNDigitsArray = n => {
  const minNumber = n > 1 ? parseInt('1'.padEnd(n, 0)) : 0;
  const maxNumber = n > 2 ? 300 : parseInt('9'.padEnd(n, 9));

  const arr = [];
  for (let i = minNumber; i <= maxNumber; i++) {
    arr.push(i);
  }
  return arr;
};

const getAllNumbersByThreeArr = () => {
	const result = [];
  for (let i = 0; i <= 300; i++) {
		result.push(i)
		result.push(i)
		result.push(i)
	}
  return result;
}

const makeTest = sourceArray => {
  let serializedWOCompression = JSON.stringify(sourceArray);
  let serializedWithCompression = serialize(sourceArray);

  console.log('Serialized array w/o compression - ', serializedWOCompression);
  console.log('Serialized array with compression - ', serializedWithCompression);
  console.log(
    'Serialize ratio - ',
    (serializedWithCompression.length / serializedWOCompression.length).toFixed(3)
  );
};


// TESTS

// Simple shorts
makeTest([100, 85, 102, 71, 245, 65, 300, 3]);

// Random 50 numbers
makeTest(getRandomArray(50, 0, 300));

// Random 100 numbers
makeTest(getRandomArray(100, 0, 300));

// Random 500 numbers
makeTest(getRandomArray(500, 0, 300));

// Random 1000 numbers
makeTest(getRandomArray(1000, 0, 300));

// All numbers with 1 digit
makeTest(getNDigitsArray(1));

// Two digits array
makeTest(getNDigitsArray(2));

// Three digits array
makeTest(getNDigitsArray(3));

// All numbers by 3
makeTest(getAllNumbersByThreeArr());