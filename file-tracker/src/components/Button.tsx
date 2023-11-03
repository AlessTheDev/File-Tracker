interface Props {
    children: React.ReactNode,
    onCLick: Function
    style?: any | undefined
}

const Button = ({ children, onCLick, style }: Props) => {
    return (
        <>
            <div className='button' onClick={(e) => onCLick(e)} style={style ? style : {}}>
                <div>{children}</div>
            </div>
        </>
    )
}

export default Button