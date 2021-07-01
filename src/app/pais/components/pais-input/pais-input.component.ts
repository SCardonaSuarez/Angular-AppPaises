import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{


  @Output() onEnter: EventEmitter<string> = new EventEmitter()
  @Output() onDebonce: EventEmitter<string> = new EventEmitter()

  @Input() placeholder:string = ''

  debouncer: Subject<string> = new Subject();

  termino: string = ""


  //----------- Tiempo de ejecucion ------------
  
  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor =>{
      // console.log('deboncer:', valor);
      this.onDebonce.emit(valor)
      
    })
  }

  // --------- Buscar------------
  buscar(){
    this.onEnter.emit(this.termino)
  }

  teclapresionada(){

    this.debouncer.next(this.termino)
  }

}



/* 
  !Notas

  ?108. Mandamos el evento onEnter con un @output y creamos EventEmiiter  PERO DE ANGULAR/CORE 

  109. crear un evento event ->

      teclapresionada(event:any){
    const valor = event.target.value

    console.log(valor);

    console.log(this.termino);

    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    dentro del input de html 
                (input)="teclapresionada( $event)"
    
    
  }

  */