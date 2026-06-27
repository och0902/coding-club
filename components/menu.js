const handleClick = (id) => {
   const cardContainers = document.querySelectorAll('.card-container');
   cardContainers.forEach((cardContainer, i) => {
      cardContainer.classList.remove('active');
   });
   document.getElementById(id).classList.add('active');
};

class Menu extends HTMLElement {
   constructor () {
      super();
      this.render();
   };
   render() {
      this.innerHTML = this.template();
   };
   template = () => {
      return  `
         <div class='menu-container'>
            <ul class='menu-title-container'>
               ${ menuItems.map((menuItem, i) => {
                  return `
                     <li class='menu-title' onclick={handleClick('menu#${i}')}>${menuItem.title}</li>
                  `;
               }).join('')}
            </ul>
            ${ menuItems.map((menuItem,i) => {
               return `
                  <div class='card-container' id='menu#${i}'>
                     ${ menuItem.lectures.map((lecture) => {
                        return `
                           <a href=${lecture.href} target='_blank'>
                              <div class='card'>${lecture.name}</div>
                           </a>
                        `;
                     }).join('')}
                  </div>
               `;
            }).join('')}
         </div>
      `;
   };
};

window.customElements.define('menu-comp', Menu);

