import { useData } from '../../lib/hooks';

export default function Credential() {

    const { data, error } = useData('/api/credential')



    // fetch(`/api/credential/`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // }).then(res => {
    //     const result = res.json().then(result => {
    //         console.log(result)
    //     })
    //
    // }).catch(error => {
    //     console.log('ERROR', error);
    // });

    return (
        <div>credential page</div>
    )
}
