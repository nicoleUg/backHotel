# BackHotel API

Backend para gestion de reservas de hotel con NestJS, TypeORM y PostgreSQL (Supabase).

## Tecnologias

- Node.js
- NestJS
- TypeORM
- PostgreSQL (Supabase)
- class-validator y class-transformer

## Requisitos

- Node.js 18+
- npm 9+
- Una base PostgreSQL en Supabase con el esquema de tablas ya creado

## Instalacion

```bash
npm install
```

## Variables de entorno

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Editar `.env` con tus credenciales de Supabase:
```env
DATABASE_URL="postgresql://postgres.USUARIO:CLAVE@aws-X-region.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.USUARIO:CLAVE@aws-X-region.pooler.supabase.com:5432/postgres"
```

Notas:
- **Pooler (6543)**: Para la aplicacion en produccion, mejor rendimiento con conexiones reutilizables.
- **Direct (5432)**: Para migraciones y tareas administrativas.
- Si la clave contiene `@`, `:` o `#`, codificala en URL (e.g., `%40` para `@`).
- **NO** subas `.env` al repositorio; solo `.env.example` con placeholders.

## Scripts

```bash
# Desarrollo
npm run start:dev

# Compilar
npm run build

# Produccion (requiere build previo)
npm run start
```

## Estructura del proyecto

```text
backHotel/
├── src/
│   ├── app.module.ts                    # Módulo raíz con TypeORM y Config
│   ├── main.ts                          # Entry point, valida DTOs con ValidationPipe y CORS
│   └── reservas/
│       ├── Reservas.controller.ts       # Endpoint POST /reservas/cancelar
│       ├── reservas.service.ts          # Lógica de cancelación y cálculo de mora
│       ├── reservas.repository.ts       # Query personalizado a BD
│       ├── reservas.module.ts           # Importa todas las entidades
│       ├── dto/
│       │   └── cancelar_reserva.dto.ts  # DTO con validación (reservaId: int+)
│       └── entities/
│           ├── reserva.entity.ts        # @Entity con relaciones y @Check de estado
│           ├── huesped.entity.ts        # @Entity con @Unique compuesto (tipo + número)
│           ├── habitacion.entity.ts     # @Entity con relación a tipo_habitacion
│           ├── tipo_habitacion.entity.ts# @Entity catálogo de tipos
│           ├── acompanante.entity.ts    # @Entity con ON DELETE CASCADE
│           ├── mora_cancelacion.entity.ts # @Entity con @Unique reserva_id
│           └── contacto_servicio.entity.ts # @Entity catálogo de contactos
├── package.json                         # Scripts: start:dev, build, start
├── package-lock.json                    # Lock de dependencias
├── tsconfig.json                        # Target ES2017, outDir ./dist
├── .env                                 # DATABASE_URL y DIRECT_URL
├── .env.example                         # Plantilla para nuevos devs
├── .gitignore                           # Excluye node_modules, dist, .env, logs
└── README.md                            # Este archivo
```

### Archivos de configuracion clave

- **package.json**: Define scripts de ejecución y dependencias (NestJS, TypeORM, Postgres, validadores).
- **tsconfig.json**: TypeScript apunta a ES2017, genera salida en `./dist`.
- **.env**: Variables sensibles (no se sube a repositorio).
- **.gitignore**: Excluye artifacts y secrets.

### Flujo de la aplicacion

1. **main.ts** inicia NestFactory y habilita ValidationPipe + CORS en puerto 3000.
2. **app.module.ts**:
   - Carga configs globales con ConfigModule.
   - Conecta a PostgreSQL (Supabase) con TypeOrmModule.
   - Importa ReservasModule.
3. **reservas.module.ts**:
   - Registra todas las entidades en TypeORM.
   - Expone controlador y servicio.
4. **Reservas.controller.ts** recibe POST /reservas/cancelar y valida el DTO.
5. **reservas.service.ts** ejecuta logica de negocio:
   - Busca reserva.
   - Calcula dias de anticipacion.
   - Asigna mora si corresponde.
6. **reservas.repository.ts** ejecuta queries personalizadas (buscar, actualizar, guardar mora).
7. Las **entities** definen el mapeo a tablas PostgreSQL con constraints y relaciones.

### Caracteristicas clave implementadas

- ✅ Entidades con `@Unique`, `@Check` y relaciones mapeadas.
- ✅ Repositorio personalizado para logica de datos.
- ✅ DTO con class-validator (IsInt, IsPositive).
- ✅ Validacion global en main.ts (whitelist y forbidNonWhitelisted).
- ✅ CORS habilitado para frontend.
- ✅ Conexion pooled a Supabase con rejectUnauthorized: false.
- ✅ Logica de mora: 50.00 si cancelacion <= 2 dias antes de ingreso.

## Endpoint disponible

### Cancelar reserva

- Metodo: `POST`
- Ruta: `/reservas/cancelar`
- Body JSON:

```json
{
  "reservaId": 123
}
```

### Reglas de negocio actuales

- Si la reserva no existe: retorna error 404.
- Solo se cancelan reservas en estado `Confirmada`.
- Si faltan 2 dias o menos para la fecha de ingreso, aplica mora de `50.00`.
- Cuando aplica mora, se registra en `mora_cancelacion`.

### Ejemplo de respuesta exitosa

```json
{
  "mensaje": "Reserva cancelada correctamente",
  "reservaId": 123,
  "estado": "Cancelada",
  "moraAplicada": true,
  "montoMora": 50
}
```

## Configuracion de base de datos

Este proyecto espera el siguiente esquema en PostgreSQL:

- `tipo_habitacion`
- `habitacion`
- `huesped`
- `reserva`
- `acompanante`
- `mora_cancelacion`
- `contacto_servicio`

La aplicacion esta configurada con `synchronize: false`, por lo que no crea ni modifica tablas automaticamente.

