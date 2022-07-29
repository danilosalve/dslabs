import { NgModule } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { PhonePipe } from './../../shared/pipe/phone.pipe';
import { ZipcodePipe } from './../../shared/pipe/zipcode.pipe';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [SharedModule],
    exports: [ToolbarComponent],
    providers: [DocumentPipe, ZipcodePipe, PhonePipe]
})
export class ToolbarModule {}
