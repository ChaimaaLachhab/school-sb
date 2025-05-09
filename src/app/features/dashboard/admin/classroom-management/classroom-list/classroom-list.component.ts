import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {ClasseResponse} from "../../../../../core/dto/classe/classe-response";
import {ClasseService} from "../../../../../core/services/classe.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'labelNiveau', 'capacite', 'anneeScolaire'];
  listClasses: ClasseResponse[] = [];

  constructor(private classeService: ClasseService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classeService.getAllClasses().subscribe(data => {
      this.listClasses = data;
      console.log('Classes chargées:', data);
    });
  }
}
