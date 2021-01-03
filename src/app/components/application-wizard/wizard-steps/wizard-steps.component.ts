import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-steps',
  templateUrl: './wizard-steps.component.html',
  styleUrls: ['./wizard-steps.component.scss']
})
export class WizardStepsComponent implements OnInit {

  @Input() formData;
  title = 'Wizard Three';
  constructor() { }

  ngOnInit() {
  }

}
