describe("Payments Test Cases:", function () {
  beforeEach(function () {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });
  it("should create a new payment on submitPaymentInfo()", function () {
    submitPaymentInfo();
    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment1"].billAmt).toEqual("100");
    expect(allPayments["payment1"].tipAmt).toEqual("20");
    expect(allPayments["payment1"].tipPercent).toEqual(20);
  });
  it("should create a new payment on submitPaymentInfo() with multiple payments", function () {
    submitPaymentInfo();
    billAmtInput.value = 200;
    tipAmtInput.value = 40;
    submitPaymentInfo();
    expect(Object.keys(allPayments).length).toEqual(2);
    expect(allPayments["payment1"].billAmt).toEqual("100");
    expect(allPayments["payment1"].tipAmt).toEqual("20");
    expect(allPayments["payment1"].tipPercent).toEqual(20);
    expect(allPayments["payment2"].billAmt).toEqual("200");
    expect(allPayments["payment2"].tipAmt).toEqual("40");
    expect(allPayments["payment2"].tipPercent).toEqual(20);
  });
  it("should not accept empty payment input, on submitPaymetInfo()", function () {
    billAmtInput.value = "";
    submitPaymentInfo();
    expect(Object.keys(allPayments).length).toEqual(0);
  });
  it("should update payment on appendPaymentTable()", function () {
    let curPayment = createCurPayment();
    allPayments["payment1"] = curPayment;
    appendPaymentTable(curPayment);
    let curTdList = document.querySelectorAll("#paymentTable tbody tr td");
    expect(curTdList.length).toEqual(4);
    expect(curTdList[0].innerText).toEqual("$100");
    expect(curTdList[1].innerText).toEqual("$20");
    expect(curTdList[2].innerText).toEqual("20%");
    expect(curTdList[3].innerText).toEqual("X");
  });
  it("should create new payment on createCurPayment()", function () {
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
    expect(createCurPayment()).toEqual(undefined);
  });
  afterEach(function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentId = 0;
    allPayments = {};
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
  });
});
