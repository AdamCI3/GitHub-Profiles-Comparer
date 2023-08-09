import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubInfoService {
  private accessToken = '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';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getUserGitHubInfoByName(gitHubName: string) {
    const userData = await firstValueFrom(
      this.http.get(`https://api.github.com/users/${gitHubName}`, {
        headers: this.getHeaders(),
      })
    );

    const reposUrl = `https://api.github.com/users/${gitHubName}/repos`;
    const repos = await this.getAllRepos(reposUrl);

    for (const repo of repos) {
      console.log(repo)
      const languagesUrl = `https://api.github.com/repos/${gitHubName}/${repo.name}/languages`;
      const languages = await firstValueFrom(this.http.get(languagesUrl, {
        headers: this.getHeaders(),
      }));
      repo.languages = languages;
    }

    return { ...userData, repos };
  }

  async getReposPage(reposUrl: string, page: number) {
    const response = await firstValueFrom(
      this.http.get(`${reposUrl}?page=${page}`, {
        headers: this.getHeaders(),
      })
    );
    return response;
  }

  async getAllRepos(reposUrl: string): Promise<any[]> {
    const allRepos: any[] = [];
    let page = 1;
  
    while (true) {
      const response: any = await this.getReposPage(reposUrl, page);
      
      if (response && response.length === 0) {
        break;
      }
      
      allRepos.push(...response);
      page++;
    }
  
    return allRepos;
  }
  
  
  
}