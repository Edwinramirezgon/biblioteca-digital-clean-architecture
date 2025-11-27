export interface DigitalBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  downloadUrl: string;
  format: 'pdf' | 'epub' | 'mobi';
  fileSize: number;
}

export interface IDigitalContentProvider {
  getBookContent(bookId: string): Promise<DigitalBook | null>;
  validateBookAccess(bookId: string, userId: string): Promise<boolean>;
  generateDownloadLink(bookId: string, userId: string): Promise<string>;
  syncBookCatalog(): Promise<DigitalBook[]>;
}