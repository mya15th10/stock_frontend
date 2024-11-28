import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LOGIN_EN from "./en/Login.json"
import LOGIN_VI from "./vi/Login.json"
import NAVBAR_EN from "./en/Navbar.json"
import NAVBAR_VI from "./vi/Navbar.json"
import FORGOT_EN from "./en/forgot.json"
import FORGOT_VI from "./vi/forgot.json"
import SIGNUP_EN from "./en/signup.json"
import SIGNUP_VI from "./vi/signup.json"
import CONTACT_EN from "./en/contact.json"
import CONTACT_VI from "./vi/contact.json"
import INSTRUCTION_EN from "./en/instruction.json"
import INSTRUCTION_VI from "./vi/instruction.json"
import ABOUT_EN from "./en/about.json"
import ABOUT_VI from "./vi/about.json"

i18n.use(initReactI18next).init({
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "en", // Sử dụng "en" nếu không tìm thấy ngôn ngữ
    ns: ["login", "navbar", "forgot", "signup", "contact", "instruction", "about"],
    interpolation: {
        escapeValue: false, // Không cần escape vì React đã xử lý
    },
    resources: {
        en: {
            login: LOGIN_EN,
            navbar: NAVBAR_EN,
            forgot: FORGOT_EN,
            signup: SIGNUP_EN,
            contact: CONTACT_EN,
            instruction: INSTRUCTION_EN,
            about: ABOUT_EN
        },
        vi: {
            login: LOGIN_VI,
            navbar: NAVBAR_VI,
            forgot: FORGOT_VI,
            signup: SIGNUP_VI,
            contact: CONTACT_VI,
            instruction: INSTRUCTION_VI,
            about: ABOUT_VI
        }
    }
});

export default i18n;
