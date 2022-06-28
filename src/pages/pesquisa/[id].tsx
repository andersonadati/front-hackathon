import { useRouter } from 'next/router';
//import { parseCookies } from 'ookies';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../services/request';

interface interfProps {
    token?: string;
}

export default function Question(props: interfProps) {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const [estaEditando, setEstaEditando] = useState(false);

    useEffect(() => {
        const idParam = Number(id);
        //console.log(idParam)


        if (Number.isInteger(idParam)) {

            api.get('/questions/' + idParam, {
                headers: {
                    'Authorization': 'Bearer '
                }
            }).then((res) => {
                if (res.data.data) {

                    setEstaEditando(true);

                    refForm.current['description'].value = res.data.data.description
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

            //console.log(obj)

            api.post('/questions', obj, {
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


            api.put('/questions/'+id, obj, {
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

                <h1> {
                    !estaEditando
                        ? 'Adicionar Pesquisa'
                        : 'Editar Pesquisa'
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
                            htmlFor='description'
                            className='form-label'
                        >
                            Digite a pegunta
                        </label>
                        
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite a pergunta!'
                            id="description"
                            required
                        />
                        <div className='invalid-feedback'>
                            Digite a pergunta!
                        </div>
                    </div>
                    <br></br>

                    <div className='d-flex'>
                        <button
                            className='btn btn-success'
                            type='submit'
                            id='botao'
                            onClick={(e) => {
                                estaEditando ?
                                    editForm(e)
                                    :
                                    submitForm(e)
                            }}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </Menu>
        </>
    )
}
