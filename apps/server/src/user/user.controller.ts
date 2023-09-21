import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('track/:itemId')
  async trackItem(
    @Request() req,
    @Res() res: Response,
    @Param('itemId') itemId: string
  ): Promise<Response> {
    const userId = req.user.sub;
    await this.userService.trackItem(userId, itemId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Item tracked successfully.' });
  }

  @UseGuards(AuthGuard)
  @Delete('untrack/:itemId')
  async untrackItem(
    @Request() req,
    @Res() res: Response,
    @Param('itemId') itemId: string
  ): Promise<Response> {
    const userId = req.user.sub; // załóżmy, że sub przechowuje ID użytkownika
    await this.userService.untrackItem(userId, itemId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Item untracked successfully.' });
  }
}
