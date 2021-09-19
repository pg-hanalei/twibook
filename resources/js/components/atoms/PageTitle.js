import React from "react";

const PageTitle = (props) => {
    const { children } = props;
    return(
        <>
            <div className="mt-4">
                <h5 className="text-monospace">{children}</h5>
            </div>

        </>
    );
}

export default PageTitle
