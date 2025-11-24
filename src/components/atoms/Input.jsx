function Input({ type = "text", placeholder, value, onChange, className = "", required = false, label, error, name }) {
    const handleChange = (e) => {
        console.log('Input onChange:', name, e.target.value); //Debug
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="mb-3">
            {label && (
                <label className="form-label">{label}</label>
            )}
            <input
                type={type}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
                placeholder={placeholder}
                value={value || ''}
                onChange={handleChange}
                required={required}
                autoComplete="off"
            />
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
            <small className="text-muted">Debug: {name} = "{value}"</small>
        </div>
    );
}

export default Input;
