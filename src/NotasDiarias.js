import React, { useState,useEffect } from "react";
import { Typography, TextField, Button, Grid, MenuItem, Select  } from "@mui/material";
import db from './database';

function NotasDiarias() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;

    const [cedulas, setCedulas] = useState([]);
    const [cedulaSeleccionada, setCedulaSeleccionada] = useState('');
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState(currentDate);
    const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    const fetchCedulas = async () => {
      const pacientes = await db.pacientes.toArray();
      const cedulas = pacientes.map((paciente) => paciente.cedula);
      setCedulas(cedulas);
    };

    fetchCedulas();
  }, []);
  useEffect(() => {
    const fetchNombre = async () => {
      if (cedulaSeleccionada !== '') {
        const paciente = await db.pacientes.get({ cedula: cedulaSeleccionada });
        if (paciente) {
          setNombre(paciente.nombre);
        } else {
          setNombre('');
        }
      } else {
        setNombre('');
      }
    };

    fetchNombre();
  }, [cedulaSeleccionada]);

  const handleSubmit = async (event) => {
    event.preventDefault();  

    const notaDiaria = {
        cedula: cedulaSeleccionada,
        fecha: fecha,
        observaciones: observaciones
    }
    await db.notasDiarias.add(notaDiaria);
    setCedulaSeleccionada('');
    setNombre('');
    setFecha(currentDate);
    setObservaciones(''); 
  };
  

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Notas Diarias
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
                value={cedulaSeleccionada}
                onChange={(e) => setCedulaSeleccionada(e.target.value)}
                fullWidth
                displayEmpty
            >
          <MenuItem value="" disabled>
            Seleccione una cédula
          </MenuItem>
          {cedulas.map((cedula) => (
            <MenuItem key={cedula} value={cedula}>
              {cedula}
            </MenuItem>
          ))}
        </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              value={nombre}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fecha del día"
              type="date"
              value={fecha}
              fullWidth
              onChange={(e) => setFecha(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observaciones realizadas en el día"
              multiline
              rows={5}
              placeholder="Ingrese las observaciones..."
              value={observaciones}
              fullWidth              
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Grid>
        </Grid >
            <Grid item xs={12} sx={{ marginTop: '16px' }}>
            <Button type="submit" variant="contained" color="primary">
                Guardar
            </Button>

            </Grid>
        
      </form>
    </div>
  );
}

export default NotasDiarias;
