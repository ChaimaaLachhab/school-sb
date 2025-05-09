import { Component } from '@angular/core';
import {TeacherListComponent} from "./dash-admin-get-profs/teacher-list.component";
import {TeacherCreateComponent} from "./dash-admin-add-prof/teacher-create.component";

@Component({
  selector: 'app-gestion-des-profs',
  templateUrl: './teacher-management.component.html',
  standalone: true,
  imports: [
    TeacherListComponent,
    TeacherCreateComponent
  ],
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent {

}
