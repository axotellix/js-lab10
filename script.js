///***** >  Tic Tac Toe game  < *****///

// [ PRESETS ]

 // [ colours ]
let back    =  '#0b0a0c';
let black   =  '#16151a';
let purple  =  '#662a9e';
let lblack  =  '#201e25';
  
 // [ canvas parameters ]
let w = 350;    // set > width
let h = w;      // set > height
let gap = 10;   // set > gaps between tiles
 
 // [ game parameters ]
let gameActive = true;  // set > game state (active | inactive)
let mc = 0;             // set > moves counter
let p1_score = 0;       // set > player 1 score
let p2_score = 0;       // set > player 2 score
  
 // [ tiles coords ]
let tiles = {
    1: [],
    2: [],
    3: []
};
 
 // [ canvas field moves: true = x, false = o ]
let field = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];
 
 // [ canvas field axes ]:
    // 11 - 12 - 13
    // 21 - 22 - 23
    // 31 - 32 - 33
    //
    // "undefined" = move not made
    // "true" = 'x'
    // "false" = 'o'
    // "null" = do not take into account
let axes = {
     //: horizontal
    '11-13': [undefined, 0],
    '21-23': [undefined, 0],
    '31-33': [undefined, 0],
     //: vertical
    '11-31': [undefined, 0],
    '12-32': [undefined, 0],
    '13-33': [undefined, 0],
     //: diagonal
    '11-33': [undefined, 0],
    '13-31': [undefined, 0],
};
 
 // [ game controls ]
let nround = document.getElementById('new-round');
let reset  = document.getElementById('reset');

// [ FUNCTIONS ]
 
 //@ init > game
const init = (reset = false) => {
     // [ tiles coords ]
    tiles = {
        1: [],
        2: [],
        3: []
    };

     // [ canvas field moves: true = x, false = o ]
    field = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];

     // [ canvas field axes ]:
    axes = {
        //: horizontal
        '11-13': [undefined, 0],
        '21-23': [undefined, 0],
        '31-33': [undefined, 0],
        //: vertical
        '11-31': [undefined, 0],
        '12-32': [undefined, 0],
        '13-33': [undefined, 0],
        //: diagonal
        '11-33': [undefined, 0],
        '13-31': [undefined, 0],
    };

     // [ game parameters ]
    gameActive = true;                  // set > game state (active | inactive)
    mc = 0;                             // set > moves counter
    p1_score = reset ? 0 : p1_score;    // set > player 1 score
    p2_score = reset ? 0 : p2_score;    // set > player 2 score

    document.querySelector('#player1').textContent = p1_score;
    document.querySelector('#player2').textContent = p2_score;
};

 //@ draw > game field (tiles)
const drawField = (color = black, gap = 10) => {
    let size = (canv.width - gap * 2) / 3;
 
    ctx.fillStyle = back;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            ctx.fillRect(j * (size + gap), i * (size + gap), size, size);
            tiles[j + 1][0] = j * (size + gap);
            tiles[j + 1][1] = j * (size + gap) + size;
        }
    }
};

 //@ draw > 'x' in the field
const drawX = (tx, ty, size, pad = 30) => {
    ctx.beginPath();
    ctx.moveTo(tx + pad, ty + pad);
    ctx.lineTo(tx + size - pad, ty + size - pad);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tx + size - pad, ty + pad);
    ctx.lineTo(tx + pad, ty + size - pad);
    ctx.stroke();
};
 //@ draw > 'o' in the field
const drawO = (tx, ty, size, pad = 30) => {
    pad += 10;          //crutch: to visually adjust size of 'o' to match the one of 'x'
    ctx.beginPath();
    ctx.arc(tx + size / 2, ty + size / 2, (size - pad) / 2, 0, Math.PI * 2);
    ctx.stroke();
};

 //@ check > if a move was made
const checkMoves = (tx, ty) => {
    if(field[ty - 1][tx - 1] !== undefined) return false;
    else return true;
};


 //@ set > axe`s state & points
const markAxe = (move, ...tile) => {
    const getState = axe => {
        if(axes[axe][0] === undefined || axes[axe][0] === move) {
           return move;
        } else return null;
    };
    const getPoints = axe => {
        if(axes[axe][0] !== null) {
           return ++axes[axe][1];
        } else return 0;    //TODO: fix > doesn`t return 0 if axe nulls just within the move
    };
    const mark = _axes => {
        for(let _axe of _axes) {
            axes[_axe] = [getState(_axe), getPoints(_axe)];
        }
    };

    let _axes = [];
    switch(tile[1]) {
        case 1:     //: row 1
            switch(tile[0]) {
                case 1:
                    _axes = ['11-13', '11-31', '11-33'];
                    mark(_axes);
                    break;
                case 2:
                    _axes = ['11-13', '12-32'];
                    mark(_axes);
                    break;
                case 3:
                    _axes = ['11-13', '13-33', '13-31'];
                    mark(_axes);
                    break;
            }
            break;
        case 2:     //: row 2
            switch(tile[0]) {
                case 1: 
                    _axes = ['11-31', '21-23'];
                    mark(_axes);
                    break;
                case 2:
                    _axes = ['11-33', '13-31', '12-32', '21-23'];
                    mark(_axes);
                    break;
                case 3:
                    _axes = ['21-23', '13-33']; 
                    mark(_axes);
                    break;
            }
            break;
        case 3:     //: row 3
            switch(tile[0]) {
                case 1:
                    _axes = ['11-31', '13-31', '31-33']; 
                    mark(_axes);
                    break;
                case 2:
                    _axes = ['12-32', '31-33']; 
                    mark(_axes);
                    break;
                case 3:
                    _axes = ['13-33', '31-33', '11-33'];
                    mark(_axes);
                    break;
            }
            break;
    }
};

 //@ check > if a player has won
