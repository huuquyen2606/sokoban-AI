<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-3" cols="12" >
        <h2 class="headline font-weight-bold mb-5">
          Type: {{settings.typePlayer==true?'Single':'Duet With AI'}}
        </h2>
        <v-row justify="center">
          <v-btn @click="chooseType(1)" color="blue-grey" class="ma-2" outlined>
            Single
            <v-icon right dark>
              mdi-knife-military
            </v-icon>
          </v-btn>
          <v-btn @click="chooseType(2)" color="blue-grey" class="ma-2" outlined >
            Duet with AI
            <v-icon right dark >
              mdi-knife-military
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col class="mb-3" cols="12" >
        <h2 class="headline font-weight-bold mb-5">
          Choose Level : {{settings.level}}
        </h2>
        <v-row justify="center">
          <v-btn v-for="i in 11" :key="i" @click="chooseLevel(i)" class="ma-2" outlined large fab color="indigo">
            {{ i}}
          </v-btn>
        </v-row>
      </v-col>
      <v-col class="mb-3" cols="12" >
        <h2 class="headline font-weight-bold mb-3">
          How to play 
        </h2>
        <div class="d-flex align-center justify-center">
          <v-img class="shrink mr-2" contain src="../assets/svg/bulb-off.svg" transition="scale-transition" width="80" />
          <h2 class="font-weight-bold"> + </h2>
          <v-img class="shrink mr-2" contain src="../assets/svg/lightning.svg" transition="scale-transition" width="80" />
          <h2 class="font-weight-bold"> = </h2>
          <v-img class="shrink mr-2" contain src="../assets/svg/bulb-on.svg" transition="scale-transition" width="80" />
        </div>
        <div class="d-flex align-center justify-center mt-5">
          <h2 class="font-weight-bold"> Use </h2>
          <v-icon color="black" large>
            mdi-arrow-up-bold
          </v-icon>
          <v-icon color="black" large>
            mdi-arrow-down-bold
          </v-icon>
          <v-icon color="black" large>
            mdi-arrow-left-bold
          </v-icon>
          <v-icon color="black" large>
            mdi-arrow-right-bold
          </v-icon>
          <h2 class="font-weight-bold"> to control </h2>
          <v-img class="shrink mr-2" contain src="../assets/svg/robot.svg" transition="scale-transition" width="80" />
          <h2 class="font-weight-bold mr-2"> and [Space] to undo </h2>
          <v-icon color="black" large>
            mdi-history
          </v-icon>
        </div> 
        <v-row justify="center">
          <v-btn @click="handleClick('state',true)" color="primary" class="mt-10" x-large  >
            Play
            <v-icon right dark large>
              mdi-play
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomePage',
    props:['actions'],
    data: () => ({
      settings:{
        typePlayer: true,
        level:1,
        state:false
      }   
    }),
    methods: {
      chooseLevel(e){
        this.settings.level= e;
      },
      chooseType(e){
        this.settings.typePlayer= e==1?true:false;
      },
      handleClick(field,value){
        this.settings[field]=value;
        this.$emit('actions', this.settings);
      }
    },
  }
</script>
