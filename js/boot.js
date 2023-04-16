
//Inicia o jogo
var bootState = {
    preload: function(){
        game.load.image('progressBar', 'img/progressBar.png');
    },

    //Chama o load.js
    create: function(){
        game.state.start('load');
    }
};

