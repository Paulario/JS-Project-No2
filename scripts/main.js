'use strict';

$(function () {
    const COLORS = [
        "#eaff7b", "#00ffab", "#29bdc1", "#d84242", "#913f92", "#e81676", "#d718cf",
        "#f065f1", "#874df7", "#6b03c2", "#ae1f6e", "#3b415e", "#eee", "#68d4c7",
        "#cce77f", "#d40f0f", "#3a21db", "#0ab02e", "#e7de11", "#7c7c7c", "#74b66f"
    ];

    const BG_IMAGES = [ 
        '../images/apelsin-grafika-teni.jpg',
        '../images/blue-material-design-tekstura-fon-linii-background.jpg',
        '../images/captain-america-marvel-superhero-mask-simple-background-red.jpg',
        '../images/green-mountains-peizazh-zelenyi-peizazh-gory-nochnoe-nebo-no.jpg',
        '../images/ios-13-blue-white-background.jpg',
        '../images/izumrudnyi-emerald-sinii-blue-goluboi-zheltyi-zelenyi-green.jpg',
        '../images/minimalizm-figury-grafika-treugolnik-krugi-krestiki-pliusiki.jpg',
        '../images/solntse-lodka-otrazhenie-siluet-krasnyi-krug-chernyi-fon-noc.jpg',
        '../images/svet-krasnyi-fonarik.jpg',
    ]

    BG_IMAGES.forEach(elem => {
        $('#bgImages').append(`<div class="grid-tile" value="url(./images/${elem})" 
            style="background-image: url('./images/${elem}')"></div>`)
    });

    COLORS.forEach(elem => {
        $('.color-grid').append(`<div class="grid-tile" value="${elem}" 
            style="background-color: ${elem}"></div>`)
    });

    const RESULT = $('#result');

    let mainForm = document.forms.controlForm;
    let loginForm = document.forms.login;
    let logoutForm = document.forms.logout;
    let generatorForm = document.forms.generatorForm;

    let textStyleButtons = new TextStyleButtonGroup($('#textStyleButtonGroup'), RESULT);
    let textAlignmentButtons = new TextAlignmentButtonGroup($('#textAlignmentButtonGroup'), RESULT);
    let ffDropdown = new DropdownPropPicker($('#fontFamilyPicker'), RESULT);
    let fsDropdown = new DropdownPropPicker($('#fontSizePicker'), RESULT);

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
    

    let bgColorPicker = new GridPicker($('#bgColors'), RESULT);
    let bgImagePicker = new GridPicker($('#bgImages'), RESULT);
    let textColorPicker = new GridPicker($('#textColors'), RESULT);


    $(loginForm.signIn).click(function(event) {
        let inputs = $(this.elements).filter(':not(:button)');
        $(inputs).trigger('blur');
        let stressInput = (input) => {
            $(input).addClass('border-2');
            $(input).removeClass('border-4');
        };
        let check = true;
        $(inputs).each(function(_,elem) {
            if($(elem).is('.border-danger') || $(elem).is(':not(.border-success)')){
                $(elem).removeClass('border-2');
                $(elem).addClass('border-4 border-danger text-danger');
                setTimeout(stressInput, 2000, elem);
                check &= !$(elem).is('.border-danger');
            }
        });
        if(check){
            $('button:first', $(controlForm)).attr("disabled", false);
            $(inputs).each(function(_,elem) {
                $(elem).attr('value', '');
                $(elem).removeClass('border-success border-2 text-success');
            });
            $('#login').modal('toggle');
            $('#logout').modal('toggle');
            $('#unlockEdit .btn').attr('data-bs-target', '#logout');
        }
    });

    $(logoutForm.logOut).click(function(event) {
        $('#login').modal('toggle');
        $('#logout').modal('toggle');
        $('button:first', $(controlForm)).attr("disabled", true);
        $('#unlockEdit button').attr('data-bs-target', '#login');
    });

    $(controlForm.editText).click(function(event) {
        RESULT.hide();
        $('#editArea').show();
        $('#editArea').val(RESULT.html());        
    });

    $(loginForm.email).blur(function(event){
        validate(isValidEmail(event.target.value), event.target);
    })


    $(loginForm.password).blur(function(event){
        validate(isValidPassword(event.target.value), event.target);
    })




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

