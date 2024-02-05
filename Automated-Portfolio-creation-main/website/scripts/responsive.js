const burger = document.querySelector('.burger');
const imageBurger = burger.querySelector('img');
const nav = document.querySelector('.sideUL');
const navLI = document.querySelectorAll('.sideUL li');

const NavSilde = () => {
    
    burger.addEventListener('click', () =>{
        //toggle NAV
        nav.classList.toggle('nav-active');


        //toggle Burger
        imageBurger.classList.toggle('toggleImageBurger');
        burger.classList.toggle('toggleBurger')       
        
      
        //Animate Links
        let filteredNavlist = Array.prototype.filter.call(navLI, f => !f.classList.contains('toggleDisplay'));  

        filteredNavlist.forEach((links, index) => {
            if(links.style.animation){
                links.style.animation = '';
            }else{
                links.style.animation = `navLinksFade 500ms ease forwards ${index / 9 + 0.5}s`;
            }
        });
    });

}

NavSilde();

function slideIn(){
    nav.classList.toggle('nav-active');

        //toggle Burger
        burger.classList.toggle('toggleBurger');

         //Animate Links
        let filteredNavlist = Array.prototype.filter.call(navLI, f => !f.classList.contains('toggleDisplay')); 

         

        filteredNavlist.forEach((links, index) => {
            if(links.style.animation){
                links.style.animation = '';
            }else{
                links.style.animation = `navLinksFade 500ms ease forwards ${index / 9 + 0.5}s`;
            }
        }
    );
}