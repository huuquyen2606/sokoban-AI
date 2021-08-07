<template>
    <v-container >
        <div @keyup="handleKeyUp($event)" tabindex="0" ref="playgame"></div>
        <v-row class="text-center" >
            <v-col class="mb-3 justify-center" cols="12" >
                <div v-for="(tileRow, rowIndex) in level[this.settings.level-1].levelMap" :key="'tileRow'+rowIndex">
                    <div :class="['tile tile-' + tileName]" :style="{ top: rowIndex*64 + 'px', left: tileIndex*64 + 'px'}"
                        v-for="(tileName, tileIndex) in tileRow" :key="'tileName'+tileIndex"></div>
                </div>
                <div v-for="(actor, index) in actors" :key="'actor'+index">
                    <div :class="['actor actor-' + actor.name]" :style="{ top: actor.y + 'px', left: actor.x + 'px' }"></div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'PlayPage',
        props:['settings'],
        data: () => ({
            level:[
                {
                    levelMap: [
                        "wwwwwwww",
                        "warorx w",
                        "w      w",
                        "wwwwwwww"],
                    isLocked: false
                },
                {
                    levelMap: [
                        "wwwwwww",
                        "wa    w",
                        "w ox  w",
                        "w xo  w",
                        "w     w",
                        "wwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwww",
                        "wa    w",
                        "w  oo w",
                        "w xox w",
                        "w  x  w",
                        "wwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwww",
                        "wa  www",
                        "w wowww",
                        "w o xxw",
                        "wwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwwwwww",
                        "w        aww",
                        "w o     xwww",
                        "wwowo  xwwww",
                        "w  x   wwwww",
                        "wwwwwwwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwwwww",
                        "w  x   xa w",
                        "w wxw wxw w",
                        "w  x   x  w",
                        "w    x    w",
                        "w    w    w",
                        "w  o   o  w",
                        "w  ooooo  w",
                        "w         w",
                        "wwwwwwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwwwww",
                        "w    wwx aw",
                        "w      x  w",
                        "w    wwx  w",
                        "w  wwwwwwww",
                        "w         w",
                        "w         w",
                        "wwwwwwww  w",
                        "w  o   oo w",
                        "w         w",
                        "wwwwwwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwww",
                        "wwwww x w",
                        "wwww ox w",
                        "www o   w",
                        "ww oa www",
                        "w o  wwww",
                        "wxx wwwww",
                        "w   wwwww",
                        "wwwwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwww",
                        "wwx xww",
                        "wxoooxw",
                        "w oao w",
                        "wxoooxw",
                        "wwx xww",
                        "wwwwwww"],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwww",
                        "wa  w   w",
                        "w o w o w",
                        "w  x x  w",
                        "www w www",
                        "w  x x  w",
                        "w o w o w",
                        "w   w   w",
                        "wwwwwwwww"
                    ],
                    isLocked: true
                },
                {
                    levelMap: [
                        "wwwwwwwwww",
                        "www  wwwww",
                        "w  o  axxw",
                        "w o    w w",
                        "www wwww w",
                        "www      w",
                        "wwwwwwwwww"],
                    isLocked: true
                },
            ],
            actors:[],
            tileWidth: 64,
            tileHeight: 64,  
            size_x:0,
            size_y:0,    
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
            },
            // moveActor(actor, vectorX, vectorY) {
            //     let tileWidth = this.$store.state.tile.width;
            //     let tileHeight = this.$store.state.tile.height;
            //     let maxX = this.$store.state.level.width - tileWidth;
            //     let maxY = this.$store.state.level.height - tileHeight;

            //     // Movement should remain in playground
            //     if ((actor.x >= maxX) || (actor.y >= maxY) || (actor.x <= 0) || (actor.y <= 0)) {
            //         return false;
            //     }

            //     // It's not possible to walk through walls
            //     if (!this.isWalkable(actor.x + vectorX * tileWidth, actor.y + vectorY * tileHeight)) {
            //         return false;
            //     }
            //     store.commit("moveVector", { actor, vectorX, vectorY });

            //     // Update name of actor when it's final
            //     if (this.isFinalPosition(actor.x, actor.y)) {
            //         if (actor.name === "mfd") {
            //             store.commit("updateName", { actor: actor, name: "mfd-final"});
            //         }
            //     } else {
            //         if (actor.name === "mfd-final") {
            //             store.commit("updateName", { actor: actor, name: "mfd"})
            //         }
            //     }
            //     return true;
            // },
            moveAvatar(vectorX, vectorY) {
                for(let y=0; y<this.actors.length; y++){
                    if (this.actors[y].name=='avatar'){
                        let newX = (this.actors[y].x/this.tileWidth) + vectorX ;
                        let newY = (this.actors[y].y/this.tileHeight) + vectorY ;
                        let nearBlock = this.checkBlockNear(newX,newY);
                        if(this.moveAble(newX,newY,newX + vectorX,newY + vectorY,nearBlock)){
                            this.actors[y].x=newX*this.tileWidth;
                            this.actors[y].y=newY*this.tileHeight;
                            if(nearBlock>=0){
                                this.actors[nearBlock].x=(newX+vectorX)*this.tileWidth;
                                this.actors[nearBlock].y=(newY+vectorY)*this.tileHeight;
                            }
                        }
                        this.checkBulbOn();
                    }
                }
            },
            checkBlockNear(vectorX, vectorY){
                for(let y=0; y<this.actors.length; y++){
                    if ((this.actors[y].x/this.tileWidth)==vectorX && (this.actors[y].y/this.tileHeight)==vectorY && this.actors[y].name!='avatar'){
                        return y;
                    }
                }
                return -1;
            },
            checkBulbOn(){
                for(let y=0; y<this.actors.length; y++){
                    if (this.level[this.settings.level-1].levelMap[this.actors[y].y/this.tileHeight][this.actors[y].x/this.tileWidth] ==="x" && this.actors[y].name!='avatar'){
                        this.actors[y].name = "mfd-final";
                    }else if(this.actors[y].name!='avatar') {
                        this.actors[y].name = "mfd";
                    }
                }
            },
            moveAble(vectorX, vectorY,blockX,blockY,nearBlock){
                if(nearBlock>=0){
                    for(let y=0; y<this.actors.length; y++){
                        if ((this.actors[y].x/this.tileWidth)==blockX && (this.actors[y].y/this.tileHeight)==blockY){
                            return false;
                        }
                    }
                    if(this.level[this.settings.level-1].levelMap[vectorY][vectorX]==="w"||this.level[this.settings.level-1].levelMap[blockY][blockX]==="w"){
                        return false;
                    }else return true;
                }else{
                    if(this.level[this.settings.level-1].levelMap[vectorY][vectorX]==="w"){
                        return false;
                    }else return true;  
                }
                 
            },
            handleKeyUp (e) {
                if(e.key=="ArrowUp"){
                    this.moveAvatar(0, -1);
                } else if(e.key == "ArrowDown"){
                    this.moveAvatar(0, 1);
                }else if(e.key == "ArrowLeft"){
                    this.moveAvatar(-1, 0);
                }else if(e.key == "ArrowRight"){
                    this.moveAvatar(1, 0);
                }
            },
            loadActor(){
                this.size_y = this.level[this.settings.level-1].levelMap.length;
                this.size_x = this.level[this.settings.level-1].levelMap[0].length;
                console.log(this.size_x,this.size_y)
                for(let y = 0; y < this.size_y; y++) {
                    for (let x = 0; x < this.size_x; x++) {
                        let tile = this.level[this.settings.level-1].levelMap[y][x];
                        if (tile === "a") {
                            this.actors.push({
                                name: 'avatar',
                                x: x * this.tileWidth,
                                y: y * this.tileHeight
                            });
                        } else if (tile === "o") {
                            this.actors.push( {
                                name: 'mfd',
                                x: x * this.tileWidth,
                                y: y * this.tileHeight
                            });
                        }
                    }
                }
            }
        },
        created:function(){
            this.loadActor();
        },
        mounted(){
            this.$refs.playgame.focus();
        }
    }
</script>
<style scoped>
.tile {
    width: 64px;
    height: 64px;
    position: absolute;
}

.tile- {
    border: 0;
    background: url("../assets/svg/grid.svg") no-repeat center;
}

.tile-r {
    background: url("../assets/svg/arrow-right.svg") no-repeat center;
}

.tile-w {
    background: url("../assets/svg/bricks.svg") no-repeat center;
}

.tile-x {
    background: url("../assets/svg/lightning.svg") no-repeat center;
}

.tile-f {
    width: 580px;
    height: 320px;
    background: url("../assets/svg/pf2019-message.svg") no-repeat center;
}
.actor {
    width: 64px;
    height: 64px;
    position: absolute;
}

.tile-info {
    width: 64px;
    height: 64px;
    float: left;
}

.tile-text {
    height: 64px;
    float: left;
}

.info-line {
    font-size: 2.1em;
    clear: left;
}

.actor-avatar {
    background: url("../assets/svg/robot.svg") no-repeat center;
}

.actor-mfd {
    background: url("../assets/svg/bulb-off.svg") no-repeat center;
}

.actor-mfd-final {
    background: url("../assets/svg/bulb-on.svg") no-repeat center;
}
</style>
