import Router, { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfQuestions {
    id: number,
    description: string
}

export default function Visualizar() {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const [questions, setQuestions] = useState<Array<interfQuestions>>([]);

    function deletarPesquisa(id) {
        api.delete('/questions/' + id, {
        })
            .then((res) => {
                return router.reload();
            }).catch((erro) => {
                console.log(erro)
            })
        return;
    }

    useEffect(() => {
        const idParam = Number(id);

        if (Number.isInteger(idParam)) {

            api.get('/users/' + idParam, {
            }).then((res) => {
                if (res.data) {

                    refForm.current['nome'].value = res.data.data.name
                    refForm.current['email'].value = res.data.data.email
                    refForm.current['telefone'].value = res.data.data.phone
                    refForm.current['cidade'].value = res.data.data.city_id
                    refForm.current['cpf'].value = res.data.data.cpf || ''
                    refForm.current['endereco'].value = res.data.data.address || ''
                    refForm.current['bairro'].value = res.data.data.neighborhood || ''
                    refForm.current['numero'].value = res.data?.data.number || ''

                }
            }).catch((erro) => {
                console.log(erro)
            })
        }

        api.get('/questions', {
        })
            .then((res) => {
                setQuestions(res.data)
            }).catch((err) => {
                console.log(err)
            })

    }, [])

    return (
        <>
            <Menu
                active="usuario"
            >
                <h1>Dados do usuário</h1>

                <form
                    className='row g-3 needs-validation'
                    ref={refForm}
                >
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='nome'
                            className='form-label'
                        >
                            Nome
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu nome completo'
                            id="nome"
                            readOnly
                        />

                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='email'
                            className='form-label'
                        >
                            Email
                        </label>
                        <div
                            className='input-group has-validation'
                        >
                            <span
                                className='input-group-text'
                            >@</span>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite o email'
                                id="email"
                                readOnly
                            />
                            <div className='invalid-feedback'>
                                Por favor digite seu email.
                            </div>
                        </div>
                    </div>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='telefone'
                            className='form-label'
                        >
                            Telefone
                        </label>

                        <input
                            type='tel'
                            className='form-control'
                            placeholder='Digite seu telefone'
                            id="telefone"
                            readOnly
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu telefone.
                        </div>

                    </div>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='cpf'
                            className='form-label'
                        >
                            CPF
                        </label>

                        <input
                            type='string'
                            className='form-control'
                            placeholder='Digite seu cpf'
                            id="cpf"
                            readOnly
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu cpf.
                        </div>

                    </div>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='cidade'
                            className='form-label'
                        >
                            Cidade
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite sua cidade'
                            id="cidade"
                            readOnly
                        />
                    </div>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='endereco'
                            className='form-label'
                        >
                            Endereço
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu endereço'
                            id="endereco"
                            readOnly
                        />
                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='bairro'
                            className='form-label'
                        >
                            Bairro
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu bairro'
                            id="bairro"
                            readOnly
                        />
                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='numero'
                            className='form-label'
                        >
                            Numero
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu numero'
                            id="numero"
                            readOnly
                        />
                    </div>
                    <h4>Perguntas Cadastradas</h4>
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
                                questions.map((element, index) => {
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
                </form>
            </Menu>
        </>
    )
}
