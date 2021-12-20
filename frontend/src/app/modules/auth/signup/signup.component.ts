import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeSignupForm();
  }

  /**
   * To initialize form validation rules.
   */
  initializeSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.compose([Validators.minLength(10), Validators.maxLength(10)])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Getter for easy access to form fields
   */
  get f() { return this.signupForm?.controls}
  
}
