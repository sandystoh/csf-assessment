import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CountryService, ICountry } from '../services/country.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

function ageValidator(min: number): ValidatorFn {
  // validates minimum age passed in as 'min'
  return (control: AbstractControl): {[key: string]: any} | null => {
    const age = moment().diff(control.value, 'years');
    return age < min ? {ageValidation: {value: control.value}} : null;
  };
}

export const matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  // Validates if password and re-entered password are the same
  const password = control.get('password');
  const reEnter = control.get('password2');
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
  maxDate: any;

  constructor(private formBuilder: FormBuilder, private countrySvc: CountryService,
              private userSvc: UserService,
              private snackBar: MatSnackBar, private router: Router) {
    this.contactForm = this.createFormGroup();
    this.maxDate = moment();
    // Also can limit DatePicker to 18 years ago using moment().subtract(18, 'years');
  }

  ngOnInit() {
    this.countrySvc.getAll().then( res => this.countries = res)
    .catch(err => {
      console.log('API Error'); // Fallback array in case of API error due to CORS
      this.countries = [{name: 'Singapore', code: 'SG'}, {name: 'USA', code: 'US'}, {name: 'France', code: 'FR'}];
    });
  }

  get f() { return this.contactForm.controls; }

  createFormGroup() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#\$])/; // (?=.{8,})/;
    // passwordPattern validates for Uppercase/Lowercase/Digit/Symbol. minlength validator validates length
    const contactPattern = /^[0-9\+\-\)\(]*$/;
    // contactPattern validates only digits, () + and - can be entered

    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]),
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
    const save: User = {
      name: val.name,
      email: val.email,
      password: val.password,
      gender: val.gender,
      dob: val.dob.format('DD MMMM YYYY'),
      address: val.address,
      contact: val.contact,
      country: val.country
    };
    this.userSvc.saveCurrentUser(save).then( res => {
      this.snackBar.open('New User ' + this.contactForm.value.name + ' Added!', 'OK', { duration: 2000});
      this.router.navigate(['/confirm'], {fragment: 'main'});
      console.log('User Information Saved', save);
      // To show information sent to persist, password would normally be masked
    }).catch((error) => {
      console.log(error);
    });

  }
}
