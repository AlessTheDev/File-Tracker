import WarningIcon from '../assets/warning.png'

interface Props {
    children: React.ReactNode
}

const Warning = ({ children }: Props) => {
    return (
        <>
            <div className='warning' style={{marginTop: "20px"}}>
                <img src={WarningIcon} width={"30px"}/>
                <h3>{children}</h3>
            </div>
        </>
    )
}

export default Warning