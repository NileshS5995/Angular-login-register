import { AuthenticationService } from './../../service/authentication.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { Router} from '@angular/router';
// import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public loading = false;
  public users: any = [];
  constructor(public userService: UserService, 
    public authenticationService:AuthenticationService,
    public router: Router
    ) { }

  ngOnInit(): void {
        this.getUsers();
    }

  getUsers() {
      this.loading = true;
        this.userService.getAll().subscribe(users => {
            this.loading = false;
            this.users = users;
        });
      }
    logout () {
      this.authenticationService.logout();
      this.router.navigate(['/login']);

    }
}
