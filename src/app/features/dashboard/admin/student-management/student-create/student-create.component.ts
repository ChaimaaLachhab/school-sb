import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, CommonModule } from "@angular/common";
import { ClasseResponse } from "../../../../../core/dto/classe/classe-response";
import { EtudiantService } from "../../../../../core/services/etudiant.service";
import { ClasseService } from "../../../../../core/services/classe.service";
import { EtudiantRequest } from "../../../../../core/dto/etudiant/etudiant-request";
import { Role } from "../../../../../core/enums/Role";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgForOf
  ],
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  @Output() studentCreated = new EventEmitter<void>();

  FormEleve!: FormGroup;
  ListClasses: ClasseResponse[] = [];

  anneeScolaireCourante: string = new Date().getFullYear() + "-" + (new Date().getFullYear() + 1);

  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClasses();
  }

  initForm(): void {
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
      niveauId: ['']
    });
  }

  loadClasses(): void {
    this.classeService.getAllClasses().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.ListClasses = response.data;
          console.log("Classes chargées: " + response.data.length);
        } else {
          console.error("Erreur lors du chargement des classes: réponse non valide", response);
          this.ListClasses = [];
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des classes:", error);
        this.ListClasses = [];
      }
    });
  }

  addEleve() {
    if (this.FormEleve.valid) {
      try {
        // Récupération de la date sélectionnée
        const dateNaissanceInput = this.FormEleve.value.dateNaissance;
        const dateNaissance = this.formatDateForBackend(dateNaissanceInput);

        // Date d'inscription (aujourd'hui)
        const dateInscription = this.formatDateForBackend(new Date().toISOString().split('T')[0]);

        console.log("Date formatée pour l'API:", dateNaissance);

        // Création de l'objet EtudiantRequest
        const newEtudiant: EtudiantRequest = {
          nom: this.FormEleve.value.nom,
          prenom: this.FormEleve.value.prenom,
          email: this.FormEleve.value.email,
          username: this.FormEleve.value.username,
          password: this.FormEleve.value.password,
          telephone: this.FormEleve.value.telephone || "",
          dateNaissance: dateNaissance,
          adresse: this.FormEleve.value.adresse || "",
          sexe: this.FormEleve.value.sexe,
          role: Role.ETUDIANT,
          numeroEtudiant: this.FormEleve.value.numeroEtudiant,
          filiere: this.FormEleve.value.filiere || "",
          classeId: Number(this.FormEleve.value.classeId),
          niveauId: Number(this.FormEleve.value.niveauId),
          dateInscription: dateInscription,
          anneeScolaire: this.anneeScolaireCourante,
          photo: ""
        };

        console.log("Étudiant à créer:", JSON.stringify(newEtudiant));

        // Envoi de la requête au service
        this.etudiantService.createEtudiant(newEtudiant).subscribe({
          next: (response) => {
            console.log("Réponse de création:", response);

            if (response.success) {
              alert("Étudiant créé avec succès!");
              this.resetForm();
              this.studentCreated.emit();
            } else {
              alert("Erreur lors de la création de l'étudiant: " + response.message);
            }
          },
          error: (error) => {
            console.error("Erreur lors de la création de l'étudiant:", error);

            if (error.status === 401) {
              alert("Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous reconnecter.");
            } else if (error.error && error.error.message) {
              // Analyse détaillée de l'erreur
              const errorMessage = error.error.message;

              alert("Erreur lors de la création de l'étudiant: " + errorMessage);
              console.log("Format de date envoyé:", dateNaissance);
            } else {
              alert("Erreur lors de la création de l'étudiant: " +
                (error.message || "Erreur inconnue"));
            }
          }
        });
      } catch (error: any) {
        console.error("Erreur lors de la préparation des données:", error);
        alert("Erreur lors de la préparation des données: " + (error.message || "Erreur inconnue"));
      }
    } else {
      // Afficher les champs invalides
      const invalidFields: string[] = [];
      Object.keys(this.FormEleve.controls).forEach(key => {
        const control = this.FormEleve.get(key);
        if (control?.invalid) {
          invalidFields.push(key);
        }
      });

      alert(`Veuillez remplir correctement tous les champs obligatoires. Champs invalides: ${invalidFields.join(', ')}`);
    }
  }

  // Méthode pour formater la date selon les besoins du backend
  private formatDateForBackend(dateString: string): string {
    // Convertir de YYYY-MM-DD à dd/MM/yyyy
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString; // Retourner tel quel si le format ne correspond pas
  }

  resetForm() {
    this.FormEleve.reset();
    this.initForm();
  }

  onClasseChange(event: any) {
    const classeId = Number(event.target.value);
    const classe = this.ListClasses.find(c => c.id === classeId);
    if (classe) {
      this.FormEleve.patchValue({
        niveauId: classe.niveauId
      });
      console.log(`Classe sélectionnée: ${classe.nom}, niveau ID: ${classe.niveauId}`);
    }
  }
}
