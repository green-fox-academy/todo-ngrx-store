import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { getError } from 'src/app/store/selectors/todo.selectors';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  errorMessage$: Observable<string>;
  imgSrc = 'https://i.ytimg.com/vi/3XcGpCw1w5k/maxresdefault.jpg';

  constructor(private store: Store<AppState>) {
    this.errorMessage$ = this.store.select(getError);
  }
}
