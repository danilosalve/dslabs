import { Component, Input, OnInit } from '@angular/core';
import { PermissionsService } from '@app/core/permissions/shared/services/permissions.service';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { PhonePipe } from '@app/shared/pipe/phone.pipe';
import { ZipcodePipe } from '@app/shared/pipe/zipcode.pipe';
import { Seller } from './../../../shared/interfaces/seller';
import { SellerModel } from './../../../shared/model/seller.model';

@Component({
    selector: 'app-seller-profile',
    templateUrl: './seller-profile.component.html'
})
export class SellerProfileComponent implements OnInit {
    @Input() seller: Seller = new SellerModel();
    @Input() avatarUrl: string = '';
    canVisualizeCustomer = false;

    constructor(
        private documentPipe: DocumentPipe,
        private phonePipe: PhonePipe,
        private zipcodePipe: ZipcodePipe,
        private permissionsService: PermissionsService
    ) {}

  ngOnInit(): void {
    this.handlePermissionUser();
  }

    transformDocumentSeller(document: string): string {
        return this.documentPipe.transform(document);
    }

    transformBirthDaySeller(birthday: Date): string {
        const date =
            typeof birthday.toLocaleDateString === 'function'
                ? birthday
                : new Date(birthday);
        return date ? date.toLocaleDateString() : '';
    }

    transformPhoneSeller(phone: number): string {
        return this.phonePipe.transform(phone);
    }

    transformZipCodeSeller(zipCode: string): string {
        return this.zipcodePipe.transform(zipCode);
    }

    handlePermissionUser(): void {
      this.canVisualizeCustomer = this.permissionsService.canVisualizeById(0);
    }

    onChangePermissionCustomerView(): void {
      this.permissionsService.updatePermissionCustomer(this.canVisualizeCustomer);
    }
}
