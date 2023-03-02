import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string   = 'BuVZKHhGXpHeWzlBLsrfWcZQoURB237G';
  private servicioUrl: string   = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
  
  public resultados: Gif[] = []; 

  get historial() {
     return [...this._historial];
  }

  constructor(private http: HttpClient) {
    
    //this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    }
 
   //this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse( localStorage.getItem('resultados')!);
    }
  }

  buscarGifs(query: string = '') {

    //Guardar todo en minusculas
    query = query.trim().toLocaleLowerCase();

    //Controlamos en guardar vacios en la busqueda
    if(query.trim().length === 0){
      return;
    }

    //Evitamos guardar duplicados con este consicional
    if(!this._historial.includes(query)){

      //Guardamos la busqueda en el historial
      this._historial.unshift(query);

      //Controlamos mantener en el historial 10 busquedas
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                   .set('api_key', this.apiKey)
                   .set('limit', 10)
                   .set('q', query);

    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }) 
  }
};
