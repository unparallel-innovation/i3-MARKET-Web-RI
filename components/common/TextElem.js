export default
function TextElem(props) {
    const { title, value } = props;

    if(!value)
        return '';

    return (
        <div> { title}: { value } <br /></div>
    )
}
