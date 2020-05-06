import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [];

  public ngOnInit(): void {
    for (let index = 0; index < 6; index++) {
      this.images[index] = `../../assets/slide/${index + 1}.jpg`;
    }
  }
}
