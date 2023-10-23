page - [test now](https://artony4444.github.io/static-chess/)


## features

`script`
+ legal moves generation
+ castle
+ enpassant
+ check
+ checkmate
+ stalemate
+ FEN import

`ui`
+ drag drop
+ touch move
+ piece highlight
+ board construction

`to add`
- insufficient material
- moves history
- pgn import
- three fold repetition
- board eval
- bot

## files
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
these are the only js files used.
