import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

export const ChessBoard = ({
    board,
    chess,
    socket,
    setBoard,
}: {
    setBoard: any;
    chess: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return (
        <div className="text-white">
            {board.map((row, i) => {
                return (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentation = (String.fromCharCode(
                                97 + (j % 8)
                            ) +
                                "" +
                                (8 - i)) as Square;
                            return (
                                <div
                                    onClick={() => {
                                        if (!from) {
                                            setFrom(squareRepresentation);
                                        } else {
                                            socket.send(
                                                JSON.stringify({
                                                    type: MOVE,
                                                    payload: {
                                                        from: {
                                                            from,
                                                            to: squareRepresentation,
                                                        },
                                                    },
                                                })
                                            );
                                            setFrom(null);
                                            chess.move({
                                                from: {
                                                    from,
                                                    to: squareRepresentation,
                                                },
                                            });
                                            setBoard(chess.board());
                                            console.log({
                                                from,
                                                to: squareRepresentation,
                                            });
                                        }
                                    }}
                                    key={j}
                                    className={`w-16 h-16 ${
                                        (i + j) % 2 === 0
                                            ? "bg-green-500"
                                            : "bg-white"
                                    }`}
                                >
                                    <div className="w-full flex justify-center h-full">
                                        <div className="h-full flex flex-col justify-center text-black">
                                            {square ? square.type : ""}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
