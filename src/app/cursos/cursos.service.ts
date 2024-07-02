import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { delay, take, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  public readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

    list(){
      return this.http.get<Curso>(this.API)
      .pipe(delay(2000),
      tap(console.log))
    } 

    loadById(id:any){
      return this.http.get(`${this.API}/${id}`).pipe(take(1));
    }

    create(curso:string){
     return this.http.post<Curso>(this.API, curso).pipe(take(1))
    }
}
