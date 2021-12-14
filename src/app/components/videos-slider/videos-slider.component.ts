// npm i swiper
// https://swiperjs.com/swiper-api
// https://swiperjs.com/demos
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { videosList } from './videos-list'

interface VideoListInterface {
  url: number
  title: string
}

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper'

SwiperCore.use([Navigation])

@Component({
  selector: 'app-videos-slider',
  templateUrl: './videos-slider.component.html',
  styleUrls: ['./videos-slider.component.scss'],
  encapsulation: ViewEncapsulation.None, // torna o style desse componente GLOBAL!
  // necessário por causa do swiper. Nomear as classes desse file com nomes bem
  // únicos!
})
export class VideosSliderComponent implements OnInit {
  videosList = videosList
  urlSafe: SafeResourceUrl[] = []

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    for (let i = 0; i < videosList.length; i++) {
      this.urlSafe[i] = this.sanitizer.bypassSecurityTrustResourceUrl(
        videosList[i].url
      )
    }
  }
}
