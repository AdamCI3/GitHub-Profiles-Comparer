# GitHub Profile Comparer Domain Model


##  Profiles Comparer

The ProfilesComparerComponent  serves as a tool to compare GitHub user profiles based on certain attributes. It utilizes the GitHubInfoService to retrieve GitHub user data, and interacts with the LeaderboardService to potentially add users to a leaderboard.

```text
anyUserCreated: boolean: A boolean flag indicating whether any GitHub user data has been fetched and created.
```

```text
gitHubName1ProvidedByUser: string and gitHubName2ProvidedByUser: string: Strings that hold the GitHub usernames provided by the user for comparison.
```

```text
user1DataFromService: any and user2DataFromService: any: Objects holding raw user data fetched from the GitHub API for the two selected users.
```

```text
user1CreatedFromGitHubInfoService: GitHubUser | undefined and user2CreatedFromGitHubInfoService: GitHubUser | undefined: Instances of GitHubUser model representing the user profiles fetched from GitHub.
```

```text
user1LanguageUsage: { language: string; count: string }[] and user2LanguageUsage: { language: string; count: string }[]: Arrays containing language usage data for the two users, where each element contains the language name and its corresponding usage count.
```

```text
winner: string: A string indicating the winner of the comparison based on certain criteria.
```

```text
getUserData(userIndex: number): A method for fetching and processing GitHub user data based on the provided user index (1 or 2). It populates the corresponding user data properties and calculates language usage.
```

```text
addToLeaderboard(user: GitHubUser): A method to add a specific GitHubUser to the leaderboard using the LeaderboardService.
```

```text
calculateForks(repos: Repo[]): number: A private method that calculates the total number of forks for a user's repositories.
```

```text
calculateLanguageUsage(repos: any[]): Map<string, number>: A private method that calculates the usage count of different programming languages among a user's repositories.
```

```text
convertMapToArray(languageMap: Map<string, number>): { language: string; count: number }[]: A private method that converts a language usage Map to an array of objects containing language and count.
```

```text
convertCountToPercentage(languagesWithoutPercentage: { language: string; count: number }[]): { language: string; count: string }[]: A private method that converts language counts to percentages based on total usage.
```

```text
compare(): A method that performs a comparison between the two users' profiles, calculating scores based on criteria such as repositories, forks, followers, and language usage. It determines and displays the winner of the comparison.
```

## GitHub User

The GitHubUser interface defines the structure of a GitHub user's profile, encompassing various attributes that provide insights into the user's activity and contributions on the platform.

Properties

```text
login: any: Represents the GitHub username of the user.
```

```text
avatar_url: any: Denotes the URL of the user's avatar image.
```

```text
public_repos: any: Represents the count of public repositories owned by the user.
```

```text
forks: any: Represents the total count of forks across all the user's repositories.
```

```text
repos: any: Holds information about the user's repositories, reflecting their contributions and projects.
```

```text
followers: any: Denotes the count of followers, representing other GitHub users who track the activities of the user.
```

```text
languages: Map<string, number>: A Map containing the programming languages used by the user across their repositories, along with the corresponding count indicating language usage.
```

## GitHub Profiles Comparer App

The AppComponent serves as the root component for the Angular GitHub Profiles Comparer application, providing the foundational structure and logic for displaying and toggling between different views.

```text
title: string: Holds the title of the application, which is used for display purposes.
```

```text
logopath: string: Represents the path to the application's logo image file. The logo is displayed in the UI to enhance the visual representation of the app.
```

```text
showComparer: boolean: A boolean flag that controls the visibility of the profiles comparer view. When true, the comparer view is displayed; when false, the leaderboard view is displayed.
```

```text
toggleView(): A method responsible for toggling the visibility of the profiles comparer and leaderboard views. When called, it inverses the value of showComparer, causing the view to switch between the two.
```

```text
buttonName(): A method used to dynamically determine the label displayed on the toggle button. Depending on the current value of showComparer, the method returns either 'Leaderboard' or 'Comparer'.
```

## Domain Model: GitHub Information Service

The GitHubInfoService is an Angular service responsible for interacting with the GitHub API to retrieve user and repository information using an access token.

```text
accessToken: string: Represents the GitHub access token used for authentication when making requests to the GitHub API.
```

```text
getHeaders(): A private method that constructs and returns an HttpHeaders object with the necessary authorization headers containing the access token.
```

```text
getUserGitHubInfoByName(gitHubName: string): An asynchronous method that retrieves comprehensive user information from the GitHub API based on the provided GitHub username. It makes a GET request to https://api.github.com/users/${gitHubName} using the http service, along with the constructed headers.
```

```text
getReposPage(reposUrl: string, page: number): An asynchronous method that fetches a specific page of repositories for a given user from the GitHub API. It constructs a GET request to the specified reposUrl with the provided page number.
```

```text
getAllRepos(reposUrl: string): An asynchronous method that retrieves all repositories for a given user by iteratively fetching pages of repositories. It makes use of getReposPage() to fetch each page and aggregates the results until there are no more repositories to fetch.
```

## Domain Model: Leaderboard Service

The LeaderboardService is an Angular service responsible for managing and maintaining a leaderboard of GitHub user profiles.

```text
leaderboardData: GitHubUser[]: An array that holds GitHub user profiles, representing the data for the leaderboard.
```

```text
addUserrToLeaderboard(userData: GitHubUser): A method for adding a GitHub user profile to the leaderboard. It checks if the user profile is not already included in the leaderboardData array before adding it.
```

```text
getLeaderboardData(): A method that retrieves the current data of the leaderboard. It returns the leaderboardData array containing GitHub user profiles.
```

```text
deleteFromLeaderBoard(user: GitHubUser): A method for deleting a GitHub user profile from the leaderboard. It finds the index of the specified user in the leaderboardData array and removes it using the splice method.
```

## Leaderboard

The LeaderboardComponent serves as a leaderboard for GitHub users, organized according to specific criteria. The component interacts with the LeaderboardService to retrieve and manage the data pertinent to the leaderboard. Additionally, it leverages the GitHubUser model to portray user profiles acquired from GitHub.

```text
leaderboardData: any[]: An array that holds GitHub user data for populating the leaderboard. Each array element corresponds to a user's profile information.
```

```text
sortingOptions: object[]: An array containing sorting alternatives available for the leaderboard. Each option is encapsulated within an object and embodies properties like label (the display name), field (the sorting attribute), and asc (a boolean representing ascending or descending order).
```

```text
buttonsIndicator: boolean[]: An array of boolean values used to track the active sorting option buttons. Each element corresponds to a sorting option, with true indicating selection.
```

```text
ngOnInit(): A lifecycle method for initializing the component upon creation. It retrieves the leaderboard data from LeaderboardService.
```

```text
sortBy(option: any, index: number): A method responsible for sorting the leaderboardData array based on the chosen sorting option. Sorting is carried out according to the specified field and the desired ascending or descending order (asc). The method also updates the sorting option's label and button indicator.
```

```text
setButtons(numOfButton: number): A method used to update the buttonsIndicator array, highlighting the presently active sorting option button. It accepts an argument numOfButton, which denotes the index of the active button.
```

```text
deleteFromLeaderboard(user: GitHubUser): A method that interacts with the LeaderboardService to remove a specified GitHubUser from the leaderboard.
```
