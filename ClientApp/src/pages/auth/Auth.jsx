import loginImg from "../../assets/login-text.png";
import regisImg from "../../assets/regis-text.png";
import "./Auth.css";

const Auth = () => {
    const registerPage = () => {
        const container = document.querySelector(".Auth .container");
        container?.classList.add("sign-up-mode");
    };

    const loginPage = () => {
        const container = document.querySelector(".Auth .container");
        container?.classList.remove("sign-up-mode");
    };
    const loginHandler = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        // Replace with your API URL
        const apiUrl = '/user/login';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,password
            }),
        });

        const data = await response.json();

        // Do something with the data (e.g. save token, navigate to another page, etc.)
    };
    const registerHandler = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(username, email, password);
        // Replace with your API URL
        const apiUrl = '/user/register';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, email, password
            }),
        });

        const data = await response.json();

        // Do something with the data (e.g. navigate to login page, show success message, etc.)
    };
    return (
        <div className="Auth">
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" onSubmit={loginHandler} className="sign-in-form">
                            <h2 className="title">เข้าสู่ระบบ</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="อีเมล" name="email" required />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    name="password"
                                    required
                                />
                            </div>
                            <p className="forgot-text">ลืมรหัสผ่าน</p>
                            <input type="submit" value="เข้าสู่ระบบ" className="btn solid" />
                            <p className="social-text">หรือเข้าสู่ระบบด้วย</p>
                            <div className="social-media">
                                <a href="https://www.google.com" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                        <form action="#" onSubmit={registerHandler} className="sign-up-form">
                            <h2 className="title">สมัครสมาชิก</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="บัญชีผู้ใช้"
                                    name="username"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="อีเมล" name="email" required />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    name="password"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    name="confirm-password"
                                    required
                                />
                            </div>
                            <input type="submit" className="btn" value="สมัคร" />
                            <p className="social-text">หรือสมัครด้วย</p>
                            <div className="social-media">
                                <a href="https://www.google.com" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>ยังไม่มีบัญชี?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Debitis, ex ratione. Aliquid!
                            </p>
                            <button
                                className="btn transparent"
                                id="sign-up-btn"
                                onClick={registerPage}
                            >
                                สมัครสมาชิก
                            </button>
                        </div>
                        <img src={loginImg} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>มีสมาชิกแล้ว ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button
                                className="btn transparent"
                                id="sign-in-btn"
                                onClick={loginPage}
                            >
                                เข้าสู่ระบบ
                            </button>
                        </div>
                        <img src={regisImg} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
