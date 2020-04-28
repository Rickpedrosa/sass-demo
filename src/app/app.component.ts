import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
// @ts-ignore
import {TeamByCategoryResponse} from './interfaces/teamByCategoryResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sass-demo';
  clubs = [];
  betsDemoArray = [
    // {
    //   index: 0,
    //   header: 'Suggestion Box',
    //   name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in.',
    //   expanded: false,
    //   class: 'container-item collapsedLol'
    // }, {
    //   index: 1,
    //   header: 'Betslip Box',
    //   name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in.',
    //   expanded: false,
    //   class: 'container-item collapsedLol'
    // },
  ];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/teams/golden', {
      params: new HttpParams().append('page', '0')
    }).subscribe(
      (response: TeamByCategoryResponse) => {
        this.clubs = response.content;
        console.log(response.content);
      },
      error => {
        console.error(error);
      },
      () => {
      });
  }
}
