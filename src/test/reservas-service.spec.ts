import { ReservasService } from '../services/reservas.service';
import { BadRequestException } from '@nestjs/common';
import { ReservasRepository } from '../repositories/reservas.repository';

describe('ReservasService', () => {
  let reservasService: ReservasService;
  let reservasRepositoryMock: jest.Mocked<ReservasRepository>;

  beforeEach(() => {
    reservasRepositoryMock = {
      obtenerTodas: jest.fn(),
      buscarHabitacion: jest.fn(),
      existeSolapamiento: jest.fn(),
      crear: jest.fn(),
      buscarReservaPorId: jest.fn(),
      registrarCheckIn: jest.fn(),
      actualizarEstadoReserva: jest.fn(),
      guardarMora: jest.fn(),
    } as any;

    reservasService = new ReservasService(reservasRepositoryMock);
  });

  it('debe lanzar BadRequestException si la fecha de salida es anterior a la fecha de ingreso', async () => {
    const dto = {
      titularId: 1,
      habitacionId: 101,
      fechaReservaInicio: '2026-06-15T14:00:00Z',
      fechaReservaSalida: '2026-06-10T10:00:00Z', // Salida anterior al ingreso
      cantidadPersonas: 2
    };

    await expect(reservasService.crearReserva(dto)).rejects.toThrow(BadRequestException);
    await expect(reservasService.crearReserva(dto)).rejects.toThrow('La fecha de salida debe ser estrictamente posterior a la fecha de ingreso.');
  });
});
