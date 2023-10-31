# ♟ Static Chess

> Try now (mobile page) -<br> [artony4444.github.io/static-chess](https://artony4444.github.io/static-chess/) <br> <br>
Contact me -<br> [artony4444@gmail.com](mailto:artony4444@gmail.com)

##
## Features

### script
+ legal moves generation
+ castle
+ enpassant
+ check
+ checkmate
+ stalemate
+ insufficient material
+ 50 moves draw
+ FEN import

### ui
+ drag drop
+ touch move
+ piece highlight
+ board construction
  
### to add
- moves history
- pgn import
- three fold repetition
- board eval
- bot


##
## Import

Paste it where you want chess board
```html
<script src="static-chess.js"></script>
```
Make sure you locate `static-chess.js` and update src accordingly for example `../downloads/chess/static-chess.js`.


##
## Files
```
js
|
|-- chess
|
|    piece       :    stores name, color, moves
|    square      :    stores piece
|    board       :    stores 8x8 squares & manages moves
|    logic       :    filters illegal moves by managing moves and states.
|
|
|-- ui
|
|    drag-drop   :    css effects, request & makes move
|    ui          :    drag-drop, board generation & management (html injection using js)
|
|-- tools
|
|    strings     :    stores strings
|    converter   :    converts different data types
|
```

