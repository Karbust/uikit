import { Class } from '../mixin/index';
import { query } from '../util/index';

export default function (UIkit) {

    UIkit.component('form-custom', {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        defaults: {
            target: false
        },

        computeds: {

            input() {
                return this.$el.find(':input:first');
            },

            state() {
                return this.input.next();
            },

            target() {
                this.$props.target && query(this.$props.target === true ? '> :input:first + :first' : this.$props.target, this.$el)
            }

        },

        ready() {
            this.input.trigger('change');
        },

        events: [

            {

                name: 'focus blur mouseenter mouseleave',

                delegate: ':input:first',

                handler({type}) {
                    this.state.toggleClass(`uk-${~['focus', 'blur'].indexOf(type) ? 'focus' : 'hover'}`, ~['focus', 'mouseenter'].indexOf(type));
                }

            },

            {

                name: 'change',

                handler() {
                    this.target && this.target[this.target.is(':input') ? 'val' : 'text'](
                        this.input[0].files && this.input[0].files[0]
                            ? this.input[0].files[0].name
                            : this.input.is('select')
                                ? this.input.find('option:selected').text()
                                : this.input.val()
                    );
                }

            }

        ]

    });

}
