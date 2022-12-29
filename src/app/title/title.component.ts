import { Component, OnInit } from '@angular/core';
import { NavtitleService } from '../services/navtitle.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
    public title: String = "Dashboard";

    constructor(private titleService: NavtitleService) {
    }

    ngOnInit(): void {
        this.titleService.title.subscribe(title => {
            this.title = title;
        })
    }

}
