import React from "react";
import FormGroup from "../../../small-component/FormGroup";

function FormTabContent({
    component,
    errors,
    state,
    selectOptions,
    handleImage,
    handleInput,
}) {
    return (
        <>
            {component.map((input, i) => (
                <FormGroup
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    handleChange={
                        input.name === "image" ? handleImage : handleInput
                    }
                    value={input.name !== "image" ? state[input.name] : null}
                    errors={errors[input.name]}
                    name={input.name}
                    placeholder={input.placeholder}
                    selectOptions={selectOptions}
                    categoryList={true}
                    imageUrl={input.name === "image" ? state[input.name] : null}
                    marginSize={5}
                />
            ))}
        </>
    );
}

export default FormTabContent;
