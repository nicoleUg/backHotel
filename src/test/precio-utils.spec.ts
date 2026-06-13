import { calcularTotalConDescuento } from '../utils/precio.utils';
import { calcularCobroPersonasExtra } from '../utils/precio.utils';

describe('calcularTotalConDescuento', () => {
  it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    const total = calcularTotalConDescuento(7, 100);
    expect(total).toBe(630);
  });
});

describe('calcularCobroPersonasExtra', () => {
  it('debe cobrar 20 bolivianos por cada persona extra sobre la capacidad base', () => {
    expect(calcularCobroPersonasExtra(4, 2)).toBe(40);
    expect(calcularCobroPersonasExtra(2, 2)).toBe(0);
  });
});