import { Book, BookFormat, BookStatus } from '../../../src/domain/entities/Book';

describe('Book Entity', () => {
  describe('isAvailable', () => {
    it('should return true when book is available and has copies', () => {
      const book = new Book(
        '1', 'Clean Architecture', 'Robert C. Martin', '978-0134494166',
        BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2
      );
      expect(book.isAvailable()).toBe(true);
    });

    it('should return false when book has no available copies', () => {
      const book = new Book(
        '1', 'Title', 'Author', 'ISBN', BookFormat.PHYSICAL,
        BookStatus.AVAILABLE, 3, 0
      );
      expect(book.isAvailable()).toBe(false);
    });
  });

  describe('requiresPremium', () => {
    it('should return true for new digital books', () => {
      const recentDate = new Date();
      recentDate.setMonth(recentDate.getMonth() - 6);
      
      const book = new Book(
        '1', 'Title', 'Author', 'ISBN', BookFormat.DIGITAL,
        BookStatus.AVAILABLE, 1, 1, 'url', recentDate
      );
      
      expect(book.requiresPremium()).toBe(true);
    });

    it('should return false for physical books', () => {
      const book = new Book(
        '1', 'Title', 'Author', 'ISBN', BookFormat.PHYSICAL,
        BookStatus.AVAILABLE, 3, 2
      );
      expect(book.requiresPremium()).toBe(false);
    });
  });
});