var menuState = {
    create: function(){
		this.music = game.add.audio('music');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();

        var txtMaze = game.add.text(game.world.centerX, 150, 'Maze Game', {font: '40px Times New Roman', fill: '#fff'});
        var txtPressStart = game.add.text(game.world.centerX, 550, 'PRESS START', {font: '20px Times New Roman', fill: '#fff'});
        
        txtMaze.anchor.set(.5);
        txtPressStart.anchor.set(.5);

        //Recurso do Phaser para criar o efeito
        game.add.tween(txtPressStart).to({y:250},1000).start();

        //Aguarda o texto de start para permitir pressionar enter
        game.time.events.add(1000, function(){
            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //Chama função startGame após pressionado ENTER
            enterKey.onDown.addOnce(this.startGame,this);
        },this);

    },

    startGame: function(){
        this.music.stop();
        game.state.start('stage');
    }

    
};