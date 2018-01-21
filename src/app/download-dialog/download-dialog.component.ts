import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit {

  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<DownloadDialogComponent>) {
  }

}
