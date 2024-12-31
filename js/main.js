
AOS.init();
// text Backtotop 
document.addEventListener('DOMContentLoaded', function () {
    const gototop = document.querySelector('.gototop');

    // Hiển thị nút khi cuộn xuống
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống > 300px
            gototop.classList.add('show');
        } else {
            gototop.classList.remove('show');
        }
    });

    // Cuộn về đầu trang khi nhấn vào nút
    gototop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Cuộn mượt
        });
    });
});

// xử lý hiện/ẩn và thay đổi ngôn ngữ

let langCurrent = document.querySelector('.lang .lang__current');
let langList = document.querySelector('.lang .lang__list');
let langs = document.querySelectorAll('.lang .lang__list li');

langCurrent.addEventListener('click', function(e) {
    e.stopPropagation();
    langList.classList.toggle('active')
    langCurrent.firstElementChild.classList.toggle('active')
})

window.addEventListener('click', function() {
    langList.classList.remove('active')
})
langs.forEach(function(lang) {
    lang.onclick = function() {

        langCurrent.firstElementChild.classList.remove('active');

        let langText = lang.textContent;
        let langCurrentName = langCurrent.firstElementChild.textContent;
        langCurrent.firstElementChild.innerHTML = langText;
        lang.innerHTML = langCurrentName;
    }
})
// SliderDrag
document.addEventListener("DOMContentLoaded",  (even) => {
    let sliderElement = document.querySelector('.slider__drag-wrap');
    let flkty = new Flickity(sliderElement, {
      contain: true, // Đảm bảo các slide nằm trong container
      freeScroll: true, // Cho phép cuộn tự do
      prevNextButtons: false, // Hiển thị nút trước/sau
      pageDots: false, // Ẩn chấm chỉ trang
      wrapAround: true, // Cho phép lặp vòng
      autoPlay: 2000,
      on: {
        scroll: function(progess) {
            let progressSliderDrag = document.querySelector('.slider__drag-progressbar .timeline .process');
            progess = Math.max(0, Math.min(1, progess));
            progressSliderDrag.style.width = progess * 100 + '%';
        }
    },
    })
  });


// Xử lí progressbar
function handleProgress(){
    let hPage = document.querySelector('body').clientHeight;// chieu cao cua page
let scrollY = window.pageYOffset;// vi tri doc da duoc scroll
let vh = window.innerHeight; // chiều cao của cửa sổ trình duyệt (viewport)

let progress = document.querySelector('.progressbar');

let percent = Number(scrollY / (hPage - vh) * 100);
progress.style.width = percent + "%";
}

document.addEventListener('scroll', function(){
    handleProgress();
})


// Xử lí scroll active menu và click menu scroll tới section
let menus = document.querySelectorAll('header .menu a');
//let heightHeader = document.querySelector('header').offsetHeight;
let sections = [];

function removeActiveMenu(){
    menus.forEach(function(menu_ele, menus_index){
        menu_ele.classList.remove('active');
    })
}

menus.forEach(function(element, index){
       // let href = element.getAttribute('href');
        let className = element.getAttribute('href').replace('#', '');
        let section = document.querySelector('.' + className);
        sections.push(section);
        
        element.addEventListener('click', function(e){
            e.preventDefault();
            //let posSection = section.offsetTop;
            window.scrollTo({
                top: section.offsetTop - 60 + 1,
            });
            removeActiveMenu();  
            element.classList.add('active');
        })
});

window.addEventListener('scroll', function(){

    let posScroll = window.pageYOffset;
    sections.forEach(function(item, index){
        if(posScroll > item.offsetTop - 60 && item.offsetTop + item.offsetHeight){
            removeActiveMenu();
            menus[index].classList.add('active');
        }else{
            menus[index].classList.remove('active');
        }
    });
});
  


// Đổi background color header khi scrolldown và btn backtoptop
function changeBgHeader(){
    let header = document.querySelector('.header');
    if (window.pageYOffset > 200){
        header.classList.add('active')
    }else{
        header.classList.remove('active')
    }
}

let getHeightWindown = window.innerHeight;
let totop = document.querySelector('.totop');
function showBackToTop(){
     if (window.pageYOffset > getHeightWindown){
        totop.classList.add('active')
    }else{
        totop.classList.remove('active')
    }
}
totop.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
    })
})
document.addEventListener('scroll', (function(){
    changeBgHeader();
    showBackToTop();
}))


