import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubInfoService {
  constructor(private http: HttpClient) {}

  async getUserGitHubInfoByName(gitHubName: string) {
    const userData = await firstValueFrom(
      this.http.get(`https://api.github.com/users/${gitHubName}`)
    );
    
    const reposUrl = `https://api.github.com/users/${gitHubName}/repos`;
    const repos = await this.getAllRepos(reposUrl);

    for (const repo of repos) {
      const languagesUrl = `https://api.github.com/repos/${gitHubName}/${repo.name}/languages`;
      const languages = await firstValueFrom(this.http.get(languagesUrl));
      repo.languages = languages;
    }

    return { ...userData, repos };
  }

  async getReposPage(reposUrl: string, page: number) {
    const response = await firstValueFrom(
      this.http.get(`${reposUrl}?page=${page}`)
    );
    return response;
  }

  async getAllRepos(reposUrl: string): Promise<any[]> {
    const allRepos: any[] = [];
    let page = 1;
    let response: any

    do {
      response = await this.getReposPage(reposUrl, page);
      allRepos.push(...response);
      page++;
    } while (response.length > 0);

    return allRepos;
  }
}