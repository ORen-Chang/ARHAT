"use strict";

class JsonForm {
    formId;
    formTitle;
    constructor() {
        this.formId = crypto.randomUUID();
        this.formTitle = "";
    }
    getEditableAttr() {
        var variables = [];
        for (var name in this) {
            let attrName = String(name);
            if (!attrName.startsWith("form")) {
                variables.push(attrName);
            }
        }
        return variables;
    }
    createInputs(selector) {
        $(selector).append(`<form id="${this.formId}"><h3>${this.formTitle}</h3></form>`);

        let formSelector = `#${this.formId}`;
        this.getEditableAttr().forEach((attribute) => {
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
        return formSelector
    }
    updateInputs() {
        var that = this;
        $(document).on("keypress", function () {
            that.getEditableAttr().forEach((attribute) => {
                let selector = `#${that.formId}-${attribute}`;
                for (var name in that) {
                    // Not Type Safe
                    that[name] = $(selector).val();
                }
                // Edit Later
                console.log($(selector).val());
            });
        });
    }
    deleteInputs() {
        let selector = `#${this.formId}`;
        $(selector).remove();
    }
    toString() {
        return JSON.stringify(this);
    }
}
/*
class JsonForm {
    formId : string
    formTitle: string

    constructor() {
        this.formId = crypto.randomUUID()
        this.formTitle = ""
    }

    getEditableAttr() {
        var variables: Array<string> = []
        for (var name in this) {
            let attrName = String(name)
            if (!attrName.startsWith("form")) {
                variables.push(attrName)
            }
        }
        
        return variables
    }


    createInputs(selector: string) {
        $(selector).append(`<form id="${this.formId}"><h3>${this.formTitle}</h3></form>`)
        this.getEditableAttr().forEach( (attribute) => {
            let formSelector = `#${this.formId}`
            $(formSelector).append(`<label for="${attribute}"> ${attribute.toUpperCase()}: </label>`)

            switch (typeof(this[attribute as keyof this])) {
                case "string":
                    $(formSelector).append(`<input type="text" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`)
                    break;
                case "boolean":
                    $(formSelector).append(`<input type="checkbox" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`)
                    break;
                case "number":
                    $(formSelector).append(`<input type="number" id="${this.formId}-${attribute}" name="${this.formId}-${attribute}" placeholder="${attribute}"><br><br>`)
                    break;
                default:
                    break;
            }
        })
    }

    updateInputs() {
        var that = this

        $(document).on( "keypress", function() {
            that.getEditableAttr().forEach( (attribute) => {
                let selector = `#${that.formId}-${attribute}`

                that[attribute] = $(selector).val()
    
                // Edit Later
                console.log($(selector).val())
            })
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

class Decision extends JsonForm {
    endpoint: boolean
    option: string

    constructor(endpoint: boolean, option: string) {
        super()
        this.endpoint = endpoint
        this.option = option
    }
}
*/
class ContentBlock extends JsonForm {
    header;
    body;
    image;
    caption;
    constructor(header = "", body = "", image = "", caption = "") {
        super();
        this.formTitle = "Content Block";
        this.header = header;
        this.body = body;
        this.image = image;
        this.caption = caption;
    }
}
/*
function addContentBlock() {
    let content = new ContentBlock
    content.createInputs("#instruction-contentBlock")
    content.updateInputs()
}

function removeContentBlock() {
    console.log($("#instruction-contentBlock").children().last())
    $("#instruction-contentBlock").children().last().remove()
}

$(function() {
    let content = new ContentBlock
    content.createInputs("#instruction-contentBlock")
    content.updateInputs()
});

$(document).on("keydown", ":input:not(textarea)", function(event) {
    return event.key != "Enter";
});
*/
