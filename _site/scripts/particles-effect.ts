console.log((<any>window).particlesJS)
const _particlesJS = (<any>window).particlesJS;
window.addEventListener('load', () => {
    if (document.getElementById('particles-js') !== null) {
      _particlesJS.load('particles-js', './particlesjs-config.json', () => {
            console.log('particles loaded');
        });
    }
})
