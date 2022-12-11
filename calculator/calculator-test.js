describe("Monthly Loan Calculator Test Cases:", function () {
  it("should calculate the monthly rate correctly", function () {
    const values = { amount: 10000, years: 8, rate: 5.8 };
    expect(calculateMonthlyPayment(values)).toEqual("130.44");
  });

  it("should return a result with 2 decimal places", function () {
    const values = { amount: 10000, years: 8, rate: 5.8 };
    expect(calculateMonthlyPayment(values)).toEqual("130.44");
  });
  it("should throw an error if the loan amount is not a number", function () {
    expect(() => amountUI("string")).toThrowError();
    expect(() => amountUI(true)).toThrowError();
    expect(() => amountUI([])).toThrowError();
  });
  it("should throw an error if the years is not a number", function () {
    expect(() => yearsUI("string")).toThrowError();
    expect(() => yearsUI(true)).toThrowError();
    expect(() => yearsUI([])).toThrowError();
  });
  it("should throw an error if the yearly rate is not a number", function () {
    expect(() => rateUI("string")).toThrowError();
    expect(() => rateUI(true)).toThrowError();
    expect(() => rateUI([])).toThrowError();
  });
});
