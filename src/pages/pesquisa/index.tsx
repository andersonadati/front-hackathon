import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';


interface interfPesquisa {
    id: number,
    description: string,
}

function deletarPesquisa(id: number) {
    return;
}

export default function Pesquisa() {

    const router = useRouter();

    const [pesquisas, setPesquisas] = useState<Array<interfPesquisa>>([]);

    useEffect(() => {


        api.get('/questions', {
            // headers (cabeçalhos)
        })
            .then((res) => {

                setPesquisas(res.data)

            }).catch((erro) => {
                console.log(erro)
            })

    }, [])

    return (
        <>
            <Head>
                <title>Lista de pesquisas</title>
            </Head>

            <Menu
                active="usuario"
            >

                <>
                    <div
                        className={"d-flex justify-content-between " +
                            "flex-wrap flex-md-nowrap align-items-center" +
                            " pt-3 pb-2 mb-3 border-bottom"}
                    >
                        <h2>Lista de pesquisas</h2>
                    </div>
                </>
                <table
                    className='table table-striped'
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pesquisas.map((element, index) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.description}</td>
                                        <td>
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    router.push(`/pesquisa/` + element.id)

                                                }}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => {deletarPesquisa(element.id)}}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </Menu>
        </>
    )
}

