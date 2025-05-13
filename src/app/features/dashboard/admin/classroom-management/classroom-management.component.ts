import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomListComponent } from "./classroom-list/classroom-list.component";
import { ClassroomCreateComponent } from "./classroom-create/classroom-create.component";
import {ModuleCreateComponent} from "../module-management/module-create/module-create.component";
import {ModuleListComponent} from "../module-management/module-list/module-list.component";

@Component({
  selector: 'app-gestion-des-classrooms',
  templateUrl: './classroom-management.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ClassroomListComponent,
    ClassroomCreateComponent,
    ModuleCreateComponent,
    ModuleListComponent
  ],
  styleUrls: ['./classroom-management.component.css']
})
export class ClassroomManagementComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onClassCreated() {
    this.closeModal();
  }
}
