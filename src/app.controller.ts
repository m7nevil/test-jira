import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JiraService } from './jira/jira.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jira: JiraService,
  ) {}

  @Get('/hello')
  async getHello(): Promise<string> {
    this.jira.getClient();
    return this.appService.getHello();
  }
}
