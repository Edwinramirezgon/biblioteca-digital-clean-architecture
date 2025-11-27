import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { Book, BookFormat } from '../../domain/entities/Book';

export interface SearchCriteria {
  title?: string;
  author?: string;
  format?: BookFormat;
  availableOnly?: boolean;
}

export class SearchBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(criteria: SearchCriteria): Promise<Book[]> {
    let books: Book[] = [];

    // Si no hay criterios, devolver libros disponibles
    if (!criteria.title && !criteria.author && !criteria.format) {
      books = criteria.availableOnly 
        ? await this.bookRepository.findAvailableBooks()
        : await this.bookRepository.findAll();
    } else {
      // Búsqueda por título
      if (criteria.title) {
        books = await this.bookRepository.searchByTitle(criteria.title);
      }
      
      // Búsqueda por autor
      if (criteria.author) {
        const authorBooks = await this.bookRepository.searchByAuthor(criteria.author);
        books = criteria.title 
          ? books.filter(book => authorBooks.some(ab => ab.id === book.id))
          : authorBooks;
      }

      // Filtrar por formato
      if (criteria.format) {
        books = books.filter(book => book.format === criteria.format);
      }

      // Filtrar solo disponibles
      if (criteria.availableOnly) {
        books = books.filter(book => book.isAvailable());
      }
    }

    return books.sort((a, b) => a.title.localeCompare(b.title));
  }
}