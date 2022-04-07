import Layout from '/components/layout/Layout.js';

export default
function Error(props) {
    const { error } = props;

    return (<Layout>
        <div className="px-5 py-3 bg-danger text-white">
            { error.message }
        </div>
    </Layout>);
}

