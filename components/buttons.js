import colors from '/lib/colors.js';
import { PlusCircle } from 'react-bootstrap-icons';

export 
function AddNew(props) {
    return (
        <div className="text-primary cursor-pointer" { ...props }>
            <PlusCircle color={colors.primary} size={24} />
            <span className="ml-2">Add new</span>
        </div>
    );
}
