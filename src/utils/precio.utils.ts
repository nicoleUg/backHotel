const LIMITE_DIAS_DESCUENTO = 7;
const TASA_DESCUENTO = 0.10;

export function calcularTotalConDescuento(diasEstadia: number, tarifaDiaria: number): number {
  const totalBase = diasEstadia * tarifaDiaria;
  return diasEstadia >= LIMITE_DIAS_DESCUENTO 
    ? totalBase * (1 - TASA_DESCUENTO) 
    : totalBase;
}
export function calcularCobroPersonasExtra(personas: number, capacidad: number): number {
  if (personas > capacidad) {
    return (personas - capacidad) * 20;
  }
  return 0;
}