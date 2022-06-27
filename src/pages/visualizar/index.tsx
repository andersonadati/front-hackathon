import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfUsuario {
    neighborhood?: string,
    cpf?: string,
    email: string,
    email_verified_at: Date,
    address?: string,
    id: number,
    name: string,
    number?: string,
    remember_token: string
    created_at: Date,
    updated_at: Date,
    phone: string,
    cityid:number
}

export default function Visualizar() {

    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Array<interfUsuario>>([]);


    useEffect(() => {

        //provavelmente tera uma rota para trazer os dados do usuario e as pesquisas desse usuario junto
        api.get('/visualizar', {

        })
            .then((res) => {

                setUsuarios(res.data.data)

            }).catch((erro) => {
                console.log(erro)
            })
    }, [])

    return (
        <>
            <Menu
                active="usuario"
            >
                <h1>Usuário
                </h1>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='name'
                            className='form-label'
                        >
                            Nome
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu nome completo'
                            id="name"
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
                            htmlFor='phone'
                            className='form-label'
                        >
                            Telefone
                        </label>

                        <input
                            type='tel'
                            className='form-control'
                            placeholder='Digite seu telefone'
                            id="phone"
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
                            htmlFor='cityid'
                            className='form-label'
                        >
                            Cidade
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite sua cidade'
                            id="cityid"
                        // required
                        />
                    </div>

                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='address'
                            className='form-label'
                        >
                            Endereço
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu endereço'
                            id="address"
                        // required
                        />
                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='neighborhood'
                            className='form-label'
                        >
                            Bairro
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu bairro'
                            id="neighborhood"
                        // required
                        />
                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='number'
                            className='form-label'
                        >
                            Numero
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu numero'
                            id="number"
                        // required
                        />
                    </div>
            </Menu>
        </>
    );
}