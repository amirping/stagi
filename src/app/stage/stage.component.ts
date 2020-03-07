import { Component, OnInit, Inject } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { StageService } from '@app/core/http/stage.service';
import * as marked from 'marked';
import { CredentialsService } from '@app/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  stageData = {};
  isAuth = false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sc: StageService,
    private _creed: CredentialsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isAuth = this._creed.isAuthenticated();
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['home']);
    } else {
      // get dettails
      this._sc.getStage(id).subscribe(
        data => (this.stageData = data),
        error => console.log(error)
      );
    }
  }

  openRequest(stageData: any) {
    const dialogRef = this.dialog.open(RequestDialog, {
      width: '750px',
      data: { userID: this._creed.credentials.user.id, token: this._creed.credentials.jwt, stage: stageData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  markdown(text: string) {
    if (text && text.length > 0) {
      return marked(text);
    }
    return null;
  }
}

@Component({
  selector: 'request-dialog',
  templateUrl: 'stage.request.html',
  styleUrls: ['./stage.request.scss']
})
export class RequestDialog {
  innerData = {};
  constructor(public dialogRef: MatDialogRef<RequestDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
