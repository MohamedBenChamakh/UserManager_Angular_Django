import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { TokenStorage } from '../security/tokenStorage';
import { UserManagerService } from '../services/userManager/user-manager.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  users:User[];
  usersSubscription:Subscription;

  @ViewChild('closebutton') closebutton;

  userForm:FormGroup;

  @ViewChild('table') table:ElementRef;

  edit:number=null;
  keyword:string;

  constructor(private tokenStorage:TokenStorage,private router:Router,private userManagerService:UserManagerService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.usersSubscription=this.userManagerService.usersSubject.subscribe(
      (users:User[]) =>{
        this.users=users;
      }
    )
    this.userManagerService.getList();
    this.initForm();
  }

  initForm(){
    this.userForm=this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
    })
  }

  onSave(){
    const forms =this.userForm.value;
    this.userManagerService.onSave({fullname:forms.fullname,email:forms.email,phone:forms.phone}).then(
      ()=>{
        this.closebutton.nativeElement.click();
      }
    )
  }

  onDelete(id:number){
    this.userManagerService.onDelete(id)
  }

  enableEdit(i:number) {
    this.edit=i;
    const children=this.table.nativeElement.children[i].children;
    children[1].children[0].removeAttribute('readonly');
    children[2].children[0].removeAttribute('readonly');
    children[3].children[0].removeAttribute('readonly');
    }

    onUpdate(user:User,i:number){
      const old=user;
      this.edit=null;
      const children=this.table.nativeElement.children[i].children;
      children[1].children[0].setAttribute('readonly',true);
      children[2].children[0].setAttribute('readonly',true);
      children[3].children[0].setAttribute('readonly',true);
      user.fullname=children[1].children[0].value;
      user.phone=children[2].children[0].value;
      user.email=children[3].children[0].value;
      
      this.userManagerService.put(user);
      
    }

    search(){
     if(this.keyword==""){
             this.userManagerService.getList();
     }else{
          this.users=this.users.filter(element=>{
            let match;
            if(match=element.fullname.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase()))
              return match;
            else if(match=element.phone.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase()))
              return match;
            else if(match=element.email.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase()))
              return match;
          })
     }
   }

  logout(){
    this.tokenStorage.clear();
    this.router.navigate(['/']);
  }
}
