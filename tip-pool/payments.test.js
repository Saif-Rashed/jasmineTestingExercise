describe("Payments test (with setup and tear-down)", function () {
  beforeEach(function () {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });

  it("should add a new payment to allPayments on submitPaymentInfo()", function () {
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment1"].billAmt).toEqual("100");
    expect(allPayments["payment1"].tipAmt).toEqual("20");
    expect(allPayments["payment1"].tipPercent).toEqual(20);
  });

  it("should not add a new payment on submitPaymentInfo() with empty input", function () {
    billAmtInput.value = "";
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(0);
  });

  it("should payment update #paymentTable on appendPaymentTable()", function () {
    let curPayment = createCurPayment();
    allPayments["payment1"] = curPayment;

    appendPaymentTable(curPayment);

    let curTdList = document.querySelectorAll("#paymentTable tbody tr td");

    expect(curTdList.length).toEqual(4);
    expect(curTdList[0].innerText).toEqual("$100");
    expect(curTdList[1].innerText).toEqual("$20");
    expect(curTdList[2].innerText).toEqual("%20");
    expect(curTdList[3].innerText).toEqual("X");
  });

  it("should create a new payment on createCurPayment()", function () {
    let expectedPayment = {
      billAmt: "100",
      tipAmt: "20",
      tipPercent: 20,
    };

    expect(createCurPayment()).toEqual(expectedPayment);
  });

  it("should not create payment with empty input on createCurPayment()", function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    let curPayment = createCurPayment();

    expect(curPayment).toEqual(undefined);
  });

  afterEach(function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
    paymentId = 0;
    allPayments = {};
  });
});
tip - pool / helpers.js;
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement("td");
  newTd.innerText = value;

  tr.append(newTd);
}

// append delete button and click handler for removing server from allServers and DOM td
function appendDeleteBtn(tr, type) {
  let newTd = document.createElement("td");
  newTd.className = "deleteBtn";
  newTd.innerText = "X";

  newTd.addEventListener("click", removeEle);

  tr.append(newTd);
}

function removeEle(evt) {
  let ele = evt.target.closest("tr");

  delete allServers[ele.id];

  ele.parentNode.removeChild(ele);
  updateServerTable();
}
