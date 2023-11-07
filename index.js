import express from 'express';
import path from 'path';

const porta = 3000;
const host =  '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, reposta){
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobrenome,
        nomeUsuario: requisicao.query.nomeUsuario,
        cidade: requisicao.query.cidade,
        uf: requisicao.query.uf,
        cep: requisicao.query.cep,
        contribuicao: requisicao.query.contribuicao,
    } 
    listaUsuarios.push(usuario);

    let conteudoResposta =`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
            <h1 class="text-success text-center" style="font-weight: 700; text-decoration: underline">Lista de voluntários cadastrados</h1>
            <table class="table table-striped table-hover mt-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Cidade/UF</th>
                        <th>CEP</th>
                        <th>Contribuição</th>
                    </tr>
                </thead>
                <tbody>
                </tbody> `;

                for (const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.nomeUsuario}</td>
                            <td>${usuario.cidade}/${usuario.uf}</td>
                            <td>${usuario.cep}</td>
                            <td>${usuario.contribuicao}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        <a class="btn btn-danger" href="/" role"button"> Voltar </a>
                        <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Cadastrar mais voluntarios </a>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                reposta.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', (requisicao, reposta) =>{
    reposta.end (`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
            <style>
                *{font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;}
                a {font-size: 20px;
                    text-decoration: none;
                    color: blue;
                    font-weight: 700;}
            </style>
        </head>
        <body>
            <h1>ACESSE AQUI A TELA DE CADASTRO DE VOLUNTARIOS DA ONG AUMIGOS</h1>
            <ul>
                <li><a href="/cadastroUsuario.html">Formulario de cadastro de voluntarios</a></li>
            </ul>
        </body>
        `);
})

app.get('/cadastrarUsuario' , processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});