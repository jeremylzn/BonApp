import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/login-response-data.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminService } from 'src/app/shared/services/admin.service';


@Component({
  selector: 'tr[app-useritem]',
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.css']
})
export class UseritemComponent implements OnInit {
  @Input() user: User;

  public itemToUpdate = {}

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  // https://sweetalert2.github.io/
  updateAlertBox(){
    Swal.mixin({
      icon: 'warning',
      title: 'What do you want to update?',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        input: 'select',
        inputOptions: {
          'isAdmin':'Admin',
          'name':'Full Name',
          'email': 'Email',
          'password':'Password'
        },
        preConfirm: (value) => {  // If the choice is ADMIN (to line 78)
          if (value == 'isAdmin'){
            Swal.mixin({
              confirmButtonText: 'Next &rarr;',
              progressSteps: ['2'],
              showCancelButton: true
            }).queue([
              {
                icon: 'warning',
                title: 'Choice Yes or No',
                input: 'radio',
                inputOptions: {
                  'true':'Yes',
                  'false':'No',
                },
                preConfirm: (value) => {
                  if (value=='true'){
                    this.itemToUpdate["isAdmin"] = true
                    this.adminService.updateUser(this.itemToUpdate,this.user._id).subscribe((res) => {console.log(res)});
                  }
                  else {
                    this.itemToUpdate["isAdmin"] = false
                    this.adminService.updateUser(this.itemToUpdate,this.user._id).subscribe((res) => {console.log(res)});
                  }

                }
              }
            ]).then((res)=>{ 
              if (res["dismiss"] === 'cancel' || res["dismiss"] === 'backdrop') // If  click on CANCEL or on background (in choice ADMIN)
                return
              Swal.fire({
                title :'Updated!',
                text : 'The user has been updated.',
                icon : 'success'
              })
            })
          }
        }
      },{
        // If the choice isn't ADMIN
        text:'new value :',
        input:'text'
      }
    ]).then((res)=>{
      this.itemToUpdate[res.value[0]] = res.value[1]
      console.log(this.itemToUpdate)
      this.adminService.updateUser(this.itemToUpdate,this.user._id).subscribe((res) => {console.log(res)});
      Swal.fire({
        title :'Updated!',
        text : 'The user has been updated.',
        icon : 'success'
      })
    }).catch((err) => {}) // If  click on CANCEL or on background (in choice NAME, EMAIL, PASSWORD)



  }

  deleteAlertBox(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((res) => {
      if (res.isConfirmed) {
        this.adminService.deleteUser(this.user._id).subscribe((res) => {});
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      } else return
    })

  }

}
