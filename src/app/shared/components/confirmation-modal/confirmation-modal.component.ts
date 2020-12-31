import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  /* #region  Variables */
  @Input() title!: string;
  @Input() description!: string;
  @Input() isDelete!: string;
  /* #endregion */

  /* #region  Constructor */
  constructor(public modal: NgbActiveModal) {}
  /* #endregion */

 /* #region  Methods */
  ngOnInit(): void {  }
 /* #endregion */
}
