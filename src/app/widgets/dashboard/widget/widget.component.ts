import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  public dataFetched: Boolean = true;
  @Input() public type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
