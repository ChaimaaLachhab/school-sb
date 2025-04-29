import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {AuthService} from "../../../../core/services/auth-service";
import {LoginRequest} from "../../../../core/dto/login-request";
import {Role} from "../../../../core/enums/role.enum";

@Component({
  selector: 'app-section-login',
  templateUrl: './section-login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./section-login.component.css']
})
export class SectionLoginComponent implements OnInit{
  formLogin!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.valide();
  }

  valide() {
    this.formLogin.reset();
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const request: LoginRequest = this.formLogin.value;
      this.isLoading = true;
      this.authService.login(request).subscribe(
        (res) => {
          localStorage.setItem('jwtData', JSON.stringify(res));
          const decodedToken: any = jwtDecode(res.token);
          console.log('Decoded Token:', decodedToken);

          if (decodedToken.roles.includes(Role[Role.ENSEIGNANT])) {
            this.router.navigateByUrl('prof-dashboard');
          } else if (decodedToken.roles.includes(Role[Role.ETUDIANT])) {
            this.router.navigateByUrl('eleve-dashboard');
          } else if (decodedToken.roles.includes(Role[Role.ADMIN])) {
            this.router.navigateByUrl('admin-dashboard');
          } else {
            this.errorMessage = 'Unauthorized role, please try again!';
          }
          this.isLoading = false;
          this.ngOnInit();
        },
        (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Form is invalid. Please fill out all required fields.';
    }
  }

}
