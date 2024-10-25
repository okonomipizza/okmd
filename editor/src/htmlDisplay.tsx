import React from "react";

type HtmlDisplayProps = {
    htmlContent: string;
};

const HtmlDisplay: React.FC<HtmlDisplayProps> = ({ htmlContent }) => {
    return (
        
            <div
                className="bg-white p-4 rounded-md shadow-md"
                dangerouslySetInnerHTML={{__html: htmlContent}}
            />
        
    );
};

export default HtmlDisplay;