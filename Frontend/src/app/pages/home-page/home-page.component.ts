import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi , GridReadyEvent} from 'ag-grid-community';
import {themeMaterial } from 'ag-grid-community'
import { UserService } from '../../services/user.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AgGridModule,
    AgGridAngular
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{ 
  private gridApi!: GridApi;
  public theme = themeMaterial;

  userForm: FormGroup;
  rowData: any[] = [];
  columnDefs = [
    { field: 'name' },
    { field: 'mobile' },
    { field: 'address' },
    { field: 'skills' },
    { field: 'hobbies' },
    { field: 'fileName', headerName: 'Uploaded File' },
      // { field: 'photo' } // not needed if it's null or unused

  ];

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      skills: [''],
      hobbies: [''],
      photo: [null]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  // onSubmit(): void {
  //   if (this.userForm.valid) {
  //     debugger
  //     const fileInput = document.getElementById('photoInput') as HTMLInputElement;
  //     const fileName = fileInput?.files?.[0]?.name || '';

  //     const formData = {
  //       ...this.userForm.value,
  //       fileName
  //     };
  //     delete formData.photo;

  //     this.rowData = [...this.rowData, formData];
  //     console.log("rowdata" , this.rowData)
  //     this.userForm.reset();
  //     if (fileInput) fileInput.value = '';
  //   }
  // }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users:any) => {
        this.rowData = users;
      },
      error: (err:any) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      const photoInput = document.getElementById('photoInput') as HTMLInputElement;
      const file = photoInput?.files?.[0];

      Object.entries(this.userForm.value).forEach(([key, value]) => {
        if (key !== 'photo') {
          formData.append(key, value as string);
        }
      });

      if (file) {
        formData.append('photo', file);
      }

      this.userService.createUser(formData).subscribe({
        next: (res:any) => {
          console.log('✅ User created:', res);
          this.fetchUsers(); // 🔁 Refresh ag-Grid with new user
          this.userForm.reset();
        },
        error: (err:any) => {
          console.error('❌ Error creating user:', err);
        }
      });
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}