export enum UserRole {
  READER = 'reader',
  ADMIN = 'admin'
}

export enum MembershipType {
  FREE = 'free',
  PREMIUM = 'premium'
}

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRole,
    public readonly membershipType: MembershipType,
    public readonly createdAt: Date,
    public readonly isActive: boolean = true
  ) {}

  isPremium(): boolean {
    return this.membershipType === MembershipType.PREMIUM;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  canBorrowBooks(): boolean {
    return this.isActive;
  }
}