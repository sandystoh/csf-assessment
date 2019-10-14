import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
      return { ageRange: true };
  }
  return null;
}

function ageRangeValidator2(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {  // control:FormControl
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
          return { ageRange: true };
      }
      return null;
  };
}

function ageValidator(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const age = moment().diff(control.value, 'years');
    console.log('age', age);
    return age < min ? {ageValidation: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  countries = ['', 'USA', 'Germany', 'Italy', 'France'];
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private router: Router) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  get f() { return this.contactForm.controls; }

  createFormGroup() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#\$])(?=.{8,})/;
    const contactPattern = /^[0-9\+\-\)\(]*$/;

    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(passwordPattern)]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required, ageValidator(18)]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.pattern(contactPattern)])
    });
  }

  reset() {
    this.contactForm.reset();
    this.router.navigate(['/add'], { fragment: 'main' });
  }

  onSubmit() {

  }

}
