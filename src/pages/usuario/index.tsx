import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfProps {
    token?: string;
}

interface interfUsuario {
    bairro?: string,
    cpf?: string,
    email: string,
    endereco?: string,
    id: number,
    nome: string,
    numero?: string,
    telefone: string,
    tipo: number,
}
export default function Usuario(props: interfProps) {

    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Array<interfUsuario>>([]);

    useEffect(() => {


        api.get('/users', {
        })
            .then((res) => {

                setUsuarios(res.data)

            }).catch((erro) => {
                console.log(erro)
            })

    }, [])

    function deletarUsuario(id) {
        api.delete('users/' + id, {
        })
            .then((res) => {
            }).catch((erro) => {
                console.log(erro)
            })

        api.get('/users', {
        })
            .then((res) => {
                setUsuarios(res.data)
            }).catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <>
            <Menu
                active="usuario"
                token={props.token}
            >

                <>
                    <div
                        className={"d-flex justify-content-between " +
                            "flex-wrap flex-md-nowrap align-items-center" +
                            " pt-3 pb-2 mb-3 border-bottom"}
                    >
                        <h2>Listagem de Usuários</h2>
                    </div>
                </>
                <table
                    className='table table-striped'
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((element, index) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.nome}</td>
                                        <td>{element.email}</td>
                                        <td>
                                            <button
                                                className='btn btn-info'
                                                onClick={() => {
                                                    router.push(`/visualizar/` + element.id)

                                                }}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            >
                                                Visualizar
                                            </button>
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    router.push(`/usuario/` + element.id)
                                                }}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => {deletarUsuario(element.id)}}
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

