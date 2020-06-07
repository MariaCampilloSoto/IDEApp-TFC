import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/userClass';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  providerid: string = 'null';

  constructor(private authService: AuthService) {
    this.user = new User();
   }

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user =>{
      if(user){
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.providerid = user.providerData[0].providerId;
        console.log('user: ', user);
      }
    })
  }

}

