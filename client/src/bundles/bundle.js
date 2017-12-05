import jQuery from 'jquery';
require('../components/SEOEditorHolder/SEOEditorHolder');


jQuery.entwine('ss', ($) => {

    $('.js-seo-editor:visible').entwine({
        onunmatch() {
            this._super();
            ReactDOM.unmountComponentAtNode(this[0]);
        },
        onmatch() {
            this._super();
            this.refresh();
        },
        refresh() {
        //     let textArea = $(this).parent().find('textarea')[0];
        //     let data = JSON.parse(textArea.dataset.config);
        //     let toolbar = ss.markdownConfigs.readToolbarConfigs(data.toolbar);
        //
        //     ReactDOM.render(
        //     <MarkdownEditorField textarea={textArea} toolbar={toolbar} identifier={data.identifier}></MarkdownEditorField>,
        //         this[0]
        // );
        }
    });

});