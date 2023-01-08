import { Component, Input, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { SingleContainer } from 'src/app/models/singlecontainer.model';

@Component({
  selector: 'app-smallwidget',
  templateUrl: './smallwidget.component.html',
  styleUrls: ['./smallwidget.component.css']
})
export class SmallwidgetComponent implements OnInit {
  @Input() public type: string;
  @Input() public container: SingleContainer;
  @Input() public dataFetched: BehaviorSubject<Boolean>;

  private date_distance: string;

  constructor() { }

  ngOnInit(): void {
    /* this.dataFetched.subscribe( data => {
      if (data == true){
        this.container.state.restart_policy = this.container.state.restart_policy.charAt(0).toUpperCase() + this.container.state.restart_policy.slice(1);
      }
    }) */

    /* let date = new Date(this.container.state.since);
    this.date_distance = formatDistance(date, new Date(), {addSuffix: true}) */
  }

}
