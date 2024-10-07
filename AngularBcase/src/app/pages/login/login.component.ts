import { Component, inject } from '@angular/core';
import { LoginFormComponent, LoginFormContent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  errMsg?: string

  async onSubmitLogin(creds: LoginFormContent): Promise<void> {

    try {
      await this.authService.login(creds.email, creds.password, creds.stayConnected)
      this.router.navigateByUrl('/') //route mis dans le app.routes.ts
    } catch (e: unknown) {
      this.errMsg = typeof e === 'string' ? e : 'Une erreur est survenue'
    }
  }
}
