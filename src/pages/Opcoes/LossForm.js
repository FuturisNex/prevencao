import React, { useState } from 'react';
import database from '../../auth/firebase';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Container, Typography, Box } from '@mui/material';
import './LossForm.css';

const LossForm = () => {
  const [store, setStore] = useState('');
  const [department, setDepartment] = useState('padaria');
  const [month, setMonth] = useState('Janeiro');
  const [products, setProducts] = useState(Array(5).fill({ description: '', quantity: '' }));
  const [lossSale, setLossSale] = useState('');
  const [lossCost, setLossCost] = useState('');

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { store, department, month, products, lossSale, lossCost };
    database.ref('losses').push(data)
      .then(() => {
        alert('Dados salvos com sucesso!');
        setStore(''); setDepartment('padaria'); setMonth('Janeiro');
        setProducts(Array(5).fill({ description: '', quantity: '' }));
        setLossSale(''); setLossCost('');
      })
      .catch((error) => {
        console.error('Erro ao salvar os dados: ', error);
        alert('Erro ao salvar os dados.');
      });
  };

  return (
    <Container maxWidth="sm" className="loss-form-container">
      <Typography variant="h4" component="h1" gutterBottom className="loss-form-title">
        Cadastro de Perdas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="loss-form-box" sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal" required className="loss-form-formcontrol">
          <InputLabel>Loja</InputLabel>
          <Select value={store} onChange={(e) => setStore(e.target.value)}>
            <MenuItem value="Santa Monica">Santa Monica</MenuItem>
            <MenuItem value="Castro Alves">Castro Alves</MenuItem>
            <MenuItem value="Fraga Maia">Fraga Maia</MenuItem>
            <MenuItem value="Artemia Express">Artemia</MenuItem>
            <MenuItem value="Tomé de Souza">Tomé de Souza</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required className="loss-form-formcontrol">
          <InputLabel>Departamento</InputLabel>
          <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <MenuItem value="Padaria">Padaria</MenuItem>
            <MenuItem value="Rotesseria">Rotesseria</MenuItem>
            <MenuItem value="Salgados">Salgados</MenuItem>
            <MenuItem value="Hortifruti">Hortifruti</MenuItem>
            <MenuItem value="Açougue">Açougue</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required className="loss-form-formcontrol">
          <InputLabel>Mês</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
              .map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="Valor da perda (venda)"
          fullWidth
          type="number"
          value={lossSale}
          onChange={(e) => setLossSale(e.target.value)}
          required
          margin="normal"
          className="loss-form-textfield"
        />
        <TextField
          label="Valor da perda (custo)"
          fullWidth
          type="number"
          value={lossCost}
          onChange={(e) => setLossCost(e.target.value)}
          required
          margin="normal"
          className="loss-form-textfield"
        />
        {products.map((product, index) => (
          <Box key={index} sx={{ mt: 2 }} className="loss-form-product-box">
            <TextField
              label={`Produto ${index + 1} - Descrição`}
              fullWidth
              value={product.description}
              onChange={(e) => handleProductChange(index, 'description', e.target.value)}
              required
              margin="normal"
              className="loss-form-textfield"
            />
            <TextField
              label="Quantidade"
              fullWidth
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              required
              margin="normal"
              className="loss-form-quantity-textfield"
            />
          </Box>
        ))}
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }} className="loss-form-button">
          Salvar
        </Button>
      </Box>
    </Container>
  );
};

export default LossForm;
