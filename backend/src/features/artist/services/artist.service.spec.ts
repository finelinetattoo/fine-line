import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Artist } from '../entity/artist.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ArtistService', () => {
  let service: ArtistService;
  let mockRepository: Partial<Record<keyof Repository<Artist>, jest.Mock>>;

  const mockArtist: Artist = {
    id: 1,
    name: 'Jane Ink',
    bio: 'Tattoo artist specialized in realism and blackwork.',
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
        ArtistService,
        {
          provide: getRepositoryToken(Artist),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
  });

  describe('findAll', () => {
    it('should return all artists', async () => {
      mockRepository.find!.mockResolvedValue([mockArtist]);

      const result = await service.findAll();

      expect(result).toEqual([mockArtist]);
    });
  });

  describe('findOne', () => {
    it('should return artist by ID', async () => {
      mockRepository.findOneBy!.mockResolvedValue(mockArtist);

      const result = await service.findOne(1);

      expect(result).toEqual(mockArtist);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if artist does not exist', async () => {
      mockRepository.findOneBy!.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(
        new NotFoundException('Artist with ID 99 not found'),
      );
    });
  });

  describe('create', () => {
    it('should create and return a new artist', async () => {
      const dto = { name: 'Jane Ink', bio: 'Specialized in linework' };

      mockRepository.create!.mockReturnValue(mockArtist);
      mockRepository.save!.mockResolvedValue(mockArtist);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockArtist);
      expect(result).toEqual(mockArtist);
    });

    it('should throw BadRequestException if save fails', async () => {
      mockRepository.create!.mockImplementation(() => {
        throw new Error('DB error');
      });

      await expect(
        service.create({ name: 'Fail Artist', bio: 'Error' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update an artist and return the updated entity', async () => {
      const updateDto = { bio: 'Updated bio' };
      const updated = { ...mockArtist, ...updateDto };

      const findOneMock = jest.fn().mockResolvedValue(mockArtist);
      (service.findOne as unknown) = findOneMock;

      mockRepository.save!.mockResolvedValue(updated);

      const result = await service.update(1, updateDto);

      expect(findOneMock).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toHaveBeenCalledWith(updated);
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should delete an artist and return confirmation message', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockArtist);
      mockRepository.delete!.mockResolvedValue({});

      const result = await service.remove(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: 'Artist with ID 1 successfully deleted',
      });
    });

    it('should throw NotFoundException if artist does not exist', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('Artist with ID 99 not found'),
        );

      await expect(service.remove(99)).rejects.toThrow(
        'Artist with ID 99 not found',
      );
    });
  });
});
