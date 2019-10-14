import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  user: any;

  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userSvc.getCurrentUserNoPassword();
  }

}
