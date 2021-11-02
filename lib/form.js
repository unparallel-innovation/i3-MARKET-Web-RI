import {dateField, setObjValue} from '/lib/utils';

function citer(c, cb) {
    return Array.from(Array(c).keys()).map(cb).filter(item => !!item);
}

export
function fd2register(fd) {
    // const datasetC = parseInt(fd.get('datasetC'));
    //
    // const dataset = citer(datasetC, (item, idx) => {
    //     const datasetEK = 'dataset' + idx;
    //
    //     // if (!fd.has(datasetEK + 'distributionC'))
    //     //     return null;
    //
    //     const distributionC = parseInt(fd.get(datasetEK + 'distributionC'));
    //
    //     const distribution = citer(distributionC, (item, idx) => {
    //         const distributionEK = datasetEK + 'distribution' + idx;
    //
    //         // if (!fd.has(distributionEK + 'title'))
    //         //     return null;
    //
    //         const accessServiceC = parseInt(fd.get(distributionEK + 'accessServiceC'));
    //
    //         const accessService = citer(accessServiceC, (item, idx) => {
    //             const accessServiceEK = distributionEK + 'accessService' + idx;
    //
    //             let obj = {};
    //             setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
    //             setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
    //             setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
    //             setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
    //             setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
    //             return obj;
    //
    //             // return {
    //             //     endpointDescription: fd.get(accessServiceEK + 'endpointDescription'),
    //             //     endpointURL: fd.get(accessServiceEK + 'endpointUrl'),
    //             //     conformsTo: fd.get(accessServiceEK + 'conformsTo'),
    //             //     servesDataset: fd.get(accessServiceEK + 'servesDataset'),
    //             //     serviceSpecs: fd.get(accessServiceEK + 'serviceSpecs'),
    //             // };
    //         });
    //
    //         let obj = {};
    //         setObjValue(obj, 'title', fd, distributionEK + 'title');
    //         setObjValue(obj, 'description', fd, distributionEK + 'description');
    //         setObjValue(obj, 'license', fd, distributionEK + 'license');
    //         setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
    //         setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
    //         setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
    //         obj.accessService = accessService;
    //         return obj;
    //
    //         // return {
    //         //     title: fd.get(distributionEK + 'title'),
    //         //     description: fd.get(distributionEK + 'description'),
    //         //     license: fd.get(distributionEK + 'license'),
    //         //     conformsTo: fd.get(distributionEK + 'conformsTo'),
    //         //     mediaType: fd.get(distributionEK + 'mediaType'),
    //         //     packageFormat: fd.get(distributionEK + 'packageFormat'),
    //         //     accessService,
    //         // };
    //     });
    //
    //     const datasetInformationC = parseInt(fd.get(datasetEK + 'informationC'));
    //
    //     const datasetInformation = citer(datasetInformationC, (item, idx) => {
    //         const informationEK = datasetEK + 'information' + idx;
    //
    //         let obj = {};
    //         setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
    //         setObjValue(obj, 'deviceID', fd, informationEK + 'deviceID');
    //         setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
    //         setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
    //         setObjValue(obj, 'sensorID', fd, informationEK + 'sensorID');
    //         setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
    //         return obj;
    //
    //         // return {
    //         //     cppType: fd.get(informationEK + 'cppType'),
    //         //     deviceID: fd.get(informationEK + 'deviceID'),
    //         //     measurementChannelType: fd.get(informationEK + 'measurementChannelType'),
    //         //     measurementType: fd.get(informationEK + 'measurementType'),
    //         //     sensorID: fd.get(informationEK + 'sensorID'),
    //         //     sensorType: fd.get(informationEK + 'sensorType'),
    //         // };
    //     });
    //
    //     let obj = {};
    //     setObjValue(obj, 'title', fd, datasetEK + 'title');
    //     setObjValue(obj, 'description', fd, datasetEK + 'description');
    //     setObjValue(obj, 'creator', fd, datasetEK + 'creator');
    //     setObjValue(obj, 'keyword', fd, datasetEK + 'keyword'); // not in form (mandatory)
    //     setObjValue(obj, 'dataset', fd, datasetEK + 'dataset'); // not in form
    //     setObjValue(obj, 'language', fd, datasetEK + 'language');
    //     setObjValue(obj, 'temporal', fd, datasetEK + 'temporal');
    //     setObjValue(obj, 'temporalResolution', fd, datasetEK + 'temporalResolution');
    //     setObjValue(obj, 'spatial', fd, datasetEK + 'spatial');
    //     setObjValue(obj, 'accrualPeriodicity', fd, datasetEK + 'accrualPeriodicity');
    //     dateField(obj, 'issued', fd.get(datasetEK + 'issued'));
    //     dateField(obj, 'modified', fd.get(datasetEK + 'modified'));
    //     obj.distribution = distribution;
    //     obj.datasetInformation = datasetInformation;
    //     return obj;
    //     // let ret = {
    //     //     title: fd.get(datasetEK + 'title'),
    //     //     description: fd.get(datasetEK + 'description'),
    //     //     creator: fd.get(datasetEK + 'creator'),
    //     //     keyword: fd.get(datasetEK + 'keyword'), // not in form (mandatory)
    //     //     // issued: dateStrToISO(fd.get(datasetEK + "issued")),
    //     //     // modified: dateStrToISO(fd.get(datasetEK + "modified")),
    //     //     language: fd.get(datasetEK + 'language'),
    //     //     temporal: fd.get(datasetEK + 'temporal'),
    //     //     temporalResolution: fd.get(datasetEK + 'temporalResolution'),
    //     //     spatial: fd.get(datasetEK + 'spatial'),
    //     //     accrualPeriodicity: fd.get(datasetEK + 'accrualPeriodicity'),
    //     //     distribution,
    //     //     datasetInformation,
    //     // };
    //     //
    //     // return obj;
    // });

    const pricingModelC = parseInt(fd.get('pricingModelC'));

    const hasPricingModel = citer(pricingModelC, (item, idx) => {
        const pricingModelEK = 'pricingModel' + idx;

        if (!fd.has(pricingModelEK + 'paymentTypeC'))
            return null;

        const paymentTypeC = parseInt(fd.get(pricingModelEK + 'paymentTypeC'));

        const hasPaymentType = citer(paymentTypeC, (item, idx) => {
            const paymentTypeEK = pricingModelEK + 'paymentType' + idx;

            if (!fd.has(paymentTypeEK + 'repeat'))
                return null;

            let ret = {
                hasSubscriptionPrice: fd.get(paymentTypeEK + 'subscriptionPrice'),
                // fromValue: dateStrToISO(fd.get(paymentTypeEK + "from")),
                // toValue: dateStrToISO(fd.get(paymentTypeEK + "to")),
                paymentType: fd.get(paymentTypeEK + 'paymentType'),
                repeat: fd.get(paymentTypeEK + 'repeat'),
                timeDuration: fd.get(paymentTypeEK + 'timeDuration'),
            };

            dateField(ret, 'fromValue', fd.get(paymentTypeEK + 'from'));
            dateField(ret, 'toValue', fd.get(paymentTypeEK + 'to'));

            return ret;
        });

        return {
            basicPrice: fd.get(pricingModelEK + 'basicPrice'),
            currency: fd.get(pricingModelEK + 'currency'),
            hasPaymentType,
        };
    });

    let offering = {};
    setObjValue(offering, 'dataOfferingTitle', fd, 'title');
    setObjValue(offering, 'dataOfferingDescription', fd, 'description');
    setObjValue(offering, 'category', fd, 'category');
    setObjValue(offering, 'provider', fd, 'isProvidedBy');
    setObjValue(offering, 'owner', fd, 'owner');
    setObjValue(offering, 'dataOfferingLabel', fd, 'label');
    setObjValue(offering, 'dataOfferingExpirationTime', fd, 'expirationTime'); // not in form
    offering.hasDataset = getDataset(fd);

    console.log(JSON.stringify(offering));

    return offering;
    //
    // return {
    //     dataOfferingTitle: fd.get('title'),
    //     dataOfferingDescription: fd.get('description'),
    //     category: fd.get('category'),
    //     provider: fd.get('isProvidedBy'),
    //     owner: fd.get('owner'), // not in form
    //     dataOfferingLabel: fd.get('label'),
    //     dataOfferingExpirationTime: fd.get('dataOfferingDescription'), // not in form
    //     // hasDataset,
    //     // hasPricingModel,
    //     // theme: fd.get('theme') // not in form
    // };
}

