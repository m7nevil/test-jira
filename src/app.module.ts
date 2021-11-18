import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitService } from './git/git.service';
import { JiraModule } from './jira/jira.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { TaskService } from './task/task.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JiraModule,
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      // envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GitService],
})
export class AppModule {}
