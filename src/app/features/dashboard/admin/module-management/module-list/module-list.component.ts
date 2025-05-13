import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ModuleResponse } from "../../../../../core/dto/module/module-response";
import { ModuleService } from "../../../../../core/services/module.service";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'libelle', 'typeModule', 'volumeHoraire', 'coefficient', 'nomClasse', 'nomEnseignant'];
  listModules: ModuleResponse[] = [];

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.moduleService.getAllModules().subscribe(response => {
      this.listModules = response.data;
      console.log('Modules chargés:', response);
    });
  }
}
