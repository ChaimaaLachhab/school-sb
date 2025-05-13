import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EnseignantService} from "../../../../../core/services/enseignant.service";
import {EnseignantRequest} from "../../../../../core/dto/enseignant/enseignant-request";
import {Role} from "../../../../../core/enums/Role";
import {Sexe} from "../../../../../core/enums/Sexe";

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {
  @Output() teacherCreated = new EventEmitter<void>();

  formEnseignant!: FormGroup;

  constructor(
    private enseignantService: EnseignantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formEnseignant = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      dateNaissance: ['', Validators.required],
      adresse: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      sexe: ['', Validators.required],
      numeroCarte: ['', Validators.required],
      departementId: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      specialite: ['']
    });
  }

  addEnseignant(): void {
    if (this.formEnseignant.valid) {
      const newEnseignant: EnseignantRequest = {
        nom: this.formEnseignant.value.nom,
        prenom: this.formEnseignant.value.prenom,
        email: this.formEnseignant.value.email,
        telephone: this.formEnseignant.value.telephone,
        dateNaissance: this.formEnseignant.value.dateNaissance,
        adresse: this.formEnseignant.value.adresse,
        username: this.formEnseignant.value.username,
        password: this.formEnseignant.value.password,
        role: Role.ENSEIGNANT,
        sexe: this.formEnseignant.value.sexe,
        numeroCarte: this.formEnseignant.value.numeroCarte,
        departementId: this.formEnseignant.value.departementId,
        dateEmbauche: this.formEnseignant.value.dateEmbauche,
        specialite: this.formEnseignant.value.specialite
      };

      this.enseignantService.create(newEnseignant).subscribe({
        next: (response) => {
          alert('Enseignant ajouté avec succès !');
          this.initForm();
          this.teacherCreated.emit();
        },
        error: (error) => {
          alert('Erreur lors de l\'ajout de l\'enseignant: ' + error.message);
        }
      });
    }
  }

  protected readonly Sexe = Sexe;
}
