export interface IHabitacionCaracteristicas {
  capacidadBase: number;
  precioReferencial: number;
}

const CAPACIDAD_SIMPLE = 1;
const PRECIO_SIMPLE = 50.00;
const CAPACIDAD_SUITE = 2;
const PRECIO_SUITE = 150.00;
const CAPACIDAD_DOBLE_MAT = 2;
const PRECIO_DOBLE_MAT = 90.00;
const CAPACIDAD_DOBLE_IND = 2;
const PRECIO_DOBLE_IND = 80.00;
//refactor code smell para la clase habitacion ya declarando que es cada cosa
class HabitacionSimple implements IHabitacionCaracteristicas {
  capacidadBase = CAPACIDAD_SIMPLE;
  precioReferencial = PRECIO_SIMPLE;
}

class HabitacionSuite implements IHabitacionCaracteristicas {
  capacidadBase = CAPACIDAD_SUITE;
  precioReferencial = PRECIO_SUITE;
}

class HabitacionDobleMatrimonial implements IHabitacionCaracteristicas {
  capacidadBase = CAPACIDAD_DOBLE_MAT;
  precioReferencial = PRECIO_DOBLE_MAT;
}

class HabitacionDobleIndividuales implements IHabitacionCaracteristicas {
  capacidadBase = CAPACIDAD_DOBLE_IND;
  precioReferencial = PRECIO_DOBLE_IND;
}

export class HabitacionFactory {
  static obtenerCaracteristicas(tipoNombre: string): IHabitacionCaracteristicas {
    switch (tipoNombre) {
      case 'Simple': return new HabitacionSimple();
      case 'Suite': return new HabitacionSuite();
      case 'Doble matrimonial': return new HabitacionDobleMatrimonial();
      case 'Doble con camas individuales': return new HabitacionDobleIndividuales();
      default: throw new Error('Tipo de habitación no válido según el catálogo.');
    }
  }
}