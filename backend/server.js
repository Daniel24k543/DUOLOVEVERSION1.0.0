// server.js - Backend DuoLove
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const multer = require('multer');
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Servir archivos estáticos (avatares)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret_change_me';
const PORT = process.env.PORT || 4000;

let db;

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// Inicializar base de datos
(async () => {
  try {
    db = await open({
      filename: path.join(__dirname, 'duolove.db'),
      driver: sqlite3.Database
    });

    // Crear tablas
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT DEFAULT '',
        avatar TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        owner_id INTEGER NOT NULL,
        partner_id INTEGER,
        name TEXT DEFAULT 'Mi Sala',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS room_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(room_id, user_id)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS drawings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        drawing_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
})();

// ==================== HELPERS ====================

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
  }
  
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function generateRoomCode() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ==================== ENDPOINTS ====================

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '🎄 DuoLove Backend API',
    version: '1.0.0',
    status: 'running' 
  });
});

// ========== AUTENTICACIÓN ==========

// Registro
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email no válido' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email.toLowerCase().trim(), hashed, name || '']
    );

    const user = {
      id: result.lastID,
      email: email.toLowerCase().trim(),
      name: name || '',
      avatar: ''
    };

    const token = signToken(user);
    
    res.status(201).json({ 
      user, 
      token,
      message: '¡Registro exitoso! Bienvenido a DuoLove 🎄'
    });
  } catch (e) {
    if (e.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Este email ya está registrado' });
    }
    console.error('Error en registro:', e);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const row = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (!row) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, row.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const user = {
      id: row.id,
      email: row.email,
      name: row.name,
      avatar: row.avatar
    };

    const token = signToken(user);
    
    res.json({ 
      user, 
      token,
      message: '¡Bienvenido de vuelta! 🎄'
    });
  } catch (e) {
    console.error('Error en login:', e);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// ========== PERFIL ==========

// Obtener perfil actual
app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await db.get(
      'SELECT id, email, name, avatar, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (e) {
    console.error('Error obteniendo perfil:', e);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Actualizar perfil
app.post('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    await db.run(
      'UPDATE users SET name = ?, avatar = ? WHERE id = ?',
      [name || '', avatar || '', req.user.id]
    );

    const user = await db.get(
      'SELECT id, email, name, avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ 
      user,
      message: 'Perfil actualizado correctamente' 
    });
  } catch (e) {
    console.error('Error actualizando perfil:', e);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// Subir avatar
app.post('/profile/upload-avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    
    await db.run(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatarUrl, req.user.id]
    );

    res.json({ 
      avatar: avatarUrl,
      message: 'Avatar actualizado correctamente'
    });
  } catch (e) {
    console.error('Error subiendo avatar:', e);
    res.status(500).json({ error: 'Error al subir avatar' });
  }
});

// ========== SALAS ==========

