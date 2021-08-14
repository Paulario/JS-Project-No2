'use strict';

$(function () {

    $('form[name="controlForm"').click(function(event){
        let t = $(event.target.closest('.btn'));
        if(!jQuery.isEmptyObject(t)){
            let name = $(t).attr('name');
            if (t.parent().is('[name="textDecoration"]')) {
                decoreText(name);
            }
            if (t.parent().is('[name="textAlignment"]')) {
                console.log('here');
                alignText(name);
            }
        }

    })

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

