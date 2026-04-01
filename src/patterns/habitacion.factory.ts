export interface IHabitacionCaracteristicas {
  capacidadBase: number;
  precioReferencial: number;
}

class HabitacionSimple implements IHabitacionCaracteristicas {
  capacidadBase = 1;
  precioReferencial = 50.00;
}

class HabitacionSuite implements IHabitacionCaracteristicas {
  capacidadBase = 2;
  precioReferencial = 150.00;
}

class HabitacionDobleMatrimonial implements IHabitacionCaracteristicas {
  capacidadBase = 2;
  precioReferencial = 90.00;
}

class HabitacionDobleIndividuales implements IHabitacionCaracteristicas {
  capacidadBase = 2;
  precioReferencial = 80.00;
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