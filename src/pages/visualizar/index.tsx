import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfUsuario {
    bairro?: string,
    cpf?: string,
    email: string,
    endereco?: string,
    id: number,
    nome: string,
    numero?: string,
    telefone: string,
    tipo: string,
}

export default function Visualizar() {

    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Array<interfUsuario>>([]);


    useEffect(() => {

        //provavelmente tera uma rota para trazer os dados do usuario e as pesquisas desse usuario junto
        api.get('/visualizar', {

        })
            .then((res) => {

                setUsuarios(res.data)

            }).catch((erro) => {
                console.log(erro)
            })

    }, [])

    return (
        <>
            <Menu
                active="usuario"
            >
                <h1>Usuário -
                </h1>

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
                            required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu nome completo.
                        </div>

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
                                required
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
                            //required
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
                            type='number'
                            className='form-control'
                            placeholder='Digite seu cpf'
                            id="cpf"
                        // required
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
                        // required
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
                        // required
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
                        // required
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
                        // required
                        />
                    </div>
            </Menu>
        </>
    );
}