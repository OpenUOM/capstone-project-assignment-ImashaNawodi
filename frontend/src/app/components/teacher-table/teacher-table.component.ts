import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  teacherData: any[] = [];
  filteredData: any[] = []; 
  selected: string = '';

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher(): void {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id: string): void {
    const navigationExtras: NavigationExtras = {
      state: { id }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  initializeDB(): void {
    this.service.initializeDB().subscribe(
      () => console.log('DB is Initialized'),
      (error) => console.error('ERROR - ', error)
    );
  }

  getTeacherData(): void {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe(
      (response) => {
        this.teacherData = Object.keys(response).map((key) => response[key]);
        this.filteredData = [...this.teacherData]; 
      },
      (error) => console.error('ERROR - ', error)
    );
  }

  search(value: string): void {
    if (value.trim().length === 0) {
      this.filteredData = [...this.teacherData];
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    this.filteredData = this.teacherData.filter((item) => {
      const name = item?.name?.toLowerCase();
      return name && name.includes(lowerCaseValue);
    });
  }

  deleteTeacher(itemid: string): void {
    const requestPayload = { id: itemid };
    this.service.deleteTeacher(requestPayload).subscribe(
      () => this.getTeacherData(),
      (error) => console.error('ERROR - ', error)
    );
  }
}
