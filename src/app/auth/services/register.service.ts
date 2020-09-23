import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegisterService {
  public form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    }, {
      validator: []
    }
    );
  }

  get f(): any {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
