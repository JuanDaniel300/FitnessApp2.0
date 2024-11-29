
# FitnessApp

**FitnessApp** es una aplicación móvil diseñada para mejorar la experiencia de seguimiento y gestión de rutinas de ejercicio y alimentación personalizada entre nutriólogos y sus clientes. Proporciona un espacio centralizado para que los clientes puedan visualizar sus planes, recomendaciones y el progreso de su tratamiento de manera sencilla y eficiente.

---

## 📖 Descripción

FitnessApp conecta a nutriólogos con sus clientes, permitiendo:
- Que el nutriólogo registre al cliente en su primera consulta.
- Asignar y gestionar rutinas personalizadas.
- Configurar planes alimenticios y recomendaciones.
- Seguir el progreso de cada cliente.

Los clientes pueden acceder a su información desde cualquier dispositivo móvil, visualizando planes de ejercicio, recomendaciones de alimentación, progreso y más.

---

## 🚀 Funcionalidades

### Para Nutriólogos:
- Registro de clientes en la plataforma.
- Creación y asignación de rutinas personalizadas.
- Configuración de planes alimenticios y recomendaciones.
- Seguimiento del progreso de cada cliente.

### Para Clientes:
- Inicio de sesión seguro.
- Visualización de rutinas de ejercicio asignadas.
- Acceso a planes de alimentación y calorías recomendadas.
- Revisión de estadísticas y progreso del tratamiento.

---

## 🛠️ Tecnologías y Herramientas

### Frontend:
- **Framework**: [React Native](https://reactnative.dev/) con [Expo](https://expo.dev/)
- **Gestión del Estado**: *(Zustand)*

### Backend:
- **Lenguaje**: PHP
- **Framework/API**: PHP Nativo
- **Base de Datos**: MySQL

---

## 📲 Requisitos para ejecutar

### Frontend:
1. **Node.js**: Asegúrate de tener Node.js instalado. Puedes descargarlo [aquí](https://nodejs.org/).
2. **Expo CLI**: Instálalo globalmente:
   ```bash
   npm install -g expo-cli
   ```
3. **Emulador o dispositivo móvil**:
   - Emulador de Android/iOS.
   - Dispositivo físico con la aplicación de Expo Go instalada.

### Backend:
1. **Servidor Web**: Apache o Nginx (compatibles con PHP).
2. **PHP**: Versión 7.4 o superior.
3. **Base de Datos**: MySQL (versión 5.7 o superior).
4. **Composer**: 

---

## 🚀 Instalación y Configuración

### Frontend:
1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/JuanDaniel300/FitnessApp2.0.git
   cd FitnessApp
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   expo start
   ```

4. **Prueba la aplicación**:
   - Escanea el código QR en la terminal usando la aplicación Expo Go.
   - Si usas un emulador, selecciona la opción para ejecutarlo en Android o iOS.

### Backend:
1. **Clona el repositorio del backend**:
   ```bash
   git clone https://github.com/JuanDaniel300/FitnessApp2.0.git
   cd FitnessApp-API
   ```

2. **Configura el entorno**:
   - Copia el archivo `config.example.php` a `config.php`.
   - Configura las credenciales de la base de datos en `config.php`.

3. **Instala dependencias (opcional)**:
   Si utilizas un framework como Laravel o dependencias de PHP, ejecuta:
   ```bash
   composer install
   ```

4. **Configura la base de datos**:
   - Importa el archivo `database.sql` en tu instancia de MySQL.
   - Verifica que las tablas y datos iniciales se hayan creado correctamente.

5. **Inicia el servidor local**:
   Si usas PHP nativo:
   ```bash
   php -S localhost:8000
   ```
   O configura el backend en un servidor Apache o Nginx.

---

## 🌐 API Endpoints

- **`POST /auth/login`**: Autenticar usuario.
- **`POST /auth/register`**: Registrar nuevo usuario (nutriólogo).
- **`GET /clients/:id`**: Obtener datos del cliente.
- **`POST /routines`**: Crear una nueva rutina de ejercicios.
- **`GET /nutrition/:clientId`**: Obtener plan alimenticio del cliente.


---

## 🧩 Estructura del Proyecto

### Frontend:
```plaintext
FitnessApp/
├── assets/         # Recursos estáticos como imágenes y fuentes
├── components/     # Componentes reutilizables de la interfaz
├── app/        # Pantallas principales de la aplicación
├── hooks/          # Hooks personalizados
├── utils/          # Funciones y utilidades auxiliares
├── store/          # Manejo de estado
└── README.md       # Documentación del repositorio
```

---

## 🤝 Contribuciones

¡Contribuciones son bienvenidas! Sigue estos pasos para colaborar:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agregué nueva funcionalidad'`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en este repositorio.

---

## 📋 Licencia

Este proyecto está licenciado bajo los términos de la licencia **[MIT](LICENSE)**.

---

