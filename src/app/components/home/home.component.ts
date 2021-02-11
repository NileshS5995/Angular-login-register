import { AuthenticationService } from './../../service/authentication.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService, 
    public userService: UserService,
    private router: Router,) {
    this.currentUser = this.authenticationService.currentUserValue;
   }
  loading = false;
  currentUser: User;
  userFromApi: User;
  ngOnInit(): void {
    this.loading = true;
  }

  logout () {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
