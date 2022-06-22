import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
//import { parseCookies } from 'ookies';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfProps {
    token?: string;
}

export default function Pesquisa(props: interfProps) {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const [estaEditando, setEstaEditando] = useState(false);

    useEffect(() => {
        const idParam = Number(id);
        //console.log(idParam)


        if (Number.isInteger(idParam)) {



            api.get('/pesquisa/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                if (res.data) {


                    setEstaEditando(true);

                    refForm.current['nomePesquisa'].value = res.data.nomePesquisa
                    refForm.current['pergunta'].value = res.data.pergunta

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

            api.post('/pesquisa/cadastrar', obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            })
                .then((res) => {

                    router.push('/pesquisa')

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


            api.put('/pesquisa/'+id, obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                router.push('/pesquisa')
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

                <h1>Pesquisa - {
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
                            htmlFor='nomePesquisa'
                            className='form-label'
                        >
                            Pesquisa
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite o nome da pesquisa'
                            id="nomePesquisa"
                            required
                        />
                        <div className='invalid-feedback'>
                            Nome da pesquisa
                        </div>

                    </div>
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='pergunta'
                            className='form-label'
                        >
                            Pergunta 1
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite a pergunta'
                            id="pergunta"
                            required
                        />
                        <div className='invalid-feedback'>
                            Digite a pergunta
                        </div>

                    </div>
                    <div>
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
