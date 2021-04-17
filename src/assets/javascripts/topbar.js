

// Nous créons les références pour notre menu et l’icône du menu :
const iconMobile = document.querySelector( ".header-menu-icon" );
const headerMenu = document.querySelector( ".header-menu" );

// Cette propriété permettra de savoir si le menu est ouvert :
let isMenuOpen = false;
// Cette propriété permettra de savoir si le menu mobile est créé :
let mobileMenuDOM;




// Nous créons une div et nous ajoutons la classe mobile-menu.
// Nous empêchons la fermeture du menu sur un clic à l’intérieur.
// Nous y clonons ensuite les liens du menu normal.
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement( "div" );
  mobileMenuDOM.classList.add( "mobile-menu" );
  mobileMenuDOM.addEventListener( "click", event => {
    event.stopPropagation();
  } );
  mobileMenuDOM.append( headerMenu.querySelector( "ul" ).cloneNode( true ) );
  iconMobile.append( mobileMenuDOM );
};

// Pour fermer le menu il suffit d’enlever la classe open sur le menu, s'il n'est pas créé nous le créons :

const closeMenu = () => {
  mobileMenuDOM && mobileMenuDOM.classList.contains( 'open' ) ?
    mobileMenuDOM.classList.remove( "open" ) :
    createMobileMenu();
  mobileMenuDOM.classList.add( "close" );
  console.log('menu close');

};

// Si le menu n’est pas créé nous le créons.
// Dans tous les cas nous l’ouvrons en ajoutant la classe open :
const openMenu = () => {
  if ( !mobileMenuDOM ) {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add( "open" );
  mobileMenuDOM.classList.remove( "close" );
  console.log('menu open');
};

// Permet d’ouvrir ou de fermer le menu en fonction de son état :
const toggleMobileMenu = event => {
  if ( isMenuOpen ) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

// Un clic sur l’icône va ouvrir ou fermer le menu 
// et empêcher la propagation de l’événement à window :
iconMobile.addEventListener( "click", event => {
  event.stopPropagation();
  toggleMobileMenu();
} );

// Nous récupérons les clics sur window pour fermer le menu.
window.addEventListener( "click", () => {
  if ( isMenuOpen ) {
    toggleMobileMenu();
  }
} );

// Si la fenêtre est agrandie et qu’elle dépasse 480px de largeur
// Alors nous fermons le menu si il est ouvert :
window.addEventListener( "resize", event => {
  if ( window.innerWidth > 767 && isMenuOpen ) {
    toggleMobileMenu();
  }
} );



//  toggle class * 2 active on links to make sure it's created and return it to it's original state
toggleMobileMenu();
toggleMobileMenu();

// active the class active on both mobile and desktop menu on matching click
// without using location because many links point to just 2 different pages
// I discovered there is a native key 'active' in sessionStorage Api containing 
// the current page url

const links = document.querySelectorAll( 'a' );
let activeLink;


if ( sessionStorage.getItem( 'activeL' ) ) {
  
  activeLink = sessionStorage.getItem( 'activeL' );
  console.log(activeLink);
  console.log(sessionStorage.getItem( 'activeL' ));
  const NodeList = document.querySelectorAll( `a.${ activeLink }` );
  NodeList.forEach( el => {
    console.log( el );
    el.classList.add( 'active' );
  } );
} else {
  document.querySelectorAll( 'a.rr' ).forEach( elt => {
    elt.classList.add( 'active' );
    sessionStorage.setItem('activeL', 'ac')
    console.log( elt );
  } );
  
}

links.forEach( link => {
  link.addEventListener( 'click', e => {
    e.stopPropagation();
    e.preventDefault();
    let linkId;
    links.forEach( link => {
      link.classList.remove( 'active' );
    } );
    link.classList.add( 'active' );
    link.getAttribute( 'id' ) ?
      linkId = link.getAttribute( 'id' )
      :
      linkId = 'ac';
    console.log( linkId );
    sessionStorage.setItem( 'activeL', linkId );
    console.log( sessionStorage.getItem( 'activeL' ) );
    e.target.getAttribute( 'href' ) ?
      window.location = e.target.getAttribute( 'href' ) :
      window.location = e.target.parentNode.getAttribute( 'href' );
  } );
} );


