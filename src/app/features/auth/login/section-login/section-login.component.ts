import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from "../../../../core/services/auth-service";
import { LoginRequest } from "../../../../core/dto/login-request";
import { Role } from "../../../../core/enums/Role";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-section-login',
  templateUrl: './section-login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./section-login.component.css']
})
export class SectionLoginComponent implements OnInit {
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
          const decodedToken: any = jwtDecode(res.token);
          console.log('Decoded Token:', decodedToken);

          const roles: string[] = decodedToken.roles;
          console.log('Decoded Roles:', roles);

          // Corriger la vérification des rôles en tenant compte du préfixe 'ROLE_'
          if (roles.includes('ROLE_' + Role.ADMIN) || roles.includes(Role.ADMIN)) {
            this.router.navigateByUrl('/dashboard/admin');
          } else if (roles.includes('ROLE_' + Role.ENSEIGNANT) || roles.includes(Role.ENSEIGNANT)) {
            this.router.navigateByUrl('/dashboard/enseignant');
          } else if (roles.includes('ROLE_' + Role.ETUDIANT) || roles.includes(Role.ETUDIANT)) {
            this.router.navigateByUrl('/dashboard/etudiant');
          } else if (roles.includes('ROLE_' + Role.PARENT) || roles.includes(Role.PARENT)) {
            this.router.navigateByUrl('/dashboard/parent');
          } else {
            this.errorMessage = 'Rôle non autorisé, veuillez réessayer!';
          }

          this.isLoading = false;
          this.ngOnInit();
        },
        (error) => {
          this.errorMessage = 'Échec de connexion. Veuillez vérifier vos identifiants.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Le formulaire est invalide. Veuillez remplir tous les champs requis.';
    }
  }
}
