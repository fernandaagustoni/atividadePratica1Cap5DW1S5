var loadState = {
    preload: function(){
        var progressBar = game.add.sprite(game.world.centerX,250, 'progressBar');
        var txtLoading = game.add.text(game.world.centerX, 200, 'LOADING...', {font:'15px Arial', fill:'#fff'});
        progressBar.anchor.set(.5);
        txtLoading.anchor.set(.5);
    
        game.load.setPreloadSprite(progressBar);
        
        //Carregamento de imagens
        game.load.image('bg', 'img/bg.png');
        game.load.image('block', 'img/block.png');
        game.load.image('end', 'img/end1.png');
        game.load.image('part', 'img/part.png');
        
        //Carregamento de Spritesheet
        game.load.spritesheet('coin', 'img/coin.png', 32,32);
        game.load.spritesheet('enemy', 'img/enemy1.png', 150,90);
        game.load.spritesheet('player', 'img/player1.png', 49,64);

        //Carregamento dos audios
        game.load.audio('getitem', 'songs/getitem.ogg');
        game.load.audio('loseitem', 'songs/loseitem.ogg');
        game.load.audio("music", ["songs/music.mp3"]);
    },

    create: function(){
        game.state.start('menu');
    }
};