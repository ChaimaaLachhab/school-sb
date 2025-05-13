import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClasseRequest } from "../../../../../core/dto/classe/classe-request";
import { ClasseService } from "../../../../../core/services/classe.service";
import { NiveauResponse } from "../../../../../core/dto/niveau/niveau-response";
import { NiveauService } from "../../../../../core/services/niveau.service";

@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./classroom-create.component.css']
})
export class ClassroomCreateComponent implements OnInit {
  @Output() classCreated = new EventEmitter<void>();
  formClasse!: FormGroup;
  ListNiveaux!: NiveauResponse[];

  constructor(private fb: FormBuilder, private classeService: ClasseService, private niveauxService: NiveauService) { }

  ngOnInit(): void {
    this.initForm();

    this.niveauxService.getAllNiveaux().subscribe({
      next: (response) => {
        this.ListNiveaux = response.data;
        console.log("Niveaux chargés: " + response.data.length);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des Niveaux:", error);
      }
    });
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

      this.classeService.createClasse(newClasse).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Classe créée avec succès:', response.data);
            this.resetForm();
          } else {
            console.error('Erreur lors de la création de la classe:', response.errors);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la création de la classe:', error);
        }
      });
      this.classCreated.emit();
    }
  }

  resetForm(): void {
    this.formClasse.reset();
    this.initForm();
  }
}
