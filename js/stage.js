var stageState = {
    create: function(){
        this.onGame = true;

        game.add.sprite(0,0,'bg');

        this.maze = [
			[2,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,3,3,3,3,3,1,1],
			[1,3,3,1,0,3,3,0,0,0,0,1,1,3,1],
			[1,0,1,3,0,1,3,3,3,1,0,3,1,3,1],
			[1,0,3,0,1,1,1,1,0,1,0,1,1,3,1],
			[1,0,3,3,0,1,0,3,0,3,0,0,0,0,1],
			[1,0,1,3,3,3,0,0,1,0,0,3,1,0,1],
			[1,0,1,1,1,1,0,1,1,0,1,1,1,0,1],
			[1,3,3,3,3,3,3,3,1,3,3,3,3,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,0,4]
        ];

        this.blocks = game.add.group();
        this.blocks.enableBody = true;
        this.blockPositions = [];

        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col];

                var x = col * 50;
                var y = row * 50;

                if(tile === 1){
                    var block = this.blocks.create(x, y, 'block');
                    block.body.immovable = true;
                }
                else if(tile === 2){
                    this.player = game.add.sprite(x + 25, y + 25, 'player');
                    this.player.anchor.set(.5);
                    game.physics.arcade.enable(this.player);
                    //Configurando animação
                    this.player.animations.add('goDown',[0,1,2,3,4,5,6,7],10, true);
                    this.player.animations.add('goUp',[8,9,10,11,12,13,14,15],10, true);
                    this.player.animations.add('goLeft',[16,17,18,19,20,21,22,23],10, true);
                    this.player.animations.add('goRight',[24,25,26,27,28,29,30,31],10, true);
                }
                else if(tile === 4){
                    this.coin = game.add.sprite(x + 25, y + 25, 'coin');
                    this.coin.anchor.set(.5);
                    game.physics.arcade.enable(this.coin);
                }
                else if(tile === 3){
                    var position = {
                        x: x + 25,
                        y: y + 25
                    };
                    this.blockPositions.push(position);
                }
            }
        }

        //Criação de blocos para alterar labirinto
        this.block = {};
        this.block.position = this.newPosition();
        this.block = game.add.sprite(this.block.position.x, this.block.position.y, 'block');
        this.block.anchor.set(.5);    

        //Controle de jogo
        this.controls = game.input.keyboard.createCursorKeys();

        //Timer
        this.time = 0;
        this.txtTimer = game.add.text(game.world.width - 15,15, 'TIME: ' + this.getText(this.time),{font: '15px New Roman', fill: '#fff'});
        this.txtTimer.anchor.set(1,0);
        this.timer = game.time.events.loop(1000, function(){
            this.time++;
            this.txtTimer.text = 'TIME: ' + this.getText(this.time);
        },this);

    },

    getText: function(value){
		return value.toString();
	},


    update: function(){
        if(this.onGame){
            game.physics.arcade.collide(this.player,this.blocks);
            

            if(game.physics.arcade.overlap(this.player, this.coin, this.getEnd, null, this)){
                this.coin.body.velocity.x = 120;
            }
    
            this.movePlayer();
        }
    },

    //Função para movimentação do Player
    movePlayer: function(){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if(this.controls.left.isDown && !this.controls.right.isDown){
            this.player.body.velocity.x = -100;
            this.player.direction = "left";
        }
        else if(this.controls.right.isDown && !this.controls.left.isDown){
            this.player.body.velocity.x = 100;
            this.player.direction = "right";
        }
        if(this.controls.up.isDown && !this.controls.down.isDown){
            this.player.body.velocity.y = -100;
            this.player.direction = "up";
        }
        else if(this.controls.down.isDown && !this.controls.up.isDown){
            this.player.body.velocity.y = 100;
            this.player.direction = "down";
        }

        //Switch para configurar animação de acordo com a direção
        switch(this.player.direction){
            case "left":
                this.player.animations.play('goLeft');
                break;

            case "right":
                this.player.animations.play('goRight');
                break;

            case "up":
                this.player.animations.play('goUp');
                break;

            case "down":
                this.player.animations.play('goDown');
                break;
        }

        //Parar a animação quando o player esta parado
        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.stop();
        }

    },

    //Função para aleatorizar a posição dos blocos 
    newPosition: function(){
        var pos = this.blockPositions[Math.floor(Math.random() * this.blockPositions.length)];
        return pos;
    },

    getEnd: function(){
        this.onGame = false;
        game.state.start('end');
    }
};