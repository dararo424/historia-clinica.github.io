import React,{ useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

// Componentes para cada opción del menú
import CrearPaciente from "./CrearPaciente";
import NotasDiarias from "./NotasDiarias";
import ConsultaNotasDiarias from "./ConsultaNotasDiarias";
import db from './database';

function App() {
  useEffect(() => {
    const initDatabase = async () => {
      // Abre la base de datos
      await db.open();
      const pacientes = await db.pacientes.toArray();
      console.log('Pacientes:', pacientes);

      // Realiza operaciones con la base de datos
      // Ejemplo: Insertar un paciente
      /*
      const paciente = {
        cedula: '1234567890',
        nombre: 'John Doe',
        fechaIngreso: '2023-06-11',
        personaResponsable: 'Jane Smith',
        medicamentosFormulados: 'Medicamento A, Medicamento B',
        alergicoA: 'Polen',
      };
      
      await db.pacientes.add(paciente);

      // Ejemplo: Obtener todos los pacientes
      const pacientes = await db.pacientes.toArray();
      console.log('Pacientes:', pacientes);*/
    };
    /*const clearDatabase = async () => {
      // Borra todos los registros de la tabla "pacientes"
      await db.pacientes.clear();

      // Borra todos los registros de la tabla "notasDiarias"
      await db.notasDiarias.clear();

    };
    clearDatabase();*/
    initDatabase();
  }, []);
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Historia Clínica
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Crear Paciente
            </Button>
            <Button component={Link} to="/notas-diarias" color="inherit">
              Notas Diarias
            </Button>
            <Button component={Link} to="/consulta-notas-diarias" color="inherit">
              Consulta Notas Diarias
            </Button>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/notas-diarias" element={<NotasDiarias />} />
          <Route path="/consulta-notas-diarias" element={<ConsultaNotasDiarias />} />
          <Route path="/" element={<CrearPaciente />} />
        </Routes>
      </Container>
    </Router>
  );
}


export default App;