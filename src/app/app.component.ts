import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TeamByCategoryResponseInterface} from './interfaces/teamByCategoryResponse.interface';
import {emptyTeam, SELECTED_INITIAL, TeamInterface} from './interfaces/team.interface';
import {emptyPlayer, PlayerWithPositionInterface} from './interfaces/playerWithPosition.interface';
import {WebSocketAPI} from './interfaces/WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clubs: TeamInterface[] = [];
  currentPlayers: PlayerWithPositionInterface[] = [];
  INITIAL = SELECTED_INITIAL;

  selectedPlayer: PlayerWithPositionInterface = emptyPlayer();
  cachedClubs: TeamInterface[] = [];
  selectedClub: TeamInterface = emptyTeam();
  cachedPlayers: PlayerWithPositionInterface[] = [];
  webSocket: WebSocketAPI = new WebSocketAPI();

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
    this.webSocket._connect();
  }

  getClubImage(clubIndex: number) {
    return this.clubs[clubIndex].logox4 === null ? 'https://via.placeholder.com/120' : this.clubs[clubIndex].logox4;
  }

  getClubImageForPlayer() {
    const playerClubIndex = this.clubs.findIndex((team) => team.teamName === this.selectedPlayer.club);
    return playerClubIndex !== -1 ? this.getClubImage(playerClubIndex) : 'https://via.placeholder.com/120';
  }

  getClubPlayersOnClick(club: string) {
    if (this.cachedClubs.findIndex((team) => team.teamName === club) === -1) {
      this.http.get(`http://localhost:8080/players/club/${club}`).subscribe(
        (response: PlayerWithPositionInterface[]) => {
          this.selectedClub = this.clubs.find((team) => team.teamName === club);
          this.currentPlayers = response;
          this.storeDataInCache();
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
        this.displayDataFromCache(club);
      }
    }
  }

  private storeDataInCache() {
    this.cachedClubs.push(this.selectedClub);
    this.currentPlayers.forEach((player) => this.cachedPlayers.push(player));
  }

  private displayDataFromCache(club: string) {
    this.selectedClub = this.cachedClubs.find((team) => team.teamName === club);
    this.currentPlayers = this.cachedPlayers.filter((value) => value.club === club);
  }

  selectPlayer(player: PlayerWithPositionInterface) {
    if (this.selectedPlayer === player) {
      this.selectedPlayer = emptyPlayer();
    } else {
      this.selectedPlayer = player;
    }
  }
}
