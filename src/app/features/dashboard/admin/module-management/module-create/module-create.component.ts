import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleRequest } from "../../../../../core/dto/module/module-request";
import { ModuleService } from "../../../../../core/services/module.service";
import { NiveauResponse } from "../../../../../core/dto/niveau/niveau-response";
import { NiveauService } from "../../../../../core/services/niveau.service";
import { ClasseResponse } from "../../../../../core/dto/classe/classe-response";
import { ClasseService } from "../../../../../core/services/classe.service";
import { EnseignantResponse } from "../../../../../core/dto/enseignant/enseignant-response";
import { EnseignantService } from "../../../../../core/services/enseignant.service";

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {
  @Output() moduleCreated = new EventEmitter<void>();
  formModule!: FormGroup;
  listNiveaux: NiveauResponse[] = [];
  listClasses: ClasseResponse[] = [];
  allClasses: ClasseResponse[] = [];
  listEnseignants: EnseignantResponse[] = [];
  typeModules: string[] = ['OBLIGATOIRE', 'OPTIONNEL', 'SPECIALITE'];

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private niveauService: NiveauService,
    private classeService: ClasseService,
    private enseignantService: EnseignantService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadNiveaux();
    this.loadEnseignants();
    this.loadAllClasses();

    this.formModule.get('niveauId')?.valueChanges.subscribe(niveauId => {
      if (niveauId) {
        console.log("Niveau sélectionné: " + niveauId + ", type: " + typeof niveauId);
        this.filterClassesByNiveau(Number(niveauId));
      } else {
        this.listClasses = [];
      }
    });
  }

  loadAllClasses(): void {
    this.classeService.getAllClasses().subscribe({
      next: (response) => {
        this.allClasses = response.data;
        console.log("Toutes les classes chargées: " + this.allClasses.length);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des classes:", error);
      }
    });
  }

  filterClassesByNiveau(niveauId: number): void {
    if (!this.allClasses) return;

    const niveauIdNumeric = Number(niveauId);

    this.listClasses = this.allClasses.filter(classe => Number(classe.niveauId) === niveauIdNumeric);

    console.log("Classes filtrées pour le niveau " + niveauId + ": " + this.listClasses.length);
    this.listClasses.forEach(classe => {
      console.log(`- ${classe.nom} (ID: ${classe.id}, NiveauID: ${classe.niveauId})`);
    });
  }

  initForm(): void {
    this.formModule = this.fb.group({
      libelle: ['', Validators.required],
      volumeHoraire: [null, [Validators.required, Validators.min(1)]],
      seuil: [null, [Validators.required, Validators.min(0)]],
      coefficient: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      typeModule: ['', Validators.required],
      niveauId: [null, Validators.required],
      classeId: [null, Validators.required],
      enseignantId: [null, Validators.required]
    });
  }

  loadNiveaux(): void {
    this.niveauService.getAllNiveaux().subscribe({
      next: (response) => {
        this.listNiveaux = response.data;
        console.log("Niveaux chargés: " + response.data.length);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des niveaux:", error);
      }
    });
  }

  loadClassesByNiveau(niveauId: number): void {
    this.classeService.getAllClasses().subscribe({
      next: (response) => {
        const niveauIdNumeric = Number(niveauId);
        this.listClasses = response.data.filter(classe => Number(classe.niveauId) === niveauIdNumeric);
        console.log("Classes chargées pour le niveau " + niveauId + ": " + this.listClasses.length);
        console.log("Classes filtrées:", this.listClasses);

        console.log("Toutes les classes:", response.data);
        response.data.forEach(classe => {
          console.log(`Classe: ${classe.nom}, NiveauId: ${classe.niveauId}, Type: ${typeof classe.niveauId}`);
        });
      },
      error: (error) => {
        console.error("Erreur lors du chargement des classes:", error);
      }
    });
  }

  loadEnseignants(): void {
    this.enseignantService.getAllEnseignants().subscribe({
      next: (response) => {
        this.listEnseignants = response.data;
        console.log("Enseignants chargés: " + response.data.length);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des enseignants:", error);
      }
    });
  }

  insert(): void {
    if (this.formModule.valid) {
      const newModule: ModuleRequest = {
        libelle: this.formModule.value.libelle,
        volumeHoraire: this.formModule.value.volumeHoraire,
        seuil: this.formModule.value.seuil,
        coefficient: this.formModule.value.coefficient,
        description: this.formModule.value.description,
        typeModule: this.formModule.value.typeModule,
        niveauId: this.formModule.value.niveauId,
        classeId: this.formModule.value.classeId,
        enseignantId: this.formModule.value.enseignantId
      };

      this.moduleService.createModule(newModule).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Module créé avec succès:', response.data);
            this.resetForm();
            this.moduleCreated.emit();
          } else {
            console.error('Erreur lors de la création du module:', response.errors);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la création du module:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.formModule.reset();
    this.initForm();
  }
}
