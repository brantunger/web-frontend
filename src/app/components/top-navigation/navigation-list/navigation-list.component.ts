import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss']
})
export class NavigationListComponent {
  @Output() onNavLinkClick = new EventEmitter();
  
  navigationClose(): void {
    this.onNavLinkClick.emit();
  }
}
