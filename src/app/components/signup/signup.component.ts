import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alertService : AlertService
  ) {
  }

  ngOnInit() {
    if (this.api.getData('token')) {
      this.router.navigate(['post']);
    }
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    let credentials = {
      username : this.f['fullname'].value,
      email : this.f['email'].value,
      password : this.f['password'].value
    }
    this.api.signup(credentials).subscribe(res =>{
      if (res['token']){
        this.api.setData(res['token'],'token')
        this.alertService.success('Signup Successfull');
        this.router.navigate(['post']);
      }
      else if (res['message']){
        this.alertService.warning(res['message']);
      }
    })
  }
}
