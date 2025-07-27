import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';



@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username : string = 'rushikesh';
  logout(){
    
  }
}