const checkWin = () => {
    for(let axe in axes) {
        if(axes[axe][0] !== null && axes[axe][1] == 3) {
            let marg = 30;      //: for multiline text
            let winner = axes[axe][0] ? 'Крестик' : 'Нолик';

            gameActive = false;     //: to prevent hover & click events
            // show > message
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'rgb(207, 208, 211)';
            ctx.font = 'bold 30px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText('Игра окончена', w / 2, h / 2 - marg);
            ctx.font = '20px Montserrat';
            ctx.fillText(`${winner} побеждает`, w / 2, h / 2);
            // set > player`s score
            if(winner === 'Крестик') {
                p1_score++;
                document.querySelector('#player1').textContent = p1_score;
            } else {
                p2_score++;
                document.querySelector('#player2').textContent = p2_score;
            }

            return;
        }
    }
    if(mc == 9) {
        let marg = 30;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgb(207, 208, 211)';
        ctx.font = 'bold 30px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('Ничья', w / 2, h / 2 - marg);
    }
};
  

// [ CANVAS ]
  
 // create > canvas
let canv = document.querySelector('#tic');
let ctx  = canv.getContext('2d');
   
 // set > canvas size
canv.width  = w;
canv.height = h; 
  
 // draw > game field (tiles)
drawField(black, gap);
   
 // canvas > hover action
let _tileX, _tileY;
document.body.addEventListener('mousemove', e => {
    if(gameActive) {
  
        let canvXY = canv.getBoundingClientRect();

        let x = e.clientX - canvXY.left;    // set > position of click inside canvas [x coord]
        let y = e.clientY - canvXY.top;     // set > position of click inside canvas [y coord]
        let tileX, tileY;                   // set > tile number
        let size = (canv.width - gap * 2) / 3;
        
        if( (_tileX && _tileY) !== undefined ) {
            ctx.fillStyle = black;
            if(checkMoves(_tileX, _tileY)) {
                ctx.fillRect(tiles[_tileX][0], tiles[_tileY][0], size, size);
            }
        }

        for(let t in tiles) {
            if(x >= tiles[t][0] && x <= tiles[t][1]) {
                tileX = t;
                _tileX = tileX;
            }
            if(y >= tiles[t][0] && y <= tiles[t][1]) {
                tileY = t;
                _tileY = tileY;
            }
        }
    
        if( (tileX && tileY) !== undefined ) {
            ctx.fillStyle = lblack;
            if(checkMoves(tileX, tileY)) {
                ctx.fillRect(tiles[tileX][0], tiles[tileY][0], size, size);
            }
        } 
  
    } 
});
  
  
 // canvas > onclick action
let active_player = true;                   //: first move - first player
canv.addEventListener('click', e => {
    if(gameActive) {
  
        let canvXY = canv.getBoundingClientRect();

        let x = e.clientX - canvXY.left;    // set > position of click inside canvas [x coord]
        let y = e.clientY - canvXY.top;     // set > position of click inside canvas [y coord]
        let tileX, tileY;                   // set > tile number
        let size = (canv.width - gap * 2) / 3;
    
        // increase > moves counter
        mc++;
    
        // get > clicked tile
        for(let t in tiles) {
            if(x >= tiles[t][0] && x <= tiles[t][1]) {
                tileX = parseInt(t);
            }
            if(y >= tiles[t][0] && y <= tiles[t][1]) {
                tileY = parseInt(t);
            }
        }
        
        // make > move (draw 'x' / 'o')
        ctx.strokeStyle = purple;
        ctx.lineWidth = 5;
    
        if( (tileX && tileY) !== undefined && checkMoves(_tileX, _tileY)) {
            active_player ? drawX(tiles[tileX][0], tiles[tileY][0], size) : drawO(tiles[tileX][0], tiles[tileY][0], size);
            field[tileY - 1][tileX - 1] = active_player;
    
            markAxe(active_player, tileX, tileY);
            active_player = !active_player;
        }
        
        // check > if a player has won
        checkWin();

    }
});
  
nround.addEventListener('click', () => {
    init();
    drawField(black, gap);
});
reset.addEventListener('click', () => {
    init(true);
    drawField(black, gap);
});


