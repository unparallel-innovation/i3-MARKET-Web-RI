import Layout from '/components/Layout.js'

export default
function ErrorC(props) {
    const { error } = props;
    console.log(error);

    return (<Layout>
        <div className="px-5 py-3 bg-danger text-white">
            { error.message }
        </div>
    </Layout>);
}

