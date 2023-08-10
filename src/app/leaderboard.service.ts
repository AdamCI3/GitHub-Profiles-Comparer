import { Injectable } from '@angular/core';
import { GitHubUser } from './profiles-comparer/gitHubUser';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboardData: GitHubUser[] = [];

  constructor() {}

  addUserrToLeaderboard(userData: GitHubUser) {
    if (!this.leaderboardData.includes(userData)) {
      this.leaderboardData.push(userData);
    }
  }

  getLeaderboardData() {
    return this.leaderboardData;
  }

  deleteFromLeaderBoard(user: GitHubUser) {
   
    const index = this.leaderboardData.indexOf(user);
    
    if (index !== -1) {
      
      this.leaderboardData.splice(index, 1);
    }
    
    console.log(this.leaderboardData);
  }
}
