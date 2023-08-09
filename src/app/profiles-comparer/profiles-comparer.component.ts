import { Component } from '@angular/core';
import { GitHubInfoService } from '../git-hub-info.service';
import { GitHubUser } from './gitHubUser';
import { Repo } from './repo';
import { Router } from '@angular/router';
import { LeaderboardService } from '../leaderboard.service';

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
  user1LanguageUsage: { language: string; count: string }[] = [];
  user2LanguageUsage: { language: string; count: string }[] = [];
  winner: string = '';

  constructor(
    private gitHubInfoService: GitHubInfoService,
    private leaderboardService: LeaderboardService
  ) {}

  async getUserData(userIndex: number) {
    this.winner = '';
    const gitHubName =
      userIndex === 1
        ? this.gitHubName1ProvidedByUser
        : this.gitHubName2ProvidedByUser;
    const userDataFromService: any =
      await this.gitHubInfoService.getUserGitHubInfoByName(gitHubName);

    const userCreatedFromGitHubInfoService: GitHubUser = {
      login: userDataFromService.login,
      avatar_url: userDataFromService.avatar_url,
      public_repos: userDataFromService.public_repos,
      forks: this.calculateForks(userDataFromService.repos),
      followers: userDataFromService.followers,
      repos: userDataFromService.repos,
      languages: this.calculateLanguageUsage(userDataFromService.repos),
  
    };
    console.log(userDataFromService.repos);
    const userLanguageUsage = this.convertCountToPercentage(
      this.convertMapToArray(userCreatedFromGitHubInfoService.languages).sort(
        (a, b) => b.count - a.count
      )
    );

    if (userIndex === 1) {
      this.user1DataFromService = userDataFromService;
      this.user1CreatedFromGitHubInfoService = userCreatedFromGitHubInfoService;
      this.user1LanguageUsage = userLanguageUsage;
    } else {
      this.user2DataFromService = userDataFromService;
      this.user2CreatedFromGitHubInfoService = userCreatedFromGitHubInfoService;
      this.user2LanguageUsage = userLanguageUsage;
    }
    console.log(userCreatedFromGitHubInfoService.repos);
    this.anyUserCreated = true;
  }

  addToLeaderboard(user: GitHubUser) {
    this.leaderboardService.addUserrToLeaderboard(user);
  }

  private calculateForks(repos: Repo[]): number {
    let result = 0;
    console.log(repos);
    if (Array.isArray(repos)) {
      repos.forEach((repo) => {
        result += repo.forks_count;
      });
    }

    return result;
  }

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
  private convertCountToPercentage(
    languagesWithoutPercentage: { language: string; count: number }[]
  ): { language: string; count: string }[] {
    let languagesWithPercentage: { language: string; count: string }[] = [];
    let amountOfUsage = 0;
    languagesWithoutPercentage.forEach(
      (languageOfLanguagesWithoutPercentage) => {
        amountOfUsage += languageOfLanguagesWithoutPercentage.count;
      }
    );
    languagesWithoutPercentage.forEach(
      (languageOfLanguagesWithoutPercentage) => {
        let precentage =
          languageOfLanguagesWithoutPercentage.count / amountOfUsage;
        languagesWithPercentage.push({
          language: languageOfLanguagesWithoutPercentage.language,
          count: precentage.toFixed(2),
        });
      }
    );
    return languagesWithPercentage;
  }

  compare() {
    let user1Score = 0;
    let user2Score = 0;

    console.log(this.user1CreatedFromGitHubInfoService);
    console.log(this.user2CreatedFromGitHubInfoService);
    if (
      this.user1CreatedFromGitHubInfoService?.public_repos >
      this.user2CreatedFromGitHubInfoService?.public_repos
    ) {
      user1Score++;
    } else if (
      this.user2CreatedFromGitHubInfoService?.public_repos >
      this.user1CreatedFromGitHubInfoService?.public_repos
    ) {
      user2Score++;
    }
    console.log(user1Score);
    console.log(user2Score);
    if (
      this.user1CreatedFromGitHubInfoService?.forks >
      this.user2CreatedFromGitHubInfoService?.forks
    ) {
      user1Score++;
    } else if (
      this.user2CreatedFromGitHubInfoService?.forks >
      this.user1CreatedFromGitHubInfoService?.forks
    ) {
      user2Score++;
    }
    console.log(user1Score);
    console.log(user2Score);
    if (
      this.user1CreatedFromGitHubInfoService?.followers >
      this.user2CreatedFromGitHubInfoService?.followers
    ) {
      user1Score++;
    } else if (
      this.user2CreatedFromGitHubInfoService?.followers >
      this.user1CreatedFromGitHubInfoService?.followers
    ) {
      user2Score++;
    }
    console.log(user1Score);
    console.log(user2Score);
    if (this.user1LanguageUsage.length > this.user2LanguageUsage.length) {
      user1Score++;
    } else if (
      this.user2LanguageUsage.length > this.user1LanguageUsage.length
    ) {
      user2Score++;
    }
    console.log(user1Score);
    console.log(user2Score);
    if (user1Score > user2Score) {
      this.winner = this.user1CreatedFromGitHubInfoService?.login;
    } else if (user2Score > user1Score) {
      this.winner = this.user2CreatedFromGitHubInfoService?.login;
    } else {
      this.winner = 'DRAW';
    }

    console.log(user1Score);
    console.log(user2Score);
  }
}
