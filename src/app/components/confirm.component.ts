import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {


  user: any = { id: 'USR008', name: 'Sandy',  email: 'email@email.com',  password: 'AAA',  gender: 'Female',  dob: '12 October 1998',
    address: 'Address',  contact: '(+65)-51234-5678',  country: 'Singapore', regDate: '13 October 2019' };


  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    // this.user = this.userSvc.getCurrentUser();
  }

}
