import { Component } from '@angular/core';
import {StudentCreateComponent} from "./student-create/student-create.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {ModuleCreateComponent} from "../module-management/module-create/module-create.component";
import {ModuleListComponent} from "../module-management/module-list/module-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gestion-admin-eleve',
  templateUrl: './student-management.component.html',
  standalone: true,
  imports: [
    StudentCreateComponent,
    StudentListComponent,
    ModuleCreateComponent,
    ModuleListComponent,
    NgIf
  ],
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onStudentCreated() {
    this.closeModal();
  }
}
