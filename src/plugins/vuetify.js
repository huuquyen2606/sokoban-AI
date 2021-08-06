import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2196f3',
                secondary: '#03a9f4',
                accent: '#ffeb3b',
                error: '#f44336',
                warning: '#ff9800',
                info: '#607d8b',
                success: '#4caf50'
            },
        },
    },
});
