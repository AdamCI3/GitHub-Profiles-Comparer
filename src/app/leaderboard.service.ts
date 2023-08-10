import { Injectable } from '@angular/core';
import { GitHubUser } from './profiles-comparer/gitHubUser';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboardData: GitHubUser[] = [];

  constructor() {}

  addUserrToLeaderboard(userData: GitHubUser) {
    const existingUser = this.leaderboardData.find(user => user.login === userData.login);
  
    if (!existingUser) {
      this.leaderboardData.push(userData);
    }
  }
  isInLeaderBoard(userData:GitHubUser)
  {
    const existingUser = this.leaderboardData.find(user => user.login === userData.login);
  
    if (!existingUser) {
      return false
    }
    return true
  }

  getLeaderboardData() {
    return this.leaderboardData;
  }

  deleteFromLeaderBoard(user: GitHubUser) {
   
    const index = this.leaderboardData.indexOf(user);
    
    if (index !== -1) {
      
      this.leaderboardData.splice(index, 1);
    }
    
    
  }
}
