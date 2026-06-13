# EF — Reporte de Proyecto
**Estudiante:** Ugarte Nicole**Proyecto:** Hotel Pequeño
**Repositorio:** https://github.com/nicoleUg/backHotel.git
**Fecha de entrega:** 13/06/2026

---

## Sección 1 — Deploy

**URL del proyecto:** https://hotel.leleworks.dev/
**Swagger / API:** https://backhotel-yxaz.onrender.com/api

> Captura del proyecto corriendo con datos reales:

![Deploy en producción](capturas/hotel-deploy.png)
![Deploy en producción](capturas/hotel-deploy2.png)
![Deploy en producción](capturas/hotel-deploy3.png)
![Deploy en producción](capturas/hotel-deploy4.png)




---

## Sección 2 — Pruebas con TDD + cobertura

### Cobertura inicial (0%)

**Herramienta:** Jest comando npm run test:coverage


> Captura del reporte de cobertura antes de escribir pruebas nuevas:

![Cobertura inicial](capturas/hotel-cobertura-inicial.png)

---

### Ciclo TDD — Prueba 1

**HU:** [HU-08] Descuento por Larga Estadía
> Como administrador quiero aplicar un descuento automático del 10% sobre la tarifa total para las reservas de 7 noches o más, incentivando estadías largas.

**CA elegido:**Dados el número de días de estadía y el precio por día, si los días son mayores o iguales a 7, el sistema debe retornar el total con un 10% de descuento aplicado.

