const LIMITE_DIAS_DESCUENTO = 7;
const TASA_DESCUENTO = 0.10;
const TARIFA_PERSONA_EXTRA = 20.00;
const LIMITE_HORAS_PARA_DIA_COMPLETO = 4;
const TARIFA_POR_HORA_RETRASO = 15.00;


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


export function calcularRecargoLateCheckout(horasRetraso: number, tarifaDiariaBase: number): number {
  if (horasRetraso <= 0) return 0;
  
  if (horasRetraso > LIMITE_HORAS_PARA_DIA_COMPLETO) {
    return tarifaDiariaBase;
  }
  
  return horasRetraso * TARIFA_POR_HORA_RETRASO;
}