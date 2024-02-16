import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-msg',
  templateUrl: './popup-msg.component.html',
  styleUrls: ['./popup-msg.component.css'],
})
export class PopupMsgComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
