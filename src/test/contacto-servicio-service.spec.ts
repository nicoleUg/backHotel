import { ContactoServicioService } from '../services/contacto_servicio.service';
import { Repository } from 'typeorm';
import { ContactoServicio } from '../entities/contacto_servicio.entity';

describe('ContactoServicioService', () => {
  let service: ContactoServicioService;
  let repositoryMock: jest.Mocked<Repository<ContactoServicio>>;

  beforeEach(() => {
    repositoryMock = {
      find: jest.fn(),
    } as any;

    service = new ContactoServicioService(repositoryMock);
  });

  it('debe retornar todos los contactos de servicio en el directorio', async () => {
    const mockContactos: ContactoServicio[] = [
      {
        id: 1,
        nombreServicio: 'Limpieza',
        encargado: 'Ana Gómez',
        telefono: '71234567',
      },
      {
        id: 2,
        nombreServicio: 'Mantenimiento',
        encargado: 'Pedro Rojas',
        telefono: '72345678',
      },
    ];

    repositoryMock.find.mockResolvedValue(mockContactos);

    const result = await service.findAll();

    expect(result).toEqual(mockContactos);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });
});
