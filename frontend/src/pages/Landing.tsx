import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="pt-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"/chessboard.jpeg"} className="max-w-96" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            Играть в шахматы онлайн!
                        </h1>
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    navigate("/game");
                                }}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors active:bg-green-800"
                            >
                                Играть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
