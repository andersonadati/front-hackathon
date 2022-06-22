import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
//import { parseCookies } from 'ookies';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfProps {
    token?: string;
}

export default function Usuario(props: interfProps) {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const [estaEditando, setEstaEditando] = useState(false);

    useEffect(() => {
        const idParam = Number(id);
        //console.log(idParam)


        if (Number.isInteger(idParam)) {



            api.get('/usuario/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                if (res.data) {


                    setEstaEditando(true);

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

    const submitForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {

            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === 'botao') break;
                obj[id] = value;

            }

            api.post('/usuario/cadastrar', obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            })
                .then((res) => {

                    router.push('/usuario')

                }).catch((err) => {
                    console.log(err)
                })

        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [])

    const editForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index].id;
                const value = refForm.current[index].value;

                if(id === 'botao'
                    || (id === 'senha' && value === '')
                ) {
                    break;
                }
                obj[id] = value;


            }


            api.put('/usuario/'+id, obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                router.push('/usuario')
            })



        }  else {
            refForm.current.classList.add('was-validated')
        }
    }, [])

    return (
        <>
            <Menu
                active="usuario"
                token={props.token}
            >

                <h1>Usuário - {
                    !estaEditando
                        ? 'Adicionar'
                        : 'Editar'
                }
                </h1>

                <form
                    className='row g-3 needs-validation'
                    noValidate
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
                    <div
                        className='col-md-12'
                    >
                        <button
                            className='btn btn-primary mt-3'
                            type='submit'
                            id='botao'
                            onClick={(e) => {
                                estaEditando ?
                                    editForm(e)
                                    :
                                    submitForm(e)
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </Menu>
        </>
    )
}
