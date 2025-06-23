//Implementação Segura que Valida o Usuário Autenticado.
    /*if (req.session.user.id !== user.id) {
      const error = new Error('Acesso negado');
      error.status = 403;
      return next(error);
    }*/


// Consulta segura para evitar SQL Injection
  /*const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, user) => {
    if (err) return res.status(500).send('Erro no servidor');*/