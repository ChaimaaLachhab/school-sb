import { Component } from '@angular/core';
import {StudentCreateComponent} from "./student-create/student-create.component";
import {StudentListComponent} from "./student-list/student-list.component";

@Component({
  selector: 'app-gestion-admin-eleve',
  templateUrl: './student-management.component.html',
  standalone: true,
  imports: [
    StudentCreateComponent,
    StudentListComponent
  ],
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent {

}
