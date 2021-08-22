// FORM SUPER CLASS

function ButtonGroup(group, target){
    'use strict';
    this.DOMGroupObject = group;
    this.target = $(target);
    $(this.DOMGroupObject).click(this.onClick.bind(this));
}

ButtonGroup.prototype = {
    constructor: ButtonGroup,
    onClick(event) {
        let action = $(event.target).closest('.btn').data('action');
        if(action && this[action]){
            this[action](event);
        } else {
            return;
        }
    }
} 

function DropdownPropPicker(dropdown, target, replaceValue=false){
    this.dropdown = $(dropdown);
    this.target = $(target);
    this.prop = $(this.dropdown).data('prop');
    this.replaceValue = replaceValue;
    $('.dropdown-item', $(this.dropdown)).each((_, elem) => {
        $(elem).css(this.prop, $(elem).attr('value'));
    });
    $(this.dropdown).click(this.onClick.bind(this));
}

DropdownPropPicker.prototype = {
    constructor: DropdownPropPicker,
    onClick(event){
        if($(event.target).is('.dropdown-item')){
            let value = $(event.target).attr('value');
            $(this.target).css(this.prop, value);
            if(this.replaceValue){
                $('button.dropdown-toggle', this.dropdown).text(value);
            }
        }
    },
}

function GridPicker(grid, target){
    'use strict';
    this.grid = $(grid);
    this.target = $(target);
    this.prop = $(this.grid).data('prop');
    $(this.grid).click(this.onClick.bind(this));
}

GridPicker.prototype = {
    constructor: GridPicker,
    onClick(event){
        if($(event.target).is('.grid-tile')){
            let value = $(event.target).attr('value');
            let isBackground = /^background-/.test(this.prop);
            if(isBackground){
                $('body').css(this.prop, value);
            } else {
                $(this.target).css(this.prop, value);
            }
        }
    }
}
