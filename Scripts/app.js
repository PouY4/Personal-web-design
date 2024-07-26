const navToggleIcon = document.querySelector('.nav__toggle-icon')
const menu = document.querySelector('.menu')
const cover = document.querySelector('.cover')
const resumeListItems = document.querySelectorAll('.resume-list__item')
const portfolioListItems = document.querySelectorAll('.portfolio-list__item')
const menuItems = document.querySelectorAll('.menu__item')
const sections = document.querySelectorAll("main > section")
const changeThemeBtn = document.querySelector('.change-theme')
const darkThemeIcon = `<svg class="change-theme__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`
const lightThemeIcon = `<svg class="change-theme__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`


if (window.localStorage.getItem("theme") == "dark-theme"){
    document.documentElement.classList.add('dark-theme')
    changeThemeBtn.innerHTML = darkThemeIcon;
}
// custom functions
function removeActiveClass(className){
    document.querySelector(`.${className}`).classList.remove(className)
}
function navigationTabsInit(listItems, listItemActiveClass, contentItemShowClass){
    listItems.forEach(listItem => {
        listItem.addEventListener('click', function(){
            removeActiveClass(listItemActiveClass)
            removeActiveClass(contentItemShowClass)
            this.classList.add(listItemActiveClass)
            let contentId = this.getAttribute('data-content-id')
            document.querySelector(contentId).classList.add(contentItemShowClass)
        })
    })
}

// app navigation tabs setting up 
navigationTabsInit(resumeListItems, 'resume-list__item--active', 'resume-content--show')
navigationTabsInit(portfolioListItems, 'portfolio-list__item--active', 'portfolio-content--active')

// intersection observer
const observer = new IntersectionObserver(observerHandler,{
    threshold : 0.6
});
function observerHandler(allSections){
    allSections.map(section=>{
        let sectionClassName = section.target.className
        if(section.isIntersecting){
            document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.add('menu__item--active')
        }else{
            document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.remove('menu__item--active')
        }
    })
}

// loops
sections.forEach(section =>{
    observer.observe(section)
})
menuItems.forEach( item => { 
    item.addEventListener("click", function(e){
        e.preventDefault()
        removeActiveClass('menu__item--active')
        item.classList.add('menu__item--active')

        let sectionClass = item.getAttribute("data-section")
        let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop
        window.scrollTo({
            behavior : "smooth",
            top : sectionOffsetTop - 140 
        })
    })
})

// event listner
navToggleIcon.addEventListener('click', function(){
    this.classList.toggle('nav__toggle-icon--open')
    menu.classList.toggle('menu--open')
    cover.classList.toggle('cover--show')
})
changeThemeBtn.addEventListener('click', function(){
    document.documentElement.classList.toggle('dark-theme')
    if (document.documentElement.classList.contains('dark-theme')){
        window.localStorage.setItem("theme", "dark-theme")
        this.innerHTML = darkThemeIcon;
    } else {
        window.localStorage.setItem("theme", "light-theme")
        this.innerHTML = lightThemeIcon;
    }
})

