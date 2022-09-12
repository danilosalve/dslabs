import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceService } from './../../services/device.service';

export const DEVICE_BUTTON_STYLE = 'po-xl-3 po-lg-4 po-md-3 po-sm-12';
@Component({
  selector: 'app-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.css']
})
export class ViewButtonComponent implements OnInit {
  @Output() changeDevice = new EventEmitter();
  isSmartPhone = false;
  isRelativePosition = false;
  label = '';
  icon = '';
  class = '.rel-container';

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.isSmartPhone = this.deviceService.isSmartphone();
    this.handleDevice(this.isSmartPhone);
    this.emitDeviceChange(this.isSmartPhone);
  }

  handleDevice(isSmartPhone: boolean): void {
    if (isSmartPhone) {
      this.label = 'Tabela';
      this.icon = 'po-icon-list';
    } else {
      this.label = 'Lista';
      this.icon = 'po-icon-grid';
    }
    this.setClassDevice();
    this.emitDeviceChange(isSmartPhone);
  }

  onChangeDevice(): void {
    this.isSmartPhone = !this.isSmartPhone;
    this.handleDevice(this.isSmartPhone);
  }
  setClassDevice(): void {
    if (!this.canUseSmartPhoneStyle()){
      this.class = DEVICE_BUTTON_STYLE;
    }
  }

  canUseSmartPhoneStyle(): boolean {
    return this.isRelativePosition;
  }

  emitDeviceChange(isSmartphone: boolean): void {
    this.changeDevice.emit({isSmartphone, class: this.class});
  }
}
