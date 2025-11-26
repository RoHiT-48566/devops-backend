const { expect } = require("chai");

describe("Basic Sanity Check", function () {
  it("should confirm that 2 + 2 equals 4", function () {
    expect(2 + 2).to.equal(4);
  });

  it("should confirm that app can be imported", function () {
    const express = require("express");
    const app = express();
    expect(app).to.be.a("function");
  });
});
