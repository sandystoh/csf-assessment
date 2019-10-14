import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CountryService, ICountry } from '../services/country.service';

function ageValidator(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const age = moment().diff(control.value, 'years');
    console.log('age', age);
    return age < min ? {ageValidation: {value: control.value}} : null;
  };
}

export const matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const reEnter = control.get('password2');
  console.log(reEnter);
  if (password.value !== '' && reEnter.value !== '' ) {
    return (password.value === reEnter.value) ? null : { matchPassword: true };
  }
  return null;
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  countries: ICountry[] = [];
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private countrySvc: CountryService,
              private snackBar: MatSnackBar, private router: Router) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    this.countrySvc.getAll().then( res => this.countries = res)
    .catch(err => console.log(err) );
  }

  get f() { return this.contactForm.controls; }

  createFormGroup() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#\$])/; // (?=.{8,})/;
    const contactPattern = /^[0-9\+\-\)\(]*$/;

    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(passwordPattern)]),
      password2: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required, ageValidator(18)]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.pattern(contactPattern)])
    }, { validators: matchPassword });
  }


  reset() {
    this.contactForm.reset();
    this.router.navigate(['/add'], { fragment: 'main' });
  }

  onSubmit() {
    const val = this.contactForm.value;
    console.log(val);
  }

}
