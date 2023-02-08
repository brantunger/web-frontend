import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  userRoles = ['ADMIN', 'USER'];
  formGroup!: FormGroup;
  currentUser!: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditUserDialogComponent>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.currentUser = this.data.user;
    this.formGroup = this.formBuilder.group({
      usernameInput: [this.currentUser.username, Validators.required],
      emailInput: [this.currentUser.email, Validators.required],
      roleInput: [this.currentUser.role, Validators.required]
    });
  }

  saveUser(): void {
    this.currentUser.username = this.formGroup.controls['usernameInput'].value;
    this.currentUser.email = this.formGroup.controls['emailInput'].value;
    this.currentUser.role = this.formGroup.controls['roleInput'].value;
    this.dialogRef.close({action: 'save', user: this.currentUser});
  }
}
