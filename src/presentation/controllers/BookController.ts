import { Request, Response } from 'express';
import { SearchBooksUseCase, SearchCriteria } from '../../application/use-cases/SearchBooksUseCase';
import { BorrowBookUseCase } from '../../application/use-cases/BorrowBookUseCase';
import { ReserveBookUseCase } from '../../application/use-cases/ReserveBookUseCase';

export class BookController {
  constructor(
    private searchBooksUseCase: SearchBooksUseCase,
    private borrowBookUseCase: BorrowBookUseCase,
    private reserveBookUseCase: ReserveBookUseCase
  ) {}

  async searchBooks(req: Request, res: Response): Promise<void> {
    try {
      const criteria: SearchCriteria = {
        title: req.query.title as string,
        author: req.query.author as string,
        format: req.query.format as any,
        availableOnly: req.query.availableOnly === 'true'
      };

      const books = await this.searchBooksUseCase.execute(criteria);
      
      res.json({
        success: true,
        data: books,
        count: books.length
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async borrowBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;
      
      if (!userId || !bookId) {
        res.status(400).json({
          success: false,
          error: 'userId y bookId son requeridos'
        });
        return;
      }

      const loan = await this.borrowBookUseCase.execute(userId, bookId);
      
      res.json({
        success: true,
        data: loan,
        message: 'Libro prestado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async reserveBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;
      
      if (!userId || !bookId) {
        res.status(400).json({
          success: false,
          error: 'userId y bookId son requeridos'
        });
        return;
      }

      const reservation = await this.reserveBookUseCase.execute(userId, bookId);
      
      res.json({
        success: true,
        data: reservation,
        message: 'Libro reservado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}