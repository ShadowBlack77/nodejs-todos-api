import { Request, Response } from "express"; 
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import redisClient from "../lib/redis.lib";

export class AuthController {

  public async signUp(req: Request, res: Response): Promise<any> {
    try {
      const { username, email, password } = req.body;

      const userExist = await User.findOne({ email });
  
      if (userExist) {
        return res.status(500).json({ content: 'User with this email or username already exists' });
      }

      await User.create({ username, email, password });

      return res.status(201).json({ content: 'account created successfully' });
    } catch (error: any) {
      console.log(`Error occured while user trying sign up: ${error}`);
      
      return res.status(500).json({ content: error.message });
    }
  }

  public async signIn(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({ email });

      if (user && (await user.comparePassword(password))) {
        const { accessToken, refreshToken } = this.generateTokens(user._id);

        await this.storedRefreshToken(user._id, refreshToken);

        this.setCookies(res, accessToken, refreshToken);

        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        });
      } else {
        res.status(401).json({ content: 'invalid credentials' });
      }
    } catch(error: any) {
      console.log(`Error occured while user trying sign in: ${error}`);

      return res.status(500).json({ content: error.message });
    }
  }

  public async singOut(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies['node-todos-rt'];

      if (refreshToken) {
        const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        await redisClient.del(`refresh_token${decoded.userId}`);
      }

      res.clearCookie("node-todos-at");
      res.clearCookie("node-todos-rt");

      return res.status(200).json({ content: 'logouted' });
    } catch (error: any) {
      res.status(500).json({ content: error.message });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies['node-todos-rt'];

      if (!refreshToken) {
        return res.status(401).json({ content: "No refresh token provided" });
      }

      const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
      const storedToken = await redisClient.get(`refresh_token:${decoded.userId}`);

      if (storedToken !== refreshToken) {
        return res.status(401).json({ content: "Invalid refresh token" });
      }

      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });

      res.cookie("node-todos-at", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
  
      res.json({ content: "Token refreshed successfully" });
    } catch (error: any) {
      res.status(500).json({ content: error.message });
    }
  }

  public async getProfile(req: Request | any, res: Response): Promise<any> {
    try {
      const user = req.user;

      return res.status(200).json({ user });
    } catch (error: any) {
      res.status(500).json({ content: error.message });
    }
  }

  public async checkValidity(req: Request, res: Response): Promise<any> {
    try {
      return res.status(200).json({ content: true });
    } catch (error: any) {
      res.status(500).json({ content: error.message });
    }
  }

  private generateTokens(userId: any) {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '15m'
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: '7d'
    });

    return { accessToken, refreshToken };
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('node-todos-at', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('node-todos-rt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }

  private async storedRefreshToken(userId: any, refreshToken: string) {
    await redisClient.set(`refresh_token:${userId}`, refreshToken, {
      EX: 7 * 24 * 60 * 60
    });
  }
}