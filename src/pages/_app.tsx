import { AutenticacaoProvider } from '../contexts/AutenticacaoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/styles.css';
import Head from 'next/head'
import { createServer, Model } from 'miragejs';


createServer({
    models: {
        usuarios: Model
    },
    routes() {
        this.namespace = 'apimirage';

        this.get('/usuarios', (schema, request) => {
            return schema.db.usuarios
        })

        this.post('/usuario/cadastrar', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.usuarios.insert(data);
        })

        this.put('/usuario/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id

            return schema.db.usuarios.update(id, data);
        })


        this.delete('/api/tarefas/:id', (schema, request) => {
            const id = request.params.id

            schema.db.tarefas.remove(id);

            return {tarefa_id: id, message: 'deletado com sucesso.'}
        })

        this.namespace = "";
        this.passthrough((request) => {
            if (
                request.url === "/_next/static/development/_devPagesManifest.json"
            ) {
                return true;
            }
        });
        this.passthrough();
    }
})

function MyApp({ Component, pageProps }) {
    return (
        <>
        <Head>
            <title>My new cool app</title>
        </Head>
        <AutenticacaoProvider>
            <Component {...pageProps} />
        </AutenticacaoProvider>
        </>

    )
}

export default MyApp
