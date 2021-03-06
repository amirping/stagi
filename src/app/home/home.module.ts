import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StageComponent, RequestDialog } from '@app/stage/stage.component';
import { ProfileComponent } from '@app/profile/profile.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    Angulartics2Module,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, StageComponent, ProfileComponent, RequestDialog],
  entryComponents: [RequestDialog]
})
export class HomeModule {}
