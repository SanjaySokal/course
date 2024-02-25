import React, { createContext, useEffect, useState } from 'react';
export const MyCreateContext = createContext();

const HandleAllApi = (props) => {
    const [login, setlogin] = useState({ login: false, email: "", type: "" });

    const changeLogin = (change, email, type) => setlogin({ login: change, email: email, type: type });

    const checkLogin = async () => {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            var new_arr = arr[i].split("=");
            for (var j = 0; j < new_arr.length; j++) {
                if (new_arr[j] === "google_verify_login_auth") {
                    setlogin({ login: true, email: new_arr[j + 1] });
                    await fetch("https://api.softingart.com/user/check", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: new_arr[j + 1] }),
                    }).then(js => js.json()).then(resp => {
                        if ((resp.status === "user not verified") || (resp.status === "no user found")) {
                            setlogin({ login: false, email: "", type: "" });
                        } else {
                            setlogin({ login: true, email: resp[0].email, type: resp[0].role });
                        }
                    }).catch(err => console.log(err));
                    break;
                }
            }
        }
    }
    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <MyCreateContext.Provider value={{ login, changeLogin }}>
            {props.children}
        </MyCreateContext.Provider>
    )
}

export default HandleAllApi