import { Component } from '@angular/core';
import {ClassroomCreateComponent} from "../classroom-management/classroom-create/classroom-create.component";
import {ClassroomListComponent} from "../classroom-management/classroom-list/classroom-list.component";
import {NgIf} from "@angular/common";
import {ModuleListComponent} from "./module-list/module-list.component";
import {ModuleCreateComponent} from "./module-create/module-create.component";

@Component({
  selector: 'app-module-management',
  standalone: true,
  imports: [
    ClassroomCreateComponent,
    ClassroomListComponent,
    NgIf,
    ModuleListComponent,
    ModuleCreateComponent
  ],
  templateUrl: './module-management.component.html',
  styleUrl: './module-management.component.css'
})
export class ModuleManagementComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onModuleCreated() {
    this.closeModal();
  }
}
