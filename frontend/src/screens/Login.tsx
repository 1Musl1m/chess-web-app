import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toggleAuth = () => {
        setIsLogin(!isLogin);
    };

    const subtitleText = isLogin ? "Аккаунта еще нет ?" : "Уже есть аккаунт ?";
    const linkedAccountText = isLogin ? "Создать сейчас" : "Войти в него";
    const submitText = isLogin ? "Войти" : "Зарегистрироваться";

    const signUp = async (): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            toast.success("Вы успешно зарегистрировались");

            await updateProfile(userCredential.user, {
                displayName: name,
            });

            navigate("/");
        } catch (error) {
            toast.error("Ошибка");
            console.log(error);
        }
    };

    const signIn = async (): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Вы успешно вошли в ваш аккаунт");
            navigate("/");
        } catch (error) {
            toast.error("Неверные данные");
            console.log(error);
        }
    };

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const submitForm = (e: React.FormEvent): void => {
        e.preventDefault();
        if (isLogin) {
            signIn();
        } else {
            signUp();
        }
    };

    return (
        <div className="flex h-screen items-center justify-between">
            <div className="w-full md:w-1/2">
                <div className="mx-auto w-full max-w-[330px] px-5">
                    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl text-white">
                        {isLogin ? "Вход" : "Регистрация"}
                    </h1>

                    <form className="mt-10" onSubmit={submitForm}>
                        <fieldset className="grid gap-5">
                            {!isLogin && (
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium mb-1 text-white"
                                    >
                                        Имя
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Имя"
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-1 text-white"
                                >
                                    Почта
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@gmail.com"
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-1 text-white"
                                >
                                    Пароль
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="∗∗∗∗∗∗∗∗"
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-white py-2 px-4 rounded-md"
                                >
                                    {submitText}
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm"></div>
                            </div>
                            <button
                                onClick={signUpWithGoogle}
                                type="button"
                                className="w-full border border-gray-300 py-2 px-4 rounded-md text-white flex items-center justify-center gap-2"
                            >
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                {submitText} через Google
                            </button>
                        </fieldset>
                    </form>
                    <p className="mt-10 text-center text-sm text-white">
                        {subtitleText}
                        <button
                            onClick={toggleAuth}
                            className="text-sm font-semibold text-primary hover:underline ml-1"
                        >
                            {linkedAccountText}
                        </button>
                    </p>
                </div>
            </div>
            <div className="hidden h-screen md:block md:w-1/2 lg:w-1/2">
                <img
                    src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Login form image"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};
