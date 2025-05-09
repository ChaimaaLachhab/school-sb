import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {ClasseResponse} from "../../../../../core/dto/classe/classe-response";
import {EnseignantResponse} from "../../../../../core/dto/enseignant/enseignant-response";
import {EnseignantService} from "../../../../../core/services/enseignant.service";
import {ClasseService} from "../../../../../core/services/classe.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = ['numeroCarte', 'nom', 'prenom', 'email', 'sexe', 'dateNaissance', 'specialite'];
  searchForm!: FormGroup;
  listeClasses!: ClasseResponse[];
  listeEnseignants!: EnseignantResponse[];

  constructor(
    private enseignantService: EnseignantService,
    private classeService: ClasseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      departementId: ['', Validators.required],
    });

    this.classeService.getAllClasses().subscribe((data) => {
      this.listeClasses = data;
    });

    this.enseignantService.getAll().subscribe((data) => {
      this.listeEnseignants = data;
    });
  }

  search() {
    if (this.searchForm.valid) {
      const selectedDepartementId = this.searchForm.value.departementId;
      this.enseignantService.getByDepartement(selectedDepartementId).subscribe((data) => {
        this.listeEnseignants = data;
      });
    }
  }

  reload() {
    this.enseignantService.getAll().subscribe((data) => {
      this.listeEnseignants = data;
      this.searchForm.reset();
    });
  }
}
