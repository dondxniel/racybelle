const Loading = ({variant}) => {
    if(variant === "small"){
        return (
            <img src="/images/loading.svg" alt="Loading..." className = "loading button-loading" />
        )
    }else if(variant === "large"){
        return (
            <div className = "text-center">
                <img src="/images/loading.svg" alt="Loading..." className = "loading page-loading" />
            </div>
        )
    }
}

Loading.defaultProps = {
    variant: "small"
}

export default Loading
