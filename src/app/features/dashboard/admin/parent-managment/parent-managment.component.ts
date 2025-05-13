import { Component } from '@angular/core';
import {ParentListComponent} from "./parent-list/parent-list.component";
import {ParentCreateComponent} from "./parent-create/parent-create.component";
import {ModuleCreateComponent} from "../module-management/module-create/module-create.component";
import {ModuleListComponent} from "../module-management/module-list/module-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-parent-managment',
  standalone: true,
  imports: [
    ParentListComponent,
    ParentCreateComponent,
    ModuleCreateComponent,
    ModuleListComponent,
    NgIf
  ],
  templateUrl: './parent-managment.component.html',
  styleUrl: './parent-managment.component.css'
})
export class ParentManagmentComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onParentCreated() {
    this.closeModal();
  }
}
