import { Injectable } from '@angular/core';
import { TypeDevice } from '../interfaces/type-device.enum';
import { Device } from './../interfaces/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  width: number;

  constructor() {
    this.width = this.getWindowWidth();
  }

  isSmartphone(): boolean {
    return this.width < 576;
  }

  getWindowWidth(): number {
    return window.innerWidth;
  }

  refreshWidth(): void {
    this.width = this.getWindowWidth();
  }

  isTablet(): boolean {
    return this.width >= 576 && this.width < 700;
  }

  isMonitorSmall (): boolean {
    return this.width >= 700 && this.width < 992;
  }

  isMonitorLarge(): boolean {
    return this.width >= 992;
  }

  getDevice(): Device {
    let device: Device = {
      type: TypeDevice.SMARTPHONE,
      isMobile: false
    };
    this.refreshWidth();

    if (this.isSmartphone()) {
      device.type = TypeDevice.SMARTPHONE;
      device.isMobile = true;
    } else if (this.isTablet()) {
      device.type = TypeDevice.TABLET;
      device.isMobile = true;
    } else if (this.isMonitorSmall()) {
      device.type = TypeDevice.MONITORSMALL;
      device.isMobile = false;
    } else {
      device.type = TypeDevice.MONITORLARGE;
      device.isMobile = false;
    }

    return device;
  }
}
