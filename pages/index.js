import { useData } from '/lib/hooks.js';
import ErrorC from '/components/ErrorC.js';
import HomePure from '/components/index';

function ErrorCard(props) {
    const { error } = props;

    return (
        <Card className="bg-danger text-white fh">
            <Card.Body className="d-flex align-items-center justify-content-center">
                { error.message }
            </Card.Body>
        </Card>
    );
}

export default function HomePage() {
  const { data, error } = useData('/api/');

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return <HomePure />;

  return <HomePure { ...data } />;
}
