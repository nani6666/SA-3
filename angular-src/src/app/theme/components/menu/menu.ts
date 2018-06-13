export const menuItems = [
  {
    title: 'Listing',
    routerLink: 'form-elements',
    icon: 'fa-list',
    selected: false,
    expanded: false,
    order: 400,
    subMenu: [
      /*{
        title: 'Form Inputs',
        routerLink: 'form-elements/inputs'
      },
      {
        title: 'Form Layouts',
        routerLink: 'form-elements/layouts'
      },
      {
        title: 'Form Validations',
        routerLink: 'form-elements/validations'
      },*/
      
      {
        title: 'My Services',
         icon: 'fa-product-hunt',
        routerLink: 'service',
      },
      {
        title: 'Add Service',
        icon: 'fa-plus',
        routerLink: 'service/addService'
      }
    ]
  },  

  /*{
    title: 'Pages',
    routerLink: ' ',
    icon: 'fa-file-o',
    selected: false,
    expanded: false,
    order: 650,
    subMenu: [        
      {
        title: 'Login',
        routerLink: '/login'
      },
      {
        title: 'Register',
        routerLink: '/register'
      },
      {
        title: 'Blank Page',
        routerLink: 'blank'
      },
      {
        title: 'Error Page',
        routerLink: '/pagenotfound'
      }
    ]
  }*/
  
];
