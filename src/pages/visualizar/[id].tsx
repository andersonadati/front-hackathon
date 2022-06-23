import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

export default function Visualizar() {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    useEffect(() => {
        const idParam = Number(id);

        if (Number.isInteger(idParam)) {

            api.get('/visualizar/' + idParam, {

            }).then((res) => {
                console.log("usuario : " + res.data)
                if (res.data) {

                    refForm.current['nome'].value = res.data.nome
                    refForm.current['email'].value = res.data.email
                    refForm.current['telefone'].value = res.data.telefone
                    refForm.current['cidade'].value = res.data.cidade
                    refForm.current['cpf'].value = res.data?.cpf || ''
                    refForm.current['endereco'].value = res.data?.endereco || ''
                    refForm.current['bairro'].value = res.data?.bairro || ''
                    refForm.current['numero'].value = res.data?.numero || ''

                }
            }).catch((erro) => {
                console.log(erro)
            })
        }

    }, [id])

    return (
        <>
            <Menu
                active="usuario"
            >
                <h1>Usuário - </h1>

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
                </form>
            </Menu>
        </>
    )
}