import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]),
    findOne: jest.fn((id: number) => ({ id, name: 'John Doe', email: 'john@example.com' })),
    update: jest.fn((id: number, dto: UpdateUserDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { name: 'John Doe', email: 'john@example.com' };
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Jane Doe', email: 'jane@example.com' };
    const result = await controller.update('1', dto);
    expect(result).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
