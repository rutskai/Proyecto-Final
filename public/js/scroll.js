const button = document.querySelector('.btn.btn-outline-primary');
const target = document.querySelector('.content-category');

button.addEventListener('click', () => {
    target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',  // <-- centra verticalmente
        inline: 'nearest'
    });

    const body = document.body;
    body.style.overflowY = 'visible';
});


