import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  json: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/car/get', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .subscribe((data: any) => {
        this.json = JSON.stringify(data, undefined, 2)
      }, error => {
          if (error) {
            this.json = 'Problem occured!';
          }
        });
  }

}
