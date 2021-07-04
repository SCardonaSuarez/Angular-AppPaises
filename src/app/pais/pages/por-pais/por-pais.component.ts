import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [

   `
   li{
     cursor:pointer;
   }
   `
  ]
})
export class PorPaisComponent {

  termino:string = ''
  hayError:boolean = false;
  paises: Country[] = []

  paisesSugeridos : Country[]=[]

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

    this.paisService.buscarPais(termino)
      .subscribe(paises=> this.paisesSugeridos = paises.splice(0,3))
  }



}

/* 
  !Notas
  103. para consumir un api se tiene que subscribir con un arrow function que retorne su argumento

  104. Creamos una respueta de error para que cuando la api no encuentr algo nos retorne un error de 404
*/
