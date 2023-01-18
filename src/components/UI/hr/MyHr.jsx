import classes from './MyHr.module.css'

const MyHr = ({children, ...props}) => {
    return (
        <hr {...props} className={classes.myHr}>
            {children}
        </hr>
    )
}
export default MyHr;