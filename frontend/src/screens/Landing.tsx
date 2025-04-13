import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const Landing = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserName(user?.displayName || null);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"/chessboard.jpeg"} className="max-w-96" />
                    </div>
                    <div className="pt-16">
                        <div className="flex justify-center">
                            {userName && (
                                <h1 className="text-2xl font-semibold lg:text-3xl mb-4 text-white">
                                    Привет, {userName}
                                </h1>
                            )}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button onClick={() => navigate("/game")}>
                                Играть
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
