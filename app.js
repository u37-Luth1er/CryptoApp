const express = require('express');
const https = require('https');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');

const app = express();
const db = new sqlite3.Database(':memory:');

// Configurações
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessão
app.use(session({
  secret: 'f33821d234bf57526450e0eade113e015994dc01cb25a435250f68d0536c2493',
  resave: false,
  saveUninitialized: false,
}));

// Middleware de autenticação
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// Função para gerar SHA-1 do id
function sha1Id(id) {
  return crypto.createHash('sha1').update(id.toString()).digest('hex');
}

// Importa dados mockados
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'));

// Cria e popula banco SQLite em memória
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT,
    password TEXT,
    fullName TEXT,
    phone TEXT,
    birthDate TEXT,
    address TEXT,
    country TEXT,
    userType TEXT,
    registeredAt TEXT,
    balanceBTC REAL,
    balanceETH REAL,
    balanceUSDT REAL
  )`);

  const stmt = db.prepare(`INSERT INTO users 
    (id, email, password, fullName, phone, birthDate, address, country, userType, registeredAt, balanceBTC, balanceETH, balanceUSDT) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  usersData.forEach(user => {
    stmt.run(
      user.id, user.email, user.password, user.fullName, user.phone, user.birthDate, user.address, 
      user.country, user.userType, user.registeredAt, user.balanceBTC, user.balanceETH, user.balanceUSDT
    );
  });
  stmt.finalize();
});

// Rotas
app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  db.get(query, (err, user) => {
    if (err) return res.status(500).send('Erro no servidor');

    if (user) {
      req.session.user = user;
      const hashedId = sha1Id(user.id);
      res.redirect(`/user/${hashedId}`);
    } else {
      res.render('login', { error: 'Login inválido' });
    }
  });
});

app.get('/.resiliencia', (req, res) => {
  res.render('resiliencia');
});

app.get('/user/:sha1id', authMiddleware, (req, res, next) => {
  const sha1id = req.params.sha1id;

  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return next(err);

    const user = rows.find(u => sha1Id(u.id) === sha1id);
    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.status = 404;
      return next(error);
    }

    res.render('dashboard', { user });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Rota /user que redireciona para o dashboard do próprio usuário se logado
app.get('/user', authMiddleware, (req, res) => {
  const hashedId = sha1Id(req.session.user.id);
  res.redirect(`/user/${hashedId}`);
});


// Middleware para erros 404 (rota não encontrada)
app.use((req, res, next) => {
  res.status(404).render('error', {
    status: 404,
    message: 'Página não encontrada'
  });
});

// Middleware para erros 4XX customizados
app.use((err, req, res, next) => {
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).render('error', {
      status: err.status,
      message: err.message || 'Erro de cliente'
    });
  }
  next(err);
});

// Middleware para erros 500 e outros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    status: 500,
    message: 'Erro interno no servidor'
  });
});

const options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
};

https.createServer(options, app).listen(443, () => {
  console.log('Servidor rodando em https://cryptoapp.io');
});
