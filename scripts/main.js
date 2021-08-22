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
    const EDIT_AREA = $('#editArea');
    let logedIn = true;

    let styleForm =      $(document.forms.styleForm);
    let loginForm =      $(document.forms.login);
    let logoutForm =     $(document.forms.logout);
    let generatorForm =  $(document.forms.generatorForm);
    let tableGenerator = $(document.forms.tableGenerator);
    let ulGenerator =    $(document.forms.ulGenerator);
    let olGenerator =    $(document.forms.olGenerator);

    let editBtn =   $('#editTextBtn');
    let unlockBtn = $('#unlockEdit :button');

    let textStyleBtns =     new TextStyleButtonGroup($('#textStyleButtonGroup'), RESULT);
    let textAlignmentBtns = new TextAlignmentButtonGroup($('#textAlignmentButtonGroup'), RESULT);
    let generatorBtns =     new GeneratorButtonGroup(generatorForm, RESULT);
    let ffDropdown =        new DropdownPropPicker($('#fontFamilyPicker'), RESULT);
    let fsDropdown =        new DropdownPropPicker($('#fontSizePicker'), RESULT);

    let bgColorPicker =   new GridPicker($('#bgColors'), RESULT);
    let bgImagePicker =   new GridPicker($('#bgImages'), RESULT);
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

    loginForm =      new FormValidation(loginForm, login);
    logoutForm =     new FormValidation(logoutForm, logout);
    tableGenerator = new FormValidation(tableGenerator, createTable);
    ulGenerator =    new FormValidation(ulGenerator, createUl);
    olGenerator =    new FormValidation(olGenerator, createOl);

    editBtn.click(function(event) {
        $(styleForm).fadeToggle(250, () => {
            $(generatorForm).fadeToggle(250);
        });
        $(RESULT).fadeToggle(250, () => {
            $(EDIT_AREA).toggle();
        });
        $(EDIT_AREA).val((RESULT.html()));
    });

    function login(obj) {
            setTimeout(() => {
                $('#loginModal').modal('hide');
                $('#logoutModal').modal('show');
                obj.reset();
            }, 500);
            $('i', $(unlockBtn)).toggleClass('fa-unlock fa-lock');
            $(editBtn).attr("disabled", false);
            $(unlockBtn).attr('data-bs-target','#logoutModal');
    }

    function logout() {
        $('#loginModal').modal('show');
        $('#logoutModal').modal('hide');
        $('i', $(unlockBtn)).toggleClass('fa-unlock fa-lock');
        $(editBtn).attr("disabled", true);
        $(unlockBtn).attr('data-bs-target', '#loginModal');
    };

    function trimHTML(html){
        let lines = html.split('\n');
        for(const line of lines){
            let ind = lines.indexOf(line);
            lines[ind] = line.trim();
        }
        html = lines.join('\n').trim();
        return html;
    }

    function createTable(obj) {
        let f = $(obj.form);
        let countTD = $('#countTD', $(f)).val();
        let countTR = $('#countTR', $(f)).val();
        let wTD = $('#countTR', $(f)).val();
        let hTD = $('#countTR', $(f)).val();
        let bType = $('#borderStyle', $(f)).val();
        let bC = $('#borderColor', $(f)).val();
        let bW = $('#borderWidth', $(f)).val();
        let table = `
            <table class="mb-3" style="border: ${bW}px ${bType} ${bC}">
                ${`<tr>
                    ${`<td style="height: ${hTD}px; width: ${wTD}px; border: ${bW}px ${bType} ${bC}">TD</td>
                    `.repeat(countTD).trim()}
                </tr>
                `.repeat(countTR).trim()}
            </table>\n`;
        $('#editArea').val($('#editArea').val()+table);
    }

    function createUl(obj){
        let f = $(obj.form);
        let n = $('#ulCountLIItem', $(f)).val();
        let mark = $('#ulListStyle', $(f)).val();
        let ul = `
            <ul style="list-style-type: ${mark}">
                ${`<li>ITEM</li>
                `.repeat(n).trim()}
            </ul>\n`;
        $('#editArea').val($('#editArea').val()+ul);
    }

    function createOl(obj){
        let f = $(obj.form);
        let n = $('#olCountLIItem', $(f)).val();
        let mark = $('#olListStyle', $(f)).val();
        let ol = `
            <ol style="list-style-type: ${mark}">
                ${`<li>ITEM</li>
                `.repeat(n).trim()}
            </ol>\n`;
        $('#editArea').val($('#editArea').val()+ol);
    }

})

