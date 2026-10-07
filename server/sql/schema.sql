CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('Vaga', 'Curso')),
  title VARCHAR(150) NOT NULL,
  organization VARCHAR(150) NOT NULL,
  location VARCHAR(120) NOT NULL,
  modality VARCHAR(30) NOT NULL CHECK (modality IN ('Presencial', 'Híbrido', 'Online')),
  category VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  details TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO opportunities
(type, title, organization, location, modality, category, description, details, link)
VALUES
('Vaga', 'Desenvolvedor(a) Web Júnior', 'Tech Solutions', 'São Paulo - SP', 'Híbrido', 'Tecnologia',
 'Oportunidade para atuar no desenvolvimento e manutenção de aplicações web.',
 'Buscamos uma pessoa com conhecimentos básicos de HTML, CSS e JavaScript. Experiência com React será considerada um diferencial.',
 'https://example.com'),

('Curso', 'Introdução ao Excel', 'Escola Digital', 'Online', 'Online', 'Administração',
 'Curso introdutório para quem deseja aprender os principais recursos do Excel.',
 'Conteúdo com fórmulas básicas, organização de planilhas, gráficos e boas práticas para uso profissional.',
 'https://example.com'),

('Vaga', 'Assistente Administrativo', 'Grupo Nova Era', 'Praia Grande - SP', 'Presencial', 'Administração',
 'Vaga para apoio às rotinas administrativas e atendimento ao público.',
 'Atividades incluem organização de documentos, atendimento, controle de planilhas e suporte à equipe.',
 'https://example.com'),

('Curso', 'Lógica de Programação', 'UFMS Digital', 'Online', 'Online', 'Tecnologia',
 'Curso para desenvolver os fundamentos necessários para começar a programar.',
 'Aborda algoritmos, variáveis, estruturas condicionais, repetição e resolução de problemas.',
 'https://example.com'),

('Vaga', 'Auxiliar de Atendimento', 'Conecta Serviços', 'Santos - SP', 'Presencial', 'Atendimento',
 'Atendimento ao cliente e suporte às atividades da equipe.',
 'A pessoa contratada realizará atendimento presencial e por canais digitais, registro de solicitações e encaminhamento de demandas.',
 'https://example.com'),

('Curso', 'Currículo e Entrevista de Emprego', 'Instituto Profissional', 'Online', 'Online', 'Carreira',
 'Capacitação para melhorar currículo e preparação para processos seletivos.',
 'Inclui orientações sobre currículo, apresentação profissional, comportamento em entrevistas e preparação para perguntas frequentes.',
 'https://example.com');
