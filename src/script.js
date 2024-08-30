let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

document.getElementById("purchase-btn").addEventListener("click", function () {
  const cashValue = parseFloat(document.getElementById("cash").value);

  if (isNaN(cashValue) || cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashValue === price) {
    document.getElementById("change-due").innerText =
      "No change due - customer paid with exact cash";
  } else {
    let changeDue = cashValue - price;
    let change = [];
    const currencyUnits = [
      ["ONE HUNDRED", 100],
      ["TWENTY", 20],
      ["TEN", 10],
      ["FIVE", 5],
      ["ONE", 1],
      ["QUARTER", 0.25],
      ["DIME", 0.1],
      ["NICKEL", 0.05],
      ["PENNY", 0.01],
    ];

    function precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
  }

    for (let [unit, value] of currencyUnits) {
      let amountInDrawer = cid.find((item) => item[0] === unit)[1];
      let amountToReturn = 0;

      while (changeDue >= value && amountInDrawer >= value) {
        changeDue -= value;
        changeDue = precisionRound(changeDue,2);
         // Fix floating point precision issues
        amountInDrawer -= value;
        amountInDrawer = precisionRound(amountInDrawer,2);
        amountToReturn += value;
        amountToReturn = precisionRound(amountToReturn,2);
      }

      if (amountToReturn > 0) {
        change.push([unit, amountToReturn]);
      }
    }

    if (changeDue > 0) {
      console.log(changeDue);
      document.getElementById("change-due").innerText =
        "Status: INSUFFICIENT_FUNDS";
    } else {
      let totalCid = cid.reduce((sum, item) => sum + item[1], 0);
      if (totalCid === cashValue - price) {
        let changeString = change
          .map((item) => `${item[0]}: $${item[1].toFixed(2)}`)
          .join(" ");
        document.getElementById(
          "change-due"
        ).innerText = `Status: CLOSED ${changeString}`;
      } else {
        let changeString = change
          .map((item) => `${item[0]}: $${item[1].toFixed(2)}`)
          .join(" ");
        document.getElementById(
          "change-due"
        ).innerText = `Status: OPEN ${changeString}`;
      }
    }
  }
});
