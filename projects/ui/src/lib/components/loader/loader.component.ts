import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-loader',
  template: `<div class="loader-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>`,
  styles: [
    `
    .loader-ellipsis {
      display: inline-flex;
    }
    .loader-ellipsis div {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--primary-color);
    }
    .loader-ellipsis div:nth-child(1) {
      margin-left: 0;
      animation: loader-ellipsis1 0.6s infinite;
    }
    .loader-ellipsis div:nth-child(2) {
      margin-left: -10px;
      animation: loader-ellipsis2 0.6s infinite;
    }
    .loader-ellipsis div:nth-child(3) {
      margin-left: 8px;
      animation: loader-ellipsis2 0.6s infinite;
    }
    .loader-ellipsis div:nth-child(4) {
      margin-left: 8px;
      animation: loader-ellipsis3 0.6s infinite;
    }
    @keyframes loader-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes loader-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes loader-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(18px, 0);
      }
    }
    `
  ]
})
export class LoaderComponent {}
