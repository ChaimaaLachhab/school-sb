import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {DatePipe, NgForOf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import {ClasseResponse} from "../../../../../core/dto/classe/classe-response";
import {EtudiantResponse} from "../../../../../core/dto/etudiant/etudiant-response";
import {EtudiantService} from "../../../../../core/services/etudiant.service";
import {ClasseService} from "../../../../../core/services/classe.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe
  ],
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['numeroEtudiant', 'nom', 'prenom', 'email', 'sexe', 'dateNaissance'];
  FromSearch!: FormGroup;
  ListClasses!: ClasseResponse[];
  ListEtudiants!: EtudiantResponse[];

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
    this.classeService.getAllClasses().subscribe((data) => {
      this.ListClasses = data;
    });

    // Chargement des étudiants
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      this.ListEtudiants = data;
    });
  }

  search() {
    if (this.FromSearch.valid) {
      const selectedClassId = this.FromSearch.value.classeId;
      this.etudiantService.getEtudiantsByClasseId(selectedClassId).subscribe((data) => {
        this.ListEtudiants = data;
      });
    }
  }

  realod() {
    this.ngOnInit();
  }
}
