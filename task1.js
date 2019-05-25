function justAddOne(array, number) {
  let strFromArray = '';
  for (const item of array) {
    if (Number.isInteger(item) && item >= 0 && item <= 9) {
      strFromArray += item.toString();
    } else {
      return null;
    }
  }
  const strResult = (parseInt(strFromArray) + parseInt(number)).toString();
  return [...strResult].map(digit => parseInt(digit));
}
