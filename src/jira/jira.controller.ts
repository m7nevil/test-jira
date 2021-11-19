import { Controller, Get } from '@nestjs/common';
import { JiraService } from './jira.service';

import Repo = require('git-tools');
import { Octokit, App } from 'octokit';

@Controller('jira')
export class JiraController {
  constructor(private readonly jira: JiraService) {}
  @Get()
  async getHello(): Promise<string> {
    // const issue = await this.jira.getIssue('NEV-1');
    // console.log(issue.id, issue.key);
    //
    // const project = await this.jira.getProject('NEV');
    // console.log(project.id, project.key);
    //
    // const user = await this.jira
    //   .getClient()
    //   .users.getUser({ accountId: '6172a721860f78006be5a883' });
    // console.log(user.accountId, user.self, user.displayName);

    // const com = await this.jira.getClient().projectComponents.createComponent({
    //   isAssigneeTypeValid: false,
    //   name: 'Com1',
    //   description: 'This is a Jira component',
    //   project: 'NEV',
    //   assigneeType: 'PROJECT_LEAD',
    //   leadAccountId: '6172a721860f78006be5a883',
    // });
    // console.log(com.id, com.projectId, com.description);

    // const components: Component[] = await this.jira
    //   .getClient()
    //   .projectComponents.getProjectComponents({ projectIdOrKey: 'NEV' });
    //
    // components.map((com) => {
    //   console.log(com.id, com.name, com.projectId, com.description);
    // });

    // 项目下面的所有组件
    // const components = await this.jira
    //   .getClient()
    //   .projectComponents.getProjectComponents({ projectIdOrKey: 'COM' });
    // components.map((com) => {
    //   console.log(com.id, com.name, com.projectId, com.description);
    // });
    //
    // const count = await this.jira
    //   .getClient()
    //   .projectComponents.getComponentRelatedIssues({ id: '10002' });
    // console.log(count);

    // JQL搜索 issues
    const jql = 'project=COM and component=IC';
    const result = await this.jira
      .getClient()
      .issueSearch.searchForIssuesUsingJql({ jql });

    result.issues.map((i) => {
      console.log(i.key, i.id);
    });

    const key = result.issues[0].key;
    const tranResult = await this.jira
      .getClient()
      .issues.getTransitions({ issueIdOrKey: key });
    console.log(tranResult);
    tranResult.transitions.map((t) => {
      console.log(t);
    });

    // return '123';
    await this.jira
      .getClient()
      .issues.doTransition({
        issueIdOrKey: key,
        transition: tranResult.transitions[1],
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('completed');
    return 'hello world';
  }

  @Get('/test1')
  async test1() {
    const repo = new Repo('./');
    // repo.currentBranch((branch) => {
    //   console.log(branch);
    // });
    repo.authors('main', function (error, authors) {
      console.log(error, authors);
    });
    repo.tags(function (err, data) {
      console.log(err, data);
    });

    return '123';
  }

  @Get('/test')
  async test() {
    const TOKEN = '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';
    const oct = new Octokit({ auth: TOKEN });
    const {
      data: { login: login },
    } = await oct.rest.users.getAuthenticated();
    console.log('hello,', login);

    // const { data: tags } = await oct.rest.repos.listTags({
    //   owner: 'm7nevil',
    //   repo: 'test-jira',
    // });
    // console.log(tags);

    const { data: commits } = await oct.rest.repos.listCommits({
      owner: 'm7nevil',
      repo: 'test-jira',
      per_page: 30,
    });
    console.log(commits);

    // const it = await oct.paginate.iterator(oct.rest.repos.listTags, {
    //   owner: 'm7nevil',
    //   repo: 'test-jira',
    //   per_page: 100,
    // });
    //
    // for await (const { data: tags } of it) {
    //   for (const tag of tags) {
    //     console.log(tag);
    //   }
    // }
  }
}
