import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-canvas]',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @Input() public name: String;
  @Input() public id: String;
  @Input() public state: String;
  @Input() public image: String;
  @Input() public port: [];

  constructor() { }

  ngOnInit(): void {
  }

}
