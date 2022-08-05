import { NgModule } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { PhonePipe } from './../../shared/pipe/phone.pipe';
import { ZipcodePipe } from './../../shared/pipe/zipcode.pipe';
import { ToolbarComponent } from './toolbar.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [ToolbarComponent, SellerProfileComponent, AboutComponent],
    imports: [SharedModule],
    exports: [ToolbarComponent],
    providers: [DocumentPipe, ZipcodePipe, PhonePipe]
})
export class ToolbarModule {}
