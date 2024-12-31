import React from "react";

export default function TrackingProgress({percentage}) {
    return (
        <div className="centered-center">
            <div className="third">
                {percentage}
            </div>
        </div>
    );
}