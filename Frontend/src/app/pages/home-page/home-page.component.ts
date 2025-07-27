import { Component } from '@angular/core';
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
export class HomePageComponent { 
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

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      skills: [''],
      hobbies: [''],
      photo: [null]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      debugger
      const fileInput = document.getElementById('photoInput') as HTMLInputElement;
      const fileName = fileInput?.files?.[0]?.name || '';

      const formData = {
        ...this.userForm.value,
        fileName
      };
      delete formData.photo;

      this.rowData = [...this.rowData, formData];
      console.log("rowdata" , this.rowData)
      this.userForm.reset();
      if (fileInput) fileInput.value = '';
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}