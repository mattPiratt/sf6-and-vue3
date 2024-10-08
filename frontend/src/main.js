import {createApp, defineAsyncComponent} from 'vue';
import App from './App.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseSortableHeader from "@/components/ui/BaseSortableHeader.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Store from '@/store/index.js';

const BaseDialog = defineAsyncComponent(() =>
    import('@/components/ui/BaseDialog.vue')
);

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('base-sortable-header', BaseSortableHeader);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});
app.use(Store);

app.mount('#app');
