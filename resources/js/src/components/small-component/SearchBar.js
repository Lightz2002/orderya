import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

function SearchBar({ value, handleChange, handleSubmit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group
                className="mb-3 w-50 mx-auto"
                controlId="formBasicSearch"
            >
                <>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="px-3 py-3 fs-5"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            placeholder="Search"
                            onChange={handleChange}
                            value={value}
                        />
                        <Button
                            variant="primary"
                            id="button-addon1"
                            size="lg"
                            className="px-4 "
                            onClick={handleSubmit}
                        >
                            <i className="fa fa-search"></i>
                        </Button>
                    </InputGroup>
                </>
            </Form.Group>
        </Form>
    );
}

export default SearchBar;
