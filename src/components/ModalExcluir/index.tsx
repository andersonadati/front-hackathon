interface ModalExcluirProps {
    visibleNovoModal: boolean;
    fecharModal: () => void;
}

export function ModalExcluir(ModalExcluirProps: props) {

}

return (
    <Modal
        isOpen={props.visibleNovoModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
        <button
            type='button'
            onClick={() => limparCamposAoFecharModal()}
            className="react-modal-close"
        >
            <FaWindowClose />
        </button>

        <FormContainer onSubmit={onSubmitModal} >
            <h1>Exlcuir Cliente</h1>
            <p>Tem certeza que deseja excluir esse cadastro?</p>

            <button
                type='button'
                onClick={() => excluirTarefa()}
            >
                {'Excluir'}
            </button>
        </FormContainer>
    </Modal >
)