import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  hideNavbar: boolean = false
  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true)
  }

  scrollEvent = (event: any): void => {
    const scrollPositionY = event.srcElement.scrollingElement.scrollTop
    if (scrollPositionY > 60 && !this.hideNavbar) {
      this.hideNavbar = true
    } else if (scrollPositionY < 60 && this.hideNavbar) {
      this.hideNavbar = false
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true)
  }
}
