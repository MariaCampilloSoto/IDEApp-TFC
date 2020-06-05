import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface;

  providerid: string = 'null';

  constructor(private authService: AuthService) { }

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

