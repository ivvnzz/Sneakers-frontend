function QuantityInput({ value, onChange, min = 1, max = 99 }) {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value) || min;
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className="d-flex align-items-center">
            <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={handleDecrement}
                disabled={value <= min}
            >
                -
            </button>
            <input
                type="number"
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
                className="form-control text-center mx-2"
                style={{ width: '60px' }}
            />
            <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={handleIncrement}
                disabled={value >= max}
            >
                +
            </button>
        </div>
    );
}

export default QuantityInput;
