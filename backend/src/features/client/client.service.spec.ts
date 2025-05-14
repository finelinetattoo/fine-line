import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ClientService', () => {
  let service: ClientService;
  let mockRepository: Partial<Record<keyof Repository<Client>, jest.Mock>>;

  const mockClient: Client = {
    id: 1,
    name: 'John Doe',
    age: 30,
    createdAt: new Date(),
    tattoos: [],
  };

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      mockRepository.find!.mockResolvedValue([mockClient]);

      const result = await service.findAll();

      expect(result).toEqual([mockClient]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one client by ID', async () => {
      mockRepository.findOneBy!.mockResolvedValue(mockClient);

      const result = await service.findOne(1);

      expect(result).toEqual(mockClient);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if client not found', async () => {
      mockRepository.findOneBy!.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new client', async () => {
      const dto = { name: 'John Doe', age: 30 };
      const createdClient = { id: 1, ...dto, createdAt: new Date() };

      mockRepository.create!.mockReturnValue(createdClient);
      mockRepository.save!.mockResolvedValue(createdClient);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdClient);
      expect(result).toEqual(createdClient);
    });

    it('should throw if repository.create fails', async () => {
      const dto = { name: 'Broken', age: 99 };
      mockRepository.create!.mockImplementation(() => {
        throw new Error('Creation failed');
      });

      await expect(service.create(dto)).rejects.toThrow('Creation failed');
    });
  });

  describe('remove', () => {
    it('should delete a client and return a success message', async () => {
      const id = 1;

      mockRepository.findOneBy!.mockResolvedValue(mockClient);
      mockRepository.delete!.mockResolvedValue({});

      const result = await service.remove(id);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        message: `Client with ID ${id} successfully deleted`,
      });
    });

    it('should throw NotFoundException if client does not exist', async () => {
      mockRepository.findOneBy!.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toThrow(
        new NotFoundException('Client with ID 99 not found'),
      );
    });

    it('should throw if repository.delete fails', async () => {
      mockRepository.findOneBy!.mockResolvedValue(mockClient);
      mockRepository.delete!.mockRejectedValue(new Error('Delete failed'));

      await expect(service.remove(1)).rejects.toThrow('Delete failed');
    });
  });

  describe('update', () => {
    it('should update an existing client and return the updated client', async () => {
      const id = 1;
      const updateDto = { name: 'Updated Name', age: 35 };
      const updatedClient = { ...mockClient, ...updateDto };

      const findOneMock = jest.spyOn(service, 'findOne');
      findOneMock.mockResolvedValue(mockClient);
      mockRepository.save!.mockResolvedValue(updatedClient);

      const result = await service.update(id, updateDto);

      expect(findOneMock).toHaveBeenCalledWith(id);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedClient);
      expect(result).toEqual(updatedClient);
    });

    it('should throw NotFoundException if client to update is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('Client with ID 99 not found'),
        );

      await expect(service.update(99, { name: 'Ghost' })).rejects.toThrow(
        'Client with ID 99 not found',
      );
    });

    it('should throw if save fails during update', async () => {
      const id = 1;
      const updateDto = { name: 'Error Update' };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockClient);
      mockRepository.save!.mockRejectedValue(new Error('Save failed'));

      await expect(service.update(id, updateDto)).rejects.toThrow(
        'Save failed',
      );
    });
  });
});
