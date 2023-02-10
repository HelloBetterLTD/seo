import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import { provideInjector } from 'lib/Injector';

const InjectableInsertMediaModal = provideInjector(window.InsertMediaModal.default);

jQuery.entwine('ss', ($) => {
    $('#insert-seo-media-react__dialog-wrapper').entwine({

        Element: null,
        ImageType: null,
        Data: {},
        onunmatch() {
            // solves errors given by ReactDOM "no matched root found" error.
            this._clearModal();
        },
        _clearModal() {
            ReactDOM.unmountComponentAtNode(this[0]);
        },

        open() {
            this._renderModal(true);
        },

        close() {
            this._renderModal(false);
        },
        setTypeField(type) {
            this.ImageType = type;
        },

        /**
         * Renders the react modal component
         *
         * @param {boolean} show
         * @private
         */
        _renderModal(show) {
            const handleHide = () => this.close();
            const handleInsert = (...args) => this._handleInsert(...args);
            const store = window.ss.store;
            const client = window.ss.apolloClient;
            const attrs = {};

            // create/update the react component
            ReactDOM.render(
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <InjectableInsertMediaModal
                          title={false}
                          type="insert-media"
                          isOpen={show}
                          onInsert={handleInsert}
                          onClosed={handleHide}
                          bodyClassName="modal__dialog"
                          className="insert-media-react__dialog-wrapper"
                          equireLinkText={false}
                          fileAttributes={attrs}
                        />
                  </Provider>
                </ApolloProvider>,
                this[0]
            );
        },

        /**
         * Handles inserting the selected file in the modal
         *
         * @param {object} data
         * @param {object} file
         * @returns {Promise}
         * @private
         */
        _handleInsert(data, file) {
            let result = false;
            this.setData(Object.assign({}, data, file));

            try {
                let category = null;
                if (file) {
                    category = file.category;
                } else {
                    category = 'image';
                }

                if (category === 'image') {
                    result = this.insertImage();
                } else {
                    throw 'Wrong file type';
                }
            } catch (e) {
                this.statusMessage(e, 'bad');
            }

            if (result) {
                this.close();
            }
            return Promise.resolve();
        },


        /**
         * Handler for inserting an image
         *
         * @returns {boolean} success
         */
        insertImage() {
            const $field = this.getElement();
            if (!$field) {
                return false;
            }

            const data = this.getData();
            $field.Element.setImageForType($field.Type, data);
            return true;
        },

        /**
         * Pop up a status message if required to notify the user what is happening
         *
         * @param text
         * @param type
         */
        statusMessage(text, type) {
            const content = $('<div/>').text(text).html(); // Escape HTML entities in text
            $.noticeAdd({
                text: content,
                type,
                stayTime: 5000,
                inEffect: { left: '0', opacity: 'show' },
            });
        }

    });
});
