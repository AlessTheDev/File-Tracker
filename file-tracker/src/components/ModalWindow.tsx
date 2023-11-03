interface Props {
    children: React.ReactNode
}

const ModalWindow = ({ children }: Props) => {
    return (
        <>
            <div className="modal-window-container">
                <div className="content">{children}</div>
            </div>
        </>
    )
}

export default ModalWindow