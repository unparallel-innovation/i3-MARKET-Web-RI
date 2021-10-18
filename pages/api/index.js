import {catchErrors} from '/lib/server.js';

export default catchErrors(async (req, res) => {
    return {
        categories: [
            'Agriculture',
            'Automotive',
            'Culture',
            'Economy',
            'Education',
            'Energy',
            'Environment',
            'Government',
            'Health',
            'International',
            'Justice',
            'Manufacturing',
            'Regions',
            'Science',
            'Transport',
            'Wellbeing',
            'Society',
        ],
    };
});
