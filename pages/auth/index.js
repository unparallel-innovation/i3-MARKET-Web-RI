import { Button, Image} from 'react-bootstrap';
import Footer from '../../components/common/Footer';

export default function Auth(){
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">

                <div className="d-flex flex-column rounded bg-light p-4">
                    <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />

                    <Button className="mt-4" type="submit" href={`/login`}>Login</Button>
                    <Button className="mt-3 bg-secondary" type="submit" href={`/register`}>Register</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
