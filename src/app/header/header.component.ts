import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
