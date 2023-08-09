import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: any[] = [];
  // sortedByRepositoriesAsc:boolean = false;
  // sortedByForksAsc:boolean=false;
  // sortedByFollowersAsc:boolean=false;
  // sortedByLanguagesAsc:boolean = false;

  // buttonsIndicator:boolean[]=[false,false,false,false]
  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.leaderboardData = this.leaderboardService.getLeaderboardData();
    console.log(this.leaderboardData);
  }

  sortingOptions = [
    { label: 'Repos ▼', field: 'public_repos', asc: false },
    { label: 'Forks ▼', field: 'forks', asc: false },
    { label: 'Followers ▼', field: 'followers', asc: false },
    { label: 'Languages ▼', field: 'languages', asc: false },
  ];
  buttonsIndicator: boolean[] = [false, false, false, false];

  sortBy(option: any, index: number) {
    const { field, asc } = option;

    if (field === 'languages') {
      this.leaderboardData.sort((a, b) =>
        asc ? a.languages.size - b.languages.size : b.languages.size - a.languages.size
      );
    } else {
      this.leaderboardData.sort((a, b) =>
        asc ? a[field] - b[field] : b[field] - a[field]
      );
    }
    if (asc) {
      option.label = option.label.substring(0, option.label.length - 1) + '▲';
    } else {
      option.label = option.label.substring(0, option.label.length - 1) + '▼';
    }
    option.asc = !asc;

    this.setButtons(index);
  }

  setButtons(numOfButton: number) {
    this.buttonsIndicator = this.buttonsIndicator.map(
      (_, i) => i === numOfButton
    );
  }
}
