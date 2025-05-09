import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from "@angular/common";
import { formatDate } from '@angular/common';
import {ClasseResponse} from "../../../../../core/dto/classe/classe-response";
import {EtudiantService} from "../../../../../core/services/etudiant.service";
import {ClasseService} from "../../../../../core/services/classe.service";
import {EtudiantRequest} from "../../../../../core/dto/etudiant/etudiant-request";
import {Role} from "../../../../../core/enums/Role";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  FormEleve!: FormGroup;
  ListClasses!: ClasseResponse[];

  // Exemple de données pour remplir le tableau ListClasses
  ListClasse = [
    {
      id: 1,
      nom: "Première A",
      niveauId: 3,
      anneeScolaire: "2024-2025",
      capacite: 30,
      actif: true,
      dateCreation: "2024-08-15T10:30:00",
      labelNiveau: "Première"
    },
    {
      id: 2,
      nom: "Seconde B",
      niveauId: 2,
      anneeScolaire: "2024-2025",
      capacite: 28,
      actif: true,
      dateCreation: "2024-08-15T11:15:00",
      labelNiveau: "Seconde"
    },
    {
      id: 3,
      nom: "Terminale S",
      niveauId: 4,
      anneeScolaire: "2024-2025",
      capacite: 25,
      actif: true,
      dateCreation: "2024-08-16T09:45:00",
      labelNiveau: "Terminale"
    },
    {
      id: 4,
      nom: "Troisième C",
      niveauId: 1,
      anneeScolaire: "2024-2025",
      capacite: 32,
      actif: true,
      dateCreation: "2024-08-16T14:20:00",
      labelNiveau: "Troisième"
    },
    {
      id: 5,
      nom: "Seconde A",
      niveauId: 2,
      anneeScolaire: "2024-2025",
      capacite: 29,
      actif: true,
      dateCreation: "2024-08-17T08:30:00",
      labelNiveau: "Seconde"
    },
    {
      id: 6,
      nom: "Terminale ES",
      niveauId: 4,
      anneeScolaire: "2024-2025",
      capacite: 26,
      actif: true,
      dateCreation: "2024-08-17T10:15:00",
      labelNiveau: "Terminale"
    },
    {
      id: 7,
      nom: "Première B",
      niveauId: 3,
      anneeScolaire: "2024-2025",
      capacite: 31,
      actif: true,
      dateCreation: "2024-08-18T09:00:00",
      labelNiveau: "Première"
    },
    {
      id: 8,
      nom: "Troisième A",
      niveauId: 1,
      anneeScolaire: "2024-2025",
      capacite: 30,
      actif: true,
      dateCreation: "2024-08-18T13:45:00",
      labelNiveau: "Troisième"
    },
    {
      id: 9,
      nom: "Terminale L",
      niveauId: 4,
      anneeScolaire: "2024-2025",
      capacite: 24,
      actif: true,
      dateCreation: "2024-08-19T11:30:00",
      labelNiveau: "Terminale"
    },
    {
      id: 10,
      nom: "Seconde C",
      niveauId: 2,
      anneeScolaire: "2024-2025",
      capacite: 27,
      actif: false,
      dateCreation: "2024-08-20T15:00:00",
      labelNiveau: "Seconde"
    }
  ];

  anneeScolaireCourante: string = new Date().getFullYear().toString();

  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    // Chargement des classes
    this.classeService.getAllClasses().subscribe(data => {
      this.ListClasses = data;
      console.log("Classes chargées: " + data.length);
    });

    // Initialisation du formulaire
    this.FormEleve = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: [''],
      dateNaissance: ['', Validators.required],
      adresse: [''],
      sexe: ['', Validators.required],
      numeroEtudiant: ['', Validators.required],
      filiere: [''],
      classeId: ['', Validators.required],
      niveauId: ['', Validators.required]
    });
  }

  addEleve() {
    if (this.FormEleve.valid) {
      // Création de l'objet EtudiantRequest
      const newEtudiant: EtudiantRequest = {
        nom: this.FormEleve.value.nom,
        prenom: this.FormEleve.value.prenom,
        email: this.FormEleve.value.email,
        username: this.FormEleve.value.username,
        password: this.FormEleve.value.password,
        telephone: this.FormEleve.value.telephone,
        dateNaissance: this.FormEleve.value.dateNaissance,
        adresse: this.FormEleve.value.adresse,
        sexe: this.FormEleve.value.sexe,
        role: Role.ETUDIANT,
        numeroEtudiant: this.FormEleve.value.numeroEtudiant,
        filiere: this.FormEleve.value.filiere,
        classeId: this.FormEleve.value.classeId,
        niveauId: this.FormEleve.value.niveauId,
        dateInscription: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        anneeScolaire: this.anneeScolaireCourante
      };

      console.log("Étudiant à créer:", newEtudiant);

      // Envoi de la requête au service
      this.etudiantService.createEtudiant(newEtudiant).subscribe({
        next: (response) => {
          alert("Étudiant créé avec succès!");
          this.resetForm();
        },
        error: (error) => {
          alert("Erreur lors de la création de l'étudiant: " + error.message);
          console.error("Erreur:", error);
        }
      });
    } else {
      alert("Veuillez remplir correctement tous les champs obligatoires.");
    }
  }

  resetForm() {
    // Réinitialisation du formulaire
    this.FormEleve.reset({
      nom: '',
      prenom: '',
      email: '',
      username: '',
      password: '',
      telephone: '',
      dateNaissance: '',
      adresse: '',
      sexe: '',
      numeroEtudiant: '',
      filiere: '',
      classeId: '',
      niveauId: ''
    });
  }

  onClasseChange(event: any) {
    const classeId = Number(event.target.value);
    const classe = this.ListClasses.find(c => c.id === classeId);
    if (classe) {
      this.FormEleve.patchValue({
        niveauId: classe.niveauId
      });
    }
  }
}
