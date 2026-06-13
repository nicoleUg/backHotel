const LIMITE_DIAS_DESCUENTO = 7;
const TASA_DESCUENTO = 0.10;
const TARIFA_PERSONA_EXTRA = 20.00;

export function calcularTotalConDescuento(diasEstadia: number, tarifaDiaria: number): number {
  const totalBase = diasEstadia * tarifaDiaria;
  return diasEstadia >= LIMITE_DIAS_DESCUENTO 
    ? totalBase * (1 - TASA_DESCUENTO) 
    : totalBase;
}

export function calcularCobroPersonasExtra(personasRegistradas: number, capacidadBase: number): number {
  const personasExtra = Math.max(0, personasRegistradas - capacidadBase);
  return personasExtra * TARIFA_PERSONA_EXTRA;
}