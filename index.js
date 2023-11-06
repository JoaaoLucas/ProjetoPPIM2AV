import express from 'express';

const porta = 3000;
const host =  '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, reposta){
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobrenome,
        cidade: requisicao.query.cidade,
        uf: requisicao.query.uf,
        cep: requisicao.query.cep,
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
            <h1>Lista de usuários cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Cidade/UF</th>
                        <th>CEP</th>
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
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        <a class="btn btn-primary" href="/" role"button"> Voltar ao menu </a>
                        <a class="btn btn-primary" href="/cadastroUsuario.html" role"button"> Continuar cadastrando </a>
                    </body>
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

                    </html>
                `;
                reposta.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, reposta) =>{
    reposta.end (`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
        </head>
        <body>
            <h1>Menu</>
            <ul><a href="/cadastroUsuario.html>Cadastrar Usuario </a></ul>
        </body>
        `)
})

app.get('/cadastrarUsuario' , processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});