import React from "react";
import { Form } from "react-bootstrap";
import FormControl from "./FormControl";

function FormGroup({ id, type, label, name, value, setType, errors }) {
    return (
        <Form.Group className="mb-4" controlId={id}>
            <FormControl
                value={value}
                name={name}
                type={type}
                label={label}
                setType={setType}
                errors={errors}
            />
        </Form.Group>
    );
}

export default FormGroup;
