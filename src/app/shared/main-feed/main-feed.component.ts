import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {

  constructor() { }

  // testFolder = './tests/';
  // fs = require('fs');

  ngOnInit(): void {
    // this.fs.readdir(this.testFolder, (err, files) => {
    //   files.forEach(file => {
    //     console.log(file);
    //   });
    // });
  }

}
