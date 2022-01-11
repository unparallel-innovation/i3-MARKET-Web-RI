import { Spinner } from 'react-bootstrap';

export function LoadingSpinner() {
    return (
        <div className="d-flex h-100 w-100">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center h3 text-lightgray flex-column">

                <Spinner className="mb-4" style={{ width: '5rem', height:'5rem' }} animation="border" />

                Loading.. Please wait..
            </div>
        </div>)
    ;
}
