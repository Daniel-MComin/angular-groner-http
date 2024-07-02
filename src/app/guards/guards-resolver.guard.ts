import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Curso } from '../cursos/curso';
import { inject } from '@angular/core';
import { CursosService } from '../cursos/cursos.service';

export const guardsResolverGuard: ResolveFn<Curso> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(CursosService);
  const router = inject(Router);
};
