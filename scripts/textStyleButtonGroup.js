
// TEXT FONT SETTINGS BUTTONGROUP 
// Inherits from the SUPER CLASS BUTTONGROUP

function TextStyleButtonGroup(group, target){
    'use strict';
    ButtonGroup.call(this, group, target);
}

tempProto = Object.create(ButtonGroup.prototype);
Object.defineProperties(tempProto, {
    constructor: {
        value: TextStyleButtonGroup,
    },
    makeBold: {
        value: function() {
            $(this.target).toggleClass('bold');
        }
    },
    makeItalic: {
        value: function() {
            $(this.target).toggleClass('italic');
        }
    },
    makeUnderline: {
        value: function() {
            $(this.target).removeClass('strikethrough');
            $(this.target).toggleClass('underline');
        }
    },
    makeStrikethrough: {
        value: function() {
            $(this.target).removeClass('underline');
            $(this.target).toggleClass('strikethrough');
        }
    },
});
TextStyleButtonGroup.prototype = tempProto;



// TEXT FONT SETTINGS BUTTONGROUP 
// Inherits from the SUPER CLASS BUTTONGROUP

function TextAlignmentButtonGroup(group, target){
    'use strict';
    ButtonGroup.call(this, group, target);
}

tempProto = Object.create(ButtonGroup.prototype);
Object.defineProperties(tempProto, {
    constructor: {
        value: TextAlignmentButtonGroup,
    },
    textStart: {
        value: function() {
            $(this.target).removeClass('text-start text-center text-end')
            $(this.target).addClass('text-start');
        }
    },
    textCenter: {
        value: function() {
            $(this.target).removeClass('text-start text-center text-end')
            $(this.target).addClass('text-center');
        }
    },
    textEnd: {
        value: function() {
            $(this.target).removeClass('text-start text-center text-end')
            $(this.target).addClass('text-end');
        }
    },
});
TextAlignmentButtonGroup.prototype = tempProto;


