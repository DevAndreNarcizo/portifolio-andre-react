export const sqlCommands = [
  // DQL (Data Query Language)
  {
    id: 'sql-select-all',
    command: 'SELECT * FROM tabela',
    description: 'Selecionar todos os dados de uma tabela',
    example: 'SELECT * FROM users',
    tags: ['básico', 'select', 'dql'],
    category: 'DQL - Consultas'
  },
  {
    id: 'sql-select-columns',
    command: 'SELECT coluna1, coluna2 FROM tabela',
    description: 'Selecionar colunas específicas',
    example: 'SELECT nome, email FROM users WHERE active = true',
    tags: ['básico', 'select', 'filtro'],
    category: 'DQL - Consultas'
  },
  {
    id: 'sql-where',
    command: 'SELECT * FROM tabela WHERE condição',
    description: 'Filtrar dados com condição específica',
    example: 'SELECT * FROM users WHERE idade > 18',
    tags: ['básico', 'where', 'filtro'],
    category: 'DQL - Consultas'
  },
  {
    id: 'sql-order-limit',
    command: 'SELECT * FROM tabela ORDER BY coluna DESC LIMIT 10',
    description: 'Ordenação e limite de resultados',
    example: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 10',
    tags: ['básico', 'order-by', 'limit'],
    category: 'DQL - Consultas'
  },

  // DML (Data Manipulation Language)
  {
    id: 'sql-insert',
    command: 'INSERT INTO tabela (colunas) VALUES (valores)',
    description: 'Inserir novos dados na tabela',
    example: 'INSERT INTO users (name, email) VALUES (\'André\', \'andre@email.com\')',
    tags: ['básico', 'insert', 'dml'],
    category: 'DML - Manipulação'
  },
  {
    id: 'sql-update',
    command: 'UPDATE tabela SET coluna = valor WHERE condição',
    description: 'Atualizar dados existentes - SEMPRE use WHERE',
    example: 'UPDATE users SET active = false WHERE id = 5',
    warning: 'Sempre usar WHERE para evitar atualizar todos os registros',
    tags: ['básico', 'update', 'dml'],
    category: 'DML - Manipulação'
  },
  {
    id: 'sql-delete',
    command: 'DELETE FROM tabela WHERE condição',
    description: 'Deletar dados - ATENÇÃO: Sem WHERE apaga a tabela toda',
    example: 'DELETE FROM users WHERE id = 5',
    warning: 'Sem WHERE, apaga TODOS os registros da tabela',
    tags: ['básico', 'delete', 'dml'],
    category: 'DML - Manipulação'
  },

  // Joins (Onde a mágica acontece)
  {
    id: 'sql-inner-join',
    command: 'SELECT * FROM tabela1 INNER JOIN tabela2 ON condição',
    description: 'INNER JOIN: Retorna registros que têm correspondência em ambas as tabelas',
    example: 'SELECT u.name, p.title FROM users u INNER JOIN posts p ON u.id = p.user_id',
    tags: ['avançado', 'join', 'inner-join'],
    category: 'Joins - A Mágica'
  },
  {
    id: 'sql-left-join',
    command: 'SELECT * FROM tabela1 LEFT JOIN tabela2 ON condição',
    description: 'LEFT JOIN: Retorna todos da esquerda e os correspondentes da direita',
    example: 'SELECT u.name, p.title FROM users u LEFT JOIN posts p ON u.id = p.user_id',
    tags: ['avançado', 'join', 'left-join'],
    category: 'Joins - A Mágica'
  },
  {
    id: 'sql-right-join',
    command: 'SELECT * FROM tabela1 RIGHT JOIN tabela2 ON condição',
    description: 'RIGHT JOIN: Retorna todos da direita e os correspondentes da esquerda',
    example: 'SELECT u.name, p.title FROM users u RIGHT JOIN posts p ON u.id = p.user_id',
    tags: ['avançado', 'join', 'right-join'],
    category: 'Joins - A Mágica'
  },

  // Funções Agregadas
  {
    id: 'sql-count',
    command: 'SELECT COUNT(*) FROM tabela',
    description: 'Contar número de registros',
    example: 'SELECT COUNT(*) FROM users WHERE active = true',
    tags: ['agregação', 'count'],
    category: 'Funções Agregadas'
  },
  {
    id: 'sql-group-by',
    command: 'SELECT coluna, COUNT(*) FROM tabela GROUP BY coluna',
    description: 'Agrupar dados e aplicar funções agregadas',
    example: 'SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria',
    tags: ['avançado', 'group-by', 'agregação'],
    category: 'Funções Agregadas'
  },
  {
    id: 'sql-having',
    command: 'SELECT coluna, COUNT(*) FROM tabela GROUP BY coluna HAVING COUNT(*) > 5',
    description: 'Filtrar grupos após GROUP BY',
    example: 'SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria HAVING COUNT(*) > 5',
    tags: ['avançado', 'having', 'agregação'],
    category: 'Funções Agregadas'
  }
];