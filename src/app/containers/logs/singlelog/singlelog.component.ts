import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-singlelog',
  templateUrl: './singlelog.component.html',
  styleUrls: ['./singlelog.component.css']
})
export class SinglelogComponent implements OnInit {
  @Input() when: string = '';
  @Input() type: string = '';
  @Input() data: string = '';

  constructor() { 
  }

  ngOnInit(): void {
  }

}
