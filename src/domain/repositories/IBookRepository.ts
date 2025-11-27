import { Book, BookFormat } from '../entities/Book';

export interface IBookRepository {
  findById(id: string): Promise<Book | null>;
  findByIsbn(isbn: string): Promise<Book | null>;
  save(book: Book): Promise<Book>;
  update(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Book[]>;
  searchByTitle(title: string): Promise<Book[]>;
  searchByAuthor(author: string): Promise<Book[]>;
  findByFormat(format: BookFormat): Promise<Book[]>;
  findAvailableBooks(): Promise<Book[]>;
}