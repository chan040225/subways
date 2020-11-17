$(document).ready(function () {
    //마우스를 올렸을때
    $('.gnb > ul > li').on('mouseenter', function () {
        $('.snb').css({ 'display': 'inline-block' })
        $('header').stop().animate({ 'height': '405px' })
        $('.snb').stop().animate({ 'opacity': '1' })
    })

    //마우스를 내렸을때
    $('.gnb > ul > li').on('mouseleave', function () {
        $('header').stop().animate({ 'height': '175px' })
        $('.snb').stop().animate({ 'opacity': '0' }, 300, function () {
            $('.snb').css({ 'display': 'none' })
        })
    })

    // 배너
    var banner = $('.main > .banner')

    banner.find('h2').animate({ 'opacity': '1', 'top': '0' }, 700)
    banner.find('p').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700)
    banner.find('.img').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700)

    // 서브 헤더
    var subHeader = $('.main > .sub-header')
    var subTop = subHeader.find('top')
    var subHeaderTop = subHeader.offset().top

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop()

        if (scroll > subHeaderTop) {
            subHeader.addClass('fixed')
        } else {
            subHeader.removeClass('fixed')
        }
    })

    subTop.on('click', function () {
        $('html, body').stop().animate({
            'scrollTop': '0'
        }, 1000)
    })

    // 메뉴 설명 보기
    var menu = $('#menu ul > li')

    const menuShow = (event) => {
        var target = event.currentTarget

        $(target).find('.ko_title').stop().animate({ 'top': '50px' }, 400)
        $(target).find('.en_title').stop().animate({ 'top': '95px' }, 400)
        $(target).find('.desc').stop().animate({ 'top': '125px', 'opacity': '1' }, 500)
        $(target).find('.icon').stop().animate({ 'bottom': '30px', 'opacity': '1' }, 300)
    }

    const menuHide = (event) => {
        var target = event.currentTarget

        $(target).find('.ko_title').stop().animate({ 'top': '100px' })
        $(target).find('.en_title').stop().animate({ 'top': '145px' })
        $(target).find('.desc').stop().animate({ 'top': '200px', 'opacity': '0' })
        $(target).find('.icon').stop().animate({ 'bottom': '100px', 'opacity': '0' })
    }


    var menuTab = $('#menu-tab ul > li')

    menuTab.on('click', function (event) {
        var target = event.currentTarget
        var menuName = $(target).data('menu')

        menuTab.removeClass('active')
        $(target).addClass('active')

        $(menu).stop().animate({ 'opacity': '0' }, 400, function () {
            $(menu).css({ 'display': 'none' })

            if (menuName === 'all') {
                $(menu).stop().css({ 'display': 'block' }).animate({ 'opacity': '1' })
            } else {
                // $('.' + menuName) //ES5
                // $(`.${menuName}`) //ES6
                $(`.${menuName}`).stop().css({ 'display': 'block' }).animate({ 'opacity': '1' })
            }
        })
    })

    const getSandwich = () => {
        return fetch('http://localhost:3000/subway/sandwich', {
            'method' : 'GET',
            'headers' : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res)
        .then(res => res.json())
    }

    const templateSandwichLabel = (label) => {
        if(label){
            return `<div class="label">${label}</div>`
        }else{
            return 
        }
    }

    const templateSandwich = (sandwich) => {
        // const ko_title = sandwiches['ko_title']
        const{type, label, img, ko_title, en_title, kcal, summary, view_id} = sandwich

        return `
        <li class="${type}">
            <a href="#">
                ${templateSandwichLabel(label)}
                <div class="img">
                    <img src="${img}" alt="${ko_title}">
                </div>
                <strong class="ko_title">${ko_title}</strong>
                <span class="en_title">${en_title}</span>
                <span class="kcal">${kcal}</span>
                <p class="desc">${summary}</p>
                <div class="icon" data-id="${view_id}"></div>
            </a>
        </li>
        `
    }

    const listSandwich =  async () => {
        const sandwiches = await getSandwich()
        const menu = document.getElementById('menu')
        const menuWrap = menu.querySelector('ul')

        for (const sandwich of sandwiches) {
            const node = $(templateSandwich(sandwich))[0];
            $(node).on('mouseenter', menuShow)
            $(node).on('mouseleave', menuHide)
            menuWrap.append(node)
        }
    }
    listSandwich();

})