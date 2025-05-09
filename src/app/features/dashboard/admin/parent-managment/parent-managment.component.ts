import { Component } from '@angular/core';
import {ClassroomCreateComponent} from "../classroom-management/classroom-create/classroom-create.component";
import {ClassroomListComponent} from "../classroom-management/classroom-list/classroom-list.component";
import {ParentListComponent} from "./parent-list/parent-list.component";
import {ParentCreateComponent} from "./parent-create/parent-create.component";

@Component({
  selector: 'app-parent-managment',
  standalone: true,
  imports: [
    ClassroomCreateComponent,
    ClassroomListComponent,
    ParentListComponent,
    ParentCreateComponent
  ],
  templateUrl: './parent-managment.component.html',
  styleUrl: './parent-managment.component.css'
})
export class ParentManagmentComponent {

}
