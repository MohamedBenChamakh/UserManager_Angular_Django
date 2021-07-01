import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm:FormGroup;
  registerForm:FormGroup;

  @ViewChild('loginText') loginText:ElementRef;
  @ViewChild('loginForm') loginForm:ElementRef;
  signUpBtn:Boolean=false;

  errorMsgLogin:string;
  errorMsgRegister:string;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) this.router.navigate(['/','Manage']);
    this.initAuthForm();
    this.initRegisterForm();
  }

  initAuthForm(){
    this.authForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }
  initRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      cpassword:['',Validators.required]
    })
  }

  onSignIn(){
   this.errorMsgLogin="";
   const forms = this.authForm.value;
   this.authService.onSignIn({username:forms.email,password:forms.password}).then(
    () =>{
      this.router.navigate(['/','Manage']);
    },
    (exception)=>{
      this.errorMsgLogin=exception.error.non_field_errors[0];
    })
  }

  onSignUp(){
    this.errorMsgRegister="";
    const forms = this.registerForm.value;
    const words= forms.email.split('@');
    if(forms.password!==forms.cpassword)
      this.errorMsgRegister= 'Les mots de passe ne sont pas identiques';
    else
      this.authService.onSignUp({email:forms.email,username:words[0],password:forms.password}).then(
      () =>{
        this.router.navigate(['/','Manage']);
      },
      (exception)=>{
        this.errorMsgRegister=exception.error.non_field_errors[0];
      })
  }


  switch(value:string){
   this.loginForm.nativeElement.style.marginLeft = value;
   this.loginText.nativeElement.style.marginLeft = value;
   this.signUpBtn=!this.signUpBtn;
  }


}
