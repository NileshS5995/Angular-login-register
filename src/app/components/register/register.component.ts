import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

// public loginForm: FormGroup;
public loginForm: FormGroup;
public loading = false;
public submitted = false;
public returnUrl: string;
public error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
 // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    var data = {
      "name" : this.f.name.value,
      "username": this.f.username.value,
      "password" : this.f.password.value,
      "role" : this.f.role.value

      }
    this.authenticationService.register(data)
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
                this.router.navigate(['login']);
            },
            error => {
              console.log(error, 'this.error')
                this.error = error;
                this.loading = false;
            });
}

}


