import React from "react";

const NotFound = props => {
    return (
        <div className="not-found">
            <span>
                <b>404</b>
            </span>
            <br />
            <p>The requested page was not found on our server.</p>
            <p>
                Either you the url you typed in is incorrect, you do not have access
                privileges to the page, or the page you are looking for has been
                removed.
            </p>
        </div>
    );
};

export default NotFound;