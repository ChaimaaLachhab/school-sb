import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ParentResponse } from '../../../../../core/dto/parent/parent-response';
import { ParentService } from '../../../../../core/services/parent.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'telephone', 'email', 'enfants'];
  listParents: ParentResponse[] = [];

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.parentService.getAllParents().subscribe(data => {
      this.listParents = data;
      console.log('Parents chargés:', data);
    });
  }

  // Méthode utilitaire pour formater la liste des enfants
  getEnfantsList(parent: ParentResponse): string {
    if (!parent.enfants || parent.enfants.length === 0) {
      return 'Aucun';
    }
    return parent.enfants.map(enfant => enfant.nom + ' ' + enfant.prenom).join(', ');
  }
}
