import { Component } from '@angular/core';
import {TeacherListComponent} from "./dash-admin-get-profs/teacher-list.component";
import {TeacherCreateComponent} from "./dash-admin-add-prof/teacher-create.component";
import {ModuleCreateComponent} from "../module-management/module-create/module-create.component";
import {ModuleListComponent} from "../module-management/module-list/module-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gestion-des-profs',
  templateUrl: './teacher-management.component.html',
  standalone: true,
    imports: [
        TeacherListComponent,
        TeacherCreateComponent,
        ModuleCreateComponent,
        ModuleListComponent,
        NgIf
    ],
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onTeacherCreated() {
    this.closeModal();
  }
}
