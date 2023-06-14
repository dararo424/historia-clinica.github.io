import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import db from './database';


function CrearPaciente() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState(currentDate);
    const [personaResponsable, setPersonaResponsable] = useState("");
    const [numeroCelular, setNumeroCelular] = useState("");
    const [medicamentosFormulados, setMedicamentosFormulados] = useState("");
    const [alergicoA, setAlergicoA] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const paciente = {
        cedula,
        nombre,
        fechaIngreso,
        personaResponsable,
        medicamentosFormulados,
        alergicoA,
      };
     // Guarda el paciente en la tabla "pacientes" de la base de datos
    await db.pacientes.add(paciente);
    console.log(paciente);
    setCedula("");
    setNombre("");
    setFechaIngreso(currentDate);
    setPersonaResponsable("");
    setNumeroCelular("");
    setMedicamentosFormulados("");
    setAlergicoA("");
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Crear Paciente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Cédula"              
              value={cedula}
              fullWidth
              onChange={(e) => setCedula(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre y Apellidos"              
              value={nombre}
              fullWidth
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fecha de ingreso"
              type="date"              
              value={fechaIngreso}
              fullWidth
              onChange={(e) => setFechaIngreso(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Persona Responsable"
              value={personaResponsable}
              fullWidth
              onChange={(e) => setPersonaResponsable(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Número Celular"
              value={numeroCelular}
              fullWidth
              onChange={(e) => setNumeroCelular(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Medicamentos Formulados"
                multiline
                rows={4}
                placeholder="Ingrese los medicamentos formulados..."
                value={medicamentosFormulados}
                fullWidth
                onChange={(e) => setMedicamentosFormulados(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Alérgico a"
              multiline
              rows={4}
              placeholder="Ingrese las alergias..."
              value={alergicoA}
              fullWidth
              onChange={(e) => setAlergicoA(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '16px' }}>
            <Button type="submit" variant="contained" color="primary">
            Guardar
            </Button>
        </Grid>
        
      </form>
    </div>
  );
}

export default CrearPaciente;
