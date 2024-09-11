class Decision extends JsonForm {
    constructor(endpoint=false, option="", barriers = "") {
        super()
        this.endpoint = endpoint
        this.option = option
        this.barriers = barriers
    }

    static add(selector) {
        let content = new Decision
        content.createInputs(selector)
        content.updateInputs()
    }

    static remove(selector) {
        $(selector).children().last().remove()
    }
}

class ArrayForm {
    constructor(value = [""]) {
        this.formId = self.crypto.randomUUID()
        this.formTitle = ""
        this.value = value
    }
    createInputs(selector) {
        $(selector).append(`<form id="${this.formId}"><h3>${this.formTitle}</h3><button>-</button></form>`);
        this.value.forEach((item) => {
            let formSelector = `#${this.formId}`;
            $(formSelector).append(`<label for="${item}"> ${item.toUpperCase()}: </label>`);
            switch (typeof (this[item])) {
                case "string":
                    $(formSelector).append(`<input type="text" id="${this.formId}-${item}" name="${this.formId}-${item}" placeholder="${item}"><br><br>`);
                    break;
                case "boolean":
                    $(formSelector).append(`<input type="checkbox" id="${this.formId}-${item}" name="${this.formId}-${item}" placeholder="${item}"><br><br>`);
                    break;
                case "number":
                    $(formSelector).append(`<input type="number" id="${this.formId}-${item}" name="${this.formId}-${item}" placeholder="${item}"><br><br>`);
                    break;
                default:
                    break;
            }
        });
    }
}
// On Page Load
$(function() {
    let selector = "#instruction-contentBlock"
    ContentBlock.add(selector)
});