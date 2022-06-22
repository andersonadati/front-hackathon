import Link from "next/link"
import { ReactNode } from "react"

interface InterfProps {
    children: ReactNode;
    active: string;
    token?: string;
}

export const Menu = ({
    children,
    active,
    token
}: InterfProps) => {

    return (
        <>
            <header
                className={"navbar navbar-dark " +
                    "sticky-top bg-dark flex-md-nowrap p-0 shadow"}
            >

                <a
                    className={"navbar-brand col-md-3 col-lg-2" +
                        " me-0 px-3"}
                >
                    Pesquisa de satisfação
                </a>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                {
                                    <li
                                        className="nav-item"
                                    >
                                        <Link href={'/usuario'}>
                                            <a
                                                className={`nav-link ${active === 'usuario' && 'active'}`}

                                            >
                                                Usuarios
                                            </a>
                                        </Link>
                                    </li>
                                }
                                {
                                    <li
                                        className="nav-item"
                                    >
                                        <Link href={'/usuario/cadastrar'}>
                                            <a
                                                className={`nav-link ${active === 'usuario' && 'active'}`}

                                            >
                                                Cadastro de Usuários
                                            </a>
                                        </Link>
                                    </li>
                                }
                                {
                                    <li
                                        className="nav-item"
                                    >
                                        <Link href={'/pesquisa'}>
                                            <a
                                                className={`nav-link ${active === 'usuario' && 'active'}`}

                                            >
                                                Pesquisas
                                            </a>
                                        </Link>
                                    </li>
                                }
                                {
                                    <li
                                        className="nav-item"
                                    >
                                        <Link href={'/pesquisa/cadastrar'}>
                                            <a
                                                className={`nav-link ${active === 'usuario' && 'active'}`}

                                            >
                                                Cadastro de Pesquisa
                                            </a>
                                        </Link>
                                    </li>
                                }

                            </ul>
                        </div>
                    </nav>
                    <main
                        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                    >
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