function getDataset(fd) {
    const datasetC = parseInt(fd.get('datasetC'));

    return citer(datasetC, (item, idx) => {
        const datasetEK = 'dataset' + idx;

        console.log('datasetEK', datasetEK);

        // const distributionC = parseInt(fd.get(datasetEK + 'distributionC'));
        //
        // const distribution = citer(distributionC, (item, idx) => {
        //     const distributionEK = datasetEK + 'distribution' + idx;
        //
        //     const accessServiceC = parseInt(fd.get(distributionEK + 'accessServiceC'));
        //
        //     const accessService = citer(accessServiceC, (item, idx) => {
        //         const accessServiceEK = distributionEK + 'accessService' + idx;
        //
        //         let obj = {};
        //         setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
        //         setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
        //         setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
        //         setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
        //         setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
        //         return obj;
        //     });
        //
        //     let obj = {};
        //     setObjValue(obj, 'title', fd, distributionEK + 'title');
        //     setObjValue(obj, 'description', fd, distributionEK + 'description');
        //     setObjValue(obj, 'license', fd, distributionEK + 'license');
        //     setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
        //     setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
        //     setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
        //     obj.accessService = accessService;
        //     return obj;
        // });

        // const datasetInformationC = parseInt(fd.get(datasetEK + 'informationC'));
        //
        // const datasetInformation = citer(datasetInformationC, (item, idx) => {
        //     const informationEK = datasetEK + 'information' + idx;
        //
        //     let obj = {};
        //     setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
        //     setObjValue(obj, 'deviceID', fd, informationEK + 'deviceID');
        //     setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
        //     setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
        //     setObjValue(obj, 'sensorID', fd, informationEK + 'sensorID');
        //     setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
        //     return obj;
        //
        //     // return {
        //     //     cppType: fd.get(informationEK + 'cppType'),
        //     //     deviceID: fd.get(informationEK + 'deviceID'),
        //     //     measurementChannelType: fd.get(informationEK + 'measurementChannelType'),
        //     //     measurementType: fd.get(informationEK + 'measurementType'),
        //     //     sensorID: fd.get(informationEK + 'sensorID'),
        //     //     sensorType: fd.get(informationEK + 'sensorType'),
        //     // };
        // });

        let obj = {};
        setObjValue(obj, 'title', fd, datasetEK + 'title');
        setObjValue(obj, 'description', fd, datasetEK + 'description');
        setObjValue(obj, 'creator', fd, datasetEK + 'creator');
        setObjValue(obj, 'keyword', fd, datasetEK + 'keyword'); // not in form (mandatory)
        setObjValue(obj, 'dataset', fd, datasetEK + 'dataset'); // not in form
        setObjValue(obj, 'language', fd, datasetEK + 'language');
        setObjValue(obj, 'temporal', fd, datasetEK + 'temporal');
        setObjValue(obj, 'temporalResolution', fd, datasetEK + 'temporalResolution');
        setObjValue(obj, 'spatial', fd, datasetEK + 'spatial');
        setObjValue(obj, 'accrualPeriodicity', fd, datasetEK + 'accrualPeriodicity');
        setObjValue(obj, 'theme', fd, 'theme'); // not in form
        dateField(obj, 'issued', fd.get(datasetEK + 'issued'));
        dateField(obj, 'modified', fd.get(datasetEK + 'modified'));
        obj.distribution = getDistribution(fd, datasetEK);
        obj.datasetInformation = getDatasetInformation(fd, datasetEK);
        return obj;
        // let ret = {
        //     title: fd.get(datasetEK + 'title'),
        //     description: fd.get(datasetEK + 'description'),
        //     creator: fd.get(datasetEK + 'creator'),
        //     keyword: fd.get(datasetEK + 'keyword'), // not in form (mandatory)
        //     // issued: dateStrToISO(fd.get(datasetEK + "issued")),
        //     // modified: dateStrToISO(fd.get(datasetEK + "modified")),
        //     language: fd.get(datasetEK + 'language'),
        //     temporal: fd.get(datasetEK + 'temporal'),
        //     temporalResolution: fd.get(datasetEK + 'temporalResolution'),
        //     spatial: fd.get(datasetEK + 'spatial'),
        //     accrualPeriodicity: fd.get(datasetEK + 'accrualPeriodicity'),
        //     distribution,
        //     datasetInformation,
        // };
        //
        // return obj;
    });
}

