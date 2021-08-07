<template>
  <v-app>
    <v-app-bar
      app
      color="black"
    >
      <v-row class="text-center">
        <v-col class="d-flex align-center" cols="4" >
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.svg"
            transition="scale-transition"
            width="40"
          />
          <h2 class="font-weight-bold white--text">
            Sokoban
          </h2>
        </v-col>
        <v-col v-if="settings.state" cols="4"  class="d-flex align-center justify-center">
          <h2 class="font-weight-bold white--text">
            Level {{settings.level}}
          </h2>
        </v-col>
        <v-col v-if="settings.state" cols="4"  class="d-flex align-center justify-end">
          <v-btn @click="settings.state=false" color="primary"  >
            Turn Back
            <v-icon right dark >
              mdi-arrow-left-bold-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <HomePage v-if="!settings.state" @actions='settingsHandle' />
      <PlayPage v-if="settings.state" :settings='settings'/>
    </v-main>
  </v-app>
</template>

<script>
import HomePage from './components/HomePage';
import PlayPage from './components/PlayPage';

export default {
  name: 'App',

  components: {
    HomePage,
    PlayPage,  
  },

  data: () => ({
    settings : {
      typePlayer: true,
      level:1,
      state:false
    } 
  }),
  methods: {
    settingsHandle(e){
      this.settings= e;
    },
  },
};
</script>
