import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ClasseRequest} from "../../../../../core/dto/classe/classe-request";
import {ClasseService} from "../../../../../core/services/classe.service";

@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./classroom-create.component.css']
})
export class ClassroomCreateComponent implements OnInit {
  formClasse!: FormGroup;

  constructor(private fb: FormBuilder, private classeService: ClasseService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formClasse = this.fb.group({
      nom: ['', Validators.required],
      niveauId: [null, Validators.required],
      anneeScolaire: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]]
    });
  }

  insert(): void {
    if (this.formClasse.valid) {
      const newClasse: ClasseRequest = {
        nom: this.formClasse.value.nom,
        niveauId: this.formClasse.value.niveauId,
        anneeScolaire: this.formClasse.value.anneeScolaire,
        capacite: this.formClasse.value.capacite
      };

      this.classeService.createClasse(newClasse).subscribe(
        (response) => {
          console.log('Classe créée avec succès:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la création de la classe:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.formClasse.reset();
    this.initForm();
  }
}
