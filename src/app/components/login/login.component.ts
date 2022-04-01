import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AlertService} from "ngx-alerts";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        if (this.api.getData('token')) {
            this.router.navigate(['post']);
        }
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
            password: ['', Validators.required]
        });

    }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    onSubmit() {
        let credentials = {
            email: this.f['email'].value,
            password: this.f['password'].value
        }
        this.api.login(credentials).subscribe(res => {
            if (res['token']) {
                this.api.setData(res['token'], 'token')
                this.alertService.success('Login Successfull');
                this.router.navigate(['post']);
            } else if (res['message']) {
                this.alertService.warning(res['message']);
            }
        })
    }
}
