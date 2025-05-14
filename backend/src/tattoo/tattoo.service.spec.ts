import { Test, TestingModule } from '@nestjs/testing';
import { TattooService } from './tattoo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tattoo } from './tattoo.entity';
import { Client } from '../client/client.entity';
import { Artist } from '../artist/artist.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockTattoo = {
  id: 1,
  style: 'Realism',
  size: 'Large',
  price: 200,
  date: new Date(),
  client: { id: 1, name: 'Client 1' },
  artist: { id: 1, name: 'Artist 1' },
};

describe('TattooService', () => {
  let service: TattooService;
  let tattooRepo: Partial<Record<keyof Repository<Tattoo>, jest.Mock>>;
  let clientRepo: Partial<Record<keyof Repository<Client>, jest.Mock>>;
  let artistRepo: Partial<Record<keyof Repository<Artist>, jest.Mock>>;

  beforeEach(async () => {
    tattooRepo = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    clientRepo = {
      findOneBy: jest.fn(),
    };

    artistRepo = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TattooService,
        { provide: getRepositoryToken(Tattoo), useValue: tattooRepo },
        { provide: getRepositoryToken(Client), useValue: clientRepo },
        { provide: getRepositoryToken(Artist), useValue: artistRepo },
      ],
    }).compile();

    service = module.get<TattooService>(TattooService);
  });

  describe('findAll', () => {
    it('should return all tattoos', async () => {
      tattooRepo.find!.mockResolvedValue([mockTattoo]);
      const result = await service.findAll();
      expect(result).toEqual([mockTattoo]);
      expect(tattooRepo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a tattoo by ID', async () => {
      tattooRepo.findOneBy!.mockResolvedValue(mockTattoo);
      const result = await service.findOne(1);
      expect(result).toEqual(mockTattoo);
    });

    it('should throw NotFoundException if tattoo not found', async () => {
      tattooRepo.findOneBy!.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the tattoo', async () => {
      const updateDto = { style: 'Blackwork', artist_id: 1 };
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockTattoo as unknown as Tattoo);
      artistRepo.findOneBy!.mockResolvedValue({ id: 1 });
      tattooRepo.save!.mockResolvedValue({ ...mockTattoo, ...updateDto });

      const result = await service.update(1, updateDto);
      expect(result.style).toBe('Blackwork');
    });
  });

  describe('remove', () => {
    it('should remove a tattoo and return a message', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockTattoo as unknown as Tattoo);
      tattooRepo.delete!.mockResolvedValue({});

      const result = await service.remove(1);
      expect(result).toEqual({
        message: 'Tattoo with ID 1 successfully deleted',
      });
    });
  });
});
