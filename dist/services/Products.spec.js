"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = require("./Products");
describe("Product Serices", () => {
    describe("generateFakeProducts", () => {
        const positiveNUmber = 2;
        it(`should return ${positiveNUmber} products when requested ${positiveNUmber}`, () => {
            expect(Products_1.generateFakeProducts(positiveNUmber)).toHaveLength(positiveNUmber);
        });
        const zero = 0;
        it(`should return ${zero} products when requested ${zero}`, () => {
            expect(Products_1.generateFakeProducts(zero)).toHaveLength(zero);
        });
        const negativeNumber = -3;
        it(`should return ${Math.abs(negativeNumber)} products when requested ${negativeNumber}`, () => {
            expect(Products_1.generateFakeProducts(negativeNumber)).toHaveLength(Math.abs(negativeNumber));
        });
        it(`should return 10 products when no arg used`, () => {
            expect(Products_1.generateFakeProducts()).toHaveLength(10);
        });
    });
});