**Commit 1 — Rojo** [`a53374e`](https://github.com/nicoleUg/backHotel/commit/a53374ef3eea9d4287ade7a5191d370e31a47b61):
```
test: [HU-08] agregar test para calculo de descuento por larga estadia
```
Test escrito (sin el código que lo pase aún):
```typescript
describe('calcularTotalConDescuento', () => {
  it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    const total = calcularTotalConDescuento(7, 100);
    expect(total).toBe(630);
  });
});
```

> Captura del test fallando o error de compilación:

![Test rojo](capturas/hotel-tdd1-rojo.png)

---

**Commit 2 — Verde** [`4020710`](https://github.com/nicoleUg/backHotel/commit/40207103cee47e4caf5a3574ba5102e4fcfc7611):
```
feat: [HU-08] implementar calcularTotalConDescuento
```
Código mínimo para hacer pasar el test:
``` typescript
export function calcularTotalConDescuento(dias: number, precioPorDia: number): number {
  const total = dias * precioPorDia;
  if (dias >= 7) {
    return total - (total * 0.10);
  }
  return total;
}
```

> Captura del test pasando:

![Test verde](capturas/hotel-tdd1-verde.png)

---

**Commit 3 — Refactor** [`92bfa33`](https://github.com/nicoleUg/backHotel/commit/92bfa33689f557b3d2c54b90dc8558bb98c64136):
```
refactor: [HU-08] limpiar y extraer limites de descuento a constantes en precio.utils
```
Cambios aplicados:
``` typescript
const LIMITE_DIAS_DESCUENTO = 7;
const TASA_DESCUENTO = 0.10;

export function calcularTotalConDescuento(diasEstadia: number, tarifaDiaria: number): number {
  const totalBase = diasEstadia * tarifaDiaria;
  return diasEstadia >= LIMITE_DIAS_DESCUENTO 
    ? totalBase * (1 - TASA_DESCUENTO) 
    : totalBase;
}
```

> Captura del test aún pasando después del refactor:

![Test post-refactor](capturas/hotel-tdd1-refactor.png)

---

### Ciclo TDD — Prueba 2

**HU:** HU: [HU-09] Cobro por Personas Extra
> Como recepcionista quiero que el sistema calcule automáticamente un cobro adicional si la cantidad de huéspedes supera la capacidad base de la habitación, sin exceder el límite máximo.

**CA elegido:**Si se registran más personas que la capacidad base, el sistema cobrará 20.00 bolivianos por cada persona adicional. Si no la supera, el cobro extra es 0.

**Commit 1 — Rojo** [`874b718`](https://github.com/nicoleUg/backHotel/commit/874b718b420f081068aa1d8318e8118c17c611c3):
```
test: [HU-09] agregar test para cobro de huespedes adicionales
```
Test escrito (sin el código que lo pase aún):
```typescript

describe('calcularCobroPersonasExtra', () => {
  it('debe cobrar 20 bolivianos por cada persona extra sobre la capacidad base', () => {
    expect(calcularCobroPersonasExtra(4, 2)).toBe(40);
    expect(calcularCobroPersonasExtra(2, 2)).toBe(0);
  });
});
```

> Captura del test fallando o error de compilación:

![Test rojo](capturas/hotel-tdd2-rojo.png)

---

**Commit 2 — Verde** [`524408b`](https://github.com/nicoleUg/backHotel/commit/524408b909f7733c6c4dc44f41d9c936ad2cb5f4):
```
feat: [HU-09] implementar calcularCobroPersonasExtra
```
Código mínimo para hacer pasar el test:
``` typescript
export function calcularCobroPersonasExtra(personas: number, capacidad: number): number {
  if (personas > capacidad) {
    return (personas - capacidad) * 20;
  }
  return 0;
}
```

> Captura del test pasando:

![Test verde](capturas/hotel-tdd2-verde.png)

---

**Commit 3 — Refactor** [`92bfa33`](https://github.com/nicoleUg/backHotel/commit/92bfa33689f557b3d2c54b90dc8558bb98c64136):
```
refactor: [HU-09] limpiar y usar constante para tarifa de persona extra y funcion math.max
```
Cambios aplicados:
```typescript
const TARIFA_PERSONA_EXTRA = 20.00;

export function calcularCobroPersonasExtra(personasRegistradas: number, capacidadBase: number): number {
  const personasExtra = Math.max(0, personasRegistradas - capacidadBase);
  return personasExtra * TARIFA_PERSONA_EXTRA;
}
```



> Captura del test aún pasando después del refactor:

![Test post-refactor](capturas/hotel-tdd2-refactor.png)

---

### Ciclo TDD — Prueba 3

> Mismo formato.

---

### Cobertura final

**Cobertura alcanzada:** X%

> Captura del reporte de cobertura final:

![Cobertura final](capturas/[proyecto]-cobertura-final.png)

> Si la cobertura es <50%, pegar aquí la justificación enviada al docente:

---

## Sección 3 — Code smells corregidos

Mínimo 3 nuevos (adicionales a los del EC2).

| # | Tipo | Commit | Descripción |
|---|---|---|---|
| 1 | [Tipo] | [`a1b2c3d`](https://github.com/usuario/repo/commit/a1b2c3d) | [Antes: X → Después: Y] |
| 2 | [Tipo] | [`b2c3d4e`](https://github.com/usuario/repo/commit/b2c3d4e) | [Antes: X → Después: Y] |
| 3 | [Tipo] | [`c3d4e5f`](https://github.com/usuario/repo/commit/c3d4e5f) | [Antes: X → Después: Y] |

### Detalle — Smell 1: [Tipo]

**Código antes:**
```csharp / typescript
// código con el smell
```

**Código después:**
```csharp / typescript
// código corregido
```

---

### Detalle — Smell 2: [Tipo]

> Mismo formato.

---

### Detalle — Smell 3: [Tipo]

> Mismo formato.

---

## Sección 4 — Trazabilidad HU → CA → test

| # | Historia de Usuario | Criterio de Aceptación | Prueba que valida ese CA | Commit |
|---|---|---|---|---|
| 1 | [HU-08] Descuento Larga Estadía | Dado días de estadía / Cuando son >= 7 / Entonces descuenta 10% | calcularTotalConDescuento_EstadiaLarga_AplicaDescuento | [`92bfa33`](https://github.com/nicoleUg/backHotel/commit/92bfa33689f557b3d2c54b90dc8558bb98c64136) |
| 2 | [HU-09] Cobro por Personas Extra | Dado nro personas / Cuando supera base / Entonces cobra 20bs por extra | calcularCobroPersonasExtra_ExcedeBase_CobraDiferencia | [`b2c3d4e`](https://github.com/usuario/repo/commit/b2c3d4e) |
| 3 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | [`c3d4e5f`](https://github.com/usuario/repo/commit/c3d4e5f) |

### Cadena 1 — [HU-08] Descuento por Larga Estadía

**Historia de Usuario:**
> Como administrador quiero aplicar un descuento automático del 10% sobre la tarifa total para las reservas de 7 noches o más como incentivo a estadías largas.

**Criterio de Aceptación elegido:**
> Dada una reserva procesada / Cuando se constata que la cantidad de noches es de 7 o más / Entonces la función retorna el costo total menos el 10% de descuento.

**Prueba que valida este CA:**
```typescript
it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    // Arrange
    const diasEstadia = 7;
    const precioBase = 100;
    
    // Act
    const totalPagar = calcularTotalConDescuento(diasEstadia, precioBase);
    
    // Assert
    expect(totalPagar).toBe(630);
});
```

---

### Cadena 2 — [HU-09] Cobro por Personas Extra
**Historia de Usuario:**
> Como recepcionista quiero que el sistema calcule automáticamente un cobro adicional si la cantidad de huéspedes supera la capacidad base de la habitación, sin exceder el límite máximo.

**Criterio de Aceptación elegido:**
> Dado el cierre de reserva / Cuando se registran más personas que la capacidad base / Entonces el módulo financiero suma 20 bs multiplicados por la cantidad excedente.

**Prueba que valida este CA:**
```typescript
it('debe cobrar 20 bolivianos por cada persona extra sobre la capacidad base', () => {
    // Arrange
    const totalPersonas = 4;
    const capacidadBase = 2;

    // Act
    const cobroAdicional = calcularCobroPersonasExtra(totalPersonas, capacidadBase);

    // Assert
    expect(cobroAdicional).toBe(40);
});
```
---

### Cadena 3 — [Nombre HU]
 
**Historia de Usuario:**
> Como administrador quiero aplicar un descuento automático del 10% sobre la tarifa total para las reservas de 7 noches o más como incentivo a estadías largas.

**Criterio de Aceptación elegido:**
> Dada una reserva procesada / Cuando se constata que la cantidad de noches es de 7 o más / Entonces la función retorna el costo total menos el 10% de descuento.

**Prueba que valida este CA:**
```typescript
it('debe aplicar un 10% de descuento si la estadia es de 7 o mas dias', () => {
    // Arrange
    const diasEstadia = 7;
    const precioBase = 100;
    
    // Act
    const totalPagar = calcularTotalConDescuento(diasEstadia, precioBase);
    
    // Assert
    expect(totalPagar).toBe(630);
});
```