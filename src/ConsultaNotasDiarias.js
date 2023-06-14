import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Grid, Autocomplete } from "@mui/material";
import db from './database';

function ConsultaNotasDiarias() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    const [cedulas, setCedulas] = useState([]);
    const [cedulaSeleccionada, setCedulaSeleccionada] = useState(null);
    const [fecha, setFecha] = useState(currentDate);
    const [notaDiaria, setNotaDiaria] = useState(null);

    useEffect(() => {
        const fetchCedulas = async () => {
          const pacientes = await db.pacientes.toArray();
          const cedulas = pacientes.map((paciente) => paciente.cedula);
          setCedulas(cedulas);
        };
    
        fetchCedulas();
      }, []);

    const handleCedulaChange = (event, value) => {
        setCedulaSeleccionada(value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleBuscarClick = async () => {

        const notaDiaria = await db.notasDiarias
        .where('cedula')
        .equals(cedulaSeleccionada)
        .and((nota) => nota.fecha === fecha)
        .first();
        

        if (notaDiaria) {
            // Si se encuentra la nota diaria, mostrar los detalles
            console.log("Nota diaria encontrada:", notaDiaria);
            setNotaDiaria(notaDiaria);
            // Aquí puedes hacer lo que necesites con la nota diaria encontrada
          } else {
            // Si no se encuentra la nota diaria, mostrar un mensaje
            console.log("No se encontró la nota diaria");
          }
      };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Consulta de Notas Diarias
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            value={cedulaSeleccionada}
            onChange={handleCedulaChange}
            options={cedulas}
            renderInput={(params) => <TextField {...params} label="Cédula" />}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Fecha"
            type="date"
            value={fecha}
            fullWidth
            onChange={handleFechaChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleBuscarClick} variant="contained" color="primary">
            Buscar
          </Button>
        </Grid> 
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                        Detalles de la Nota Diaria
            </Typography>
        </Grid> 
        
        <Grid item xs={12}>
            {notaDiaria && (
                <div>    
                <h3>Observaciones: </h3>            
                <Typography paragraph>
                    {notaDiaria.observaciones.split("\n").map((line, index) => (
                        <Typography key={index} paragraph>
                        {line}
                        </Typography>
                     ))}
                </Typography>
                </div>
            )}
        </Grid>    
        <Grid item xs={12}>
        {notaDiaria && (
            <div>
                <h3>Nota de Observación:</h3>
                <Typography>
                    {notaDiaria.notaDeObservacion}
                </Typography>

            </div>
            )}
        </Grid> 
                
      </Grid>
    </div>
  );
}

export default ConsultaNotasDiarias;
