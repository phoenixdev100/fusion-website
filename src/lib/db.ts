import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface UserResponse {
  success: boolean;
  error?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export async function createUser(username: string, email: string, password: string): Promise<UserResponse> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return {
        success: false,
        error: 'User with this email or username already exists'
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: 'Failed to create user'
    };
  }
}

export async function validateUser(username: string, password: string): Promise<UserResponse> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username },
          { username: username }
        ]
      }
    });

    if (!user) {
      return {
        success: false,
        error: 'Invalid username/email or password'
      };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return {
        success: false,
        error: 'Invalid username/email or password'
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Error validating user:', error);
    return {
      success: false,
      error: 'Failed to validate user'
    };
  }
}

export async function getUserStats(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      success: false,
      error: 'Failed to fetch user stats'
    };
  }
} 