//Xử lí Popup Video
let btnVideo = document.querySelectorAll('.quality__video-img');
let btnPopup = document.querySelector('.popup__video');
let closePopup = document.querySelector('.popup__video-close');
let iframeVideo = document.querySelector('.popup__video iframe')

function closePopupVideo(){
    btnPopup.classList.remove('active')
    iframeVideo.setAttribute('src', '')
}
btnVideo.forEach(function(btnPlay){
    btnPlay.addEventListener('click', function(){
        btnPopup.classList.add('active')
        let videoId = btnPlay.getAttribute('data-video-id')
        iframeVideo.setAttribute('src', `https://www.youtube.com/embed/${videoId}`)
    })
})

closePopup.addEventListener('click', function(){
    closePopupVideo();
})
btnPopup.addEventListener('click', function(){
    closePopupVideo(); 
})

//Xử lí Tag News
let tagText = document.querySelectorAll('.news .news__tags .tag');

tagText.forEach(function(tag, index){
    tag.addEventListener('click', function(){
        let newsTag = document.querySelector('.news .news__tags .tag.active');
        newsTag.classList.remove('active')
        tag.classList.add('active')

        let newList = document.querySelector('.news__item-wrap' + (index+1))
        document.querySelector('.news__item-wrap.active').classList.remove('active')
        newList.classList.add('active')
    })
})

// Xử lí show/hide FAQ Accordion
let faqs = document.querySelectorAll('.faq__question-title');
let faqsContent = document.querySelectorAll('.faq__question-content')

faqs.forEach(function(faq, index){
    faq.addEventListener('click', function(){
        if (faqsContent[index].style.maxHeight){
            faqsContent[index].style.maxHeight = null;
            faq.classList.remove('active')
        }else{
            faqs.forEach(function(item, index){
                faqsContent[index].style.maxHeight = null;
                item.classList.remove('active')
            })
            faq.classList.add('active')
            faqsContent[index].style.maxHeight = faqsContent[index].scrollHeight + "px";

        }
    })
})

//Xử lý Slider 
// let sliderList = document.querySelectorAll('.slider__item')
// let next = document.querySelector('.--next');
// let prev = document.querySelector('.--prev');
// let dotted = document.querySelectorAll('.dotted span')
// let number = document.querySelector('.number')

// let slideIndex = 0;
// for (let i = 0; i < sliderList.length; i++) {
//     if (sliderList[i].classList.contains('active')) {
//         slideIndex = i;
//     }

// }

// function showSlide(index) {
//     sliderList[slideIndex].classList.remove('active');
//     sliderList[index].classList.add('active');
//     dotted[slideIndex].classList.remove('active');
//     dotted[index].classList.add('active');
//     slideIndex = index;
//     number.innerHTML = (slideIndex + 1).toString().padStart(2, '0');

// }

// next.addEventListener('click', function() {
//     if (slideIndex < sliderList.length - 1) {
//         showSlide(slideIndex + 1)
//     } else {
//         showSlide(0)
//     }

// })
// prev.addEventListener('click', function() {
//     if (slideIndex > 0) {
//         showSlide(slideIndex - 1)
//     } else {
//         showSlide(sliderList.length - 1)
//     }

// })


// dotted.forEach(function(item, index) {
//     item.addEventListener('click', function() {
//         showSlide(index);
//     })
// })
//Sử dụng thư viện Flickity

let slider = document.querySelector('.slider__item-wrap');
let flktySlider = new Flickity(slider, {
    cellAlign: 'left', //vị trí
    contain: true,
    autoPlay: 3000,
   // pauseAutoPlayOnHover: true,
    wrapAround: true, //lặp lại
    prevNextButtons: false, // prev,next
    setGallerySize: false,
    draggable: true, // kéo thả
    pageDots:false,
    on: {
        ready: function() {
            let dots = document.querySelector('.flickity-page-dots');
            dotted = document.querySelector('.slider__bottom-paging .dotted');
            dotted.appendChild(dots);
        },
        change: function(index) {
            let number = document.querySelector('.slider__bottom-paging .number');
            let indexPage = index + 1;
            number.innerHTML = indexPage.toString().padStart(2, 0);
        }
    }
})

document.querySelector('.slider__bottom-control .--prev').addEventListener('click', function() {
    flktySlider.previous();
})
document.querySelector('.slider__bottom-control .--next').addEventListener('click', function() {
    flktySlider.next();
})
// FancyBox xuwr lis phanaf gallery
Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: false,
    hideScrollbar: false,
    keyboard: {
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "next",
        ArrowDown: "prev",
        ArrowRight: "next",
        ArrowLeft: "prev",
    },
});



  