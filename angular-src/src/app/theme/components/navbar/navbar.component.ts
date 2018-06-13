import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../../app.state';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'az-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ SidebarService ]
})

export class NavbarComponent {
    public isMenuCollapsed:boolean = false;

    constructor(private _state:AppState, private _sidebarService:SidebarService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public closeSubMenus(){
       /* when using <az-sidebar> instead of <az-menu> uncomment this line */
      // this._sidebarService.closeAllSubMenus();
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed; 
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);        
    }

}
