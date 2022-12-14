describe("Servers Case Tests:", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });
  it("The server name in the server info shouldn't be empty", function () {
    serverNameInput.value = "";
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });
  it("should create a new row in the server table on updateServerTable()", function () {
    submitServerInfo();
    updateServerTable();
    let curTdList = document.querySelectorAll("#serverTable tbody tr td");
    expect(curTdList.length).toEqual(2);
    expect(curTdList[0].innerText).toEqual("Alice");
    expect(curTdList[1].innerText).toEqual("$0.00");
    expect(curTdList[2].innerText).toEqual("X");
  });
  it("should create a new row in the server table on updateServerTable() with multiple servers", function () {
    serverNameInput.value = "Alice";
    submitServerInfo();
    serverNameInput.value = "Bob";
    submitServerInfo();
    updateServerTable();
    let curTdList = document.querySelectorAll("#serverTable tbody tr td");
    expect(curTdList.length).toEqual(4);
    expect(curTdList[0].innerText).toEqual("Alice");
    expect(curTdList[1].innerText).toEqual("$0.00");
    expect(curTdList[2].innerText).toEqual("Bob");
    expect(curTdList[3].innerText).toEqual("$0.00");
    expect(curTdList[4].innerText).toEqual("X");
  });

  afterEach(function () {
    // teardown logic
    serverTbody.innerHTML = "";
    serverId = 0;
    allServers = {};
  });
});
