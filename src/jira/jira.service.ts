import { Injectable } from '@nestjs/common';
import { Version2Client } from 'jira.js';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JiraService {
  private client: Version2Client;

  constructor(private env: ConfigService) {}
  getClient(): Version2Client {
    if (isEmpty(this.client)) {
      this.client = new Version2Client({
        host: process.env.JIRA_HOST,
        authentication: {
          basic: {
            email: process.env.JIRA_USER,
            apiToken: process.env.JIRA_API_TOKEN,
          },
        },
      });
    }
    return this.client;
  }

  getIssue(key: string) {
    return this.getClient().issues.getIssue({ issueIdOrKey: key });
  }

  getProject(key: string) {
    return this.getClient().projects.getProject({ projectIdOrKey: key });
  }

  doTransition(key: string) {
    return this.getClient().issues.doTransition({ issueIdOrKey: key });
  }
}
