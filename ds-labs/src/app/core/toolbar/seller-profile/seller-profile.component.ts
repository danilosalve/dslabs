import { Component, Input } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { PhonePipe } from '@app/shared/pipe/phone.pipe';
import { ZipcodePipe } from '@app/shared/pipe/zipcode.pipe';
import { Seller } from './../../../shared/interfaces/seller';
import { SellerModel } from './../../../shared/model/seller.model';

@Component({
    selector: 'app-seller-profile',
    templateUrl: './seller-profile.component.html'
})
export class SellerProfileComponent {
    @Input() seller: Seller = new SellerModel();
    @Input() avatarUrl: string = '';

    constructor(
        private documentPipe: DocumentPipe,
        private phonePipe: PhonePipe,
        private zipcodePipe: ZipcodePipe
    ) {}

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
}
