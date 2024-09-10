class JsonForm {
    constructor() {
        this.formId = self.crypto.randomUUID()
        this.formTitle = ""
    }

    static deleteFormById(formId) {
        let selector = `#${formId}`
        $(selector).remove()
    }

    getEditableAttr() {
        var variables = []
        for (var name in this) {
            variables.push(name)
        }
        return variables.filter((variable) => !variable.startsWith("form"))
    }

    createInputs(selector) {
        $(selector).append(`<form id="${this.formId}"><h3>${this.formTitle}</h3></form>`);
        this.getEditableAttr().forEach((attribute) => {
            let formSelector = `#${this.formId}`;
            $(formSelector).append(`<label for="${attribute}"> ${attribute.toUpperCase()}: </label>`);
            switch (typeof (this[attribute])) {
                case "string":
                    $(formSelector).append(`<input type="text" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`);
                    break;
                case "boolean":
                    $(formSelector).append(`<input type="checkbox" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`);
                    break;
                case "number":
                    $(formSelector).append(`<input type="number" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`);
                    break;
                default:
                    break;
            }
        });
    }

    updateInputs() {
        var that = this

        $(document).on( "keypress", function() {
            that.getEditableAttr().forEach( (attribute) => {
                let selector = `#${that.formId}-${attribute}`
                that[attribute] = $(selector).val()
            }) 

            console.log(that)
        })
    }

    deleteInputs() {
        let selector = `#${this.formId}`
        $(selector).remove()
    }

    toString() {
        return JSON.stringify(this);
    }
}


$(document).on("keydown", ":input:not(textarea)", function(event) {
    return event.key != "Enter";
})