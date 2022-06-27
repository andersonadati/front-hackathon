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

            api.get('/users/' + idParam, {
                headers: {
                    'Authorization': 'Bearer '
                }
            }).then((res) => {
                if (res.data.data) {


                    setEstaEditando(true);

                    refForm.current['name'].value = res.data.data.name
                    refForm.current['email'].value = res.data.data.email
                    refForm.current['phone'].value = res.data.data.phone
                    refForm.current['city_id'].value = res.data.data.city_id
                    refForm.current['cpf'].value = res.data.data.cpf || ''
                    refForm.current['address'].value = res.data.data.address || ''
                    refForm.current['neighborhood'].value = res.data.data.neighborhood || ''
                    refForm.current['number'].value = res.data.data.number || ''

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

            console.log(obj)

            api.post('/users', obj, {
            })
                .then((res) => {
                    //console.log(res)
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
            console.log(obj)


            api.put('/users/'+id, obj, {
            }).then((res) => {
                router.push('/usuario')
            }).catch((err) => {
                console.log(err)
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
                <h1>{
                    !estaEditando
                        ? 'Adicionar Usuário'
                        : 'Editar Usuário'
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
                            type='string'
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
                            htmlFor='city_id'
                            className='form-label'
                        >
                            Cidade
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite a cidade'
                            id="city_id"
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
                            {
                                estaEditando ?
                                    'Salvar'
                                    :
                                    'Enviar'
                            }
                        </button>
                    </div>
                </form>
            </Menu>
        </>
    )
}
