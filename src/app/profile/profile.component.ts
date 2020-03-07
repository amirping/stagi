import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/core/http/user.service';
import { CredentialsService } from '@app/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;
  creed: any;
  userIntialData: any = {};
  constructor(private formBuilder: FormBuilder, private cd: CredentialsService, private _us: UserService) {}

  ngOnInit() {
    this.creed = this.cd.credentials;
    this.userIntialData.email = this.creed.user.email;
    this.userIntialData.bDate = this.creed.user.birthDate || '';
    this.userIntialData.id = this.creed.user.id;
    this.userIntialData.created = this.creed.user.created_at;
    this.userIntialData.updated = this.creed.user.updated_at;
    this.userIntialData.name = this.creed.user.nameLastname || '';
    this.createForm();
  }

  update() {
    console.log(this.updateForm.value);
    const { email, password, bDate, name } = this.updateForm.value;
    let user = this.creed.user;
    user.email = email;
    user.birthDate = bDate || this.creed.user.birthDate;
    user.nameLastname = name || this.creed.user.nameLastname;
    if (password && password.length > 0) {
      user.password = password;
    }
    this._us.update(user, this.creed.jwt).subscribe(
      data => {
        if (data.id && data.email) {
          alert('saved');
          this._us.getMe(this.creed.jwt).subscribe(dataNew => {
            if (dataNew.id && dataNew.email) {
              const creedNew = this.creed;
              creedNew.user = dataNew;
              console.log('save ', creedNew);
              this.cd.setCredentials(creedNew);
            }
          });
        }

        console.log(data);
      },
      error => {
        alert('Cant save ' + error);
        console.log(error);
      }
    );
  }

  private createForm() {
    this.updateForm = this.formBuilder.group({
      email: [this.userIntialData.email, Validators.required],
      password: [''],
      name: [''],
      bDate: ['']
    });
  }
}
