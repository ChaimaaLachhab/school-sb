import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {StudentManagementComponent} from "./student-management/student-management.component";
import {TeacherManagementComponent} from "./teacher-management/teacher-management.component";
import {ClassroomManagementComponent} from "./classroom-management/classroom-management.component";
import {ParentManagmentComponent} from "./parent-managment/parent-managment.component";
import {SessionManagmentComponent} from "./session-managment/session-managment.component";

export const routes: Routes = [
  { path: '',
    component: StudentManagementComponent
  },
  { path: 'gestion-profs',
    component: TeacherManagementComponent
  },
  { path: 'classe',
    component: ClassroomManagementComponent
  },
  { path: 'parent',
    component: ParentManagmentComponent
  },
  { path: 'session',
    component: SessionManagmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
