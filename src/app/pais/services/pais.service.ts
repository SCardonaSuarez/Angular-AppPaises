import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais-interface';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2'

  get httpParams(){
    return new HttpParams()
    .set('fields', '=name;capital;alpha2Code;flag;population')
  }


  constructor(private http: HttpClient) { }

  //------- BUSCAR PAIS ---------------

  buscarPais(termino: string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams})
  }

  //------- BUSCAR CAPITAL -------------

  buscarCapital(termino:string):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams})
  }


  getPaisPorAlpha(id:string):Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country>(url)
  }

  buscarRegion(region:string):Observable<Country[]>{

    const url =`${this.apiUrl}/region/${region}`
    return this.http.get<Country[]>(url, {params: this.httpParams})
                  .pipe(
                    tap(console.log)
                  )

  }



}




/* 
  !Notas
  103. Para hacer peticiones HTTP se puede usar el FECH o HTTPComun
  103. Mandamos a llamar HttpClientModule en app.module.ts a nivel global
  103. Inyectamos HttpClient en el costructor
  103. Creamos una const url = `${this.apiUrl}/name/${termino}`

  104. agregamos el  import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais-interface';
  104 Retornamos un array vacido con 8:00 con un pipe
  *Rxjs
    buscarPais(termino: string):Observable<any>{
    
    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get(url)
          .pipe(
            catchError(err => of([]))
          )
  }

  y la otra forma que esta en el por-pais.components.ts: 

   (err)=>{
      this.hayError = true
    })
  *tipar un get
  105. Se creo un interface de Country y se importo a service y tipe con un generico <> el get con .get<Country[]> tambien lo agrege al principio del metodo pero no era necesario(:Observable<Country[]>).
 
  

  122. Optimizar las peticiones de Http, importamos httpParams y tap

*/
