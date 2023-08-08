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
    const repos = await firstValueFrom(
      this.http.get(`https://api.github.com/users/${gitHubName}/repos`)
    )
    return {...userData,repos}
  }

  
}
