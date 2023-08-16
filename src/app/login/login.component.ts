import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  returnUrl: string;
  error = '';
  private errorMessageHidden = false;



  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    // Check if the user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  ngAfterContentInit(): void {
    if (!this.errorMessageHidden) {
      this.hideErrorMessage();
      this.errorMessageHidden = true;
    }

    document.querySelectorAll("input")[0]!.onfocus = document.querySelectorAll("input")[1]!.onfocus = ()=>{this.hideErrorMessage();
      document.querySelectorAll("input")[0]!.onkeydown = document.querySelectorAll("input")[1]!.onkeydown = ()=> 
      {
        document.querySelectorAll("input")[0].classList.remove('border','border-danger');
        document.querySelectorAll("input")[1].classList.remove('border','border-danger');
      }
    };
  }

  private hideErrorMessage(): void {
    this.error = ''; // Reset the error message to an empty string to hide it.
    const alertMessage = document.querySelector(".alert-message");
    if (alertMessage) {
     alertMessage.classList.remove("show");
     alertMessage.classList.add('hidden');
    }
  }
  private showErrorMessage(): void {
    const alertMessage = document.querySelector(".alert-message");
    if (alertMessage) {
      alertMessage.classList.add('show');
      alertMessage.classList.remove("hidden");
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.error = error.error.message;
        this.showErrorMessage();
      }
    );
  }

}


