import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
darkModeEnabled = false;


constructor(public authService: AuthService) {
}
ngAfterViewChecked(): void {
  this.updateDarkMode();
}
ngOnInit(): void {
  // Check localStorage for saved dark mode preference
  this.darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled') || 'false');

  localStorage.setItem('darkModeEnabled', JSON.stringify(this.darkModeEnabled));
}

toggleDarkMode(): void {
  this.darkModeEnabled = !this.darkModeEnabled;
  this.updateDarkMode();

  // Save dark mode preference to localStorage
  localStorage.setItem('darkModeEnabled', JSON.stringify(this.darkModeEnabled));
}

updateDarkMode(): void {

  if (this.darkModeEnabled) {
    document.body.classList.add('dark-mode');
    document.querySelector(".container")?.classList.add("dark-mode");
    document.querySelector("nav")?.classList.add("dark-mode");
    document.querySelector(".navbar-brand")?.classList.add("dark-mode");
    document.querySelectorAll(".nav-link")?.forEach(val=>val.classList.add("nav-dark-mode"));
    (document.querySelector(".darkM") as HTMLImageElement).src =  '../../assets/images/modes/moon_active.png';
    document.querySelectorAll(".card")?.forEach(val=>val.classList.add("dark-card"));
    document.querySelector(".footer")?.classList.add("dark-footer");
    document.querySelectorAll(".right-post")?.forEach(val=>val.classList.add("dark-mode"));
    document.querySelector(".right-ul")?.classList.add("dark-ul");
  } else {
    document.querySelector(".nav-link")?.classList.remove("dark-mode");
    document.body.classList.remove('dark-mode');
    document.querySelector(".container")?.classList.remove("dark-mode");
    document.querySelector("nav")?.classList.remove("dark-mode");
    document.querySelector(".navbar-brand")?.classList.remove("dark-mode");
    document.querySelectorAll(".nav-link")?.forEach(val=>val.classList.remove("nav-dark-mode"));
    (document.querySelector(".darkM") as HTMLImageElement).src =  '../../assets/images/modes/moon_inactive.png';
    document.querySelectorAll(".card")?.forEach(val=>val.classList.remove("dark-card"));
    document.querySelector(".footer")?.classList.remove("dark-footer"); 
    document.querySelectorAll(".right-post")?.forEach(val=>val.classList.remove("dark-mode"));
    document.querySelector(".right-ul")?.classList.remove("dark-ul");
  }
}
}
