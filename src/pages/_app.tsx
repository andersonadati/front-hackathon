import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/styles.css';
import Head from 'next/head'
import NProgress from 'nprogress';
import { Router } from 'next/router'

Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
/*
createServer({
    models: {
        usuarios: Model,
        search: Model,
        questions: Model,
        alternatives: Model
    },
    routes() {
        this.namespace = 'apimirage';

        this.post('/users', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.usuarios.insert(data);
        })

        this.get('/users', (schema, request) => {
            return schema.db.usuarios

        })

        this.put('/users/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id

            return schema.db.usuarios.update(id, data);
        })

        this.get('/users/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id


            return schema.db.usuarios.findBy({id})

        })

        this.delete('users/:id', (schema, request) => {
            const id = request.params.id

            schema.db.usuarios.remove(id);

            return { message: 'deletado com sucesso.'}
        })

        //------------------------------------------------

        this.post('/search', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.search.insert(data);
        })

        this.get('/search', (schema, request) => {
            return schema.db.search

        })

        this.put('/search/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id

            return schema.db.search.update(id, data);
        })

        this.get('/search/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id


            return schema.db.search.findBy({id})

        })

        this.delete('/search/:id', (schema, request) => {
            const id = request.params.id

            schema.db.search.remove(id);

            return { message: 'deletado com sucesso.'}
        })

        //---------------------------------------------

        this.post('/questions', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.questions.insert(data);
        })

        this.get('/questions', (schema, request) => {
            return schema.db.questions

        })

        this.put('/questions/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id

            return schema.db.questions.update(id, data);
        })

        this.get('/questions/:id', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            const id = request.params.id


            return schema.db.questions.findBy({id})

        })

        this.delete('/questions/:id', (schema, request) => {
            const id = request.params.id

            schema.db.questions.remove(id);

            return { message: 'deletado com sucesso.'}
        })

        //----------------------------------------------


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
*/

function MyApp({ Component, pageProps }) {
    return (
        <>
        <Head>
            <script src='nprogress.js'></script>
            <link rel='stylesheet' href='nprogress.css'/>   
            <title>On-Search</title>
        </Head>

            <Component {...pageProps} />

        </>

    )
}

export default MyApp
