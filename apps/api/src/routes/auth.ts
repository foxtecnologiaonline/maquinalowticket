import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query, queryOne } from '../services/database';
import { authMiddleware, AuthRequest } from '../middlewares/auth';
import { isValidEmail } from '@maquinalowticket/utils';
import { SignUpInput, SignInInput } from '@maquinalowticket/shared-types';

const router = Router();

const TOKEN_EXPIRES_IN = '7d';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

/**
 * Reads JWT_SECRET at call time, not at module load. `dotenv.config()` runs
 * in index.ts *after* its router imports are evaluated (import hoisting),
 * so a module-level `const JWT_SECRET = process.env.JWT_SECRET || 'secret'`
 * here would capture the 'secret' fallback and never match what
 * middlewares/auth.ts verifies against once the real env is loaded.
 */
function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'secret';
}

function issueTokens(user: { id: string; email: string; role: string }) {
  const secret = getJwtSecret();
  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secret, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId: user.id, type: 'refresh' }, secret, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return { token, refreshToken };
}

function sanitizeUser(user: Record<string, any>) {
  const { password_hash: _passwordHash, ...rest } = user;
  return rest;
}

/**
 * POST /api/auth/signup
 * Creates the first/only kind of account this factory supports today: an
 * 'owner'. There is no invite/multi-tenant flow yet — every signup is an owner.
 */
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body as SignUpInput;

    if (!email || !isValidEmail(email)) {
      res.status(400).json({ error: 'Valid email is required' });
      return;
    }
    if (!name || name.trim().length < 2) {
      res.status(400).json({ error: 'Name must be at least 2 characters' });
      return;
    }
    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);

    await query(
      `INSERT INTO users (id, email, name, password_hash, role, active)
       VALUES ($1, $2, $3, $4, 'owner', true)`,
      [id, normalizedEmail, name.trim(), passwordHash]
    );

    const user = await queryOne('SELECT * FROM users WHERE id = $1', [id]);
    const { token, refreshToken } = issueTokens(user);

    res.status(201).json({
      success: true,
      data: { user: sanitizeUser(user), token, refreshToken },
    });
  } catch (error: any) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: error.message || 'Failed to sign up' });
  }
});

/**
 * POST /api/auth/signin
 */
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignInInput;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await queryOne('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (!user || !user.active) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const { token, refreshToken } = issueTokens(user);

    res.json({
      success: true,
      data: { user: sanitizeUser(user), token, refreshToken },
    });
  } catch (error: any) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: error.message || 'Failed to sign in' });
  }
});

/**
 * GET /api/auth/me
 * Convenience endpoint to verify a token and inspect the current session.
 */
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await queryOne('SELECT * FROM users WHERE id = $1', [req.userId]);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (error: any) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch user' });
  }
});

export default router;
