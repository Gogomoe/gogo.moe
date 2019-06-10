window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
        .then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
});

$(function () {
    let speed = 1000;

    let sections = [];

    $('.section').each(() => {
        let s = $(this);
        sections.push(s);
    });
    let leave = {
        top: '+=40%',
        opacity: 0
    };
    let movein = {
        top: '-=40%',
        opacity: 1
    };
    sections[0].leave = () => {
        sections[0].find('#section1 .text').animate(leave, speed);
    };
    sections[0].movein = () => {
        sections[0].find('#section1 .text').animate(movein, speed);
    };
    sections[1].leave = () => {
        sections[1].find('#section2 .text,#section2 .content').animate(leave, speed);
    };
    sections[1].movein = () => {
        sections[1].find('#section2 .text,#section2 .content').animate(movein, speed);
    };
    sections[2].leave = () => {
        sections[2].find('#section3 .text').animate(leave, speed);
    };
    sections[2].movein = () => {
        sections[2].find('#section3 .text').animate(movein, speed);
    };

    $('#ido').fullpage({
        onLeave: function (index, direction) {
            sections[index - 1].leave();
            sections[direction - 1].movein();
        },
        scrollingSpeed: speed
    });
    sections[0].find('#section1 .text').css({'top': '70%', 'opacity': 0});
    sections[1].find('#section2 .text').css({'top': '70%', 'opacity': 0});
    sections[1].find('#section2 .content').css({'top': '55%', 'opacity': 0});
    sections[2].find('#section3 .text').css({'top': '70%', 'opacity': 0});
    sections[0].movein();
});
