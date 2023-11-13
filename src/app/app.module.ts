import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { taskReducer } from './store/reducer/task.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      tasks: taskReducer,
    }),
    StoreDevtoolsModule.instrument({
      // maxAge: 25,
      logOnly: environment.production, // Restrict extension to log-only mode in production
      // autoPause: true,
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
