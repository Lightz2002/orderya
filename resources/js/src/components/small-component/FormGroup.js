import React from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

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
    fontSize,
    paddingXSize,
    paddingYSize,
    marginSize,
    display,
    hideLabel,
    selectDefault,
    moreStyle,
    disabled,
}) {
    const accept = () => {
        if (type === "file") {
            return "image/*";
        } else {
            return "";
        }
    };

    const formattedFontSize = fontSize === undefined ? 3 : fontSize;
    const formattedPaddingXSize = paddingXSize === undefined ? 3 : paddingXSize;
    const formattedPaddingYSize = paddingYSize === undefined ? 3 : paddingYSize;
    const formattedMargin = marginSize === undefined ? 3 : marginSize;
    const formattedDisplay = !display
        ? ""
        : "d-flex justify-content-center align-items-center";

    const checkType = () => {
        if (type === "select") {
            return (
                <Form.Select
                    className={`dropdown fs-${formattedFontSize} px-${formattedPaddingXSize} py-${formattedPaddingYSize}`}
                    aria-label="Default select example"
                    name={name}
                    onChange={handleChange}
                    value={value}
                    disabled={disabled}
                >
                    <option disabled value="">
                        {selectDefault ? selectDefault : "Select Category Type"}
                    </option>
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
                    className={`fs-${formattedFontSize} py-${formattedPaddingYSize} px-${formattedPaddingXSize}`}
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
                        className={`fs-${formattedFontSize} py-${formattedPaddingYSize} px-${formattedPaddingXSize}`}
                        accept={accept()}
                        type={type}
                        placeholder={placeholder}
                        onChange={handleChange}
                        name={name}
                    />
                </>
            );
        }

        return (
            <Form.Control
                className={`fs-${formattedFontSize} py-${formattedPaddingYSize} px-${formattedPaddingXSize}`}
                accept={accept()}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                name={name}
            />
        );
    };

    let showLabel = null;
    if (hideLabel === "hide") {
        showLabel = "";
    } else {
        showLabel = <Form.Label className="fs-3">{label}</Form.Label>;
    }

    return (
        <Form.Group
            className={`my-${formattedMargin} ${formattedDisplay} ${moreStyle}`}
            controlId={id}
        >
            {showLabel}
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
