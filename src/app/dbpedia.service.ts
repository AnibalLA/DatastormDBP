import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbpediaService {

  private endpoint = 'https://dbpedia.org/sparql';

  constructor(private http: HttpClient) {}

  getExoplanetInfo(): Observable<any> {
    const query = `
      SELECT ?label ?abstract WHERE {
        dbr:Exoplanet rdfs:label ?label ;
                      dbo:abstract ?abstract .
        FILTER (lang(?label) = 'es' && lang(?abstract) = 'es')
      } LIMIT 1
    `;

    const params = new HttpParams()
      .set('query', query)
      .set('format', 'application/sparql-results+json');

    const headers = new HttpHeaders({ 'Accept': 'application/sparql-results+json' });

    return this.http.get(this.endpoint, { headers, params });
  }
}
