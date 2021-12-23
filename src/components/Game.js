import Chess from 'chess.js'
import {Chessboard} from 'react-chessboard'
import {useState} from "react";

function Game({socket}) {
    const [game, setGame] = useState(new Chess());

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = {...g};
            modify(update);
            return update;
        });
    }

    function makeMove(move) {
        const possibleMoves = game.moves();
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            return socket.emit('game-over')
        }
        safeGameMutate((game) => {
            game.move(move);
        });
    }
    socket.on('move', move => makeMove(move))
    function onDrop(sourceSquare, targetSquare) {
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // always promote to a queen for example simplicity
            });
        });
        if (move){
            socket.emit('move', move)
        }
        return !!move;
    }

    return <Chessboard position={game.fen()} onPieceDrop={onDrop}/>;
}

export default Game;
