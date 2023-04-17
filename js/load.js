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
        game.load.image('coin', 'img/coin.png');
        
        //Carregamento de Spritesheet
        game.load.spritesheet('player', 'img/player.png', 24,32);

        game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    create: function(){
        game.state.start('menu');
    }
};