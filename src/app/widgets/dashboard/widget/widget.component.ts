import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { About } from 'src/app/models/dashboard.models';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input() public aboutFetched: BehaviorSubject<Boolean>;
  @Input() public type: string;
  @Input() public about: About;

  constructor() { }

  ngOnInit(): void {
  }

}
