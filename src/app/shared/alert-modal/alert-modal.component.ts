import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {

 @Input() mensagem: string;
 @Input() type: string = 'success';

  constructor(public bsModalRef: BsModalRef){}

  onClose(){
    this.bsModalRef.hide();
  }
}
