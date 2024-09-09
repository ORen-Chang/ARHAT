class JsonForm {
    constructor() {
        this.id = self.crypto.randomUUID()
    }

    getEditableAttr() {
        var variables = []
        for (var name in this) {
            variables.push(name)
        }
        return variables.filter((variable) => variable != "id")
    }

    createInputs(selector) {
        $(selector).append(`<form id="${this.id}"></form>`)
        this.getEditableAttr().forEach( (attribute) => {
            let formId = `#${this.id}`
            $(formId).append(`<label for="${attribute}"> ${attribute.toUpperCase()}: </label>`)
            $(formId).append(`<input type="text" id="${this.id}-${attribute}" name="${this.id}-${attribute}" placeholder="${attribute}"><br><br>`)
        })
    }

    updateInputs() {
        var that = this

        $(document).keypress( function() {
            that.getEditableAttr().forEach( (attribute) => {
                let selector = `#${that.id}-${attribute}`
                that[attribute] = $(selector).val()
    
                console.log(that)
            }) 
        })
    }

    deleteInputs() {
        let selector = `#${this.id}`
        $(selector).remove()
    }

    toString() {
        return JSON.stringify(this);
    }
    
    
}

class ContentBlock extends JsonForm {
    constructor(header, body, image, caption) {
        super()
        this.header = header
        this.body = body
        this.image = image
        this.caption = caption
    }
}