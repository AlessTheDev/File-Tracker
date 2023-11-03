import ErrorIcon from '../assets/error.png'

interface Props {
    children: React.ReactNode
}

const Error = ({ children }: Props) => {
    return (
        <>
            <div className='error' style={{marginTop: "20px"}}>
                <img src={ErrorIcon} width={"30px"}/>
                <h3>{children}</h3>
            </div>
        </>
    )
}

export default Error