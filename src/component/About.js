    import { useContext, useEffect, useRef } from "react"
    import "../style/about.css"
    import phone1 from "../assets/phone1.png"
    import phone2 from "../assets/phone2.png"

    import { useTranslation } from "react-i18next"
    import { MyContext } from "./Context";


    function About() {
        // Set order of component on Navbar
        const { setOrder } = useContext(MyContext);
        useEffect(() => {
            setOrder(3);
        }, [])

        const phone1Ref = useRef(null);
        const phone2Ref = useRef(null);

        const { t } = useTranslation("about");
        
        useEffect(() => {
            const timer = setTimeout(() => {
                const phone1Element = phone1Ref.current;
                const phone2Element = phone2Ref.current;
                if(phone1Element) {
                    phone1Element.style.animationDuration = '0s';
                }
                if(phone2Element) {
                    phone2Element.style.animationDuration = '0s';
                }

            }, 2000); // 2000 milliseconds = 2 seconds

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }, []);

        return (
            <div className="about-page">
                {/* <Navbar /> */}
                
                <div className="about-section">

                    <div className="about-content">
                        <h1>{t("title")}</h1>
                        <p>{t("intro")}</p>
                        {/* <button>Go Home</button> */}
                    </div>

                    <div className="about-image">
                        <div className="phone1" ref={phone1Ref}>
                            <img  alt="phone-img" src={phone1}></img>
                        </div>

                        <div className="phone2" ref={phone2Ref}>
                            <img  alt="phone-img" src={phone2}></img>
                        </div>
                        
                    </div>

                </div>
            </div>
        );
    }

    export default About;