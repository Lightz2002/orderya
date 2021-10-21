import React from "react";
import Welcome from "./Welcome";
import FormSection from "./FormSection";

function LoginSection() {
    return (
        <>
            <Welcome />

            <FormSection type="Login" />
        </>
    );
}

export default LoginSection;
