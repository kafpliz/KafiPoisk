
!localStorage.getItem('token') ?  notData() : getData()
async function notData() {
 document.body.innerHTML = '<div class="notLogin"><h1>Вы не залоганы!</h1> <h2 "><a href="/login">Войти</a></h2></div>'
}



const tabButtons = document.querySelectorAll(".usemark__span");
const tabs = document.querySelectorAll(".catalog__list");


tabButtons[0].classList.toggle("usemark__span-active", true);
tabs[0].classList.toggle("catalog__hide", false);

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", (e) => {
    
    Array.from(e.target.parentNode.children).forEach((tabBtn) => {
      tabBtn.classList.toggle("usemark__span-active", false);
    });
  
    e.target.classList.toggle("usemark__span-active", true);

    const selectedTabName = e.target.dataset.tabContentName;
    const selectedTab = document.querySelector('.'+selectedTabName);


    Array.from(selectedTab.parentNode.children).forEach((tab) => {
      tab.classList.toggle("catalog__hide", true);
    });
   
    selectedTab.classList.toggle("catalog__hide", false);
  });
});
