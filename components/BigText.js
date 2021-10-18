import Layout from '/components/Layout.js';

export default function BigText(props) {
    const { children, ...rest } = props;
    return <Layout className="d-flex flex-column" { ...rest }>
        <div className="px-5 d-flex flex-grow-1 w-100 justify-content-center align-items-center h3 text-lightgray">
            { children }
        </div>
    </Layout>;
}
