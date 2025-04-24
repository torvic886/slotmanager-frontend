import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  errorMessage = '';
  loading = false;
  
  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/maquinas']);
          this.loading = false;
        },
        error: err => {
          this.errorMessage = 'Correo o contraseña incorrectos.';
          this.loading = false;
        }
      });
    }
  }
  
  onForgotPassword(event: Event) {
    event.preventDefault();
    // Aquí muestra un modal, redirecciona o lanza una alerta
    alert('Funcionalidad próximamente disponible.');
  }
}

