import React from 'react';

function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
    //Mapear las variantes de Bootstrap a clases CSS nativas
    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-secondary", 
        success: "btn-success",
        danger: "btn-danger",
        warning: "btn-warning",
        info: "btn-info",
        light: "btn-light",
        dark: "btn-dark",
        "outline-primary": "btn-outline-primary",
        "outline-secondary": "btn-outline-secondary",
        "outline-success": "btn-outline-success",
        "outline-danger": "btn-outline-danger",
        "outline-warning": "btn-outline-warning",
        "outline-info": "btn-outline-info",
        "outline-light": "btn-outline-light",
        "outline-dark": "btn-outline-dark"
    };

    //Mapear los tamaños de Bootstrap a clases CSS nativas
    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg"
    };

    const buttonClass = `btn ${variantClasses[variant] || "btn-primary"} ${sizeClasses[size] || ""} ${className}`.trim();

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}

export default Button;