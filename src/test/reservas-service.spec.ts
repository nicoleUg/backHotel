import { ReservasService } from '../services/reservas.service';
import { BadRequestException } from '@nestjs/common';
import { ReservasRepository } from '../repositories/reservas.repository';

describe('ReservasService', () => {
  let reservasService: ReservasService;
let reservasRepositoryMock: Partial<Record<keyof ReservasRepository, jest.Mock>>;

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
    };

    reservasService = new ReservasService(reservasRepositoryMock as unknown as ReservasRepository);
  });
  it('debe lanzar BadRequestException si la fecha de salida es anterior a la fecha de ingreso', async () => {
    const dto = {
      titularId: 1,
      habitacionId: 101,
      fechaReservaInicio: '2026-06-15T14:00:00Z',
      fechaReservaSalida: '2026-06-10T10:00:00Z', // Salida anterior al ingreso
      cantidadPersonas: 2
    };
await expect(reservasService.crearReserva(dto as any)).rejects.toThrow(
  new BadRequestException('La fecha de salida debe ser estrictamente posterior a la fecha de ingreso.')
);
  });


  describe('cancelarConMora', () => {
    it('debe aplicar mora de 50 si se cancela con 2 días o menos de anticipación', async () => {
      // Arrange: Configuramos con un dia de antelacion
      const fechaManana = new Date();
      fechaManana.setDate(fechaManana.getDate() + 1);

      const reservaMock = {
        id: 1,
        estado: 'Confirmada',
        fechaReservaInicio: fechaManana.toISOString(),
      };

      reservasRepositoryMock.buscarReservaPorId!.mockResolvedValue(reservaMock);
      reservasRepositoryMock.actualizarEstadoReserva!.mockResolvedValue(undefined);
      reservasRepositoryMock.guardarMora!.mockResolvedValue(undefined);
      // Act: metodo que se refactorizo
      const resultado = await reservasService.cancelarConMora(1);

      // Assert: Verificamos la reserva se cancelo y se aplicó la mora correctamente
      expect(resultado.estado).toBe('Cancelada');
      expect(resultado.moraAplicada).toBe(true);
      expect(resultado.montoMora).toBe(50.00);
      expect(reservasRepositoryMock.guardarMora).toHaveBeenCalledWith(
        1,
        50.00,
        expect.any(Date)
      );
    });
  });
});
