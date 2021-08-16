'use strict';

$(function () {
    const COLORS = [
        "#eaff7b", "#00ffab", "#29bdc1", "#d84242", "#913f92", "#e81676", "#d718cf",
        "#f065f1", "#874df7", "#6b03c2", "#ae1f6e", "#3b415e", "#fff", "#68d4c7",
        "#cce77f", "#d40f0f", "#3a21db", "#0ab02e", "#e7de11", "#7c7c7c", "#74b66f"
    ];

    const BG_IMAGES = [ 
        'https://i.pinimg.com/originals/dd/d8/74/ddd87470879597c31e55ef07b27546bf.png',
        'https://i.pinimg.com/originals/99/f7/6b/99f76b3de162688defe73255366828e2.jpg',
        'https://i.pinimg.com/originals/56/2f/99/562f9979bd5ef3b87175609fcebef393.jpg',
        'https://wallpaperaccess.com/full/2029165.jpg',
        'https://wallpaper.dog/large/20459082.jpg',
        'https://cdn.wallpapersafari.com/55/48/FM2C4X.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwi1vA8p5gL_8TCwrxt43YmQjPU4ywKkUiPQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQIl6rhhMHNJ47Xnrrvm5ioBMVoJciLQzwg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrsTlS0LM9w2UPhpuKFpiZhalSXEm5uWxTw&usqp=CAU',
    ]

    let mainForm = document.forms.controlForm;
    let loginForm = document.forms.login;

    $('#fontFamilyPicker li', mainForm).each((_,elem) => {
        $(elem).css('font-family', $(elem).attr('value'));
    });

    $('#fontSizePicker li', mainForm).each((_,elem) => {
        $(elem).css('font-size', $(elem).attr('value'));
    });

    $('#bgFile :file').change(function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            $('body').css('backgroundImage', `url(${reader.result})`);
        }
        if(file){
            reader.readAsDataURL(file);
        }
    })

    COLORS.forEach(elem => {
        $('.color-grid').append(`<div class="color-box" value="${elem}" style="background-color: ${elem}"></div>`)
    });

    BG_IMAGES.forEach(elem => {
        $('.image-grid').append(`<div class="image-box" value="${elem}" style="background-image: url('${elem}')"></div>`)
    });

    $('.color-grid').click(event => {
        let trg = $(event.target);
        if($(trg).is('.color-box')){
            let value = $(trg).attr('value');
            if($(trg).parent().is('#bgColors')){
                $('body').css({
                    backgroundColor: value,
                })
            } else {
                $('#result').css("color", value)
            }
        }
    })

    $('.image-grid').click(event => {
        let trg = $(event.target);
        if($(trg).is('.image-box')){
            let value = $(trg).attr('value');
            if($(trg).parent().is('#bgImages')){
                $('body').css({
                    backgroundColor: '',
                    backgroundImage: `url('${value}')`
                })
            }
        }
    })


    $(mainForm).click(function(event){
        let t = $(event.target.closest('.btn'));
        if(!jQuery.isEmptyObject(t)){
            let value = $(t).attr('value');
            if (t.parent().is('#textDecoration')) {
                decoreText(value);
            }
            if (t.parent().is('#textAlignment')) {
                alignText(value);
            }
        }

    })

    $('#fontFamilyPicker').click(function(event) {
        if($(event.target).is('.dropdown-item')){
            let value = $(event.target).attr('value');
            setFontFamily(value);
        }
    })

    $('#fontSizePicker').click(function(event) {
        if($(event.target).is('.dropdown-item')){
            let value = $(event.target).attr('value');
            setFontSize(value);
        }
    })


    $(loginForm.email).blur(function(event){
        validate(isValidEmail(event.target.value), event.target);
    })


    $(loginForm.password).blur(function(event){
        validate(isValidPassword(event.target.value), event.target);
    })

    function setFontSize(value){
        let r = $('#result');
        r.css('font-size', value);
    }

    function setFontFamily(value){
        let r = $('#result');
        r.css('font-family', value);
    }

    function alignText(align) {
        let r = $('#result');
        let opts = ['text-start', "text-center", "text-end"];
        if (opts.indexOf(align) !== -1) {
            r.removeClass(opts.join(" "));
            r.addClass(align)
        }
    }

    function decoreText(name) {
        let r = $('#result');
        let opts = ['bold', 'italic', 'underline', 'strikethrough'];
        if (opts.indexOf(name) !== -1) {
            if (name === 'underline'
                && r.is('.strikethrough')) {
                r.removeClass('strikethrough');
                r.addClass('underline');
                return;
            }
            r.toggleClass(name);
        }
    }

    function isValidEmail(email){
        email = email.trim();
        let regExp = /^(\w+((\.|-)\w+)?\.?)+@(gmail|ukr)\.(ua|com|org|net)$/;
        return regExp.test(email);
    }

    function isValidPassword(password){
        password = password.trim();
        let regExp = /^(\w|\s){8,255}$/;
        return regExp.test(password);
    }

    function validate(isValid, input){
        if(isValid){
            input.classList.add('border-success', 'border-2', 'text-success');
            input.classList.remove('border-danger', 'border-2', 'text-danger');
        } else {
            input.classList.add('border-danger', 'border-2', 'text-danger');
            input.classList.remove('border-success', 'border-2', 'text-success');
        }
    }


})

