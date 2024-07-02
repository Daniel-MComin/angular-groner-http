import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Curso } from '../curso';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.css'
})
export class CursosFormComponent {

    form: FormGroup;
    submitted: boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      private service: CursosService,
      private modal: AlertModalService,
      private router: Router,
      private route: ActivatedRoute
    ){}

    ngOnInit(){
      this.route.params
      .pipe(map((params:any)=>
        params['id']),
      switchMap(id => this.service.loadById(id))
    ).subscribe( curso => this.updateForm(curso));
        
      

      this.form = this.formBuilder.group({
        id: [null],
        nome: [ null , [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
      })
    }

    onSubmit(){
      console.log(this.form.value);
      this.submitted = true;
      if(this.form.valid){
       this.service.create(this.form.value).subscribe({
        next: () =>{ this.modal.showAlertSuccess("Criado com sucesso"); this.router.navigate(['/']); },
        error: () => this.modal.showAlertDanger("Falha ao cadastrar"),
        complete: () => console.log('request completo')
       })
      }
    }

    updateForm(curso:any){
      this.form.patchValue(curso);
    }

    onCancel(){
      this.submitted = false;
      this.form.reset()
    }

    hasError(campo: string){
      return {
        'is-invalid' : this.form.get(campo)?.errors && this.submitted
      }
       
    }
}
