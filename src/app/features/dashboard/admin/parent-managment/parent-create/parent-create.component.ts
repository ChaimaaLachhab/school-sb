import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParentRequest } from '../../../../../core/dto/parent/parent-request';
import { ParentService } from '../../../../../core/services/parent.service';
import { Sexe } from '../../../../../core/enums/Sexe';
import { Role } from '../../../../../core/enums/Role';

@Component({
  selector: 'app-parent-create',
  templateUrl: './parent-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./parent-create.component.css']
})
export class ParentCreateComponent implements OnInit {
  formParent!: FormGroup;
  sexeOptions = Object.values(Sexe);

  constructor(private fb: FormBuilder, private parentService: ParentService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formParent = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      sexe: [Sexe.MASCULIN, Validators.required],
      relationAvecEtudiant: ['', Validators.required],
      enfantsIds: [[]]
    });
  }

  insert(): void {
    if (this.formParent.valid) {
      const newParent: ParentRequest = {
        nom: this.formParent.value.nom,
        prenom: this.formParent.value.prenom,
        email: this.formParent.value.email,
        telephone: this.formParent.value.telephone,
        username: this.formParent.value.username,
        password: this.formParent.value.password,
        sexe: this.formParent.value.sexe,
        role: Role.PARENT,
        relationAvecEtudiant: this.formParent.value.relationAvecEtudiant,
        enfantsIds: this.formParent.value.enfantsIds
      };

      this.parentService.createParent(newParent).subscribe(
        (response) => {
          console.log('Parent créé avec succès:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la création du parent:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.formParent.reset();
    this.initForm();
  }
}
