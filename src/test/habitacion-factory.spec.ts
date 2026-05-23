import { HabitacionFactory } from '../patterns/habitacion.factory';

describe('HabitacionFactory', () => {
  it('debe retornar características correctas para una habitación Simple', () => {
    const caracteristicas = HabitacionFactory.obtenerCaracteristicas('Simple');

    expect(caracteristicas.capacidadBase).toBe(1);
    expect(caracteristicas.precioReferencial).toBe(50.00);
  });
});
