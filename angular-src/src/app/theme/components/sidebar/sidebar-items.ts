import { SidebarItem } from './sidebar-item.model';

export const sidebarItems = [ 
    new SidebarItem (1, 'Dashboard', 'pages/dashboard', null, 'fa-home', null, false, 0),
    new SidebarItem (2, 'Form Elements', null, null, 'fa-pencil-square-o', null, true, 0),    
    new SidebarItem (3, 'Form Wizard', 'pages/form-elements/wizard', null, 'fa-caret-right', null, false, 2),
    new SidebarItem (4, 'Form Wizard', 'pages/form-elements/validations', null, 'fa-caret-right', null, false, 2)
];