function getDistribution(fd, datasetEK) {
    const distributionC = parseInt(fd.get(datasetEK + 'distributionC'));

    return citer(distributionC, (item, idx) => {
        const distributionEK = datasetEK + 'distribution' + idx;

        // const accessServiceC = parseInt(fd.get(distributionEK + 'accessServiceC'));
        //
        // const accessService = citer(accessServiceC, (item, idx) => {
        //     const accessServiceEK = distributionEK + 'accessService' + idx;
        //
        //     let obj = {};
        //     setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
        //     setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
        //     setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
        //     setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
        //     setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
        //     return obj;
        // });

        let obj = {};
        setObjValue(obj, 'title', fd, distributionEK + 'title');
        setObjValue(obj, 'description', fd, distributionEK + 'description');
        setObjValue(obj, 'license', fd, distributionEK + 'license');
        setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
        setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
        setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
        obj.accessService = getAccessService(fd, distributionEK);
        return obj;
    });
}

function getAccessService(fd, distributionEK) {
    const accessServiceC = parseInt(fd.get(distributionEK + 'accessServiceC'));

    return citer(accessServiceC, (item, idx) => {
        const accessServiceEK = distributionEK + 'accessService' + idx;

        let obj = {};
        setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
        setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
        setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
        setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
        setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
        return obj;
    });
}

function getDatasetInformation(fd, datasetEK) {
    const datasetInformationC = parseInt(fd.get(datasetEK + 'informationC'));

    return citer(datasetInformationC, (item, idx) => {
        const informationEK = datasetEK + 'information' + idx;

        let obj = {};
        setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
        setObjValue(obj, 'deviceID', fd, informationEK + 'deviceID');
        setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
        setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
        setObjValue(obj, 'sensorID', fd, informationEK + 'sensorID');
        setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
        return obj;
    });
}

export function fd2qs(fd) {
    const fde = [...fd.entries()];
    return fde
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
}
