
(function _iffyWrapper(): void {
    // do Page stuff.
    const contentwrappers: HTMLCollectionOf<Element> = document.getElementsByClassName('contentwrapper');
    if (contentwrappers.length < 1) {
        console.log('cannot find contentwrapper');
        return;
    }
    // use SetTimeout to not relief the UI/Browser rendering.
    window.addEventListener('resize', (event) => setTimeout(function () {
        for (var i = 0; i < contentwrappers.length; i++) {
            (<any>contentwrappers[i]).style.width = (window.innerWidth - 35) + 'px';
        }
    }, 0));
})();

const pageable = new window.Pageable("#container", {
    infinite: true,
});

const skillChart = document.getElementById('skill-chart')
window.initD3TechStackBubble(onTechStackReady);
let runAnimation = () => {}
function onTechStackReady(_runAnimation: any) {
    runAnimation = _runAnimation
    if (initialized) runAnimation()
}
const skillChartIndex = Array.from(skillChart.parentElement.children).filter(function (element) {
    return element.classList.contains('pg-clone') === false
}).indexOf(skillChart)
let initialized = false

console.log('tst')
if (window.location.hash === '#skill-chart') {
    initialized = true;
    runAnimation();
}

pageable.on('scroll.end', function (data: { index: number }) {
    if (data.index === skillChartIndex && !initialized) {
        initialized = true;
        runAnimation();
    }
})

setTimeout(function () {
    document.documentElement.classList.add('pageable-init')
}, 200)

Array.from(document.getElementsByClassName('glitch')).map(function(element) {
    const clone = element.cloneNode(true) as HTMLElement
    const glitchBefore = document.createElement('div')
    while(clone.childElementCount) {
        glitchBefore.appendChild(clone.removeChild(clone.firstElementChild))
    }
    const glitchAfter = glitchBefore.cloneNode(true) as HTMLElement
    glitchBefore.classList.add('glitch-before')
    glitchAfter.classList.add('glitch-after')
    element.insertBefore(glitchBefore, element.firstElementChild)
    element.appendChild(glitchAfter)
});

