import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { ScheduleService } from './schedule/schedule.service';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('update-ikea-products')
  @HttpCode(HttpStatus.OK)
  async updateIkeaProducts() {
    await this.scheduleService.handleCronAt5PM();

    return {
      message: 'Discounted items update has been scheduled.',
    };
  }
}
