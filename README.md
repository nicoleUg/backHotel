# Documentación del Backend - Sistema de Gestión Hotelera

## Descripción General
Este repositorio contiene el código fuente del backend para el sistema de gestión de reservas de hotel. El proyecto ha sido desarrollado siguiendo una arquitectura escalable y aplicando principios sólidos de ingeniería de software para garantizar su mantenibilidad a largo plazo.

## Stack Tecnológico
El proyecto está construido sobre las siguientes tecnologías y herramientas:
- Framework Principal: NestJS (Node.js)
- Lenguaje de Programación: TypeScript
- Mapeo Objeto-Relacional (ORM): TypeORM
- Motor de Base de Datos: PostgreSQL
- Validación de Datos: class-validator y class-transformer
- Entorno de Pruebas Unitarias y Cobertura: Jest
- Análisis Estático de Código: ESLint

## Historias de Usuario (HU) Implementadas

El sistema backend provee los servicios necesarios para cumplir con los siguientes requerimientos de negocio, documentados mediante Historias de Usuario:

### HU-01: Gestión de Huéspedes
Permite el registro de nuevos huéspedes validando la unicidad de sus documentos de identidad y proporciona un listado general de los clientes registrados ordenados alfabéticamente.

### HU-02 y HU-03: Creación y Consulta de Reservas
Gestiona el ciclo de vida inicial de las reservas. Aplica validaciones de negocio estrictas, tales como:
- Validación de coherencia cronológica (la fecha de salida debe ser estrictamente posterior a la fecha de ingreso).
- Prevención de solapamiento de fechas para evitar asignar una misma habitación a múltiples titulares simultáneamente.
- Validación de capacidad máxima de personas según el tipo de habitación seleccionada.

### HU-04: Registro de Check-in
Procesa la llegada del huésped actualizando el estado de la reserva a "Check In" y registrando la fecha y hora exacta de la operación. Previene inconsistencias al bloquear intentos de check-in sobre reservas previamente iniciadas o canceladas.

### HU-05: Asignación de Características de Habitación
Implementa el patrón de diseño Factory Method para asignar dinámicamente precios referenciales y capacidades base dependiendo de la variante de la habitación (Simple, Suite, Doble Matrimonial, Doble con camas individuales), promoviendo la escalabilidad del modelo de datos.

### HU-06: Directorio de Servicios
Provee acceso mediante endpoints de lectura a la información de contacto de las distintas áreas operativas y de apoyo del hotel.

### HU-07: Cancelación y Penalizaciones
Gestiona la cancelación de reservas previamente confirmadas. Incluye la lógica de negocio para calcular e insertar automáticamente una penalización económica en caso de que la cancelación se realice con un margen igual o menor a dos días de anticipación respecto a la fecha de ingreso programada.

## Instrucciones de Configuración y Ejecución

1. Instalación de dependencias:
```bash
npm install
```

2. Ejecución en entorno de desarrollo:
```bash
npm run start:dev
```

3. Compilación del proyecto para producción:
```bash
npm run build
```

4. Ejecución de pruebas unitarias y generación del reporte de cobertura:
```bash
npm run test:coverage
```

5. Ejecución del análisis estático de código (ESLint):
Para identificar problemas de código en la consola:
```bash
npx eslint src
```

Para generar un reporte HTML del análisis estático:
```bash
npx eslint src -f html -o reporte-eslint.html
```
