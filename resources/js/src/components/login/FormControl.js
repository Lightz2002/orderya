import React from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function FormControl({ type, label, name, handleChange, errors, value }) {
    return (
        <>
            <Form.Label className="fs-3 ">{label}</Form.Label>

            <Form.Control
                name={name}
                type={type}
                onChange={handleChange}
                value={value}
                className="text-secondary  fs-4"
            />

            {errors &&
                errors.map((error) => (
                    <p key={uuidv4()} className="fs-4 mt-2 text-danger">
                        {error}
                    </p>
                ))}
        </>
    );
}

export default FormControl;
