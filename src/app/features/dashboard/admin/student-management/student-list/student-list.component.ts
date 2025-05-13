import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { ClasseResponse } from "../../../../../core/dto/classe/classe-response";
import { EtudiantResponse } from "../../../../../core/dto/etudiant/etudiant-response";
import { EtudiantService } from "../../../../../core/services/etudiant.service";
import { ClasseService } from "../../../../../core/services/classe.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    DatePipe
  ],
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['numeroEtudiant', 'nom', 'prenom', 'email', 'sexe', 'dateNaissance'];
  FromSearch!: FormGroup;
  ListClasses: ClasseResponse[] = [];
  dataSource = new MatTableDataSource<EtudiantResponse>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private etudiantService: EtudiantService,
    private classeService: ClasseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire de recherche
    this.FromSearch = this.fb.group({
      classeId: ['', Validators.required],
    });

    // Chargement des classes
    this.classeService.getAllClasses().subscribe({
      next: (response) => {
        this.ListClasses = response.data;
        console.log('Classes chargées:', response.data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des classes:', err);
      }
    });

    // Chargement des étudiants
    this.loadAllStudents();
  }

  ngAfterViewInit() {
    // Associer le tri à la source de données après l'initialisation de la vue
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadAllStudents() {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        console.log('Étudiants chargés:', response.data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des étudiants:', err);
      }
    });
  }

  search() {
    if (this.FromSearch.valid) {
      const selectedClassId = this.FromSearch.value.classeId;
      this.etudiantService.getEtudiantsByClasseId(selectedClassId).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          console.log('Étudiants filtrés par classe:', response.data);
        },
        error: (err) => {
          console.error('Erreur lors du filtrage des étudiants:', err);
        }
      });
    }
  }

  reload() {
    this.FromSearch.reset();
    this.loadAllStudents();
  }
}
