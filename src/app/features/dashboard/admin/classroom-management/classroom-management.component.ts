import { Component } from '@angular/core';
import {TeacherCreateComponent} from "../teacher-management/dash-admin-add-prof/teacher-create.component";
import {TeacherListComponent} from "../teacher-management/dash-admin-get-profs/teacher-list.component";
import {ClassroomListComponent} from "./classroom-list/classroom-list.component";
import {ClassroomCreateComponent} from "./classroom-create/classroom-create.component";

@Component({
  selector: 'app-gestion-des-classrooms',
  templateUrl: './classroom-management.component.html',
  standalone: true,
  imports: [
    TeacherCreateComponent,
    TeacherListComponent,
    ClassroomListComponent,
    ClassroomCreateComponent
  ],
  styleUrls: ['./classroom-management.component.css']
})
export class ClassroomManagementComponent {

}
