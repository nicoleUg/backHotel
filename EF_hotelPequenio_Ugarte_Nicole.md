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

**Commit 3 — Refactor** [`c3d4e5f`](https://github.com/usuario/repo/commit/c3d4e5f):
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

> Mismo formato. Incluir al menos 3 ciclos TDD completos.

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
| 1 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | [`a1b2c3d`](https://github.com/usuario/repo/commit/a1b2c3d) |
| 2 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | [`b2c3d4e`](https://github.com/usuario/repo/commit/b2c3d4e) |
| 3 | [HU título] | [Dado/Cuando/Entonces] | [NombrePrueba_Escenario_Resultado] | [`c3d4e5f`](https://github.com/usuario/repo/commit/c3d4e5f) |

### Cadena 1 — [Nombre HU]

**Historia de Usuario:**
> Como [rol] quiero [acción] para [beneficio]

**Criterio de Aceptación elegido:**
> Dado [contexto] / Cuando [acción] / Entonces [resultado esperado]

**Prueba que valida este CA:**
```csharp / typescript
[Fact / test]
public void Metodo_Escenario_ResultadoEsperado()
{
    // Arrange — setup del contexto del CA
    // Act — ejecutar la acción del CA
    // Assert — verificar el resultado del CA
}
```

---

### Cadena 2 — [Nombre HU]

> Mismo formato.

---

### Cadena 3 — [Nombre HU]

> Mismo formato.
