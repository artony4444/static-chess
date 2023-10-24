# ♟ Static Chess
mobile page - [artony4444.github.io/static-chess](https://artony4444.github.io/static-chess/)

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
<script src="static-chess.js" staticChess="id"></script>
```
src :
make sure you locate `static-chess.js` and update src accordingly.
for example `../../downloads/chess/static-chess.js`.

<br>

staticChess :
update id just incase you want multiple board in one html.

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
