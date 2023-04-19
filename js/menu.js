var menuState = {
    create: function(){
        var txtMaze = game.add.text(game.world.centerX, 100, 'Maze Game', {font: '40px Times New Roman', fill: '#fff'});
        var txtHistory = game.add.text(game.world.centerX, 200, 'Ajude a Maria se formar' + '\n\nApertando as SETAS DO TECLADO você poderá levar a MARIA\naté o final do caminho, até o seu tão esperado diploma.', {font: '15px Times New Roman', fill: '#fff'});
        var txtPressStart = game.add.text(game.world.centerX, 550, 'PRESS START', {font: '20px Times New Roman', fill: '#fff'});

        txtMaze.anchor.set(.5);
        txtPressStart.anchor.set(.5);
        txtHistory.anchor.set(.5);

        //Recurso do Phaser para criar o efeito
        game.add.tween(txtPressStart).to({y:300},1000).start();

        //Aguarda o texto de start para permitir pressionar enter
        game.time.events.add(1000, function(){
            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            //Chama função startGame após pressionado ENTER
            enterKey.onDown.addOnce(this.startGame,this);
        },this);

    },

    //Inicia o jogo e mostra os labirintos de forma aleatória
    startGame: function(){
        game.state.start('stage');
    }

    
};