import Layout from '/components/Layout.js'

export function Loading() {
    return (<Layout>
        <div className="d-flex w-100 flex-grow-1 justify-content-center align-items-center h3 text-lightgray">
            Loading results.. Please wait..
        </div>
    </Layout>);
}
