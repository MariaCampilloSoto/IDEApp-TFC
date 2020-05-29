-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2020 a las 20:38:49
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plataformaeducativa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idClase` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL,
  `numExpediente` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `idUsuario`, `idClase`, `idContacto`, `numExpediente`) VALUES
(1, 14, 4, 1, '9876344'),
(2, 12, 4, 4, '6398765'),
(3, 16, 6, 10, '4456762'),
(4, 13, 2, 5, '6782345'),
(5, 8, 8, 7, '9870987');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anyosacademicos`
--

CREATE TABLE `anyosacademicos` (
  `anyoAcademico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `anyosacademicos`
--

INSERT INTO `anyosacademicos` (`anyoAcademico`) VALUES
(2015),
(2016),
(2017),
(2018),
(2019),
(2020);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `idAsignatura` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`idAsignatura`, `idProfesor`, `idCurso`, `nombre`) VALUES
(1, 3, 7, 'Programacion'),
(2, 2, 8, 'Disenyo Interfaces'),
(3, 1, 8, 'Procesos'),
(4, 4, 7, 'Sistemas'),
(5, 4, 8, 'Sistemas de Gestion Empresarial'),
(6, 1, 7, 'Entornos de Desarrollo'),
(7, 1, 8, 'Acceso a Datos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `idCalificacion` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idEvaluacion` int(11) NOT NULL,
  `nota` decimal(4,2) NOT NULL DEFAULT '1.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `idClase` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `anyoAcademico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`idClase`, `idCurso`, `idGrupo`, `anyoAcademico`) VALUES
(1, 1, 1, 2015),
(2, 1, 2, 2015),
(3, 7, 5, 2019),
(4, 8, 5, 2020),
(5, 2, 1, 2019),
(6, 3, 1, 2020),
(7, 5, 1, 2019),
(8, 6, 1, 2020);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `idContacto` int(11) NOT NULL,
  `tutor1` varchar(60) NOT NULL,
  `tutor2` varchar(60) DEFAULT NULL,
  `direccion1` varchar(254) NOT NULL,
  `direccion2` varchar(254) DEFAULT NULL,
  `telefono1` varchar(9) NOT NULL,
  `telefono2` varchar(9) DEFAULT NULL,
  `emailContacto1` varchar(254) NOT NULL,
  `emailContacto2` varchar(254) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`idContacto`, `tutor1`, `tutor2`, `direccion1`, `direccion2`, `telefono1`, `telefono2`, `emailContacto1`, `emailContacto2`) VALUES
