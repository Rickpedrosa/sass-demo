import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TeamByCategoryResponseInterface} from './interfaces/teamByCategoryResponse.interface';
import {emptyTeam, TeamInterface, SELECTED_INITIAL} from './interfaces/team.interface';
import {PlayerWithPositionInterface} from './interfaces/playerWithPosition.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clubs: TeamInterface[] = [];
  currentPlayers: PlayerWithPositionInterface[] = [];
  INITIAL = SELECTED_INITIAL;

  selectedPlayer: PlayerWithPositionInterface = null;
  cachedClubs: TeamInterface[] = [];
  selectedClub: TeamInterface = emptyTeam();
  cachedPlayers: PlayerWithPositionInterface[] = [];
  betsDemoArray = [
    // {
    //   index: 0,
    //   header: 'Suggestion Box',
    //   name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in.',
    //   expanded: false,
    //   class: 'container-item collapsedLol'
    // }, {
    //   index: 1,
    //   header: 'LoadBet Box',
    //   name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in.',
    //   expanded: false,
    //   class: 'container-item collapsedLol'
    // },
  ];


  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/teams/golden', {
      params: new HttpParams().append('page', '0')
    }).subscribe(
      (response: TeamByCategoryResponseInterface) => {
        this.clubs = response.content;
        console.log(response);
      },
      error => {
        console.error(error);
      },
      () => {
      });
  }

  getClubImage(clubIndex: number) {
    return this.clubs[clubIndex].logox4 === null ? 'https://via.placeholder.com/120' : this.clubs[clubIndex].logox4;
  }

  getClubPlayersOnClick(club: string, event) {
    console.log('evento', event);
    if (this.cachedClubs.findIndex((team) => team.teamName === club) === -1) {
      this.http.get(`http://localhost:8080/players/club/${club}`).subscribe(
        (response: PlayerWithPositionInterface[]) => {
          this.selectedClub = this.clubs.find((team) => team.teamName === club);
          this.currentPlayers = response;
          this.cachedClubs.push(this.selectedClub);
          this.currentPlayers.forEach((player) => this.cachedPlayers.push(player));
          console.log(response);
        },
        error => {
          console.error(error);
        },
        () => {
        });
    } else {
      if (club === this.selectedClub.teamName) {
        setTimeout(() => {
          this.selectedClub = emptyTeam();
        }, 200);
      } else {
        this.selectedClub = this.cachedClubs.find((team) => team.teamName === club);
        this.currentPlayers = this.cachedPlayers.filter((value) => value.club === club);
        console.log('from cache!');
      }
    }
  }
}
