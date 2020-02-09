import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { StageService } from '@app/core/http/stage.service';
import * as marked from 'marked';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  stageData = {};
  constructor(private _route: ActivatedRoute, private _router: Router, private _sc: StageService) {}

  ngOnInit() {
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

  markdown(text: string) {
    if (text && text.length > 0) {
      return marked(text);
    }
    return null;
  }
}
