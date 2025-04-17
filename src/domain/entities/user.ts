export class User {
    constructor(
      public readonly id: string,
      public username: string,
      public email: string,
      public passwordHash: string,
      public role: 'admin' | 'manager' | 'editor' | 'user',
      public avatarUrl: string,
      public congregationId?: string,
      public createdAt?: Date
    ) {}
  }