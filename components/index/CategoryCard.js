import CategoryCardPure from './CategoryCardPure';
import { useData } from '/lib/hooks.js'

export default
function CategoryCard(props) {
    const { name } = props;
    const { data, error } = useData(`/api/getCategoryOfferingsN?category=${name}`);

    // if (error)
    //   return <ErrorCard error={error} />;

    if (error || !data)
        return <CategoryCardPure name={name} />;

    const { offeringsN } = data;

    return <CategoryCardPure name={name} number={offeringsN} />;
}
