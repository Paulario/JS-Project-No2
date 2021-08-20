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

    let bgColorPicker = new GridPicker($('#bgColors'), RESULT);
    let bgImagePicker = new GridPicker($('#bgImages'), RESULT);
    let textColorPicker = new GridPicker($('#textColors'), RESULT);

    $('#bgFile :file').change(function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            $('body').css('backgroundImage', `url(${reader.result})`);
        }
        if(file){
            reader.readAsDataURL(file);
        }
    });

    loginForm = new FormValidation(loginForm, login);
    logoutForm - new FormValidation(logoutForm, logout);

    $(controlForm.editText).click(function(event) {
        RESULT.hide();
        $('#editArea').show();
        $('#editArea').val(RESULT.html());        
    });

    function login() {
        let check = true;
        let unlockBtn = $('#unlockEdit :button');
        let editBtn = $('#editTextGroup button').eq(0);
        $(this.inputs).each((_,elem) => {
            check &= Boolean($(elem).data('valid'));
        });
        if(check){
            setTimeout(() => {
                $('#loginModal').modal('hide');
                $('#logoutModal').modal('show');
                this.reset();
            }, 500);
            $('i', $(unlockBtn)).toggleClass('fa-unlock fa-lock');
            $(editBtn).attr("disabled", false);
            $(unlockBtn).attr('data-bs-target','#logoutModal');
        }
    }

    function logout(event) {
        let unlockBtn = $('#unlockEdit :button');
        let editBtn = $('#editTextGroup button').eq(0);
        $('#loginModal').modal('show');
        $('#logoutModal').modal('hide');
        $(editBtn).attr("disabled", true);
        $(unlockBtn).attr('data-bs-target', '#loginModal');
    };

})

