import React from "react";
import { Card } from "react-bootstrap";

function HorizontalCard({
    title,
    text,
    img,
    bgColor,
    textColor,
    opacity = 10,
}) {
    return (
        <div
            className={`bg-${bgColor} bg-opacity-${opacity} d-flex flex-row div p-3 py-5 align-items-center justify-content-evenly`}
        >
            {/* <Card.Img variant="left" src="holder.js/100px180" /> */}
            {img && (
                <div className="w-25 mx-5">
                    <i
                        className={`fas fa-fw fa-${img} fs-1 text-${textColor} fw-bolder`}
                    ></i>
                </div>
            )}
            <div className="w-75">
                <div className={`d-inline text-${textColor} fs-4 fw-bolder`}>
                    {title}
                </div>
                <br />
                <p className="fs-1 fw-bolder d-inline">{text}</p>
            </div>
        </div>
    );
}

export default HorizontalCard;
