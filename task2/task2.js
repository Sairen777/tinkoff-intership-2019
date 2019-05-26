const NAME_KEY = "name";
const CARD_NUMBER_KEY = "cardNumber";
const DATE_KEY = "date";
const AMOUNT_KEY = "amount";
const CURRENCY_KEY = "currency";

// main method
function parseTransactionDataToString(arrayOfJSONData) {
  let resultString = '';
  for (let i = 0; i < arrayOfJSONData.length; i++) {
    resultString += `${getNameString(arrayOfJSONData[i])}\n`;
    resultString += `${getCardnumberString(arrayOfJSONData[i])}\n`;
    resultString += `${getDateString(arrayOfJSONData[i])}\n`;
    resultString += `${getAmountString(arrayOfJSONData[i])}`;
    // add empty line between each transaction
    if (i !== arrayOfJSONData.length - 1) {
      resultString += '\n\n';
    }
  }

  return resultString;
}

const getNameString = transaction => `Имя покупателя: ${transaction[NAME_KEY]}`;

const getCardnumberString = transaction => {
  const firstFourNumbers = transaction[CARD_NUMBER_KEY].substring(0, 4);
  const lastFourNumbers = transaction[CARD_NUMBER_KEY].substring(12);

  return `Номер карты: ${firstFourNumbers} **** **** ${lastFourNumbers}`;
};

const getDateString = transaction =>
  `Дата и время операции: ${formatDate(transaction[DATE_KEY])}`;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = addLeadingZeroToDateElement(date.getDate());
  // month starts from 0
  const month = addLeadingZeroToDateElement(date.getMonth() + 1);
  const hours = addLeadingZeroToDateElement(date.getHours());
  const minutes = addLeadingZeroToDateElement(date.getMinutes());

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
}

const addLeadingZeroToDateElement = dateElement => `0${dateElement}`.slice(-2);

const getAmountString = transaction => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const amount = formatter.format(transaction[AMOUNT_KEY]).slice(1);

  return `Сумма операции: ${transaction[CURRENCY_KEY]}${amount}`;
};


const testData = [
  {
    "name": "Ashlynn Hartmann",
    "cardNumber": "4929289137092267",
    "date": "2019-01-24T17:39:07.347Z",
    "amount": "579.63",
    "currency": "$"
  },
  {
    "name": "Philip Stoltenberg",
    "cardNumber": "4916258329158678",
    "date": "2018-09-07T02:21:03.144Z",
    "amount": "10472.99",
    "currency": "$"
  }
];

console.log(parseTransactionDataToString(testData));
