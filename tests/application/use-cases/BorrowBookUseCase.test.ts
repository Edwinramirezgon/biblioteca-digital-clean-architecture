import { BorrowBookUseCase } from '../../../src/application/use-cases/BorrowBookUseCase';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository';
import { IBookRepository } from '../../../src/domain/repositories/IBookRepository';
import { ILoanRepository } from '../../../src/domain/repositories/ILoanRepository';
import { User, UserRole, MembershipType } from '../../../src/domain/entities/User';
import { Book, BookFormat, BookStatus } from '../../../src/domain/entities/Book';

describe('BorrowBookUseCase', () => {
  let useCase: BorrowBookUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockBookRepository: jest.Mocked<IBookRepository>;
  let mockLoanRepository: jest.Mocked<ILoanRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    mockBookRepository = {
      findById: jest.fn(),
      findByIsbn: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      searchByTitle: jest.fn(),
      searchByAuthor: jest.fn(),
      findByFormat: jest.fn(),
      findAvailableBooks: jest.fn(),
    };

    mockLoanRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByUserId: jest.fn(),
      findByBookId: jest.fn(),
      findByStatus: jest.fn(),
      findOverdueLoans: jest.fn(),
      findActiveLoansByUser: jest.fn(),
    };

    useCase = new BorrowBookUseCase(
      mockUserRepository,
      mockBookRepository,
      mockLoanRepository
    );
  });

  it('should successfully borrow an available book', async () => {
    // Arrange
    const user = new User('1', 'user@test.com', 'Test User', UserRole.READER, MembershipType.FREE, new Date());
    const book = new Book('1', 'Test Book', 'Author', 'ISBN', BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2);

    mockUserRepository.findById.mockResolvedValue(user);
    mockBookRepository.findById.mockResolvedValue(book);
    mockLoanRepository.findActiveLoansByUser.mockResolvedValue([]);
    mockLoanRepository.save.mockImplementation(loan => Promise.resolve(loan));
    mockBookRepository.update.mockImplementation(book => Promise.resolve(book));

    // Act
    const result = await useCase.execute('1', '1');

    // Assert
    expect(result).toBeDefined();
    expect(result.userId).toBe('1');
    expect(result.bookId).toBe('1');
    expect(mockLoanRepository.save).toHaveBeenCalled();
  });

  it('should throw error when user not found', async () => {
    // Arrange
    mockUserRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute('1', '1')).rejects.toThrow('Usuario no encontrado');
  });

  it('should throw error when book not available', async () => {
    // Arrange
    const user = new User('1', 'user@test.com', 'Test User', UserRole.READER, MembershipType.FREE, new Date());
    const book = new Book('1', 'Test Book', 'Author', 'ISBN', BookFormat.PHYSICAL, BookStatus.BORROWED, 3, 0);

    mockUserRepository.findById.mockResolvedValue(user);
    mockBookRepository.findById.mockResolvedValue(book);

    // Act & Assert
    await expect(useCase.execute('1', '1')).rejects.toThrow('Libro no disponible');
  });
});