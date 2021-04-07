import { generateFakeProducts } from "./Products";

describe("Product Serices", () => {
  describe("generateFakeProducts", () => {
    const positiveNUmber = 2;
    it(`should return ${positiveNUmber} products when requested ${positiveNUmber}`, () => {
      expect(generateFakeProducts(positiveNUmber)).toHaveLength(positiveNUmber);
    });

    const zero = 0;
    it(`should return ${zero} products when requested ${zero}`, () => {
      expect(generateFakeProducts(zero)).toHaveLength(zero);
    });

    const negativeNumber = -3;
    it(`should return ${Math.abs(
      negativeNumber
    )} products when requested ${negativeNumber}`, () => {
      expect(generateFakeProducts(negativeNumber)).toHaveLength(
        Math.abs(negativeNumber)
      );
    });

    it(`should return 10 products when no arg used`, () => {
      expect(generateFakeProducts()).toHaveLength(10);
    });
  });
});
