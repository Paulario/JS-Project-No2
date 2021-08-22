function GeneratorButtonGroup(group, target){
    ButtonGroup.call(this, group, target);
}

GeneratorButtonGroup.prototype = Object.create(ButtonGroup.prototype);
GeneratorButtonGroup.prototype.constructor = GeneratorButtonGroup;
Object.defineProperties(GeneratorButtonGroup.prototype, {
    save: {
        value: function() {
            $(this.DOMGroupObject).fadeToggle(250, () => {
                $(document.forms.styleForm).fadeToggle();
            });
            $('#editArea').fadeToggle(250, () => {
                $(this.target).toggle();
            });
            $(this.target).html($('#editArea').val());
        }
    },
});
