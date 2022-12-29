import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-smallwidget',
  templateUrl: './smallwidget.component.html',
  styleUrls: ['./smallwidget.component.css']
})
export class SmallwidgetComponent implements OnInit {
  @Input() public type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
