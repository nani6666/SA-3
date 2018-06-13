import { Component, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute , NavigationEnd } from '@angular/router';
import { AppState } from "../../../app.state";
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'az-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [ SidebarService ]
})
export class SidebarComponent implements OnInit {
  public sidebarItems:Array<any>;
  public menuHeight:number;
  public isMenuCollapsed:boolean = false;
  public isMenuShouldCollapsed:boolean = false;
  public showHoverElem:boolean;
  public hoverElemHeight:number;
  public hoverElemTop:number;
  constructor(private _elementRef:ElementRef,
              private _sidebarService:SidebarService,
              private _state:AppState,
              private _router:Router,
              private _activatedRoute:ActivatedRoute) { 
      
      this.sidebarItems = _sidebarService.getSidebarItems();
      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
          this.isMenuCollapsed = isCollapsed;
          if(isCollapsed){
            this._sidebarService.closeAllSubMenus();
          }
          else{
            this._sidebarService.showActiveSubMenu(this.sidebarItems);
          }            
      });

      this._router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
              if(width <= 768){
                  this._state.notifyDataChanged('menu.isCollapsed', true);                  
              }
              window.scrollTo(0, 0); 
              let activeLink = this._sidebarService.getActiveLink(this.sidebarItems);
              this._sidebarService.setActiveLink(this.sidebarItems, activeLink);         
          }                
      }); 

      this._state.subscribe('menu.hovered', ($event) => {
         this.hoverItem($event);       
      });

  }

    public ngOnInit():void {
        let menu_wrapper = this._elementRef.nativeElement.children[0];
        let sidebar_menu = document.getElementById('sidebar-menu');
        this._sidebarService.createSidebarMenu(this.sidebarItems, sidebar_menu);
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
        this.updateSidebarHeight();
    }

    @HostListener('window:resize')
    public onWindowResize():void {
        var isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
        if(isMenuShouldCollapsed){
          this._sidebarService.closeAllSubMenus();
        }
        else{
          this._sidebarService.showActiveSubMenu(this.sidebarItems);
        }   
    }

    private _shouldMenuCollapse():boolean {
        return window.innerWidth <= 768;
    }

    public menuCollapse():void {
        this.menuCollapseStateChange(true);        
    }

    public menuCollapseStateChange(isCollapsed:boolean):void {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        this._sidebarService.closeAllSubMenus();
    }
 
    public updateSidebarHeight():void {
       this.menuHeight =  this._elementRef.nativeElement.children[0].clientHeight - 60;
    }

    public hoverItem($event):void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 60;
    }

    ngAfterViewInit(){
      this._sidebarService.showActiveSubMenu(this.sidebarItems);
    }  



}
