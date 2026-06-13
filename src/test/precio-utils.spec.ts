import { calcularTotalConDescuento } from '../utils/precio.utils';

describe('calcularTotalConDescuento', () => {
  it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    const total = calcularTotalConDescuento(7, 100);
    expect(total).toBe(630);
  });
});