$(document).ready(function() {
    $(".loader").fadeOut(3000, function() {
        $(".spiner").fadeOut(500)
        $("body").css("overflow", "auto")
    });

})

// let aboutSection = $("#about").offset().top

// $(window).scroll(function() {
//     let windowScroll = $(window).scrollTop();

//     if (windowScroll > aboutSection + -400) {
//         $('nav .container').css("background-color", "black")
//         $('nav .container').css({ "padding-left": "40px", "padding-right": "40px" })
//         $(".iconarrow i").fadeIn(500)
//     } else {
//         $('nav .container').css("background-color", "rgba(0,0,0,0)")
//         $('nav .container').css({ "padding-left": "0px", "padding-right": "0px" })

//         $(".iconarrow i").fadeOut(500)

//     }
// })


// $(".nav-item a").click(function(e) {
//     let navClick = $(e.target).attr("href")
//     $(e.target).css({ color: "yellow" });
//     $(e.target).parent().siblings().children().css({ color: "white" })
//     let sectionOffset = $(navClick).offset().top;
//     $("html,body").animate({ scrollTop: sectionOffset })
// })


const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));









/*--------------------
Vars
--------------------*/
let progress = 20
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carouse-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress / 100 * ($items.length - 1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i / $items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()

}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)