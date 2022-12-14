describe("Helpers Test Cases:", function () {
  beforeEach(function () {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();
  });
  it("should sum all payment tip amounts", function () {
    expect(sumPaymentTotal("tipAmt")).toEqual(20);
    billAmtInput.value = 200;
    tipAmtInput.value = 40;
    submitPaymentInfo();
    expect(sumPaymentTotal("tipAmt")).toEqual(60);
  });
  it("should sum all payment bill amounts", function () {
    expect(sumPaymentTotal("billAmt")).toEqual(100);
    billAmtInput.value = 200;
    tipAmtInput.value = 40;
    submitPaymentInfo();
    expect(sumPaymentTotal("billAmt")).toEqual(300);
  });
  it("should sum all payment tip percent", function () {
    expect(sumPaymentTotal("tipPercent")).toEqual(20);
    billAmtInput.value = 200;
    tipAmtInput.value = 40;
    submitPaymentInfo();
    expect(sumPaymentTotal("tipPercent")).toEqual(40);
  });
  it("should calculate tip percent", function () {
    expect(calculateTipPercent(100, 20)).toEqual(20);
    expect(calculateTipPercent(200, 40)).toEqual(20);
  });
  it("should generate new td from value and append on appendTd", function () {
    let newTr = document.createElement("tr");
    appendTd(newTr, "test");
    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("test");
  });
  it("should generate delete button and append on appendDeleteBtn", function () {
    let newTr = document.createElement("tr");
    appendDeleteBtn(newTr);
    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("X");
  });
  afterEach(function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
    allPayments = {};
    serverId = 0;
    allServers = {};
    paymentId = 0;
  });
});
