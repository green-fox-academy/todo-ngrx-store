import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() errorMessage: string;
  imgSrc = 'https://i.ytimg.com/vi/3XcGpCw1w5k/maxresdefault.jpg';
}
