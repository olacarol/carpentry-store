import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {

  images: string[] = [];
  currentIndex = 0;
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadImages();
    }
  }

  loadImages() {
    let index = 1;

    const tryLoad = () => {
      const path = `assets/images/marcenaria${index}.png`;
      const img = new Image();

      img.onload = () => {
        this.images.push(path);
        index++;
        tryLoad();
      };

      img.onerror = () => {
        console.log('Total de imagens encontradas:', this.images.length);

        if (this.images.length > 0) {
          this.startTimer();
        }
      };

      img.src = path;
    };

    tryLoad();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.images.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}