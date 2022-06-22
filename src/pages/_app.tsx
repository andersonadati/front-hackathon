
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/styles.css';
import Head from 'next/head'
import { createServer, Model } from 'miragejs';


createServer({
    models: {
        usuarios: Model,
        pesquisas: Model
    },
    routes() {
        this.namespace = 'apimirage';

        this.get('/usuario', (schema, request) => {
            return schema.db.usuarios

        })

        this.get('/usuario/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id


            return schema.db.usuarios.findBy({id})

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


        this.delete('/usuario/deletar/:id', (schema, request) => {
            const id = request.params.id

            schema.db.usuarios.remove(id);

            return { message: 'deletado com sucesso.'}
        })

        //

        this.get('/pesquisa', (schema, request) => {
            return schema.db.pesquisas

        })

        this.get('/pesquisa/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id


            return schema.db.pesquisas.findBy({id})

        })

        this.post('/pesquisa/cadastrar', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.pesquisas.insert(data);
        })

        this.put('/pesquisa/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id

            return schema.db.pesquisas.update(id, data);
        })


        this.delete('/pesquisa/deletar/:id', (schema, request) => {
            const id = request.params.id

            schema.db.pesquisas.remove(id);

            return { message: 'deletado com sucesso.'}
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

            <Component {...pageProps} />

        </>

    )
}

export default MyApp
