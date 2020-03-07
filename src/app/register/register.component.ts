import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/core/http/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private uS: UserService) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  private register() {
    const { email, username, password } = this.registerForm.value;
    console.log(email);
    this.uS.register({ email, username, password }).subscribe(
      data => {
        if (data.id && data.username === username) {
          alert('register avec success');
        }
      },
      error => {
        alert(error);
      }
    );
  }
}
