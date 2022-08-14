import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  public loginForm! :FormGroup


  constructor(private formBuilder : FormBuilder,private http: HttpClient,private router : Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupuser")
    .subscribe(res=>{
        const user = res.find ((a:any)=>{
          return a.email ===this.loginForm.value.email &&  a.password ===this.loginForm.value.password
        });
        if (user){
          alert ("Login Success");
          this.loginForm.reset();
          this.router.navigate([''])
        }else {
          alert("user not found!");
        } (err: any) =>{
          alert("Something went wrong ")
        }
    })
  }

}