// Crear sala
app.post('/rooms/create', authMiddleware, async (req, res) => {
  try {
    let code = generateRoomCode();
    
    // Asegurar que el código sea único
    let exists = await db.get('SELECT id FROM rooms WHERE code = ?', [code]);
    let attempts = 0;
    while (exists && attempts < 10) {
      code = generateRoomCode();
      exists = await db.get('SELECT id FROM rooms WHERE code = ?', [code]);
      attempts++;
    }

    if (exists) {
      return res.status(500).json({ error: 'No se pudo generar un código único' });
    }

    const { name } = req.body;
    const result = await db.run(
      'INSERT INTO rooms (code, owner_id, name) VALUES (?, ?, ?)',
      [code, req.user.id, name || 'Mi Sala']
    );

    // Agregar al creador como miembro
    await db.run(
      'INSERT INTO room_members (room_id, user_id) VALUES (?, ?)',
      [result.lastID, req.user.id]
    );

    // Generar QR
    const qrData = `duolove://join/${code}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    res.status(201).json({
      id: result.lastID,
      code,
      name: name || 'Mi Sala',
      qrCode: qrCodeDataUrl,
      message: '¡Sala creada! Comparte el código con tu pareja 💕'
    });
  } catch (e) {
    console.error('Error creando sala:', e);
    res.status(500).json({ error: 'Error al crear sala' });
  }
});

// Unirse a sala
app.post('/rooms/join', authMiddleware, async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Código de sala requerido' });
    }

    const room = await db.get(
      'SELECT * FROM rooms WHERE code = ?',
      [code.toUpperCase().trim()]
    );

    if (!room) {
      return res.status(404).json({ error: 'Sala no encontrada. Verifica el código.' });
    }

    // Verificar si ya es miembro
    const existing = await db.get(
      'SELECT * FROM room_members WHERE room_id = ? AND user_id = ?',
      [room.id, req.user.id]
    );

    if (existing) {
      return res.json({ 
        room,
        message: 'Ya eres miembro de esta sala'
      });
    }

    // Agregar como miembro
    await db.run(
      'INSERT INTO room_members (room_id, user_id) VALUES (?, ?)',
      [room.id, req.user.id]
    );

    res.json({ 
      room,
      message: '¡Te has unido a la sala! 💕'
    });
  } catch (e) {
    console.error('Error uniéndose a sala:', e);
    res.status(500).json({ error: 'Error al unirse a la sala' });
  }
});

// Obtener mis salas
app.get('/rooms', authMiddleware, async (req, res) => {
  try {
    const rooms = await db.all(`
      SELECT r.*, 
             u.name as owner_name,
             COUNT(DISTINCT rm.user_id) as member_count
      FROM rooms r
      INNER JOIN room_members rm ON r.id = rm.room_id
      INNER JOIN users u ON r.owner_id = u.id
      WHERE rm.user_id = ?
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `, [req.user.id]);

    res.json({ rooms });
  } catch (e) {
    console.error('Error obteniendo salas:', e);
    res.status(500).json({ error: 'Error al obtener salas' });
  }
});

// Obtener detalles de una sala
app.get('/rooms/:id', authMiddleware, async (req, res) => {
  try {
    const room = await db.get(
      'SELECT * FROM rooms WHERE id = ?',
      [req.params.id]
    );

    if (!room) {
      return res.status(404).json({ error: 'Sala no encontrada' });
    }

    // Verificar que el usuario es miembro
    const member = await db.get(
      'SELECT * FROM room_members WHERE room_id = ? AND user_id = ?',
      [room.id, req.user.id]
    );

    if (!member) {
      return res.status(403).json({ error: 'No tienes acceso a esta sala' });
    }

    // Obtener miembros
    const members = await db.all(`
      SELECT u.id, u.name, u.email, u.avatar, rm.joined_at
      FROM users u
      INNER JOIN room_members rm ON u.id = rm.user_id
      WHERE rm.room_id = ?
    `, [room.id]);

    res.json({ room, members });
  } catch (e) {
    console.error('Error obteniendo sala:', e);
    res.status(500).json({ error: 'Error al obtener sala' });
  }
});

// Generar QR para sala existente
app.get('/rooms/:id/qr', authMiddleware, async (req, res) => {
  try {
    const room = await db.get(
      'SELECT * FROM rooms WHERE id = ?',
      [req.params.id]
    );

    if (!room) {
      return res.status(404).json({ error: 'Sala no encontrada' });
    }

    const qrData = `duolove://join/${room.code}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    res.json({ qrCode: qrCodeDataUrl, code: room.code });
  } catch (e) {
    console.error('Error generando QR:', e);
    res.status(500).json({ error: 'Error al generar código QR' });
  }
});

// ========== DIBUJOS ==========

// Guardar dibujo
app.post('/drawings', authMiddleware, async (req, res) => {
  try {
    const { room_id, drawing_data } = req.body;
    
    if (!room_id || !drawing_data) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Verificar que el usuario es miembro de la sala
    const member = await db.get(
      'SELECT * FROM room_members WHERE room_id = ? AND user_id = ?',
      [room_id, req.user.id]
    );

    if (!member) {
      return res.status(403).json({ error: 'No tienes acceso a esta sala' });
    }

    const result = await db.run(
      'INSERT INTO drawings (room_id, user_id, drawing_data) VALUES (?, ?, ?)',
      [room_id, req.user.id, drawing_data]
    );

    res.status(201).json({
      id: result.lastID,
      message: 'Dibujo guardado'
    });
  } catch (e) {
    console.error('Error guardando dibujo:', e);
    res.status(500).json({ error: 'Error al guardar dibujo' });
  }
});

// Obtener dibujos de una sala
app.get('/drawings/:room_id', authMiddleware, async (req, res) => {
  try {
    const { room_id } = req.params;

    // Verificar acceso
    const member = await db.get(
      'SELECT * FROM room_members WHERE room_id = ? AND user_id = ?',
      [room_id, req.user.id]
    );

    if (!member) {
      return res.status(403).json({ error: 'No tienes acceso a esta sala' });
    }

    const drawings = await db.all(
      'SELECT * FROM drawings WHERE room_id = ? ORDER BY created_at DESC LIMIT 50',
      [room_id]
    );

    res.json({ drawings });
  } catch (e) {
    console.error('Error obteniendo dibujos:', e);
    res.status(500).json({ error: 'Error al obtener dibujos' });
  }
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🎄✨ DuoLove Backend corriendo en http://localhost:${PORT} ✨🎄\n`);
  console.log(`📱 Desde tu teléfono usa: http://192.168.1.3:${PORT}\n`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
});
