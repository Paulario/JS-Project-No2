
function FormValidation(form,...callback) {
    this.form = form;
    this.submitBtn = $(':button[name="submit"]:last',$(form));
    this.inputs = $(':input', $(this.form)).filter(':not(:button)');
    this.submitBtn.click(this.onClick.bind(this));
    for(const fun of callback){
        this.submitBtn.click(fun.bind(this));
    }
    $(this.inputs).each((_,elem) => {
        $(elem).blur(() => {
            let checker;
            if($(elem).data('pattern')){
                checker = this.checkers.custom($(elem).data('pattern'))
            } else if($(elem).data('checker')){
                checker = this.checkers[$(elem).data('checker')];
            } else {
                alert('[WARNING] No suitable checker or pattern provided!');
            }
            this.validate(elem, checker);
        });
    });
}

FormValidation.prototype = {
    constructor: FormValidation,
    checkers: {
        email(email){
            email = email.trim();
            let regExp = /^(\w+((\.|-)\w+)?\.?)+@(gmail|ukr)\.(ua|com|org|net)$/;
            return regExp.test(email);
        },
        name(name){
            let regExp = /^[A-Za-z]{3,18}$/;
            return regExp.test(name);
        },
        phone(phone){
            phone = phone.trim();
            let regExp = /^\+38\(0\d{2}\)-\d{2}-\d{2}-\d{3}$/;
            return regExp.test(phone);
        },
        password(password){
            password = password.trim();
            let regExp = /^(\w|\s){8,255}$/;
            return regExp.test(password);
        },
        custom(pattern){
            return function(value){
                let regExp = new RegExp(pattern);
                return regExp.test(value);
            }
        }
    },
    i: 1,
    validate(input, checker){
        let isValid = checker($(input).val());
        if(isValid){
            $(input).addClass('border-success border-2 text-success');
            $(input).removeClass('border-danger border-2 text-danger');
            $(input).data('valid',true);
        } else {
            $(input).addClass('border-danger border-2 text-danger');
            $(input).removeClass('border-success border-2 text-success');
            $(input).data('valid',false);
        }
    },
    reset(){
        $(this.form).trigger('reset');
        $(this.inputs).each(function(_,elem) {
            $(elem).removeClass('border-success border-2 text-success');
        });
    },
    onClick(){
        $(this.inputs).trigger('blur');
        $(this.inputs).each(function(_,elem) {
            if($(elem).is('.border-danger') || $(elem).is(':not(.border-success)')){
                $(elem).removeClass('border-2');
                $(elem).addClass('border-2 border-danger text-danger');
            }
        });
    }
}
