import React from "react";
import { Form } from "react-bootstrap";
import FormControl from "./FormControl";

function FormGroup({ id, type, label, handleChange, errors, value }) {
    return (
        <Form.Group className="mb-4" controlId={id}>
            <FormControl
                name={
                    label === "Confirm Password"
                        ? "password_confirmation"
                        : label.toLowerCase()
                }
                type={type}
                label={label}
                handleChange={handleChange}
                errors={errors}
                value={value}
            />
        </Form.Group>
    );
}

export default FormGroup;
