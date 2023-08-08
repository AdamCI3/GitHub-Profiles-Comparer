import { Component } from '@angular/core';
import { GitHubInfoService } from '../git-hub-info.service';
import { GitHubUser } from './gitHubUser';

@Component({
  selector: 'app-profiles-comparer',
  templateUrl: './profiles-comparer.component.html',
  styleUrls: ['./profiles-comparer.component.css'],
})
export class ProfilesComparerComponent {
  anyUserCreated: boolean = false;
  gitHubName1ProvidedByUser: string = '';
  gitHubName2ProvidedByUser: string = '';
  user1DataFromService: any;
  user2DataFromService: any;
  user1CreatedFromGitHubInfoService: GitHubUser | undefined;
  user2CreatedFromGitHubInfoService: GitHubUser | undefined;
  user1LanguageUsage: { language: string; count: number }[] = [];
  user2LanguageUsage: { language: string; count: number }[] = [];

  constructor(private gitHubInfoService: GitHubInfoService) {}

  async firstUser() {
    this.user1DataFromService =
      await this.gitHubInfoService.getUserGitHubInfoByName(
        this.gitHubName1ProvidedByUser
      );
    this.user1CreatedFromGitHubInfoService = {
      login: this.user1DataFromService.login,
      avatar_url: this.user1DataFromService.avatar_url,
      public_repos: this.user1DataFromService.public_repos,
      public_gists: this.user1DataFromService.public_gists,
      followers: this.user1DataFromService.followers,
      repos: this.user1DataFromService.repos,
      languages: this.calculateLanguageUsage(this.user1DataFromService.repos),
    };
    this.user1LanguageUsage = this.convertMapToArray(
      this.user1CreatedFromGitHubInfoService.languages
    );
    this.anyUserCreated = true;
  }
  async secondUser() {
    this.user2DataFromService =
      await this.gitHubInfoService.getUserGitHubInfoByName(
        this.gitHubName2ProvidedByUser
      );
    this.user2CreatedFromGitHubInfoService = {
      login: this.user2DataFromService.login,
      avatar_url: this.user2DataFromService.avatar_url,
      public_repos: this.user2DataFromService.public_repos,
      public_gists: this.user2DataFromService.public_gists,
      followers: this.user2DataFromService.followers,
      repos: this.user2DataFromService.repos,
      languages: this.calculateLanguageUsage(this.user2DataFromService.repos),
    };
    this.user2LanguageUsage = this.convertMapToArray(
      this.user2CreatedFromGitHubInfoService.languages
    );
    this.anyUserCreated = true;
  }
  compare() {}

  private calculateLanguageUsage(repos: any[]): Map<string, number> {
    const languageMap: Map<string, number> = new Map();
    for (const repo of repos) {
      const language = repo.language;
      if (language) {
        if (languageMap.has(language)) {
          languageMap.set(language, languageMap.get(language)! + 1);
        } else {
          languageMap.set(language, 1);
        }
      }
    }
    return languageMap;
  }
  private convertMapToArray(
    languageMap: Map<string, number>
  ): { language: string; count: number }[] {
    return Array.from(languageMap.entries()).map(([language, count]) => ({
      language,
      count,
    }));
  }
}