(0, '', NULL, '', NULL, '', NULL, '', NULL),
(1, 'tutor1', 'tutor2', 'direccionObligatoria', 'direccionOpcional', '948231061', '626918443', 'contacto@email.com', 'contactoOpcional@email.com'),
(2, 'Sandra Garcia', NULL, 'C/Rio Ega 13, Pamplona (Navarra)', NULL, '948731495', NULL, 'sandra@email.com', NULL),
(3, 'Jesús Fuensanta', 'Marta Fuentes', 'Calle Mayor 8, Murcia (R.Murcia)', NULL, '663398654', NULL, 'jesus@email.com', 'marta@email.com'),
(4, 'Federico Martin Gonzalez', NULL, 'Calle Campillo 55, Esparragal (Murcia)', NULL, '633844354', NULL, 'federicoMarGon@email.com', NULL),
(5, 'Francisco Rodriguez', 'Almudena Gonzalez', 'Calle Valencia 3, Murcia', NULL, '968732762', '696522381', 'franciscoRodriguez@email.com', NULL),
(6, 'Raquel Alonso', 'Miguel Ruiz', 'Calle Claveles 12, Murcia', NULL, '722758595', NULL, 'raquelAlonso@email.com', NULL),
(7, 'Jorge Torres', 'Beatriz Gil', 'Calle Petalos 6,Cobatillas', NULL, '676446635', NULL, 'beatriz_gil@email.com', NULL),
(8, 'Luis', 'Calvo', '', 'Calle valor 17,Alicante', '676443562', NULL, 'luis_c@email.com', NULL),
(9, 'Helena Perez', '', 'calle Mayor 34, Santomera', '', '968836251', NULL, 'helena_perez@email.com', NULL),
(10, 'Belen del Amo', '', 'Calle Remiro de Goñi 28', '', '948817364', NULL, 'belenDelAmo@email.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `idCurso` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`idCurso`, `nombre`) VALUES
(1, '1ºESO'),
(2, '2ºESO'),
(3, '3ºESO'),
(4, '4ºESO'),
(5, '1º BACHILLER'),
(6, '2º BACHILLER'),
(7, 'DAM1'),
(8, 'DAM2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `idDocumento` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `tamanyo` decimal(5,2) DEFAULT NULL,
  `fechaSubida` date NOT NULL,
  `esVisible` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluaciones`
--

CREATE TABLE `evaluaciones` (
  `idEvaluacion` int(11) NOT NULL,
  `numEvaluacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `evaluaciones`
--

INSERT INTO `evaluaciones` (`idEvaluacion`, `numEvaluacion`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, 'extraordinaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionescurso`
--

CREATE TABLE `evaluacionescurso` (
  `idEvalCurso` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idEvaluacion` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `idGrupo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`idGrupo`, `nombre`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D'),
(5, 'UNICO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imparticiones`
--

CREATE TABLE `imparticiones` (
  `idImparticion` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `anyoAcademico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incluidos`
--

CREATE TABLE `incluidos` (
  `idIncluido` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `anyoAcademico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `idMatricula` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `anyoAcademico` int(11) NOT NULL,
  `estado` enum('pendiente','superada','enCurso') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `idProfesor` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `departamento` varchar(254) NOT NULL,
  `cargo` enum('jefeDepartamento','sustituto','profesor') NOT NULL,
  `isActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`idProfesor`, `idUsuario`, `dni`, `telefono`, `direccion`, `departamento`, `cargo`, `isActivo`) VALUES
(1, 28, '84756621', '655555555', 'Calle Cisne 4, Murcia', 'Programacion', 'jefeDepartamento', 1),
(2, 25, '73529501', '675532421', 'Calle Pintor Joaquin 5, Murcia', 'Sistemas', 'profesor', 1),
(3, 26, '65002123', '677453623', 'Calle San Anton 35, Murcia', 'Programacion', 'profesor', 1),
(4, 27, '72631234', '698332112', 'Calle Mediterraneo 2, Murcia', 'Sistemas', 'profesor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellido1` varchar(15) NOT NULL,
  `apellido2` varchar(15) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido1`, `apellido2`, `email`, `password`) VALUES
(0, 'usuario0', 'apellidoUsuario', 'apellidoOpciona', 'email@usuario.com', 'admin1234'),
(1, 'usuario01', 'apellidoUsuario', 'apellidoOpciona', 'email@usuario.com', 'admin1234'),
(2, 'usuario02', 'apellidoUsuario', 'SegundoApellido', 'email02@usuario.com', 'pass1234'),
(3, 'Pepe', 'Garcia', 'Fuentes', 'pepe@usuario.com', 'pass1234'),
(4, 'Maria', 'Fuensanta', 'Garcia', 'maria@usuario.com', 'pass1234'),
(5, 'Francisco', 'Rodrigez', 'Gonzalez', 'FranciscoRoGon@email.com', '1234'),
(6, 'Nerea', 'Ruiz', 'Alonso', 'NereaRuAl@email.com', '1234'),
(7, 'Paula', 'Castro', 'Molina', 'paulaCasMo@email.com', '12345'),
(8, 'Lucas', 'Torres', 'Gil', 'lucasTo@email.com', '1234'),
(9, 'Hugo', 'Castro', 'Moya', 'hugoCas@email.com', '1234'),
(10, 'admin', 'admin', NULL, 'admin@email.com', 'admin'),
(11, 'Juan Carlos', 'Blanco', 'Morales', 'JuanCar@email.com', '1234'),
(12, 'Estibaliz', 'Echeverria', NULL, 'estibaliz@email.com', '1234'),
(13, 'Celia', 'Soto', NULL, 'celiaSoto@email.com', '1234'),
(14, 'Maria', 'Campillo', 'Soto', 'mariaCampillo@email.com', '1234'),
(15, 'Daniel', 'Vidal', 'Sanchez', 'danielViSan@email.com', '1234'),
(16, 'Lorena', 'Aguerri', 'del Amo', 'lorenaA@email.com', '12345'),
(17, 'Enrique', 'Gomez', 'Mañas', 'enriqueGM@email.com', '1234'),
(18, 'Jordi', 'Lopez', 'Herrero', 'jordiLH@email.com', '1234'),
(19, 'Francisco Israe', 'Leal', 'Vazquez', 'franciscoIsraelLV@email.com', '12345'),
(20, 'Pilar', 'Alegria', 'Zueco', 'pilarAZ@email.com', '1234'),
(21, 'Pedro', 'Martinez', 'Marin', 'pedroMM@email.com', '9876'),
(22, 'Ania', 'Berazaluce', 'Berasategui', 'aniaBera@email.com', '12343'),
(23, 'Silvia', 'Calvo', '', 'silviaC@email.com', '1234'),
(24, 'Helena', 'Campillo', 'Gonzalez', 'helenaCG@email.com', '1234'),
(25, 'Basilio', 'Coloma', 'Martinez', 'basilioCM@email.com', 'basilio'),
(26, 'Juan Antonio', 'Lopez', 'Soro', 'JuanAntonioLS@email.com', '1234'),
(27, 'Francisco Manue', 'Collado', 'Cortes', 'FranManuelCC@email.com', '1234'),
(28, 'Antonio', 'Alcaraz', 'Carcel', 'antonioAC@email.com', '1234'),
(29, 'Monica', 'Hoyos', '', 'monicaH@email.com', '1234'),
(30, 'Patricia', 'Conde', '', 'patriciaC@email.com', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idContacto` (`idContacto`),
  ADD KEY `idClase` (`idClase`);

--
-- Indices de la tabla `anyosacademicos`
--
ALTER TABLE `anyosacademicos`
  ADD PRIMARY KEY (`anyoAcademico`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`idAsignatura`),
  ADD KEY `idProfesor` (`idProfesor`),
  ADD KEY `idCurso` (`idCurso`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`idCalificacion`),
  ADD KEY `idAsignatura` (`idAsignatura`),
  ADD KEY `idAlumno` (`idAlumno`),
  ADD KEY `idEvaluacion` (`idEvaluacion`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`idClase`),
  ADD KEY `idCurso` (`idCurso`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `anyoAcademico` (`anyoAcademico`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`idContacto`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`idDocumento`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idAsignatura` (`idAsignatura`);

--
-- Indices de la tabla `evaluaciones`
--
ALTER TABLE `evaluaciones`
  ADD PRIMARY KEY (`idEvaluacion`);

--
-- Indices de la tabla `evaluacionescurso`
--
ALTER TABLE `evaluacionescurso`
  ADD PRIMARY KEY (`idEvalCurso`),
  ADD KEY `idCurso` (`idCurso`),
  ADD KEY `idEvaluacion` (`idEvaluacion`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Indices de la tabla `imparticiones`
--
ALTER TABLE `imparticiones`
  ADD PRIMARY KEY (`idImparticion`),
  ADD KEY `idAsignatura` (`idAsignatura`),
  ADD KEY `idProfesor` (`idProfesor`),
  ADD KEY `anyoAcademico` (`anyoAcademico`);

--
-- Indices de la tabla `incluidos`
--
ALTER TABLE `incluidos`
  ADD PRIMARY KEY (`idIncluido`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `idAlumno` (`idAlumno`),
  ADD KEY `anyoAcademico` (`anyoAcademico`);

--
-- Indices de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`idMatricula`),
  ADD KEY `idAsignatura` (`idAsignatura`),
  ADD KEY `idAlumno` (`idAlumno`),
  ADD KEY `anyoAcademico` (`anyoAcademico`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`idProfesor`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`idContacto`) REFERENCES `contactos` (`idContacto`),
  ADD CONSTRAINT `alumnos_ibfk_3` FOREIGN KEY (`idClase`) REFERENCES `clases` (`idClase`);

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `asignaturas_ibfk_1` FOREIGN KEY (`idProfesor`) REFERENCES `profesores` (`idProfesor`),
  ADD CONSTRAINT `asignaturas_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`);

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`idAsignatura`) REFERENCES `asignaturas` (`idAsignatura`),
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`idAlumno`),
  ADD CONSTRAINT `calificaciones_ibfk_3` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`);

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  ADD CONSTRAINT `clases_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `clases_ibfk_3` FOREIGN KEY (`anyoAcademico`) REFERENCES `anyosacademicos` (`anyoAcademico`);

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `documentos_ibfk_2` FOREIGN KEY (`idAsignatura`) REFERENCES `asignaturas` (`idAsignatura`);

--
-- Filtros para la tabla `evaluacionescurso`
--
ALTER TABLE `evaluacionescurso`
  ADD CONSTRAINT `evaluacionescurso_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  ADD CONSTRAINT `evaluacionescurso_ibfk_2` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`);

--
-- Filtros para la tabla `imparticiones`
--
ALTER TABLE `imparticiones`
  ADD CONSTRAINT `imparticiones_ibfk_1` FOREIGN KEY (`idAsignatura`) REFERENCES `asignaturas` (`idAsignatura`),
  ADD CONSTRAINT `imparticiones_ibfk_2` FOREIGN KEY (`idProfesor`) REFERENCES `profesores` (`idProfesor`),
  ADD CONSTRAINT `imparticiones_ibfk_3` FOREIGN KEY (`anyoAcademico`) REFERENCES `anyosacademicos` (`anyoAcademico`);

--
-- Filtros para la tabla `incluidos`
--
ALTER TABLE `incluidos`
  ADD CONSTRAINT `incluidos_ibfk_1` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `incluidos_ibfk_2` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`idAlumno`),
  ADD CONSTRAINT `incluidos_ibfk_3` FOREIGN KEY (`anyoAcademico`) REFERENCES `anyosacademicos` (`anyoAcademico`);

--
-- Filtros para la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD CONSTRAINT `matriculas_ibfk_1` FOREIGN KEY (`idAsignatura`) REFERENCES `asignaturas` (`idAsignatura`),
  ADD CONSTRAINT `matriculas_ibfk_2` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`idAlumno`),
  ADD CONSTRAINT `matriculas_ibfk_3` FOREIGN KEY (`anyoAcademico`) REFERENCES `anyosacademicos` (`anyoAcademico`);

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
