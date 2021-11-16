import React from "react";
import { Form, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../../../../../config";

function FormGroup({
    id,
    label,
    name,
    type,
    placeholder,
    handleChange,
    value,
    errors,
    selectOptions,
    categoryList,
    imageUrl,
}) {
    const accept = () => {
        if (type === "file") {
            return "image/*";
        } else {
            return "";
        }
    };

    const checkType = () => {
        if (type === "select") {
            return (
                <Form.Select
                    className="dropdown fs-3 p-3"
                    aria-label="Default select example"
                    name={name}
                    onChange={handleChange}
                    value={value}
                >
                    <option value="">Select Category Type</option>
                    {selectOptions.map((option, i) => (
                        <option
                            key={i}
                            value={!categoryList ? option : option.id}
                        >
                            {!categoryList ? option : option.name}
                        </option>
                    ))}
                </Form.Select>
            );
        } else if (type === "textarea") {
            return (
                <Form.Control
                    as="textarea"
                    className="fs-3 p-3"
                    rows={3}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value || ""}
                    name={name}
                />
            );
        } else if (type === "file") {
            return (
                <>
                    <Form.Control
                        className="fs-3 p-3"
                        accept={accept()}
                        type={type}
                        placeholder={placeholder}
                        onChange={handleChange}
                        name={name}
                    />
                    <p className="fs-3 mt-3">Initial Image</p>
                    <Image
                        src={`${API_URL}/${imageUrl}`}
                        width="50px"
                        alt={"uploaded image"}
                    />
                </>
            );
        }

        return (
            <Form.Control
                className="fs-3 p-3"
                accept={accept()}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                name={name}
            />
        );
    };

    return (
        <Form.Group className="my-4" controlId={id}>
            <Form.Label className="fs-3">{label}</Form.Label>
            {checkType()}
            {errors &&
                errors.map((error) => (
                    <p key={uuidv4()} className="fs-4 mt-2 text-danger">
                        {error}
                    </p>
                ))}
        </Form.Group>
    );
}

export default FormGroup;
