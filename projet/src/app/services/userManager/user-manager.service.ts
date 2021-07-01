import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {


  users:User[]=[];
  usersSubject=new Subject<User[]>();


  
  constructor(private http:HttpClient) { }

  getList(){
    return new Promise((resolve, reject) =>{
      this.http.get<User[]>('http://localhost:4200/api/users/list/').subscribe(
        (response:User[])=>{
          this.users=response;
          this.emitUsers();
          resolve(true);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  onSave(guest: { fullname: string; email: string; phone: string; }) {
    return new Promise((resolve, reject) =>{
      this.http.post('http://localhost:4200/api/users/insert/',guest).subscribe(
        (response:User)=>{
          this.users.push(response);
          this.emitUsers();
          resolve(true);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  onDelete(id: number) {
    return new Promise((resolve, reject) =>{
      this.http.delete('http://localhost:4200/api/users/delete/'+id).subscribe(
        (response:User)=>{
          const index= this.users.findIndex(
            (element)=>{
              if(element.id==id){
                return true;
              }
            }
          );
          if(index>-1)  this.users.splice(index,1);
          this.emitUsers();
          resolve(true);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  put(user:User) {
    return new Promise((resolve, reject) =>{
      this.http.put('http://localhost:4200/api/users/update/',user).subscribe(
        (response:User)=>{
          const index= this.users.findIndex(
            (element)=>{
              if(element.id==user.id){
                return true;
              }
            }
          );
          if(index>-1) this.users.splice(index,1,response);
          this.emitUsers();
          resolve(true);
        },
        (exception)=>{
          reject(exception);
        }
      )
    })
  }

  emitUsers(){
    this.usersSubject.next(this.users);
  }
}
