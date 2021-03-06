define(
    [
        "jquery", "underscore",
        "js/utils/handle_iframe_binding",
    ],
function ($, _, IframeBinding) {

    describe("IframeBinding", function () {
        var doc = document.implementation.createHTMLDocument("New Document");
        var iframe_html = '<iframe src="http://www.youtube.com/embed/NHd27UvY-lw" frameborder="0" height="350" width="618"></iframe>';
        iframe_html += '<iframe src="http://www.youtube.com/embed/NHd27UvY-lw?allowFullScreen=false" frameborder="0" height="350" width="618"></iframe>';
        iframe_html += '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/embed/NHd27UvY-lw" height="315" width="560">';
        doc.body.innerHTML = iframe_html;

        it("modifies src url of DOM iframe and embed elements when iframeBinding function is executed", function () {
            expect($(doc).find("iframe")[0].src).toEqual("http://www.youtube.com/embed/NHd27UvY-lw");
            expect($(doc).find("iframe")[1].src).toEqual("http://www.youtube.com/embed/NHd27UvY-lw?allowFullScreen=false");
            expect($(doc).find("embed")[0].hasAttribute("wmode")).toBe(false);

            IframeBinding.iframeBinding(doc);

            //after calling iframeBinding function: src url of iframes should have "wmode=transparent" in its querystring
            //and embed objects should have "wmode='transparent'" as an attribute
            expect($(doc).find("iframe")[0].src).toEqual("http://www.youtube.com/embed/NHd27UvY-lw?wmode=transparent");
            expect($(doc).find("iframe")[1].src).toEqual("http://www.youtube.com/embed/NHd27UvY-lw?wmode=transparent&allowFullScreen=false");
            expect($(doc).find("embed")[0].hasAttribute("wmode")).toBe(true);

            iframe_html = IframeBinding.iframeBindingHtml(iframe_html);

            //after calling iframeBinding function: src url of iframes should have "wmode=transparent" in its querystring
            //and embed objects should have "wmode='transparent'" as an attribute
            expect(iframe_html).toEqual('<iframe src="http://www.youtube.com/embed/NHd27UvY-lw?wmode=transparent" frameborder="0" height="350" width="618"></iframe>' +
                '<iframe src="http://www.youtube.com/embed/NHd27UvY-lw?wmode=transparent&amp;allowFullScreen=false" frameborder="0" height="350" width="618"></iframe>' +
                '<embed wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/embed/NHd27UvY-lw" height="315" width="560">');
        });
    });
});
