import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Role, ROLE_LABELS } from '../role.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly roles = Object.values(Role);
  readonly roleLabels = ROLE_LABELS;
  selectedRole: Role = Role.Guest;

  private readonly authService = inject(AuthService);

  onLogin(): void {
    this.authService.login(this.selectedRole);
  }
}
