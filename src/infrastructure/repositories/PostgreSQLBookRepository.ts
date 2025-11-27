import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { Book, BookFormat, BookStatus } from '../../domain/entities/Book';

export class PostgreSQLBookRepository implements IBookRepository {
  private books: Map<string, Book> = new Map();

  async findById(id: string): Promise<Book | null> {
    return this.books.get(id) || null;
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    for (const book of this.books.values()) {
      if (book.isbn === isbn) {
        return book;
      }
    }
    return null;
  }

  async save(book: Book): Promise<Book> {
    this.books.set(book.id, book);
    return book;
  }

  async update(book: Book): Promise<Book> {
    if (!this.books.has(book.id)) {
      throw new Error('Libro no encontrado');
    }
    this.books.set(book.id, book);
    return book;
  }

  async delete(id: string): Promise<void> {
    this.books.delete(id);
  }

  async findAll(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async searchByTitle(title: string): Promise<Book[]> {
    const books = Array.from(this.books.values());
    return books.filter(book => 
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  async searchByAuthor(author: string): Promise<Book[]> {
    const books = Array.from(this.books.values());
    return books.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  async findByFormat(format: BookFormat): Promise<Book[]> {
    const books = Array.from(this.books.values());
    return books.filter(book => book.format === format);
  }

  async findAvailableBooks(): Promise<Book[]> {
    const books = Array.from(this.books.values());
    return books.filter(book => book.isAvailable());
  }

  // Método para inicializar datos de prueba
  async seedData(): Promise<void> {
    const books = [
      new Book('1', 'Clean Architecture', 'Robert C. Martin', '978-0134494166', BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2, undefined, new Date('2017-09-20'), 'Tecnología'),
      new Book('2', 'Domain-Driven Design', 'Eric Evans', '978-0321125217', BookFormat.DIGITAL, BookStatus.AVAILABLE, 1, 1, 'https://example.com/ddd.pdf', new Date('2003-08-30'), 'Tecnología'),
      new Book('3', 'El Quijote', 'Miguel de Cervantes', '978-8424116859', BookFormat.PHYSICAL, BookStatus.AVAILABLE, 5, 5, undefined, new Date('1605-01-16'), 'Literatura'),
      new Book('4', 'Cien años de soledad', 'Gabriel García Márquez', '978-0307474728', BookFormat.DIGITAL, BookStatus.AVAILABLE, 1, 1, 'https://example.com/cien-anos.epub', new Date('1967-06-05'), 'Literatura')
    ];

    for (const book of books) {
      await this.save(book);
    }
  }
}