import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function CheckoutForm({ onSubmit, onCancel, isProcessing }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }
        
        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
        }
        
        if (!formData.direccion.trim()) {
            newErrors.direccion = 'La dirección es requerida';
        }
        
        if (!formData.ciudad.trim()) {
            newErrors.ciudad = 'La ciudad es requerida';
        }
        
        if (!formData.codigoPostal.trim()) {
            newErrors.codigoPostal = 'El código postal es requerido';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        //Limpiar error cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Text variant="h4" className="mb-4">Información de Envío</Text>
            
            <div className="row">
                <div className="col-md-6">
                    <Input
                        type="text"
                        name="nombre"
                        label="Nombre completo"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Input
                        type="tel"
                        name="telefono"
                        label="Teléfono"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        error={errors.telefono}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        type="text"
                        name="ciudad"
                        label="Ciudad"
                        placeholder="Santiago"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        error={errors.ciudad}
                        required
                    />
                </div>
            </div>

            <Input
                type="text"
                name="direccion"
                label="Dirección"
                placeholder="Calle 123, Comuna"
                value={formData.direccion}
                onChange={handleInputChange}
                error={errors.direccion}
                required
            />

            <div className="row">
                <div className="col-md-6">
                    <Input
                        type="text"
                        name="codigoPostal"
                        label="Código Postal"
                        placeholder="1234567"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        error={errors.codigoPostal}
                        required
                    />
                </div>
            </div>

            <div className="d-flex gap-2 mt-4">
                <Button type="submit" variant="success" size="lg" disabled={isProcessing}>
                    {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                </Button>
                <Button type="button" variant="outline-secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}

export default CheckoutForm;
