function Input({ type = "text", placeholder, value, onChange, className = "", required = false, label, error, name }) {
    const handleChange = (e) => {
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
            {/* Debug text removed for production; keep component minimal */}
        </div>
    );
}

export default Input;
