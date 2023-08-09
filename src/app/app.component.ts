import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-github-profiles-comparer';
  logopath = '../assets/Black-Github-Logo-PNG-Photo.png';
  showComparer = true;
  toggleView() {
    this.showComparer = !this.showComparer;
  }
  buttonName() {
    if (this.showComparer) {
      return 'Leaderboard';
    }
    return 'Comparer';
  }
}
