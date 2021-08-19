
console.log(ButtonGroup, TextAlignmentButtonGroup)


function TextFontButtonGroup(group,target) {
    ButtonGroup.call(this, group, target);
}

tempProto = Object.create(ButtonGroup.prototype);
Object.defineProperties(tempProto, {

});
TextFontButtonGroup.prototype = tempProto;
