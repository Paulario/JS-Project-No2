'use strict';

$(function () {
    const COLORS = [
        "#eaff7b", "#00ffab", "#29bdc1", "#d84242", "#913f92",
        "#e81676", "#d718cf", "#f065f1", "#874df7", "#6b03c2",
        "#ae1f6e", "#3b415e", "#74a6cc", "#68d4c7", "#cce77f",
    ]
    let mainForm = document.forms.controlForm;

    $('#fontFamilyPicker li', mainForm).each((_,elem) => {
        $(elem).css('font-family', $(elem).attr('value'));
    });
    $('#fontSizePicker li', mainForm).each((_,elem) => {
        $(elem).css('font-size', $(elem).attr('value'));
    });

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
            if (t.closest('.dropdown').is('#fontFamilyPicker')) {
                setFontFamily(value);
            }
        }

    })

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

})

