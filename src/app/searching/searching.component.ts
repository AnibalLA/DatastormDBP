import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SearchingComponent {
  keyword: string = '';
  noticias: any[] = [];

  constructor(private http: HttpClient) {}

  buscar() {
    const url = `https://app-38bd8802-6852-491d-a0f9-794881613c9b.cleverapps.io/api/noticias?keyword=${encodeURIComponent(this.keyword)}`;
    this.http.get<any[]>(url).subscribe(data => {
      this.noticias = data;
    });
  }
}