import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
})
export class FormBuilderComponent {
  @Input() fields: readonly {
    label: string;
    type: 'text' | 'email' | 'textarea';
    name: string;
  }[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  formGroup = this.fb.group({});

  ngOnInit() {
    for (const field of this.fields) {
      const validators = [];

      if (field.type === 'text' || field.type === 'textarea') {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(Validators.required, Validators.email);
      }

      this.formGroup.addControl(field.name, this.fb.control('', validators));
    }
  }

  submitForm() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.formGroup.value);
  }
}
