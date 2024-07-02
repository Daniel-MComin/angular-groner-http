import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, Subject, catchError, of } from 'rxjs';
import { AlertModalService } from '../../shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css', preserveWhitespaces: true
})
export class CursosListaComponent {

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private actRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        this.handleError() // envia o valor true para todos os subscribers do Observable error$
        return of()
      })
    );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde!')
  }

  onEdit(id:number){
    this.router.navigate(['editar', id], { relativeTo: this.actRoute})
  }

}
