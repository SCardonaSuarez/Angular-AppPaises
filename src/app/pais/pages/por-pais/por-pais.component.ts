import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino:string = ''
  hayError:boolean = false;
  paises: Country[] = []

  placeHolder = "text"

  constructor(private paisService:PaisService) { 
    
  }

  // *BUSCAR

  buscar(termino:string){
    this.hayError = false
    this.termino = termino

    this.paisService.buscarPais(this.termino).subscribe((paises) => {
      
      console.log(paises);
      this.paises = paises
      
    }, (err)=>{
      this.hayError = true
      this.paises = []
    })
    
  }

  // *SUGERENCIAS

  sugerencias(termino:string){
    this.hayError = false

    //TODO: crear Sugerencias
  }



}

/* 
  !Notas
  103. para consumir un api se tiene que subscribir con un arrow function que retorne su argumento

  104. Creamos una respueta de error para que cuando la api no encuentr algo nos retorne un error de 404
*/
