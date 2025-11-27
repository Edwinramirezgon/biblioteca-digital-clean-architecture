import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, UserRole, MembershipType } from '../../domain/entities/User';

export class PostgreSQLUserRepository implements IUserRepository {
  // En una implementación real, aquí iría la conexión a PostgreSQL
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(user: User): Promise<User> {
    if (!this.users.has(user.id)) {
      throw new Error('Usuario no encontrado');
    }
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Método para inicializar datos de prueba
  async seedData(): Promise<void> {
    const users = [
      new User('1', 'admin@biblioteca.com', 'Administrador', UserRole.ADMIN, MembershipType.PREMIUM, new Date()),
      new User('2', 'usuario@email.com', 'Juan Pérez', UserRole.READER, MembershipType.FREE, new Date()),
      new User('3', 'premium@email.com', 'María García', UserRole.READER, MembershipType.PREMIUM, new Date())
    ];

    for (const user of users) {
      await this.save(user);
    }
  }
}