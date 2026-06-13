export function calcularTotalConDescuento(dias: number, precioPorDia: number): number {
  const total = dias * precioPorDia;
  if (dias >= 7) {
    return total - (total * 0.10);
  }
  return total;
}
