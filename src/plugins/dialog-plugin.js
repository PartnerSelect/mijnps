import Dialog from '../components/Dialog.vue';

const DialogPlugin = {
    install(Vue) {
        if (this.installed) {
            return;
        }

        this.installed = true;
        this.event = new Vue();

        Vue.component('Dialog', Dialog);

        Vue.prototype.$dialog = {
            confirm(input) {
                if (typeof input === 'string') {
                    input = {
                        message: input
                    };
                }
                DialogPlugin.event.$emit('openDialog', { cancellable: true, ...input });
            },
            popup(input) {
                if (typeof input != 'string') {
                    return false;
                }
                DialogPlugin.event.$emit('openDialog', { cancellable: false, message: input });
            }
        };
    }
};

export default DialogPlugin;
