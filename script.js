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