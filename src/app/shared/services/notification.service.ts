import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /* #region  constructor */
 constructor() { }
 /* #endregion */

 fireErrorNotification(message: string): void {
  Swal.fire({
    icon: 'error',
    title: 'Upsss...',
    text: message,
    customClass: {
      confirmButton: "d-flex btn-primary"
    },
    confirmButtonText:
     'U redu',
     showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
     heightAuto: false
  })
 }

 fireSuccessMessage(message: string): void {
  Swal.fire({
    icon: 'success',
    title: 'Uspjeh',
    text: message,
    showConfirmButton: true,
    customClass: {
      confirmButton: "d-flex btn-primary"
    },
    confirmButtonText:
     ' U redu',
     showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
     heightAuto: false
  });
 }

 fireWarningMessage(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Pažnja',
      text: message,
      customClass: {
      confirmButton: "d-flex btn-primary"
      },
      confirmButtonText:
      ' U redu',
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      heightAuto: false
    });
 }

}
