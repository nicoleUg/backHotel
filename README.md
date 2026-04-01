
# BackHotel API

Backend para gestión de reservas de hotel con NestJS, TypeORM y PostgreSQL (Supabase).
Este proyecto es un Prototipo Funcional (MVP) que cubre desde la HU-01 hasta la HU-07 del sistema operativo del hotel.

## Tecnologías

- Node.js (18+)
- NestJS
- TypeORM
- PostgreSQL (Supabase)
- class-validator y class-transformer

## Requisitos y Configuración

1. Instalar dependencias:
```bash
npm install
```


## Patrones de Diseño Aplicados

Para garantizar un código escalable y mantenible, se han implementado los siguientes patrones de diseño de software:

* **MVC (Modelo-Vista-Controlador)**: Aplicado de forma transversal en todo el proyecto. La lógica se separa en carpetas dedicadas: `controllers` (gestión de rutas HTTP), `services` (lógica de negocio) y `entities`/`repositories` (Modelos de base de datos).
* **Factory Method (Fábrica)**: Aplicado específicamente en la **HU-05**. Se utiliza la clase estática `HabitacionFactory` para instanciar dinámicamente objetos de características (capacidad base, precio) dependiendo de la variante de la habitación seleccionada ('Suite', 'Simple', etc.). Esto evita quemar lógica condicional compleja en el servicio y cumple con el requerimiento arquitectónico de la historia.
* **Repository Pattern**: Aplicado en el módulo de Reservas (`reservas.repository.ts`) para aislar las consultas complejas de TypeORM (como la detección de solapamiento de fechas usando QueryBuilder) fuera de la lógica de negocio pura.

## Estructura del Proyecto Actualizada

La estructura actual sigue una organización por tipo de archivo, promoviendo la cohesión y la claridad:

```text
src/
├── controllers/                # Controladores (capa de entrada HTTP)
│   ├── huespedes.controller.ts
│   ├── Reservas.controller.ts
│   └── contacto_servicio.controller.ts
├── services/                   # Lógica de negocio
│   ├── huespedes.service.ts
│   ├── reservas.service.ts
│   └── contacto_servicio.service.ts
├── modules/                    # Módulos de NestJS
│   ├── app.module.ts
│   ├── huespedes.module.ts
│   ├── reservas.module.ts
│   └── contacto_servicio.module.ts
├── entities/                   # Entidades de TypeORM
│   ├── acompanante.entity.ts
│   ├── contacto_servicio.entity.ts
│   ├── habitacion.entity.ts
│   ├── huesped.entity.ts
│   ├── mora_cancelacion.entity.ts
│   ├── reserva.entity.ts
│   └── tipo_habitacion.entity.ts
├── dto/                        # Data Transfer Objects
│   ├── cancelar_reserva.dto.ts
│   ├── crear_huesped.dto.ts
│   └── crear_reserva.dto.ts
├── patterns/                   # Patrones de diseño (e.g., Factory)
│   └── habitacion.factory.ts
├── repositories/               # Repositorios (consultas complejas)
│   └── reservas.repository.ts
└── main.ts                     # Archivo de arranque
```

## Endpoints y Casos de Uso (HUs)

### HU-01: Gestión de Huéspedes
* `POST /huespedes`: Registra un nuevo huésped. Valida DTOs y rechaza documentos duplicados (Error 409).
* `GET /huespedes`: Retorna la lista de huéspedes ordenados alfabéticamente.

### HU-02 y HU-03: Creación y Consulta de Reservas
* `GET /reservas`: Devuelve todas las reservas ordenadas cronológicamente (Incluye relaciones con Titular y Habitación).
* `POST /reservas`: Crea una reserva aplicando las siguientes validaciones:
   * Fecha de salida estrictamente mayor a la de ingreso.
   * Lógica anti-solapamiento (impide fechas cruzadas en una misma habitación).
   * Validación de capacidad máxima de personas vía Patrón Factory.

### HU-04: Registrar Check-in
* `PATCH /reservas/:id/checkin`: Cambia el estado a "Check In" y registra el `CURRENT_TIMESTAMP`. Bloquea intentos sobre reservas canceladas o ya iniciadas.

### HU-06: Directorio de Servicios
* `GET /contacto-servicio`: Retorna los contactos de las áreas de apoyo del hotel.

### HU-07: Cancelación con Mora Simple (Asignación Individual)
* `POST /reservas/cancelar`: Cancela una reserva confirmada. Si la anticipación es de 2 días o menos respecto a la fecha de ingreso, calcula e inserta automáticamente un castigo en la tabla `mora_cancelacion` por un monto fijo de $50.00.

## Scripts de Ejecución

```bash
# Desarrollo local
npm run start:dev

# Compilar a JS
npm run build

# Producción
npm run start
```

