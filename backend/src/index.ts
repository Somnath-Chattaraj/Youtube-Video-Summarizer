import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://youtube-video-summarizer-rose-six.vercel.app/",
        "https://yt-video-summarizer.somnathcodes.site/"
      ],
      credentials: true,
    })
  );

// Route: Home
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// @ts-ignore
app.post('/login', async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check for user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Simulate setting user ID in local storage
    res.json({ message: 'Login successful.', userId: user.id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

// @ts-ignore
app.post('/signup', async (req: Request, res: Response) => {
  const {name, email, password }: {name:string; email: string; password: string } = req.body;

  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Create new user
    const user = await prisma.user.create({
      data: { email, password, name },
    });

    // Simulate setting user ID in local storage
    res.json({ message: 'Signup successful.', userId: user.id });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

// @ts-ignore
app.get('/me', async (req: Request, res: Response) => {
    const {id} = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id  }, // Replace with actual logic to identify the user
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred fetching user data.' });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
