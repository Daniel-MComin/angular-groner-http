import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(mensagem:string, type:string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.mensagem = mensagem;
  }

  showAlertDanger(mensagem:string){
   this.showAlert(mensagem, 'danger')
  }

  showAlertSuccess(mensagem:string){
    this.showAlert(mensagem, 'success')
  }
  
}
