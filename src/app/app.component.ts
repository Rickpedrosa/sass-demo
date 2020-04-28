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
    {
      index: 0,
      header : 'Suggestion Box',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.',
      expanded: true,
      class: 'container-item collapsedLol'
    }, {
      index: 1,
      header : 'Betslip Box',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer eget ornare sapien. Nunc feugiat accumsan ligula, ac venenatis enim. Ut gravida sapien lacinia nisl porta pulvinar. Nunc condimentum hendrerit tortor interdum ultricies. Nam ac molestie leo, luctus lobortis lacus. Sed eu ex vel sem dictum commodo. Praesent tincidunt pellentesque ante eget suscipit. Mauris quis lectus nunc. Aliquam congue in mi ut mattis. Proin tristique accumsan libero, ut dictum nunc auctor quis. Morbi ac tempor purus. Quisque id turpis nec nulla ornare fringilla. Maecenas ultricies facilisis ornare.',
      expanded: false,
      class: 'container-item collapsedLol'
    }, {
      index: 2,
      header : 'Load bet Box',
      name : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. IntegerLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit ante ex, quis molestie mi viverra in. Pellentesque elementum turpis tempus pulvinar vulputate. Integer',
      expanded: false,
      class: 'container-item collapsedLol'
    },
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
