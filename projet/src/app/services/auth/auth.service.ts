import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorage } from 'src/app/security/tokenStorage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private tokenStorage:TokenStorage) { }

  onSignIn(guest:{username:string,password:string}){
    return new Promise((resolve, reject) =>{
      this.http.post('http://localhost:4200/api/account/login/',guest).subscribe(
        (response:any)=>{
          this.tokenStorage.saveToken(response.token);
          resolve(response);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  onSignUp(guest:{username:string,email:string,password:string}){
    return new Promise((resolve, reject) =>{
      this.http.post('http://localhost:4200/api/account/register/',guest).subscribe(
        (response:any)=>{
          this.tokenStorage.saveToken(response.token);
          resolve(response);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  isLoggedIn(){
    if(this.getJwtToken()) return true;
      return false;
  }

  getJwtToken(){
    return this.tokenStorage.getToken();
  }

}
