class ContentBlock extends JsonForm {
    constructor(header = "", body = "", image = "", caption = "") {
        super()
        this.formTitle = "Content Block"
        this.header = header
        this.body = body
        this.image = image
        this.caption = caption
    }

    static add(selector) {
        let content = new ContentBlock
        content.createInputs(selector)
        content.updateInputs()
    }

    static remove(selector) {
        $(selector).children().last().remove()
    }
}
$(function() {
    let selector = "#instruction-contentBlock"
    ContentBlock.add(selector)
});
