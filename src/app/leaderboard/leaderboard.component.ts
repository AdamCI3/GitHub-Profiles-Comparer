import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: any[] = [];
  sortedByRepositoriesAsc:boolean = false;
  sortedByForksAsc:boolean=false;
  sortedByFollowersAsc:boolean=false;
  sortedByLanguagesAsc:boolean = false;
  repoSort:string = "Repos ▼"
  forkSort:string="Forks ▼"
  followersSort:string="Followers ▼"
  languagesSort:string="Languages ▼"
  buttonsIndicator:boolean[]=[false,false,false,false]
  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.leaderboardData = this.leaderboardService.getLeaderboardData();
    console.log(this.leaderboardData);
  }
 
  sortByRepositories()
  {
    if(this.sortedByRepositoriesAsc)
    {
      this.leaderboardData.sort((a,b)=>a.public_repos-b.public_repos)
      this.sortedByRepositoriesAsc=!this.sortedByRepositoriesAsc
      this.repoSort="Repos ▼"
      this.setButtons(0)
      return 
    }
    this.leaderboardData.sort((a,b)=>b.public_repos-a.public_repos)
    this.sortedByRepositoriesAsc=!this.sortedByRepositoriesAsc
    this.repoSort="Repos ▲"
    this.setButtons(0)
    
  }
  sortByForks()
  {
    if(this.sortedByForksAsc)
    {
      this.leaderboardData.sort((a,b)=>a.forks-b.forks)
      this.sortedByForksAsc=!this.sortedByForksAsc
      this.forkSort ="Forks ▼"
      this.setButtons(1)
      return
    }
    this.leaderboardData.sort((a,b)=>b.forks-a.forks)
    this.sortedByForksAsc=!this.sortedByForksAsc
    this.forkSort="Forks ▲"
    this.setButtons(1)
    
  }
  sortByFollowers()
  {
    if(this.sortedByFollowersAsc)
    {
      this.leaderboardData.sort((a,b) => a.followers-b.followers)
      this.sortedByFollowersAsc=!this.sortedByFollowersAsc
      this.followersSort = "Followers ▼"
      this.setButtons(2)
      return
    }
    this.leaderboardData.sort((a,b) => b.followers-a.followers)
    this.sortedByFollowersAsc=!this.sortedByFollowersAsc
    this.followersSort = "Followers ▲"
    this.setButtons(2)
  }

  sortByLanguages()
  {
    if(this.sortedByLanguagesAsc)
    {
      this.leaderboardData.sort((a,b) => a.languages.size -b.languages.size)
      this.sortedByLanguagesAsc=!this.sortedByLanguagesAsc
      this.languagesSort="Languages ▼"
      this.setButtons(3)
      return 
    }
    this.leaderboardData.sort((a,b) => b.languages.size-a.languages.size)
    this.sortedByLanguagesAsc=!this.sortedByLanguagesAsc
    this.languagesSort = "Languages ▲"
    this.setButtons(3)
   
  }

  setButtons(numOfButton:number)
  {
   for( let i=0;i<this.buttonsIndicator.length; i++)
   {
    if(i==numOfButton)
    {
      this.buttonsIndicator[i]=true
      continue
    }
    this.buttonsIndicator[i]=false
   }
  }
}
