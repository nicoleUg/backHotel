import { calcularTotalConDescuento } from '../utils/precio.utils';
import { calcularCobroPersonasExtra } from '../utils/precio.utils';
import { calcularRecargoLateCheckout } from '../utils/precio.utils';

describe('calcularTotalConDescuento', () => {
  it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    const diasEstadia = 7;
    const precioBase = 100;
    
    const totalPagar = calcularTotalConDescuento(diasEstadia, precioBase);
    
    expect(totalPagar).toBe(630);
});
});

describe('calcularCobroPersonasExtra', () => {
  it('debe cobrar 20 bolivianos por cada persona extra sobre la capacidad base', () => {
    const totalPersonas = 4;
    const capacidadBase = 2;

    const cobroAdicional = calcularCobroPersonasExtra(totalPersonas, capacidadBase);

    expect(cobroAdicional).toBe(40);
  });
});

it('debe cobrar la tarifa de un dia completo si el retraso supera el limite de horas', () => {
    const horasTarde = 5;
    const precioHabitacion = 100;

    const recargoGenerado = calcularRecargoLateCheckout(horasTarde, precioHabitacion);

    expect(recargoGenerado).toBe(100);
});