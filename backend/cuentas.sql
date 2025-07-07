-- Eliminación en orden inverso de dependencias
DROP TABLE IF EXISTS `historialcomentarios`;
DROP TABLE IF EXISTS `historialnoticias`;
DROP TABLE IF EXISTS `likes_noticias`;
DROP TABLE IF EXISTS `comentarios`;
DROP TABLE IF EXISTS `noticias`;
DROP TABLE IF EXISTS `usuario`;

-- 1. Tabla usuario
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Dia` varchar(2) NOT NULL,
  `Mes` varchar(2) NOT NULL,
  `Anio` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuario` VALUES
(1, 'hola', 'hola@example.com', 'clave123', '02', '12', '2002');

-- 2. Tabla noticias
CREATE TABLE `noticias` (
  `idnoticias` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(500) NOT NULL,
  `contenido` varchar(8000) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `autor` varchar(45) NOT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `LIKES` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`idnoticias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `noticias` VALUES (1, 'La Galaxia de Andrómeda', 'El Futuro Choque con la Vía Láctea. La galaxia de Andrómeda, también conocida como M31, es la gran vecina de la Vía Láctea. Situada a aproximadamente 2.5 millones de años luz de la Tierra, Andrómeda es una espiral masiva que contiene más de un billón de estrellas, el doble que nuestra galaxia. Astrónomos han confirmado, mediante observaciones del telescopio Hubble y cálculos precisos de movimiento, que Andrómeda y la Vía Láctea están en rumbo de colisión. ', 'HISTORIA', 'Instituto de Astrofísica de Canarias', '2025-06-04 00:00:00',0);

-- 3. Tabla comentarios
CREATE TABLE `comentarios` (
  `idcomentarios` int NOT NULL AUTO_INCREMENT,
  `contenido` varchar(1000) NOT NULL,
  `fechacoment` datetime NOT NULL,
  `idusuario` int NOT NULL,
  `idnoticias` int NOT NULL,
  PRIMARY KEY (`idcomentarios`),
  KEY `idx_comentario_usuario` (`idusuario`),
  KEY `idx_comentario_noticia` (`idnoticias`),
  CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comentario_noticia` FOREIGN KEY (`idnoticias`) REFERENCES `noticias` (`idnoticias`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `comentarios` VALUES
(1, 'Muy buena noticia', '2025-03-10 00:00:00', 1, 1),
(2, '¡Qué interesante!', '2025-05-19 00:00:00', 1, 1),
(3, 'Gran trabajo del instituto', '2025-05-19 00:00:00', 1, 1);

-- 5. Tabla likes_noticias (¡corregido!)
CREATE TABLE `likes_noticias` (
  `IDlikes` int NOT NULL AUTO_INCREMENT,
  `idusuarioLI` int NOT NULL,
  `idnoticiaLI` int NOT NULL,
  `fecha_like` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDlikes`),
  UNIQUE KEY `unq_usuario_noticia` (`idusuarioLI`, `idnoticiaLI`),
  KEY `idx_likenoti_usuario` (`idusuarioLI`),
  KEY `idx_likenoti_noticia` (`idnoticiaLI`),
  CONSTRAINT `fk_likenoti_usuario` FOREIGN KEY (`idusuarioLI`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likenoti_noticia` FOREIGN KEY (`idnoticiaLI`) REFERENCES `noticias` (`idnoticias`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabla historialnoticias
CREATE TABLE `historialnoticias` (
  `IDHISTONOTI` int NOT NULL AUTO_INCREMENT,
  `fecha_vistah` datetime NOT NULL,
  `idnoticiaHN` int NOT NULL,
  `idusuarioHN` int NOT NULL,
  PRIMARY KEY (`IDHISTONOTI`),
  KEY `idx_histnoti_noticia` (`idnoticiaHN`),
  KEY `idx_histnoti_usuario` (`idusuarioHN`),
  CONSTRAINT `fk_histnoti_noticia` FOREIGN KEY (`idnoticiaHN`) REFERENCES `noticias` (`idnoticias`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_histnoti_usuario` FOREIGN KEY (`idusuarioHN`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Tabla historialcomentarios
CREATE TABLE `historialcomentarios` (
  `ID_HISTCOMENT` int NOT NULL AUTO_INCREMENT,
  `fecha_vista` datetime NOT NULL,
  `idnoticiaHC` int NOT NULL,
  `idusuarioHC` int NOT NULL,
  `idcomentariosHC` int NOT NULL,
  PRIMARY KEY (`ID_HISTCOMENT`),
  KEY `idx_histcom_noticia` (`idnoticiaHC`),
  KEY `idx_histcom_usuario` (`idusuarioHC`),
  KEY `idx_histcom_comentario` (`idcomentariosHC`),
  CONSTRAINT `fk_histcom_noticia` FOREIGN KEY (`idnoticiaHC`) REFERENCES `noticias` (`idnoticias`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_histcom_usuario` FOREIGN KEY (`idusuarioHC`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_histcom_comentario` FOREIGN KEY (`idcomentariosHC`) REFERENCES `comentarios` (`idcomentarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



