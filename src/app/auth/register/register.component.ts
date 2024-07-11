import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(  private userService: UserService,
                private fb: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute){

                  activatedRoute.queryParams.subscribe( ({referCode}) => {
                    
                    if (referCode) {
                      localStorage.setItem('referCode', referCode);
                    }else{
                      localStorage.setItem('referCode', '');
                    }

                  })

                }

  /** ================================================================
   *   REGISTER
  ==================================================================== */
  public formSubmitted: boolean = false;
  public newForm = this.fb.group({
    name:       ['',    [Validators.required]],
    lastname:   ['',    [Validators.required]],
    cedula:   ['',    [Validators.required]],
    phone:      ['',    [Validators.required]],
    email:      ['',    [Validators.required]],
    password:   ['',    [Validators.required]],
    repassword: ['',    [Validators.required]],
    termns:     [false, [Validators.requiredTrue]],
    referredBy: ''
  })

  register(){

    this.formSubmitted = true;

    if (this.newForm.invalid) {
      return;
    }

    if (this.newForm.value.password !== this.newForm.value.repassword) {
      Swal.fire('Atención', 'Las contraseñas no son iguales', 'warning');
      return;
    }

    this.newForm.value.referredBy = localStorage.getItem('referCode') || '';

    this.userService.register(this.newForm.value)
        .subscribe( ({}) => {

          this.formSubmitted = false;
          Swal.fire('Estupendo', 'se ha registrado exitosamente', 'success');
          this.newForm.reset();

          this.router.navigateByUrl('/login');
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  validate(campo: string): boolean{
    if (this.formSubmitted && this.newForm.get(campo)?.invalid ) {
      return true;
    }else{
      return false;
    }
  }

}
