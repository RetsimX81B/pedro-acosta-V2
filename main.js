const bouton = document.querySelector('.bouton')

bouton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left:0,
        behavior: "smooth"
    })
})
      