console.log((<any>window).particlesJS)
const particlesJS = (<any>window).particlesJS;
window.addEventListener('load', () => {
    if (document.getElementById('particles-js') !== null) {
        particlesJS.load('particles-js', './particlesjs-config.json', () => {
            console.log('particles loaded');
        });
    }
})
